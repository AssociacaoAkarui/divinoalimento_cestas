const {
  Given,
  When,
  Then,
  Before,
  setWorldConstructor,
} = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  PedidoConsumidoresFactory,
  UsuarioFactory,
  ProdutoFactory,
  PedidoConsumidoresProdutosFactory,
} = require("./support/factories");
const { PedidoConsumidoresService } = require("../../src/services/services");
const ServiceError = require("../../src/utils/ServiceError");

let novoPedido = {};
let pedidoCriado;
let usuarioCriado;
let pedidoAtual;
let produtoCriado;
let produtosCriados = [];
let pedidoProdutoCriado;
let detalhes;
let produtosDoPedido;
let valorTotal;
let pedidosDoConsumidor;
let pedidosDoCiclo;

// Reset variables before each scenario
Before({ tags: "@pedidoconsumidores" }, function () {
  novoPedido = {};
  pedidoCriado = null;
  usuarioCriado = null;
  pedidoAtual = null;
  produtoCriado = null;
  produtosCriados = [];
  pedidoProdutoCriado = null;
  detalhes = null;
  produtosDoPedido = null;
  valorTotal = null;
  pedidosDoConsumidor = null;
  pedidosDoCiclo = null;
});

Given("que existe um usuário consumidor cadastrado", async function () {
  const { Usuario } = require("../../models");
  const usuarioData = UsuarioFactory.create("consumidor");
  usuarioCriado = await Usuario.create(usuarioData);
});

When("eu crio um novo pedido para o consumidor no ciclo", function () {
  novoPedido = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
  });
});

When("o status do pedido como {string}", function (status) {
  novoPedido.status = status;
});

When("eu salvo o novo pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  pedidoCriado =
    await pedidoConsumidoresService.criarPedidoConsumidor(novoPedido);
});

Then("o pedido deve ser criado com sucesso", function () {
  expect(pedidoCriado).to.be.an("object");
  expect(pedidoCriado.cicloId).to.equal(novoPedido.cicloId);
  expect(pedidoCriado.usuarioId).to.equal(novoPedido.usuarioId);
  expect(pedidoCriado.status).to.equal(novoPedido.status);
});

// PDC-02: Ver detalhes de um pedido
Given("que existe um pedido cadastrado para um consumidor", async function () {
  const { Usuario } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar usuário se não existir
  if (!usuarioCriado) {
    const usuarioData = UsuarioFactory.create("consumidor");
    usuarioCriado = await Usuario.create(usuarioData);
  }

  // Criar pedido
  const pedidoData = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
    status: "ativo",
  });

  pedidoAtual =
    await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);
});

When("eu solicito os detalhes do pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  detalhes = await pedidoConsumidoresService.buscarPedidoPorId(pedidoAtual.id);
});

Then(
  "eu devo ver os detalhes do pedido incluindo consumidor e ciclo",
  function () {
    expect(detalhes).to.be.an("object");
    expect(detalhes.id).to.equal(pedidoAtual.id);
    expect(detalhes.Usuario).to.exist;
    expect(detalhes.Usuario.id).to.equal(usuarioCriado.id);
    expect(detalhes.Ciclo).to.exist;
    expect(detalhes.Ciclo.id).to.equal(this.cicloAtivo.id);
  },
);

// PDC-03: Adicionar produto a um pedido
Given("que existe um pedido ativo de um consumidor", async function () {
  const { Usuario } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar usuário se não existir
  if (!usuarioCriado) {
    const usuarioData = UsuarioFactory.create("consumidor");
    usuarioCriado = await Usuario.create(usuarioData);
  }

  // Criar pedido
  const pedidoData = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
    status: "ativo",
  });

  pedidoAtual =
    await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);
});

Given(
  "que existe um produto {string} disponível para compra",
  async function (nomeProduto) {
    const { Produto } = require("../../models");

    const produtoData = ProdutoFactory.create({
      nome: nomeProduto,
      status: "ativo",
    });

    produtoCriado = await Produto.create(produtoData);
  },
);

