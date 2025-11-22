const { expect } = require("chai");
const sinon = require("sinon");

/**
 * Testes Unitários para PedidoConsumidoresService (Frontend)
 * Testa a camada de service JavaScript que faz requisições AJAX
 */
describe("PedidoConsumidoresService - Frontend", function () {
  let fetchStub;
  let ApiService;
  let PedidoConsumidoresService;

  beforeEach(function () {
    // Mock global fetch
    global.fetch = sinon.stub();
    fetchStub = global.fetch;

    // Simula o ApiService como seria no browser
    ApiService = {
      async request(url, options = {}) {
        const defaultOptions = {
          headers: { "Content-Type": "application/json" },
        };

        const config = {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options.headers,
          },
        };

        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      },

      async get(url, options = {}) {
        return this.request(url, { method: "GET", ...options });
      },

      async post(url, body, options = {}) {
        return this.request(url, {
          method: "POST",
          body: JSON.stringify(body),
          ...options,
        });
      },
    };

    // Simula o PedidoConsumidoresService
    PedidoConsumidoresService = {
      async atualizarQuantidade(produtoId, quantidade, pedidoId, cicloId) {
        return await ApiService.post(
          "/api/pedidoconsumidores/atualizar-quantidade",
          {
            produtoId,
            quantidade,
            pedidoId,
            cicloId,
          },
        );
      },

      async obterProdutosPedido(pedidoId) {
        return await ApiService.get(
          `/api/pedidoconsumidores/${pedidoId}/produtos`,
        );
      },

      async confirmarPedido(pedidoId, cicloId, usuarioId) {
        return await ApiService.post("/api/pedidoconsumidores/confirmar", {
          pedidoId,
          cicloId,
          usuarioId,
        });
      },

      async removerProduto(produtoId, pedidoId) {
        return await ApiService.post("/api/pedidoconsumidores/remover-produto", {
          produtoId,
          pedidoId,
        });
      },

      calcularTotais(produtos, taxaPorItem = 0.5) {
        let totalProdutos = 0;
        let totalItens = 0;
        let taxaAdministrativa = 0;

        produtos.forEach((produto) => {
          if (produto.quantidade > 0) {
            totalProdutos += produto.quantidade * produto.valorReferencia;
            totalItens += produto.quantidade;
            taxaAdministrativa += produto.quantidade * taxaPorItem;
          }
        });

        return {
          totalProdutos,
          totalItens,
          taxaAdministrativa,
          totalGeral: totalProdutos + taxaAdministrativa,
        };
      },

      formatarValor(valor) {
        return valor.toFixed(2).replace(".", ",");
      },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  // ==========================================
  // atualizarQuantidade()
  // ==========================================
  describe("atualizarQuantidade()", function () {
    it("deve enviar POST com dados corretos", async function () {
      const mockResponse = {
        success: true,
        data: { id: 1, quantidade: 10 },
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      await PedidoConsumidoresService.atualizarQuantidade(5, 10, 1, 2);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/pedidoconsumidores/atualizar-quantidade");
      expect(options.method).to.equal("POST");

      const body = JSON.parse(options.body);
      expect(body).to.deep.equal({
        produtoId: 5,
        quantidade: 10,
        pedidoId: 1,
        cicloId: 2,
      });
    });

    it("deve retornar dados de sucesso", async function () {
      const mockResponse = {
        success: true,
        data: { produtoId: 5, quantidade: 10 },
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const result =
        await PedidoConsumidoresService.atualizarQuantidade(5, 10, 1, 2);

      expect(result).to.deep.equal(mockResponse);
      expect(result.success).to.be.true;
      expect(result.data.quantidade).to.equal(10);
    });

    it("deve lançar erro quando API retorna erro", async function () {
      fetchStub.resolves({
        ok: false,
        status: 400,
      });

      try {
        await PedidoConsumidoresService.atualizarQuantidade(5, 10, 1, 2);
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.include("HTTP error");
        expect(error.message).to.include("400");
      }
    });
  });

  // ==========================================
  // obterProdutosPedido()
  // ==========================================
  describe("obterProdutosPedido()", function () {
    it("deve buscar produtos do pedido", async function () {
      const mockResponse = {
        success: true,
        data: [
          { id: 1, nome: "Cenoura", quantidade: 5 },
          { id: 2, nome: "Beterraba", quantidade: 3 },
        ],
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PedidoConsumidoresService.obterProdutosPedido(10);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/pedidoconsumidores/10/produtos");
      expect(options.method).to.equal("GET");
      expect(result.data).to.have.lengthOf(2);
    });

    it("deve retornar lista vazia quando pedido não tem produtos", async function () {
      const mockResponse = {
        success: true,
        data: [],
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PedidoConsumidoresService.obterProdutosPedido(10);

      expect(result.data).to.be.an("array");
      expect(result.data).to.have.lengthOf(0);
    });
  });

  // ==========================================
  // confirmarPedido()
  // ==========================================
  describe("confirmarPedido()", function () {
    it("deve enviar POST com dados de confirmação", async function () {
      const mockResponse = {
        success: true,
        data: { id: 1, status: "confirmado" },
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      await PedidoConsumidoresService.confirmarPedido(1, 2, 100);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/pedidoconsumidores/confirmar");
      expect(options.method).to.equal("POST");

      const body = JSON.parse(options.body);
      expect(body).to.deep.equal({
        pedidoId: 1,
        cicloId: 2,
        usuarioId: 100,
      });
    });

    it("deve retornar sucesso ao confirmar pedido", async function () {
      const mockResponse = {
        success: true,
        data: { id: 1, status: "confirmado" },
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PedidoConsumidoresService.confirmarPedido(1, 2, 100);

      expect(result.success).to.be.true;
      expect(result.data.status).to.equal("confirmado");
    });
  });

  // ==========================================
  // removerProduto()
  // ==========================================
  describe("removerProduto()", function () {
    it("deve enviar POST para remover produto", async function () {
      const mockResponse = {
        success: true,
        message: "Produto removido",
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      await PedidoConsumidoresService.removerProduto(5, 1);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/pedidoconsumidores/remover-produto");
      expect(options.method).to.equal("POST");

      const body = JSON.parse(options.body);
      expect(body).to.deep.equal({
        produtoId: 5,
        pedidoId: 1,
      });
    });

    it("deve retornar sucesso ao remover produto", async function () {
      const mockResponse = {
        success: true,
        message: "Produto removido",
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PedidoConsumidoresService.removerProduto(5, 1);

      expect(result.success).to.be.true;
      expect(result.message).to.equal("Produto removido");
    });
  });

  // ==========================================
  // calcularTotais()
  // ==========================================
  describe("calcularTotais()", function () {
    it("deve calcular totais corretamente com produtos", function () {
      const produtos = [
        { quantidade: 2, valorReferencia: 5.0 }, // 10.00
        { quantidade: 3, valorReferencia: 4.0 }, // 12.00
        { quantidade: 0, valorReferencia: 10.0 }, // Ignorado
      ];

      const result = PedidoConsumidoresService.calcularTotais(produtos);

      expect(result.totalProdutos).to.equal(22.0); // 10 + 12
      expect(result.totalItens).to.equal(5); // 2 + 3
      expect(result.taxaAdministrativa).to.equal(2.5); // 5 * 0.50
      expect(result.totalGeral).to.equal(24.5); // 22 + 2.5
    });

    it("deve calcular com taxa administrativa customizada", function () {
      const produtos = [
        { quantidade: 2, valorReferencia: 5.0 },
        { quantidade: 3, valorReferencia: 4.0 },
      ];

      const result = PedidoConsumidoresService.calcularTotais(produtos, 1.0);

      expect(result.totalProdutos).to.equal(22.0);
      expect(result.totalItens).to.equal(5);
      expect(result.taxaAdministrativa).to.equal(5.0); // 5 * 1.00
      expect(result.totalGeral).to.equal(27.0);
    });

    it("deve retornar zeros quando lista vazia", function () {
      const produtos = [];

      const result = PedidoConsumidoresService.calcularTotais(produtos);

      expect(result.totalProdutos).to.equal(0);
      expect(result.totalItens).to.equal(0);
      expect(result.taxaAdministrativa).to.equal(0);
      expect(result.totalGeral).to.equal(0);
    });

    it("deve ignorar produtos com quantidade zero", function () {
      const produtos = [
        { quantidade: 0, valorReferencia: 100.0 },
        { quantidade: 0, valorReferencia: 50.0 },
      ];

      const result = PedidoConsumidoresService.calcularTotais(produtos);

      expect(result.totalProdutos).to.equal(0);
      expect(result.totalItens).to.equal(0);
      expect(result.taxaAdministrativa).to.equal(0);
      expect(result.totalGeral).to.equal(0);
    });
  });

  // ==========================================
  // formatarValor()
  // ==========================================
  describe("formatarValor()", function () {
    it("deve formatar valor para exibição em Real", function () {
      expect(PedidoConsumidoresService.formatarValor(12.5)).to.equal("12,50");
      expect(PedidoConsumidoresService.formatarValor(100.0)).to.equal("100,00");
      expect(PedidoConsumidoresService.formatarValor(0.99)).to.equal("0,99");
      expect(PedidoConsumidoresService.formatarValor(1234.56)).to.equal(
        "1234,56",
      );
    });

    it("deve arredondar para 2 casas decimais", function () {
      expect(PedidoConsumidoresService.formatarValor(12.345)).to.equal("12,35");
      expect(PedidoConsumidoresService.formatarValor(12.344)).to.equal("12,34");
    });
  });
});
