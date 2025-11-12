const {
  Given,
  When,
  Then,
  setWorldConstructor,
} = require("@cucumber/cucumber");
const { expect } = require("chai");
const {
  PedidoConsumidoresFactory,
  UsuarioFactory,
} = require("./support/factories");
const { PedidoConsumidoresService } = require("../../src/services/services");
const ServiceError = require("../../src/utils/ServiceError");

const pedidoConsumidoresService = new PedidoConsumidoresService();

let novoPedido = {};
let pedidoCriado;
let usuarioCriado;

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
  pedidoCriado =
    await pedidoConsumidoresService.criarPedidoConsumidor(novoPedido);
});

Then("o pedido deve ser criado com sucesso", function () {
  expect(pedidoCriado).to.be.an("object");
  expect(pedidoCriado.cicloId).to.equal(novoPedido.cicloId);
  expect(pedidoCriado.usuarioId).to.equal(novoPedido.usuarioId);
  expect(pedidoCriado.status).to.equal(novoPedido.status);
});

Given("que existe um pedido cadastrado para um consumidor", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("eu solicito os detalhes do pedido", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "eu devo ver os detalhes do pedido incluindo consumidor e ciclo",
  function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

Given("que existe um pedido ativo de um consumidor", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given(
  "que existe um produto {string} disponível para compra",
  function (string) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

When("eu adiciono o produto {string} ao pedido", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("eu salvo o produto no pedido", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "o produto {string} deve estar no pedido com quantidade {int}",
  function (string, int) {
    // Then('o produto {string} deve estar no pedido com quantidade {float}', function (string, float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

Given(
  "que existe um pedido com produto {string} e quantidade {int}",
  function (string, int) {
    // Given('que existe um pedido com produto {string} e quantidade {float}', function (string, float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

When("salvo as alterações do pedido", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "a quantidade de {string} no pedido deve ser {int}",
  function (string, int) {
    // Then('a quantidade de {string} no pedido deve ser {float}', function (string, float) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

Given("que existe um pedido com produtos", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given(
  "o produto {string} tem quantidade {int} e valor {float}",
  function (string, int, float) {
    // Given('o produto {string} tem quantidade {float} e valor {float}', function (string, float, float2) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

When("eu calculo o valor total do pedido", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("o valor total deve ser {float}", function (float) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given("que existe um pedido com status {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("eu edito o status do pedido para {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("o status do pedido deve ser {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given("que um consumidor possui pedido", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("eu solicito o pedido do consumidor", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "eu devo ver todos os produtos e quantidades pedidos do consumidor",
  function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  },
);

Given("que existem múltiplos pedidos em um ciclo", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("eu solicito todos os pedidos do ciclo", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("eu devo ver todos os pedidos associados ao ciclo", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
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