When("eu adiciono o produto {string} ao pedido", function (nomeProduto) {
  // Produto já foi criado no Given anterior
  // Quantidade será definida no step "defino a quantidade como {int}" (compartilhado com oferta_steps.js)
});

// Step "defino a quantidade como {int}" já está definido em oferta_steps.js
// Ele define this.quantidadeAdicionada

When("eu salvo o produto no pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  pedidoProdutoCriado =
    await pedidoConsumidoresService.adicionarProdutoAoPedido(
      pedidoAtual.id,
      produtoCriado.id,
      this.quantidadeAdicionada, // Usa a variável do step compartilhado
      produtoCriado.valorReferencia,
      produtoCriado.valorReferencia,
    );
});

Then(
  "o produto {string} deve estar no pedido com quantidade {int}",
  async function (nomeProduto, quantidade) {
    const { PedidoConsumidoresProdutos } = require("../../models");

    const produtoNoPedido = await PedidoConsumidoresProdutos.findOne({
      where: {
        pedidoConsumidorId: pedidoAtual.id,
        produtoId: produtoCriado.id,
      },
    });

    expect(produtoNoPedido).to.exist;
    expect(produtoNoPedido.quantidade).to.equal(quantidade);
  },
);

// PDC-04: Atualizar quantidade de produto
Given(
  "que existe um pedido com produto {string} e quantidade {int}",
  async function (nomeProduto, quantidade) {
    const {
      Usuario,
      Produto,
      PedidoConsumidoresProdutos,
    } = require("../../models");
    const pedidoConsumidoresService = new PedidoConsumidoresService();

    // Criar usuário se não existir
    if (!usuarioCriado) {
      const usuarioData = UsuarioFactory.create("consumidor");
      usuarioCriado = await Usuario.create(usuarioData);
    }

    // Criar pedido
    const pedidoData = PedidoConsumidoresFactory.create({
      cicloId: this.cicloAtivo.id,
      usuarioId: usuarioCriado.id,
      status: "ativo",
    });
    pedidoAtual =
      await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);

    // Criar produto
    const produtoData = ProdutoFactory.create({
      nome: nomeProduto,
      status: "ativo",
    });
    produtoCriado = await Produto.create(produtoData);

    // Adicionar produto ao pedido
    const pedidoProdutoData = PedidoConsumidoresProdutosFactory.create({
      pedidoConsumidorId: pedidoAtual.id,
      produtoId: produtoCriado.id,
      quantidade: quantidade,
      valorOferta: produtoCriado.valorReferencia,
      valorCompra: produtoCriado.valorReferencia,
    });
    await PedidoConsumidoresProdutos.create(pedidoProdutoData);
  },
);

// Step "eu edito a quantidade para {int}" já está definido em oferta_steps.js
// Ele define this.novaQuantidade

When("salvo as alterações do pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Se tem produto e quantidade, é atualização de quantidade
  if (produtoCriado && this.novaQuantidade !== undefined) {
    await pedidoConsumidoresService.atualizarQuantidadeProduto(
      pedidoAtual.id,
      produtoCriado.id,
      this.novaQuantidade,
    );
  }
  // Se tem novo status, é atualização de status
  if (this.novoStatus) {
    await pedidoConsumidoresService.atualizarStatusPedido(
      pedidoAtual.id,
      this.novoStatus,
    );
  }
});

Then(
  "a quantidade de {string} no pedido deve ser {int}",
  async function (nomeProduto, quantidadeEsperada) {
    const { PedidoConsumidoresProdutos } = require("../../models");

    const produtoNoPedido = await PedidoConsumidoresProdutos.findOne({
      where: {
        pedidoConsumidorId: pedidoAtual.id,
        produtoId: produtoCriado.id,
      },
    });

    expect(produtoNoPedido).to.exist;
    expect(produtoNoPedido.quantidade).to.equal(quantidadeEsperada);
  },
);

// PDC-05: Calcular valor total do pedido
Given("que existe um pedido com produtos", async function () {
  const { Usuario } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar usuário se não existir
  if (!usuarioCriado) {
    const usuarioData = UsuarioFactory.create("consumidor");
    usuarioCriado = await Usuario.create(usuarioData);
  }

  // Criar pedido
  const pedidoData = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
    status: "ativo",
  });
  pedidoAtual =
    await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);

  // Resetar array de produtos
  produtosCriados = [];
});

