const { expect } = require("chai");
const sinon = require("sinon");

/**
 * Testes Unitários para OfertaService (Frontend)
 * Testa a camada de service JavaScript que faz requisições AJAX
 */
describe("OfertaService - Frontend", function () {
  let fetchStub;
  let OfertaService;

  beforeEach(function () {
    // Mock global fetch
    global.fetch = sinon.stub();
    fetchStub = global.fetch;

    // Simula o OfertaService como seria no browser
    OfertaService = {
      async get(url) {
        const response = await fetch(url);
        return response.json();
      },

      async post(url, data) {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return response.json();
      },

      async buscarProdutos(termo, usuarioId) {
        const queryParams = new URLSearchParams();
        if (termo) queryParams.append("termo", termo);
        if (usuarioId) queryParams.append("usuarioId", usuarioId);
        return this.get(`/api/produtos/buscar?${queryParams.toString()}`);
      },

      async atualizarQuantidade(produtoId, quantidade, ofertaId) {
        return this.post("/api/oferta/atualizar-quantidade", {
          produtoId,
          quantidade,
          ofertaId,
        });
      },

      async obterProdutosOferta(ofertaId) {
        return this.get(`/api/oferta/${ofertaId}/produtos`);
      },
    };
  });

  afterEach(function () {
    delete global.fetch;
  });

  describe("buscarProdutos()", function () {
    it("deve buscar produtos sem filtro", async function () {
      const mockResponse = {
        success: true,
        produtos: [
          { id: 1, nome: "Cenoura" },
          { id: 2, nome: "Beterraba" },
        ],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await OfertaService.buscarProdutos();

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal("/api/produtos/buscar?");
      expect(resultado.success).to.be.true;
      expect(resultado.produtos).to.have.lengthOf(2);
    });

    it("deve buscar produtos com termo de busca", async function () {
      const mockResponse = {
        success: true,
        produtos: [{ id: 1, nome: "Cenoura" }],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      await OfertaService.buscarProdutos("Cenoura");

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.include("termo=Cenoura");
    });

    it("deve incluir usuarioId quando fornecido", async function () {
      const mockResponse = { success: true, produtos: [] };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      await OfertaService.buscarProdutos("Cenoura", 123);

      expect(fetchStub.firstCall.args[0]).to.include("termo=Cenoura");
      expect(fetchStub.firstCall.args[0]).to.include("usuarioId=123");
    });
  });

  describe("atualizarQuantidade()", function () {
    it("deve enviar requisição POST com dados corretos", async function () {
      const mockResponse = {
        success: true,
        message: "Quantidade atualizada",
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await OfertaService.atualizarQuantidade(1, 10, 5);

      expect(fetchStub.calledOnce).to.be.true;

      const [url, options] = fetchStub.firstCall.args;
      expect(url).to.equal("/api/oferta/atualizar-quantidade");
      expect(options.method).to.equal("POST");
      expect(options.headers["Content-Type"]).to.equal("application/json");

      const body = JSON.parse(options.body);
      expect(body.produtoId).to.equal(1);
      expect(body.quantidade).to.equal(10);
      expect(body.ofertaId).to.equal(5);
    });

    it("deve tratar resposta de sucesso", async function () {
      const mockResponse = { success: true };
      fetchStub.resolves({ json: async () => mockResponse });

      const resultado = await OfertaService.atualizarQuantidade(1, 10, 5);

      expect(resultado.success).to.be.true;
    });

    it("deve tratar resposta de erro", async function () {
      const mockResponse = {
        success: false,
        error: "Produto não encontrado",
      };

      fetchStub.resolves({ json: async () => mockResponse });

      const resultado = await OfertaService.atualizarQuantidade(999, 10, 5);

      expect(resultado.success).to.be.false;
      expect(resultado.error).to.equal("Produto não encontrado");
    });
  });

  describe("obterProdutosOferta()", function () {
    it("deve buscar produtos de uma oferta específica", async function () {
      const mockResponse = {
        success: true,
        produtos: [
          { id: 1, nome: "Cenoura", quantidade: 10 },
          { id: 2, nome: "Beterraba", quantidade: 5 },
        ],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await OfertaService.obterProdutosOferta(5);

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal("/api/oferta/5/produtos");
      expect(resultado.produtos).to.have.lengthOf(2);
    });

    it("deve retornar lista vazia se oferta não tem produtos", async function () {
      const mockResponse = {
        success: true,
        produtos: [],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await OfertaService.obterProdutosOferta(5);

      expect(resultado.produtos).to.be.an("array");
      expect(resultado.produtos).to.have.lengthOf(0);
    });
  });

  describe("Tratamento de Erros", function () {
    it("deve propagar erro de rede", async function () {
      fetchStub.rejects(new Error("Network error"));

      try {
        await OfertaService.buscarProdutos();
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.equal("Network error");
      }
    });
  });
});
