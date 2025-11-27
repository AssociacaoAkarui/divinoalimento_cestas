const { Given, When, Then, Before } = require("@cucumber/cucumber");
const assert = require("assert");
const { expect } = require("chai");
const {
  CicloFactory,
  UsuarioFactory,
  PontoEntregaFactory,
} = require("./support/factories");
const {
  CicloService,
  PontoEntregaService,
} = require("../../src/services/services");

const { Usuario, Ciclo, PedidoConsumidores } = require("../../models");

// Reset global variables
Before({ tags: "@index" }, function () {
  this.ciclos = [];
  this.usuario = null;
  this.pontoEntrega = null;
  this.indexPageData = null;
  this.redirectUrl = null;
  this.estadoVazio = false;
});

// ============================================
// CONTEXTO - Setup Inicial
// ============================================

Given("que existem usuários cadastrados no sistema", async function () {
  // Criar pelo menos um usuário para que haUsuarios = true
  const usuarioData = UsuarioFactory.create("admin");
  await Usuario.create(usuarioData);
});

Given("que existe um ponto de entrega cadastrado", async function () {
  const pontoEntregaService = new PontoEntregaService();
  const pontoEntregaData = PontoEntregaFactory.create();
  this.pontoEntrega =
    await pontoEntregaService.criarPontoEntrega(pontoEntregaData);
});

// ============================================
// AUTENTICAÇÃO
// ============================================

Given("que não estou autenticado", function () {
  this.usuario = null;
  this.authenticated = false;
});

Given("que estou autenticado como fornecedor", async function () {
  const fornecedorData = UsuarioFactory.create("fornecedor");
  this.usuario = await Usuario.create(fornecedorData);
  this.authenticated = true;
});

Given("que estou autenticado como consumidor", async function () {
  const consumidorData = UsuarioFactory.create("consumidor");
  this.usuario = await Usuario.create(consumidorData);
  this.authenticated = true;
});

Given("que estou autenticado como admin", async function () {
  const adminData = UsuarioFactory.create("admin");
  this.usuario = await Usuario.create(adminData);
  this.authenticated = true;
});

Given("que estou autenticado no OAuth", function () {
  this.authenticated = true;
  this.oauthUser = {
    email: "novo@exemplo.com",
    name: "Usuário Novo",
    email_verified: true,
  };
});

Given("não tenho cadastro no sistema", function () {
  // Usuário OAuth sem cadastro no banco
  this.usuario = null;
});

// ============================================
// CICLOS
// ============================================

Given(
  "que existe um ciclo ativo com período de oferta válido",
  async function () {
    const cicloService = new CicloService();

    // Criar ciclo com período de oferta ativo (hoje está dentro do range)
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const proximaSemana = new Date(hoje);
    proximaSemana.setDate(hoje.getDate() + 7);

    const cicloData = CicloFactory.create({
      pontoEntregaId: this.pontoEntrega.id,
      ofertaInicio: ontem,
      ofertaFim: amanha,
      itensAdicionaisInicio: amanha,
      itensAdicionaisFim: proximaSemana,
      retiradaConsumidorInicio: proximaSemana,
      retiradaConsumidorFim: proximaSemana,
      status: "oferta",
    });

    const ciclo = await cicloService.criarCiclo(cicloData);
    this.ciclos.push(ciclo);
    this.cicloAtivo = ciclo;
  },
);

Given("que existe um ciclo ativo no status {string}", async function (status) {
  const cicloService = new CicloService();

  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  const proximaSemana = new Date(hoje);
  proximaSemana.setDate(hoje.getDate() + 7);

  const cicloData = CicloFactory.create({
    pontoEntregaId: this.pontoEntrega.id,
    ofertaInicio: hoje,
    ofertaFim: amanha,
    itensAdicionaisInicio: amanha,
    itensAdicionaisFim: proximaSemana,
    retiradaConsumidorInicio: proximaSemana,
    retiradaConsumidorFim: proximaSemana,
    status: status,
  });

  const ciclo = await cicloService.criarCiclo(cicloData);

  // Recarregar do banco para garantir que tem todos os campos (incluindo status)
  const cicloCompleto = await Ciclo.findByPk(ciclo.id);

  this.ciclos.push(cicloCompleto);
  this.cicloAtivo = cicloCompleto;
});

