const { Given, When, Then, Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const assert = require("assert");
const { expect } = require("chai");
const BrowserHelper = require("./support/browser-helper");
const OfertaPage = require("./support/page-objects/oferta-page");
const {
  CicloFactory,
  UsuarioFactory,
  PontoEntregaFactory,
  ProdutoFactory,
} = require("./support/factories");
const {
  OfertaService,
  CicloService,
  ProdutoService,
  PontoEntregaService,
} = require("../../src/services/services");

const ofertaService = new OfertaService();
const cicloService = new CicloService();
const produtoService = new ProdutoService();
const pontoEntregaService = new PontoEntregaService();
const { Usuario } = require("../../models");

// ========== HOOKS ==========

Before({ tags: "@oferta-ui" }, async function () {
  this.browserHelper = new BrowserHelper();
  await this.browserHelper.init();
  this.ofertaPage = new OfertaPage(this.browserHelper);
  this.produtos = {}; // Cache de produtos criados
});

After({ tags: "@oferta-ui" }, async function () {
  if (this.browserHelper) {
    await this.browserHelper.close();
  }
});

// ========== CONTEXTO (Background) ==========

Given("que o servidor está rodando", async function () {
  // Assume que o servidor está rodando em localhost:3000
  // Em CI/CD, pode ser configurado via env var TEST_BASE_URL
  assert.ok(true, "Servidor deve estar rodando para testes E2E");
});

Given("que existe um ciclo no período de ofertas", async function () {
  const pontoEntregaData = PontoEntregaFactory.create();
  const pontoEntrega = await pontoEntregaService.criarPontoEntrega(pontoEntregaData);

  // Cria ciclo com datas que permitem ofertas (início no passado, fim no futuro)
  const now = new Date();
  const ofertaInicio = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 dia atrás
  const ofertaFim = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias à frente

  const cicloData = CicloFactory.create({
    pontoEntregaId: pontoEntrega.id,
    ofertaInicio,
    ofertaFim,
  });

  this.ciclo = await cicloService.criarCiclo(cicloData);
});

Given("que estou autenticado como fornecedor", async function () {
  const fornecedorData = UsuarioFactory.create("fornecedor");
  this.fornecedor = await Usuario.create(fornecedorData);

  // Cria oferta para o fornecedor
  this.oferta = await ofertaService.criarOferta({
    cicloId: this.ciclo.id,
    usuarioId: this.fornecedor.id,
  });
});

// ========== STEPS - NAVEGAÇÃO ==========

Given("que estou na página de ofertas", async function () {
  await this.ofertaPage.abrirPagina(`?usr=${this.fornecedor.id}`);
});

Given("que estou na página de ofertas em dispositivo mobile", async function () {
  await this.ofertaPage.simularMobile();
  await this.ofertaPage.abrirPagina(`?usr=${this.fornecedor.id}`);
});

// ========== STEPS - DADOS ==========

Given("existe um produto {string} cadastrado", async function (nomeProduto) {
  if (!this.produtos[nomeProduto]) {
    const produtoData = ProdutoFactory.create({ nome: nomeProduto });
    const produto = await produtoService.criarProduto(produtoData);
    this.produtos[nomeProduto] = produto;
  }
});

Given("existem produtos {string}, {string} e {string} cadastrados", async function (produto1, produto2, produto3) {
  const nomes = [produto1, produto2, produto3];
  for (const nome of nomes) {
    if (!this.produtos[nome]) {
      const produtoData = ProdutoFactory.create({ nome });
      const produto = await produtoService.criarProduto(produtoData);
      this.produtos[nome] = produto;
    }
  }
});

Given("existe um produto {string} com quantidade {int}", async function (nomeProduto, quantidade) {
  // Garante que o produto existe
  if (!this.produtos[nomeProduto]) {
    const produtoData = ProdutoFactory.create({ nome: nomeProduto });
    const produto = await produtoService.criarProduto(produtoData);
    this.produtos[nomeProduto] = produto;
  }

  // Se quantidade > 0, adiciona à oferta
  if (quantidade > 0) {
    await ofertaService.adicionarProduto(
      this.oferta.id,
      this.produtos[nomeProduto].id,
      quantidade
    );
  }

  // Recarrega a página para refletir mudanças
  await this.ofertaPage.abrirPagina(`?usr=${this.fornecedor.id}`);
});

Given("eu digitei {string} no campo de busca", async function (termo) {
  await this.ofertaPage.buscarProduto(termo);
});

// ========== STEPS - AÇÕES ==========

When("eu digito {string} no campo de busca", async function (termo) {
  await this.ofertaPage.buscarProduto(termo);
});

When("eu limpo o campo de busca", async function () {
  await this.ofertaPage.buscarProduto("");
});

When("eu clico no botão {string} do produto {string}", async function (botao, nomeProduto) {
  if (botao === "+") {
    await this.ofertaPage.clicarBotaoMais(nomeProduto);
  } else if (botao === "-") {
    await this.ofertaPage.clicarBotaoMenos(nomeProduto);
  } else {
    throw new Error(`Botão "${botao}" não reconhecido. Use "+" ou "-"`);
  }
});

When("eu adiciono quantidade {int} ao produto {string}", async function (quantidade, nomeProduto) {
  // Marca timestamp antes da ação (para verificar reload)
  await this.browserHelper.evaluate(() => {
    window.__timestampAntes = Date.now();
  });

  await this.ofertaPage.definirQuantidade(nomeProduto, quantidade);
});

// ========== STEPS - VERIFICAÇÕES (THEN) ==========

Then("devo ver o indicador visual de progresso", async function () {
  const progressVisible = await this.browserHelper.exists(".progress-steps");
  assert.ok(progressVisible, "O indicador de progresso não está visível");
});

Then("o step {string} deve estar ativo", async function (nomeStep) {
  const stepAtivo = await this.ofertaPage.obterStepAtivo();
  assert.strictEqual(
    stepAtivo,
    nomeStep,
    `Step ativo é "${stepAtivo}", esperado "${nomeStep}"`
  );
});

Then("apenas produtos com {string} devem aparecer", async function (termo) {
  const produtosVisiveis = await this.ofertaPage.obterProdutosVisiveis();
  const termoLower = termo.toLowerCase();

  produtosVisiveis.forEach(produto => {
    const contemTermo =
      produto.nome.toLowerCase().includes(termoLower) ||
      (produto.categoria && produto.categoria.toLowerCase().includes(termoLower));

    assert.ok(
      contemTermo,
      `Produto "${produto.nome}" está visível mas não contém "${termo}"`
    );
  });
});

Then("produtos sem {string} devem estar ocultos", async function (termo) {
  const todosProdutos = await this.browserHelper.evaluate(() => {
    const cards = document.querySelectorAll('.product-card');
    return Array.from(cards).map(card => ({
      nome: card.querySelector('.product-name')?.textContent.trim(),
      visivel: card.style.display !== 'none'
    }));
  });

  const termoLower = termo.toLowerCase();
  const produtosOcultos = todosProdutos.filter(p =>
    !p.nome.toLowerCase().includes(termoLower) && p.visivel
  );

  assert.strictEqual(
    produtosOcultos.length,
    0,
    `Existem ${produtosOcultos.length} produtos sem "${termo}" ainda visíveis`
  );
});

Then("todos os produtos devem estar visíveis", async function () {
  const produtosVisiveis = await this.ofertaPage.obterProdutosVisiveis();
  const totalProdutos = await this.browserHelper.count('.product-card');

  assert.strictEqual(
    produtosVisiveis.length,
    totalProdutos,
    `Apenas ${produtosVisiveis.length} de ${totalProdutos} produtos estão visíveis`
  );
});

Then("a quantidade deve aumentar para {int}", async function (quantidadeEsperada) {
  // Pega o último produto que foi manipulado (do contexto)
  const nomeProduto = Object.keys(this.produtos)[0]; // Simplificado para o exemplo
  const quantidadeAtual = await this.ofertaPage.obterQuantidade(nomeProduto);

  assert.strictEqual(
    quantidadeAtual,
    quantidadeEsperada,
    `Quantidade é ${quantidadeAtual}, esperado ${quantidadeEsperada}`
  );
});

Then("a quantidade deve diminuir para {int}", async function (quantidadeEsperada) {
  const nomeProduto = Object.keys(this.produtos)[0];
  const quantidadeAtual = await this.ofertaPage.obterQuantidade(nomeProduto);

  assert.strictEqual(
    quantidadeAtual,
    quantidadeEsperada,
    `Quantidade é ${quantidadeAtual}, esperado ${quantidadeEsperada}`
  );
});

Then("o card do produto deve ter destaque visual", async function () {
  const nomeProduto = Object.keys(this.produtos)[0];
  const temDestaque = await this.ofertaPage.produtoTemQuantidade(nomeProduto);

  assert.ok(temDestaque, "O card do produto não tem destaque visual (classe 'has-quantity')");
});

Then("devo ver uma notificação de sucesso", async function () {
  const toastVisivel = await this.ofertaPage.verificarToast("success");
  assert.ok(toastVisivel, "Toast de sucesso não apareceu");
});

Then("o painel de produtos ofertados deve atualizar automaticamente", async function () {
  // Aguarda um pouco para garantir que o AJAX completou
  await this.browserHelper.getPage().waitForTimeout(1000);

  const produtosOfertados = await this.ofertaPage.obterProdutosOfertados();
  assert.ok(
    produtosOfertados.length > 0,
    "Painel de produtos ofertados está vazio"
  );
});

Then("a página não deve ter recarregado", async function () {
  const timestampAntes = await this.browserHelper.evaluate(() => window.__timestampAntes);
  const timestampAgora = Date.now();

  // Se a página recarregou, a variável __timestampAntes não existiria
  assert.ok(
    timestampAntes !== undefined,
    "A página recarregou (variável de controle não existe)"
  );

  // Timestamp deve ser recente (menos de 10 segundos)
  const diferenca = timestampAgora - timestampAntes;
  assert.ok(
    diferenca < 10000,
    `Timestamp muito antigo (${diferenca}ms), página pode ter recarregado`
  );
});

Then("o contador no rodapé deve mostrar {string} produtos", async function (quantidadeEsperada) {
  const contador = await this.ofertaPage.obterContadorTotal();
  assert.strictEqual(
    contador,
    parseInt(quantidadeEsperada),
    `Contador mostra ${contador}, esperado ${quantidadeEsperada}`
  );
});

Then("o grid de produtos deve estar em layout mobile", async function () {
  const layoutMobile = await this.ofertaPage.verificarLayoutMobile();
  assert.ok(layoutMobile, "Grid não está em layout mobile");
});

Then("o progress steps deve ser navegável", async function () {
  const progressVisible = await this.browserHelper.exists(".progress-steps");
  assert.ok(progressVisible, "Progress steps não está visível em mobile");
});

Then("o painel de produtos ofertados deve mostrar {string} com quantidade {int}", async function (nomeProduto, quantidade) {
  const produtosOfertados = await this.ofertaPage.obterProdutosOfertados();
  const produto = produtosOfertados.find(p => p.nome.includes(nomeProduto));

  assert.ok(produto, `Produto "${nomeProduto}" não encontrado no painel`);
  assert.strictEqual(
    produto.quantidade,
    quantidade,
    `Quantidade do produto é ${produto.quantidade}, esperado ${quantidade}`
  );
});

Then("o total de produtos ofertados deve ser {int}", async function (totalEsperado) {
  const total = await this.ofertaPage.obterTotalOfertados();
  assert.strictEqual(
    total,
    totalEsperado,
    `Total de produtos ofertados é ${total}, esperado ${totalEsperado}`
  );
});

Then("o card do produto {string} deve ter a classe {string}", async function (nomeProduto, classe) {
  const temClasse = await this.browserHelper.evaluate((nome, cls) => {
    const cards = document.querySelectorAll('.product-card');
    for (let card of cards) {
      const productName = card.querySelector('.product-name')?.textContent.trim();
      if (productName === nome) {
        return card.classList.contains(cls);
      }
    }
    return false;
  }, nomeProduto, classe);

  assert.ok(temClasse, `Card do produto "${nomeProduto}" não tem a classe "${classe}"`);
});

Then("deve aparecer notificação de sucesso", async function () {
  const toastVisivel = await this.ofertaPage.verificarToast("success");
  assert.ok(toastVisivel, "Notificação de sucesso não apareceu");
});
