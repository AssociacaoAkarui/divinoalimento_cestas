const { expect } = require("chai");
const sinon = require("sinon");
const { JSDOM } = require("jsdom");

/**
 * Testes Unitários para IndexService (Frontend)
 * Testa a camada de service JavaScript que faz requisições AJAX para Index
 */
describe("IndexService - Frontend", function () {
  let fetchStub;
  let IndexService;
  let dom;
  let document;

  beforeEach(function () {
    // Mock global fetch
    global.fetch = sinon.stub();
    fetchStub = global.fetch;

    // Setup DOM virtual
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <body>
          <article class="action-card" data-ciclo-id="1" data-etapa="oferta">
            <a href="/oferta/1" class="card-link">Link Oferta</a>
            <span class="status-badge">INDISPONÍVEL</span>
          </article>
          <article class="action-card" data-ciclo-id="1" data-etapa="composicao">
            <a href="/composicao/2" class="card-link">Link Composicao</a>
            <span class="status-badge">INDISPONÍVEL</span>
          </article>
          <article class="action-card">
            <a href="/pedidoConsumidores/3" class="card-link">Link Pedidos</a>
            <span class="status-badge">INDISPONÍVEL</span>
          </article>
        </body>
      </html>
    `,
      { url: "http://localhost" },
    );
    document = dom.window.document;
    global.document = document;
    global.localStorage = dom.window.localStorage;

    // Simula o IndexService como seria no browser
    IndexService = {
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

      async buscarCiclosAtivos(usuarioId = null) {
        const queryParams = new URLSearchParams();
        if (usuarioId) queryParams.append("usuarioId", usuarioId);
        return this.get(`/api/index/ciclos-ativos?${queryParams.toString()}`);
      },

      async calcularStatusEtapa(ciclo, perfil, etapa) {
        return this.post("/api/index/calcular-status-etapa", {
          ciclo,
          perfil,
          etapa,
        });
      },

      async atualizarCardsEtapas(usuarioId, perfil) {
        try {
          const response = await this.buscarCiclosAtivos(usuarioId);

          if (response.success) {
            response.ciclos.forEach((ciclo) => {
              this._atualizarBadgeStatus(ciclo, perfil, "oferta");
              this._atualizarBadgeStatus(ciclo, perfil, "composicao");
            });
          }

          return response;
        } catch (error) {
          console.error("Erro ao atualizar cards:", error);
          throw error;
        }
      },

      async _atualizarBadgeStatus(ciclo, perfil, etapa) {
        const cardSelector = `[data-ciclo-id="${ciclo.id}"][data-etapa="${etapa}"]`;
        const card = document.querySelector(cardSelector);

        if (!card) return;

        const badge = card.querySelector(".status-badge");
        if (!badge) return;

        try {
          const response = await this.calcularStatusEtapa(ciclo, perfil, etapa);

          if (response.success) {
            const statusInfo = response.status;

            badge.classList.remove("active", "inactive");
            badge.classList.add(statusInfo.ativo ? "active" : "inactive");
            badge.textContent = statusInfo.status;

            card.classList.remove("active", "inactive");
            card.classList.add(statusInfo.ativo ? "active" : "inactive");
          }
        } catch (error) {
          console.error(`Erro ao atualizar badge ${etapa}:`, error);
        }
      },

      inicializarDataAttributes() {
        document.querySelectorAll(".action-card").forEach((card) => {
          const link = card.querySelector(".card-link");
          if (!link) return;

          const href = link.getAttribute("href");

          let etapa = "";
          if (href.includes("/oferta/")) etapa = "oferta";
          else if (href.includes("/composicao/")) etapa = "composicao";
          else if (href.includes("/pedidoConsumidores")) etapa = "pedidos";

          if (etapa) {
            const match = href.match(/\/(\d+)/);
            if (match) {
              card.setAttribute("data-ciclo-id", match[1]);
              card.setAttribute("data-etapa", etapa);
            }
          }
        });
      },
    };
  });

  afterEach(function () {
    delete global.fetch;
    delete global.document;
    delete global.localStorage;
    sinon.restore();
  });

  // ==========================================
  // TESTES: buscarCiclosAtivos()
  // ==========================================

  describe("buscarCiclosAtivos()", function () {
    it("deve buscar ciclos ativos sem usuário", async function () {
      const mockResponse = {
        success: true,
        ciclos: [
          { id: 1, nome: "Ciclo 1", pedidoConsumidorFinalizado: false },
          { id: 2, nome: "Ciclo 2", pedidoConsumidorFinalizado: false },
        ],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await IndexService.buscarCiclosAtivos();

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal("/api/index/ciclos-ativos?");
      expect(resultado.success).to.be.true;
      expect(resultado.ciclos).to.have.lengthOf(2);
    });

    it("deve buscar ciclos ativos com usuarioId", async function () {
      const mockResponse = {
        success: true,
        ciclos: [{ id: 1, nome: "Ciclo 1", pedidoConsumidorFinalizado: true }],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await IndexService.buscarCiclosAtivos(123);

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal(
        "/api/index/ciclos-ativos?usuarioId=123",
      );
      expect(resultado.success).to.be.true;
      expect(resultado.ciclos[0].pedidoConsumidorFinalizado).to.be.true;
    });

    it("deve retornar lista vazia quando não há ciclos", async function () {
      const mockResponse = {
        success: true,
        ciclos: [],
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await IndexService.buscarCiclosAtivos();

      expect(resultado.success).to.be.true;
      expect(resultado.ciclos).to.be.an("array");
      expect(resultado.ciclos).to.have.lengthOf(0);
    });

    it("deve construir query string corretamente sem usuário", async function () {
      fetchStub.resolves({
        json: async () => ({ success: true, ciclos: [] }),
      });

      await IndexService.buscarCiclosAtivos(null);

      const url = fetchStub.firstCall.args[0];
      expect(url).to.equal("/api/index/ciclos-ativos?");
    });
  });

  // ==========================================
  // TESTES: calcularStatusEtapa()
  // ==========================================

  describe("calcularStatusEtapa()", function () {
    it("deve calcular status de oferta disponível", async function () {
      const mockCiclo = {
        id: 1,
        nome: "Ciclo 1",
        status: "oferta",
        ofertaInicio: new Date(),
        ofertaFim: new Date(),
      };

      const mockResponse = {
        success: true,
        status: {
          ativo: true,
          status: "DISPONÍVEL",
        },
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await IndexService.calcularStatusEtapa(
        mockCiclo,
        "fornecedor",
        "oferta",
      );

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal(
        "/api/index/calcular-status-etapa",
      );
      expect(fetchStub.firstCall.args[1].method).to.equal("POST");

      const body = JSON.parse(fetchStub.firstCall.args[1].body);
      expect(body.ciclo.id).to.equal(mockCiclo.id);
      expect(body.ciclo.nome).to.equal(mockCiclo.nome);
      expect(body.ciclo.status).to.equal(mockCiclo.status);
      expect(body.perfil).to.equal("fornecedor");
      expect(body.etapa).to.equal("oferta");

      expect(resultado.success).to.be.true;
      expect(resultado.status.ativo).to.be.true;
      expect(resultado.status.status).to.equal("DISPONÍVEL");
    });

    it("deve calcular status de composição indisponível", async function () {
      const mockCiclo = { id: 1, status: "oferta" };

      const mockResponse = {
        success: true,
        status: {
          ativo: false,
          status: "INDISPONÍVEL",
        },
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      const resultado = await IndexService.calcularStatusEtapa(
        mockCiclo,
        "fornecedor",
        "composicao",
      );

      expect(resultado.success).to.be.true;
      expect(resultado.status.ativo).to.be.false;
      expect(resultado.status.status).to.equal("INDISPONÍVEL");
    });

    it("deve enviar todos os parâmetros no body do POST", async function () {
      const mockCiclo = { id: 1, status: "composicao" };

      fetchStub.resolves({
        json: async () => ({ success: true, status: {} }),
      });

      await IndexService.calcularStatusEtapa(mockCiclo, "admin", "composicao");

      const requestBody = JSON.parse(fetchStub.firstCall.args[1].body);
      expect(requestBody).to.have.property("ciclo");
      expect(requestBody).to.have.property("perfil");
      expect(requestBody).to.have.property("etapa");
      expect(requestBody.ciclo).to.deep.equal(mockCiclo);
      expect(requestBody.perfil).to.equal("admin");
      expect(requestBody.etapa).to.equal("composicao");
    });
  });

  // ==========================================
  // TESTES: inicializarDataAttributes()
  // ==========================================

  describe("inicializarDataAttributes()", function () {
    it("deve adicionar data-attributes para oferta", function () {
      IndexService.inicializarDataAttributes();

      const cards = document.querySelectorAll(".action-card");
      const ofertaCard = Array.from(cards).find(
        (c) => c.getAttribute("data-etapa") === "oferta",
      );

      expect(ofertaCard).to.exist;
      expect(ofertaCard.getAttribute("data-ciclo-id")).to.equal("1");
      expect(ofertaCard.getAttribute("data-etapa")).to.equal("oferta");
    });

    it("deve adicionar data-attributes para composicao", function () {
      IndexService.inicializarDataAttributes();

      const cards = document.querySelectorAll(".action-card");
      const composicaoCard = Array.from(cards).find(
        (c) => c.getAttribute("data-etapa") === "composicao",
      );

      expect(composicaoCard).to.exist;
      expect(composicaoCard.getAttribute("data-ciclo-id")).to.equal("2");
      expect(composicaoCard.getAttribute("data-etapa")).to.equal("composicao");
    });

    it("deve adicionar data-attributes para pedidos", function () {
      IndexService.inicializarDataAttributes();

      const cards = document.querySelectorAll(".action-card");
      const pedidosCard = Array.from(cards).find(
        (c) => c.getAttribute("data-etapa") === "pedidos",
      );

      expect(pedidosCard).to.exist;
      expect(pedidosCard.getAttribute("data-ciclo-id")).to.equal("3");
      expect(pedidosCard.getAttribute("data-etapa")).to.equal("pedidos");
    });

    it("deve processar múltiplos cards corretamente", function () {
      IndexService.inicializarDataAttributes();

      const cards = document.querySelectorAll(".action-card");
      const cardsComAtributos = Array.from(cards).filter((c) =>
        c.hasAttribute("data-ciclo-id"),
      );

      expect(cardsComAtributos).to.have.lengthOf(3);
    });

    it("não deve quebrar se card não tem link", function () {
      const cardSemLink = document.createElement("article");
      cardSemLink.className = "action-card";
      document.body.appendChild(cardSemLink);

      expect(() => IndexService.inicializarDataAttributes()).to.not.throw();
      expect(cardSemLink.hasAttribute("data-ciclo-id")).to.be.false;
    });
  });

  // ==========================================
  // TESTES: _atualizarBadgeStatus() (privado)
  // ==========================================

  describe("_atualizarBadgeStatus()", function () {
    it("deve atualizar badge para status ativo", async function () {
      const mockCiclo = { id: 1, status: "oferta" };
      const mockResponse = {
        success: true,
        status: {
          ativo: true,
          status: "DISPONÍVEL",
        },
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      await IndexService._atualizarBadgeStatus(
        mockCiclo,
        "fornecedor",
        "oferta",
      );

      const card = document.querySelector(
        '[data-ciclo-id="1"][data-etapa="oferta"]',
      );
      const badge = card.querySelector(".status-badge");

      expect(badge.classList.contains("active")).to.be.true;
      expect(badge.classList.contains("inactive")).to.be.false;
      expect(badge.textContent).to.equal("DISPONÍVEL");
      expect(card.classList.contains("active")).to.be.true;
    });

    it("deve atualizar badge para status inativo", async function () {
      const mockCiclo = { id: 1, status: "oferta" };
      const mockResponse = {
        success: true,
        status: {
          ativo: false,
          status: "INDISPONÍVEL",
        },
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      await IndexService._atualizarBadgeStatus(
        mockCiclo,
        "admin",
        "composicao",
      );

      const card = document.querySelector(
        '[data-ciclo-id="1"][data-etapa="composicao"]',
      );
      const badge = card.querySelector(".status-badge");

      expect(badge.classList.contains("inactive")).to.be.true;
      expect(badge.classList.contains("active")).to.be.false;
      expect(badge.textContent).to.equal("INDISPONÍVEL");
      expect(card.classList.contains("inactive")).to.be.true;
    });

    it("não deve quebrar se card não existe", async function () {
      const mockCiclo = { id: 999, status: "oferta" };

      await IndexService._atualizarBadgeStatus(
        mockCiclo,
        "fornecedor",
        "oferta",
      );

      // Não deve lançar erro
      expect(fetchStub.called).to.be.false;
    });

    it("não deve quebrar se badge não existe no card", async function () {
      const cardSemBadge = document.createElement("article");
      cardSemBadge.setAttribute("data-ciclo-id", "10");
      cardSemBadge.setAttribute("data-etapa", "oferta");
      document.body.appendChild(cardSemBadge);

      const mockCiclo = { id: 10, status: "oferta" };

      await IndexService._atualizarBadgeStatus(
        mockCiclo,
        "fornecedor",
        "oferta",
      );

      // Não deve lançar erro
      expect(fetchStub.called).to.be.false;
    });

    it("deve fazer chamada correta à API", async function () {
      const mockCiclo = { id: 1, status: "oferta" };
      const mockResponse = {
        success: true,
        status: { ativo: true, status: "DISPONÍVEL" },
      };

      fetchStub.resolves({
        json: async () => mockResponse,
      });

      await IndexService._atualizarBadgeStatus(
        mockCiclo,
        "fornecedor",
        "oferta",
      );

      expect(fetchStub.calledOnce).to.be.true;
      expect(fetchStub.firstCall.args[0]).to.equal(
        "/api/index/calcular-status-etapa",
      );
    });
  });

  // ==========================================
  // TESTES: atualizarCardsEtapas()
  // ==========================================

  describe("atualizarCardsEtapas()", function () {
    it("deve atualizar todos os cards corretamente", async function () {
      const mockCiclosResponse = {
        success: true,
        ciclos: [{ id: 1, nome: "Ciclo 1", status: "oferta" }],
      };

      const mockStatusResponse = {
        success: true,
        status: { ativo: true, status: "DISPONÍVEL" },
      };

      // Primeira chamada: buscarCiclosAtivos
      // Segunda e terceira: calcularStatusEtapa para oferta e composicao
      fetchStub.onFirstCall().resolves({
        json: async () => mockCiclosResponse,
      });
      fetchStub.onSecondCall().resolves({
        json: async () => mockStatusResponse,
      });
      fetchStub.onThirdCall().resolves({
        json: async () => mockStatusResponse,
      });

      const resultado = await IndexService.atualizarCardsEtapas(
        123,
        "fornecedor",
      );

      expect(resultado.success).to.be.true;
      expect(fetchStub.callCount).to.equal(3); // buscar + 2 atualizar
    });

    it("deve retornar erro se busca de ciclos falhar", async function () {
      fetchStub.rejects(new Error("Network error"));

      try {
        await IndexService.atualizarCardsEtapas(123, "fornecedor");
        expect.fail("Deveria ter lançado erro");
      } catch (error) {
        expect(error.message).to.equal("Network error");
      }
    });

    it("deve logar erro no console se atualização falhar", async function () {
      // Spy ANTES de configurar os mocks
      const consoleErrorSpy = sinon.spy(console, "error");

      const mockCiclosResponse = {
        success: true,
        ciclos: [{ id: 1, nome: "Ciclo 1" }],
      };

      // Primeira chamada: buscarCiclosAtivos (sucesso)
      fetchStub.onCall(0).resolves({
        json: async () => mockCiclosResponse,
      });
      // Segunda chamada: calcularStatusEtapa para oferta (erro)
      fetchStub.onCall(1).rejects(new Error("API error"));
      // Terceira chamada: calcularStatusEtapa para composicao (erro)
      fetchStub.onCall(2).rejects(new Error("API error"));

      const resultado = await IndexService.atualizarCardsEtapas(
        123,
        "fornecedor",
      );

      // O método não deve lançar erro, apenas logar
      expect(resultado.success).to.be.true;

      // Aguardar callbacks assíncronos
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(consoleErrorSpy.called).to.be.true;
      consoleErrorSpy.restore();
    });
  });
});