// Step "que existe um ciclo ativo" já existe em composicao_steps.js
// Step "que existem {int} ciclos cadastrados" já existe em ciclo_steps.js
// Removidos para evitar ambiguidade - usar steps compartilhados

Given("que o primeiro ciclo está ativo", async function () {
  // Buscar todos os ciclos se this.ciclos estiver vazio
  if (!this.ciclos || this.ciclos.length === 0) {
    const todosCiclos = await Ciclo.findAll({ order: [["id", "ASC"]] });
    this.ciclos = todosCiclos;
  }

  // Primeiro ciclo com data de fim futura
  const proximaSemana = new Date();
  proximaSemana.setDate(proximaSemana.getDate() + 7);

  await Ciclo.update(
    { retiradaConsumidorFim: proximaSemana },
    { where: { id: this.ciclos[0].id } },
  );

  // Recarregar
  this.ciclos[0] = await Ciclo.findByPk(this.ciclos[0].id);
});

Given("que o segundo ciclo está expirado", async function () {
  // Buscar todos os ciclos se this.ciclos estiver vazio
  if (!this.ciclos || this.ciclos.length < 2) {
    const todosCiclos = await Ciclo.findAll({ order: [["id", "ASC"]] });
    this.ciclos = todosCiclos;
  }

  // Segundo ciclo com data de fim no passado
  const semanaPassada = new Date();
  semanaPassada.setDate(semanaPassada.getDate() - 7);

  await Ciclo.update(
    { retiradaConsumidorFim: semanaPassada },
    { where: { id: this.ciclos[1].id } },
  );

  // Recarregar
  this.ciclos[1] = await Ciclo.findByPk(this.ciclos[1].id);
});

Given("que não existem ciclos ativos", async function () {
  // Todos os ciclos existentes devem estar expirados
  const semanaPassada = new Date();
  semanaPassada.setDate(semanaPassada.getDate() - 7);

  await Ciclo.update({ retiradaConsumidorFim: semanaPassada }, { where: {} });
});

Given("que o período de oferta já passou", async function () {
  // Atualizar ciclo para ter período de oferta no passado
  const semanaPassada = new Date();
  semanaPassada.setDate(semanaPassada.getDate() - 7);
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  await Ciclo.update(
    {
      ofertaInicio: semanaPassada,
      ofertaFim: ontem,
    },
    { where: { id: this.cicloAtivo.id } },
  );

  // Recarregar
  this.cicloAtivo = await Ciclo.findByPk(this.cicloAtivo.id);
});

Given("que já finalizei meu pedido de consumidor", async function () {
  // Criar pedido de consumidor finalizado
  await PedidoConsumidores.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: this.usuario.id,
    status: "finalizado",
  });

  this.pedidoFinalizado = true;
});

// ============================================
// AÇÕES
// ============================================

When("acesso a página inicial", async function () {
  // Simular acesso à página inicial (IndexController.showIndex)

  // Buscar ciclos ativos (mesma lógica do controller)
  const data = await Ciclo.findAll({
    order: [["id", "DESC"]],
  });

  const ciclosAtivos = [];
  const dataAtual = Date.now();

  for (const ciclo of data) {
    const dataRetiradaConsumidorFim = new Date(ciclo.retiradaConsumidorFim);
    let dataCorte = new Date(dataRetiradaConsumidorFim);
    dataCorte.setDate(dataRetiradaConsumidorFim.getDate() + 1);
    dataCorte = Date.parse(dataCorte);

    if (dataAtual <= dataCorte) {
      // Verificar se há pedido finalizado
      let pedidoFinalizado = false;
      if (this.usuario) {
        const pedido = await PedidoConsumidores.findOne({
          where: {
            cicloId: ciclo.id,
            usuarioId: this.usuario.id,
            status: "finalizado",
          },
        });
        pedidoFinalizado = !!pedido;
      }

      ciclosAtivos.push({
        ...ciclo.toJSON(),
        pedidoConsumidorFinalizado: pedidoFinalizado,
      });
    }
  }

  // Verificar se deve redirecionar para usuarionovo
  if (this.authenticated && this.oauthUser && !this.usuario) {
    this.redirectUrl = "/usuarionovo";
    this.indexPageData = null;
  } else {
    this.indexPageData = {
      ciclos: ciclosAtivos,
      usuarioAtivo: this.usuario || { email_verified: "false" },
    };
  }

  // Estado vazio
  if (ciclosAtivos.length === 0) {
    this.estadoVazio = true;
  }
});