Given(
  "o produto {string} tem quantidade {int} e valor {float}",
  async function (nomeProduto, quantidade, valor) {
    const { Produto, PedidoConsumidoresProdutos } = require("../../models");

    // Criar produto
    const produtoData = ProdutoFactory.create({
      nome: nomeProduto,
      status: "ativo",
      valorReferencia: valor,
    });
    const produto = await Produto.create(produtoData);
    produtosCriados.push(produto);

    // Adicionar produto ao pedido
    const pedidoProdutoData = PedidoConsumidoresProdutosFactory.create({
      pedidoConsumidorId: pedidoAtual.id,
      produtoId: produto.id,
      quantidade: quantidade,
      valorOferta: valor,
      valorCompra: valor,
    });
    await PedidoConsumidoresProdutos.create(pedidoProdutoData);
  },
);

When("eu calculo o valor total do pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  valorTotal = await pedidoConsumidoresService.calcularValorTotalPedido(
    pedidoAtual.id,
  );
});

Then("o valor total deve ser {float}", function (valorEsperado) {
  expect(valorTotal).to.equal(valorEsperado);
});

// PDC-06: Atualizar status do pedido
Given("que existe um pedido com status {string}", async function (status) {
  const { Usuario } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar usuário se não existir
  if (!usuarioCriado) {
    const usuarioData = UsuarioFactory.create("consumidor");
    usuarioCriado = await Usuario.create(usuarioData);
  }

  // Criar pedido com status específico
  const pedidoData = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
    status: status,
  });
  pedidoAtual =
    await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);
});

When("eu edito o status do pedido para {string}", function (novoStatus) {
  this.novoStatus = novoStatus;
});

Then("o status do pedido deve ser {string}", async function (statusEsperado) {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  const pedidoAtualizado = await pedidoConsumidoresService.buscarPedidoPorId(
    pedidoAtual.id,
  );

  expect(pedidoAtualizado.status).to.equal(statusEsperado);
});

// PDC-07: Listar pedido de um consumidor
Given("que um consumidor possui pedido", async function () {
  const {
    Usuario,
    Produto,
    PedidoConsumidoresProdutos,
  } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar usuário se não existir
  if (!usuarioCriado) {
    const usuarioData = UsuarioFactory.create("consumidor");
    usuarioCriado = await Usuario.create(usuarioData);
  }

  // Criar pedido
  const pedidoData = PedidoConsumidoresFactory.create({
    cicloId: this.cicloAtivo.id,
    usuarioId: usuarioCriado.id,
    status: "ativo",
  });
  pedidoAtual =
    await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);

  // Criar alguns produtos e adicionar ao pedido
  produtosCriados = [];
  for (let i = 0; i < 3; i++) {
    const produtoData = ProdutoFactory.create({ status: "ativo" });
    const produto = await Produto.create(produtoData);
    produtosCriados.push(produto);

    const pedidoProdutoData = PedidoConsumidoresProdutosFactory.create({
      pedidoConsumidorId: pedidoAtual.id,
      produtoId: produto.id,
    });
    await PedidoConsumidoresProdutos.create(pedidoProdutoData);
  }
});

When("eu solicito o pedido do consumidor", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  pedidosDoConsumidor =
    await pedidoConsumidoresService.listarPedidosDoConsumidor(
      usuarioCriado.id,
      this.cicloAtivo.id,
    );
});

Then(
  "eu devo ver todos os produtos e quantidades pedidos do consumidor",
  function () {
    expect(pedidosDoConsumidor).to.be.an("array");
    expect(pedidosDoConsumidor).to.have.lengthOf.at.least(1);

    const pedido = pedidosDoConsumidor[0];
    expect(pedido.pedidoConsumidoresProdutos).to.be.an("array");
    expect(pedido.pedidoConsumidoresProdutos).to.have.lengthOf(3);

    // Verificar que cada produto tem as informações necessárias
    pedido.pedidoConsumidoresProdutos.forEach((item) => {
      expect(item.quantidade).to.exist;
      expect(item.produto).to.exist;
      expect(item.produto.nome).to.exist;
    });
  },
);

