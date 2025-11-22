const { expect } = require("chai");
const sinon = require("sinon");

/**
 * Testes Unitários para ApiService (Frontend)
 * Testa a classe base para requisições HTTP
 */
describe("ApiService - Frontend", function () {
  let fetchStub;
  let consoleStub;
  let ApiService;

  beforeEach(function () {
    // Mock global fetch
    global.fetch = sinon.stub();
    fetchStub = global.fetch;

    // Mock console.error para não poluir output dos testes
    consoleStub = sinon.stub(console, "error");

    // Simula o ApiService como seria no browser
    ApiService = class {
      static async request(url, options = {}) {
        try {
          const defaultOptions = {
            headers: {
              "Content-Type": "application/json",
            },
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

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("API Request Error:", error);
          throw error;
        }
      }

      static async get(url, options = {}) {
        return this.request(url, {
          method: "GET",
          ...options,
        });
      }

      static async post(url, body, options = {}) {
        return this.request(url, {
          method: "POST",
          body: JSON.stringify(body),
          ...options,
        });
      }

      static async put(url, body, options = {}) {
        return this.request(url, {
          method: "PUT",
          body: JSON.stringify(body),
          ...options,
        });
      }

      static async delete(url, options = {}) {
        return this.request(url, {
          method: "DELETE",
          ...options,
        });
      }
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  // ==========================================
  // GET
  // ==========================================
  describe("get()", function () {
    it("deve fazer requisição GET com sucesso", async function () {
      const mockData = { success: true, data: [1, 2, 3] };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      const result = await ApiService.get("/api/test");

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/test");
      expect(options.method).to.equal("GET");
      expect(options.headers["Content-Type"]).to.equal("application/json");
      expect(result).to.deep.equal(mockData);
    });

    it("deve lançar erro quando resposta não é ok", async function () {
      fetchStub.resolves({
        ok: false,
        status: 404,
      });

      try {
        await ApiService.get("/api/not-found");
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.include("HTTP error");
        expect(error.message).to.include("404");
        expect(consoleStub.calledOnce).to.be.true;
      }
    });

    it("deve permitir headers customizados", async function () {
      const mockData = { success: true };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      await ApiService.get("/api/test", {
        headers: { Authorization: "Bearer token123" },
      });

      const [, options] = fetchStub.firstCall.args;

      expect(options.headers["Content-Type"]).to.equal("application/json");
      expect(options.headers["Authorization"]).to.equal("Bearer token123");
    });
  });

  // ==========================================
  // POST
  // ==========================================
  describe("post()", function () {
    it("deve fazer requisição POST com body JSON", async function () {
      const mockData = { success: true, id: 123 };
      const postData = { nome: "Produto", valor: 10 };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      const result = await ApiService.post("/api/test", postData);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/test");
      expect(options.method).to.equal("POST");
      expect(options.body).to.equal(JSON.stringify(postData));
      expect(result).to.deep.equal(mockData);
    });

    it("deve lançar erro quando POST falha", async function () {
      fetchStub.resolves({
        ok: false,
        status: 400,
      });

      try {
        await ApiService.post("/api/test", { data: "invalid" });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.include("HTTP error");
        expect(error.message).to.include("400");
      }
    });

    it("deve permitir options customizadas em POST", async function () {
      const mockData = { success: true };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      await ApiService.post(
        "/api/test",
        { data: "test" },
        {
          headers: { "X-Custom-Header": "value" },
        },
      );

      const [, options] = fetchStub.firstCall.args;

      expect(options.headers["X-Custom-Header"]).to.equal("value");
      expect(options.headers["Content-Type"]).to.equal("application/json");
    });
  });

  // ==========================================
  // PUT
  // ==========================================
  describe("put()", function () {
    it("deve fazer requisição PUT com body JSON", async function () {
      const mockData = { success: true, updated: true };
      const putData = { id: 1, nome: "Atualizado" };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      const result = await ApiService.put("/api/test/1", putData);

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/test/1");
      expect(options.method).to.equal("PUT");
      expect(options.body).to.equal(JSON.stringify(putData));
      expect(result).to.deep.equal(mockData);
    });

    it("deve lançar erro quando PUT falha", async function () {
      fetchStub.resolves({
        ok: false,
        status: 500,
      });

      try {
        await ApiService.put("/api/test/1", { data: "test" });
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.include("HTTP error");
        expect(error.message).to.include("500");
      }
    });
  });

  // ==========================================
  // DELETE
  // ==========================================
  describe("delete()", function () {
    it("deve fazer requisição DELETE com sucesso", async function () {
      const mockData = { success: true, deleted: true };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      const result = await ApiService.delete("/api/test/1");

      expect(fetchStub.calledOnce).to.be.true;
      const [url, options] = fetchStub.firstCall.args;

      expect(url).to.equal("/api/test/1");
      expect(options.method).to.equal("DELETE");
      expect(result).to.deep.equal(mockData);
    });

    it("deve lançar erro quando DELETE falha", async function () {
      fetchStub.resolves({
        ok: false,
        status: 403,
      });

      try {
        await ApiService.delete("/api/test/1");
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.include("HTTP error");
        expect(error.message).to.include("403");
      }
    });
  });

  // ==========================================
  // request() - Método Base
  // ==========================================
  describe("request() - método base", function () {
    it("deve mesclar headers padrão com customizados", async function () {
      const mockData = { success: true };

      fetchStub.resolves({
        ok: true,
        json: async () => mockData,
      });

      await ApiService.request("/api/test", {
        method: "GET",
        headers: {
          "X-Custom": "value",
          "Content-Type": "text/plain", // Sobrescreve padrão
        },
      });

      const [, options] = fetchStub.firstCall.args;

      expect(options.headers["X-Custom"]).to.equal("value");
      expect(options.headers["Content-Type"]).to.equal("text/plain");
    });

    it("deve logar erro no console quando falha", async function () {
      const mockError = new Error("Network error");

      fetchStub.rejects(mockError);

      try {
        await ApiService.request("/api/test");
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(consoleStub.calledOnce).to.be.true;
        expect(consoleStub.firstCall.args[0]).to.equal("API Request Error:");
        expect(consoleStub.firstCall.args[1]).to.equal(mockError);
      }
    });

    it("deve propagar erro após logar", async function () {
      const mockError = new Error("Fetch failed");

      fetchStub.rejects(mockError);

      try {
        await ApiService.request("/api/test");
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.equal("Fetch failed");
      }
    });
  });
});