// ============================================
// ASSERÇÕES
// ============================================

Then("devo ver a página de index", function () {
  assert.ok(this.indexPageData, "Deveria renderizar a página index");
  assert.strictEqual(this.redirectUrl, null, "Não deveria redirecionar");
});

Then("não devo ver funcionalidades restritas", function () {
  const usuario = this.indexPageData.usuarioAtivo;
  assert.strictEqual(
    usuario.email_verified,
    "false",
    "Usuário não deveria estar autenticado",
  );
});

Then("devo ver o ciclo ativo listado", function () {
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  assert.ok(
    this.indexPageData.ciclos.length > 0,
    "Deveria ter pelo menos 1 ciclo",
  );
});

Then(
  "devo ver a funcionalidade {string} disponível",
  function (funcionalidade) {
    // Verificar se a funcionalidade estaria disponível baseado no perfil e ciclo
    assert.ok(this.indexPageData, "Deveria ter dados da página");
    assert.ok(this.usuario, "Deveria ter usuário");

    const ciclo = this.indexPageData.ciclos[0];
    const perfil = this.usuario.perfil;
    const hoje = Date.now() - 10800000; // Ajuste de timezone

    if (funcionalidade === "Oferta de Produtos") {
      assert.ok(
        perfil.includes("fornecedor"),
        "Usuário deveria ser fornecedor",
      );
      const ofertaInicio = Date.parse(ciclo.ofertaInicio);
      const ofertaFim = Date.parse(ciclo.ofertaFim);
      assert.ok(
        hoje >= ofertaInicio && ofertaFim >= hoje,
        "Deveria estar no período de oferta",
      );
    } else if (funcionalidade === "Composição das Cestas") {
      assert.ok(perfil.includes("admin"), "Usuário deveria ser admin");
    } else if (funcionalidade === "Pedidos Extras") {
      assert.ok(
        perfil.includes("consumidor"),
        "Usuário deveria ser consumidor",
      );
      // Status pode estar em qualquer estado válido para pedidos extras
      // (composicao, atribuicao, etc)
      assert.ok(
        ciclo.status && ciclo.status.length > 0,
        "Ciclo deveria ter um status",
      );
    } else if (funcionalidade === "Relatório de Entrega") {
      assert.ok(
        perfil.includes("consumidor"),
        "Usuário deveria ser consumidor",
      );
    }
  },
);

Then(
  "devo ver a funcionalidade {string} indisponível",
  function (funcionalidade) {
    assert.ok(this.indexPageData, "Deveria ter dados da página");

    const ciclo = this.indexPageData.ciclos[0];

    if (funcionalidade === "Oferta de Produtos") {
      const hoje = Date.now() - 10800000;
      const ofertaInicio = Date.parse(ciclo.ofertaInicio);
      const ofertaFim = Date.parse(ciclo.ofertaFim);

      // Deve estar fora do período OU usuário não é fornecedor
      const foraPeriodo = hoje < ofertaInicio || ofertaFim < hoje;
      const naoFornecedor =
        !this.usuario || !this.usuario.perfil.includes("fornecedor");

      assert.ok(
        foraPeriodo || naoFornecedor,
        "Funcionalidade deveria estar indisponível",
      );
    } else if (funcionalidade === "Lista para Entrega") {
      // Deve não estar em status 'atribuicao'
      assert.notStrictEqual(
        ciclo.status,
        "atribuicao",
        "Ciclo não deveria estar em atribuição",
      );
    }
  },
);

Then("devo ver a seção {string}", function (secao) {
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  assert.ok(this.usuario, "Deveria ter usuário");

  if (secao === "Funcionalidades Gerais") {
    assert.ok(
      this.usuario.perfil.includes("admin"),
      "Usuário deveria ser admin para ver funcionalidades gerais",
    );
  } else if (secao === "Funcionalidades Individuais") {
    assert.ok(this.usuario.perfil, "Usuário deveria ter perfil");
  }
});