// PDC-08: Listar todos os pedidos de um ciclo
Given("que existem múltiplos pedidos em um ciclo", async function () {
  const {
    Usuario,
    Produto,
    PedidoConsumidoresProdutos,
  } = require("../../models");
  const pedidoConsumidoresService = new PedidoConsumidoresService();

  // Criar 3 usuários diferentes
  const usuarios = [];
  for (let i = 0; i < 3; i++) {
    const usuarioData = UsuarioFactory.create("consumidor");
    const usuario = await Usuario.create(usuarioData);
    usuarios.push(usuario);

    // Criar pedido para cada usuário
    const pedidoData = PedidoConsumidoresFactory.create({
      cicloId: this.cicloAtivo.id,
      usuarioId: usuario.id,
      status: "ativo",
    });
    const pedido =
      await pedidoConsumidoresService.criarPedidoConsumidor(pedidoData);

    // Adicionar alguns produtos ao pedido
    for (let j = 0; j < 2; j++) {
      const produtoData = ProdutoFactory.create({ status: "ativo" });
      const produto = await Produto.create(produtoData);

      const pedidoProdutoData = PedidoConsumidoresProdutosFactory.create({
        pedidoConsumidorId: pedido.id,
        produtoId: produto.id,
      });
      await PedidoConsumidoresProdutos.create(pedidoProdutoData);
    }
  }
});

When("eu solicito todos os pedidos do ciclo", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  pedidosDoCiclo = await pedidoConsumidoresService.listarPedidosDoCiclo(
    this.cicloAtivo.id,
  );
});

Then("eu devo ver todos os pedidos associados ao ciclo", function () {
  expect(pedidosDoCiclo).to.be.an("array");
  expect(pedidosDoCiclo).to.have.lengthOf.at.least(3);

  // Verificar que cada pedido tem usuário e produtos
  pedidosDoCiclo.forEach((pedido) => {
    expect(pedido.Usuario).to.exist;
    expect(pedido.Usuario.nome).to.exist;
    expect(pedido.pedidoConsumidoresProdutos).to.be.an("array");
    expect(pedido.pedidoConsumidoresProdutos.length).to.be.at.least(2);
  });
});

let pedidoBuscadoOuCriado;
let pedidoBuscadoNovamente;

When(
  "eu busco ou crio um pedido para o consumidor no ciclo",
  async function () {
    const pedidoConsumidoresService = new PedidoConsumidoresService();
    pedidoBuscadoOuCriado =
      await pedidoConsumidoresService.buscarOuCriarPedidoConsumidor(
        this.cicloAtivo.id,
        usuarioCriado.id,
      );
  },
);

Then("o pedido deve existir no sistema", function () {
  expect(pedidoBuscadoOuCriado).to.be.an("object");
  expect(pedidoBuscadoOuCriado.id).to.exist;
  expect(pedidoBuscadoOuCriado.cicloId).to.equal(this.cicloAtivo.id);
  expect(pedidoBuscadoOuCriado.usuarioId).to.equal(usuarioCriado.id);
});

When("eu busco ou crio novamente o mesmo pedido", async function () {
  const pedidoConsumidoresService = new PedidoConsumidoresService();
  pedidoBuscadoNovamente =
    await pedidoConsumidoresService.buscarOuCriarPedidoConsumidor(
      this.cicloAtivo.id,
      usuarioCriado.id,
    );
});

Then("deve retornar o pedido existente sem duplicar", function () {
  expect(pedidoBuscadoNovamente).to.be.an("object");
  expect(pedidoBuscadoNovamente.id).to.equal(pedidoBuscadoOuCriado.id);
  expect(pedidoBuscadoNovamente.cicloId).to.equal(
    pedidoBuscadoOuCriado.cicloId,
  );
  expect(pedidoBuscadoNovamente.usuarioId).to.equal(
    pedidoBuscadoOuCriado.usuarioId,
  );
});