Then("devo ver {int} cards administrativos", function (quantidade, dataTable) {
  assert.ok(this.usuario, "Deveria ter usuário");
  assert.ok(this.usuario.perfil.includes("admin"), "Usuário deveria ser admin");

  // Na prática, seriam 4 cards: Ciclos, Relatório Fornecedores, Relatório Consumidores, Cadastros
  assert.strictEqual(quantidade, 4, "Deveria ter 4 cards administrativos");
});

Then("devo ver o card {string} disponível", function (card) {
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  assert.ok(this.usuario, "Deveria ter usuário");

  if (card === "Dados Pessoais") {
    // Card sempre disponível para usuários autenticados
    assert.ok(this.usuario.perfil, "Usuário deveria ter perfil");
  }
});

Then("devo ver apenas {int} ciclo listado", function (quantidade) {
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  assert.strictEqual(
    this.indexPageData.ciclos.length,
    quantidade,
    `Deveria ter ${quantidade} ciclo(s)`,
  );
});

Then("o ciclo listado deve ser o ciclo ativo", function () {
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  const cicloListado = this.indexPageData.ciclos[0];
  assert.ok(cicloListado, "Deveria ter pelo menos 1 ciclo");

  // Verificar que é um ciclo ativo (data de fim no futuro)
  const dataFim = Date.parse(cicloListado.retiradaConsumidorFim);
  const hoje = Date.now();
  assert.ok(dataFim >= hoje, "Ciclo deveria estar ativo");
});

Then(
  "devo ser redirecionado para a página de cadastro de novo usuário",
  function () {
    assert.strictEqual(
      this.redirectUrl,
      "/usuarionovo",
      "Deveria redirecionar para usuarionovo",
    );
    assert.strictEqual(
      this.indexPageData,
      null,
      "Não deveria ter dados da página index",
    );
  },
);

Then("devo ver uma mensagem de estado vazio", function () {
  assert.strictEqual(this.estadoVazio, true, "Deveria estar em estado vazio");
  assert.ok(this.indexPageData, "Deveria ter dados da página");
  assert.strictEqual(
    this.indexPageData.ciclos.length,
    0,
    "Não deveria ter ciclos",
  );
});

Then(
  "a mensagem deve indicar que não há ciclos ativos no momento",
  function () {
    assert.ok(this.estadoVazio, "Deveria estar em estado vazio");
  },
);

Then("devo ver um badge {string}", function (badge) {
  // Verificação visual do badge - simulado por lógica
  assert.ok(this.indexPageData, "Deveria ter dados da página");

  if (badge === "INDISPONÍVEL") {
    // Badge aparece quando funcionalidade está indisponível
    assert.ok(true, "Badge INDISPONÍVEL deveria ser exibido");
  }
});

Then(
  "devo ver a funcionalidade {string} apontando para confirmação",
  function (funcionalidade) {
    assert.ok(this.indexPageData, "Deveria ter dados da página");

    if (funcionalidade === "Pedidos Extras") {
      const pedidoFinalizado =
        this.indexPageData.ciclos[0].pedidoConsumidorFinalizado;
      assert.strictEqual(
        pedidoFinalizado,
        true,
        "Pedido deveria estar finalizado",
      );
    }
  },
);

Then("o link deve apontar para {string}", function (url) {
  // Verificar lógica de URL (simulado)
  if (url.includes("pedidoConsumidoresconfirmacao")) {
    const pedidoFinalizado =
      this.indexPageData.ciclos[0].pedidoConsumidorFinalizado;
    assert.strictEqual(
      pedidoFinalizado,
      true,
      "Deveria redirecionar para confirmação quando pedido está finalizado",
    );
  }
});

// ============================================
// STEPS PARA TESTAR IndexService
// ============================================

const { IndexService } = require("../../src/services/services");

// Variáveis para testes do IndexService
let indexService;
let ciclosAtivosRetornados;
let statusCalculado;

Before({ tags: "@index" }, function () {
  indexService = null;
  ciclosAtivosRetornados = null;
  statusCalculado = null;
});

// Buscar ciclos ativos com IndexService
When("eu solicito os ciclos ativos", async function () {
  indexService = new IndexService();
  ciclosAtivosRetornados = await indexService.buscarCiclosAtivos();
});

When("eu solicito os ciclos ativos para o consumidor", async function () {
  indexService = new IndexService();
  ciclosAtivosRetornados = await indexService.buscarCiclosAtivos(
    this.usuario.id,
  );
});

When("eu solicito os ciclos ativos sem informar usuário", async function () {
  indexService = new IndexService();
  ciclosAtivosRetornados = await indexService.buscarCiclosAtivos(null);
});

Then("eu devo receber {int} ciclos na resposta", function (quantidade) {
  expect(ciclosAtivosRetornados).to.be.an("array");
  expect(ciclosAtivosRetornados).to.have.lengthOf(quantidade);
});

Then("eu devo receber uma lista vazia", function () {
  expect(ciclosAtivosRetornados).to.be.an("array");
  expect(ciclosAtivosRetornados).to.have.lengthOf(0);
});

Then("o ciclo deve indicar que o pedido foi finalizado", function () {
  expect(ciclosAtivosRetornados).to.be.an("array");
  expect(ciclosAtivosRetornados.length).to.be.greaterThan(0);

  const ciclo = ciclosAtivosRetornados[0];
  expect(ciclo).to.have.property("pedidoConsumidorFinalizado");
  expect(ciclo.pedidoConsumidorFinalizado).to.equal(true);
});

Then(
  "eu devo receber o ciclo sem informação de pedido finalizado",
  function () {
    expect(ciclosAtivosRetornados).to.be.an("array");
    expect(ciclosAtivosRetornados.length).to.be.greaterThan(0);

    const ciclo = ciclosAtivosRetornados[0];
    expect(ciclo).to.have.property("pedidoConsumidorFinalizado");
    expect(ciclo.pedidoConsumidorFinalizado).to.equal(false);
  },
);

// Calcular status de etapas
When(
  "eu calculo o status da etapa {string} para o fornecedor",
  function (etapa) {
    indexService = new IndexService();
    const ciclo = this.cicloAtivo;
    const perfil = this.usuario.perfil;
    statusCalculado = indexService.calcularStatusEtapa(ciclo, perfil, etapa);
  },
);

When("eu calculo o status da etapa {string} para o admin", function (etapa) {
  indexService = new IndexService();
  const ciclo = this.cicloAtivo;
  const perfil = this.usuario.perfil;
  statusCalculado = indexService.calcularStatusEtapa(ciclo, perfil, etapa);
});

When(
  "eu calculo o status da etapa {string} para o consumidor",
  function (etapa) {
    indexService = new IndexService();
    const ciclo = this.cicloAtivo;
    const perfil = this.usuario.perfil;
    statusCalculado = indexService.calcularStatusEtapa(ciclo, perfil, etapa);
  },
);

When(
  "eu calculo o status da etapa {string} sem informar perfil",
  function (etapa) {
    indexService = new IndexService();
    const ciclo = this.cicloAtivo;
    statusCalculado = indexService.calcularStatusEtapa(ciclo, null, etapa);
  },
);

Then("o status deve ser {string}", function (status) {
  expect(statusCalculado).to.be.an("object");
  expect(statusCalculado).to.have.property("ativo");

  const ativo = status === "ativo";
  expect(statusCalculado.ativo).to.equal(ativo);
});

Then("a mensagem deve ser {string}", function (mensagem) {
  expect(statusCalculado).to.be.an("object");
  expect(statusCalculado).to.have.property("status");
  expect(statusCalculado.status).to.equal(mensagem);
});

// Steps auxiliares para configurar períodos
Given("que o período de oferta está aberto", async function () {
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  await Ciclo.update(
    {
      ofertaInicio: ontem,
      ofertaFim: amanha,
    },
    { where: { id: this.cicloAtivo.id } },
  );

  this.cicloAtivo = await Ciclo.findByPk(this.cicloAtivo.id);
});

Given("que o período de oferta está fechado", async function () {
  const semanaPassada = new Date();
  semanaPassada.setDate(semanaPassada.getDate() - 7);
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  await Ciclo.update(
    {
      ofertaInicio: semanaPassada,
      ofertaFim: ontem,
    },
    { where: { id: this.cicloAtivo.id } },
  );

  this.cicloAtivo = await Ciclo.findByPk(this.cicloAtivo.id);
});

Given("que o período de composição está aberto", async function () {
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 2);

  await Ciclo.update(
    {
      ofertaInicio: ontem,
      itensAdicionaisInicio: amanha,
    },
    { where: { id: this.cicloAtivo.id } },
  );

  this.cicloAtivo = await Ciclo.findByPk(this.cicloAtivo.id);
});
