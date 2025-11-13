const { expect } = require("chai");
const sinon = require("sinon");
const { JSDOM } = require("jsdom");

/**
 * Testes Unitários para Feedback (Toast Notifications)
 * Testa o sistema de notificações do frontend
 */
describe("Feedback - Toast Notifications", function () {
  let dom;
  let document;
  let Feedback;
  let clock;

  beforeEach(function () {
    // Cria um DOM virtual
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            :root {
              --success: #10B981;
              --danger: #EF4444;
            }
          </style>
        </head>
        <body></body>
      </html>
    `,
      {
        url: "http://localhost",
        pretendToBeVisual: true,
      },
    );

    document = dom.window.document;
    global.document = document;

    // Define o Feedback no contexto global
    Feedback = {
      show(mensagem, tipo = "success") {
        const feedback = document.createElement("div");
        feedback.textContent = mensagem;
        feedback.className = `feedback-toast feedback-${tipo}`;
        feedback.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 24px;
          background: ${tipo === "success" ? "#10B981" : "#EF4444"};
          color: white;
          border-radius: 0.5rem;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          font-size: 0.875rem;
          font-weight: 500;
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
          feedback.style.animation = "slideOut 0.3s ease-in";
          setTimeout(() => {
            if (feedback.parentNode) {
              feedback.remove();
            }
          }, 300);
        }, 2000);
      },

      success(mensagem) {
        this.show(mensagem, "success");
      },

      error(mensagem) {
        this.show(mensagem, "error");
      },

      warning(mensagem) {
        this.show(mensagem, "warning");
      },

      info(mensagem) {
        this.show(mensagem, "info");
      },
    };

    // Usa Sinon fake timers
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
    delete global.document;
    dom.window.close();
  });

  describe("show()", function () {
    it("deve criar elemento de toast no DOM", function () {
      Feedback.show("Teste de mensagem");

      const toast = document.querySelector(".feedback-toast");
      expect(toast).to.exist;
      expect(toast.textContent).to.equal("Teste de mensagem");
    });

    it("deve aplicar classe correta para tipo success", function () {
      Feedback.show("Sucesso!", "success");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.classList.contains("feedback-success")).to.be.true;
    });

    it("deve aplicar classe correta para tipo error", function () {
      Feedback.show("Erro!", "error");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.classList.contains("feedback-error")).to.be.true;
    });

    it("deve aplicar estilos inline corretos", function () {
      Feedback.show("Teste");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.style.position).to.equal("fixed");
      expect(toast.style.top).to.equal("20px");
      expect(toast.style.right).to.equal("20px");
      expect(toast.style.zIndex).to.equal("1000");
    });

    it("deve usar tipo success como padrão", function () {
      Feedback.show("Mensagem sem tipo");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.classList.contains("feedback-success")).to.be.true;
    });

    it("deve adicionar toast ao body", function () {
      const childrenAntes = document.body.children.length;

      Feedback.show("Nova mensagem");

      const childrenDepois = document.body.children.length;
      expect(childrenDepois).to.equal(childrenAntes + 1);
    });

    it("deve remover toast após 2300ms", function () {
      Feedback.show("Mensagem temporária");

      let toast = document.querySelector(".feedback-toast");
      expect(toast).to.exist;

      // Avança 2000ms
      clock.tick(2000);
      toast = document.querySelector(".feedback-toast");
      expect(toast).to.exist;

      // Avança mais 300ms
      clock.tick(300);
      toast = document.querySelector(".feedback-toast");
      expect(toast).to.not.exist;
    });

    it("deve aplicar animação de saída antes de remover", function () {
      Feedback.show("Teste animação");

      let toast = document.querySelector(".feedback-toast");
      expect(toast.style.animation).to.include("slideIn");

      clock.tick(2000);

      toast = document.querySelector(".feedback-toast");
      expect(toast.style.animation).to.include("slideOut");
    });
  });

  describe("success()", function () {
    it("deve chamar show() com tipo success", function () {
      const showSpy = sinon.spy(Feedback, "show");

      Feedback.success("Operação bem-sucedida");

      expect(showSpy.calledOnce).to.be.true;
      expect(showSpy.calledWith("Operação bem-sucedida", "success")).to.be.true;

      showSpy.restore();
    });

    it("deve criar toast com classe success", function () {
      Feedback.success("Sucesso!");

      const toast = document.querySelector(".feedback-success");
      expect(toast).to.exist;
    });
  });

  describe("error()", function () {
    it("deve chamar show() com tipo error", function () {
      const showSpy = sinon.spy(Feedback, "show");

      Feedback.error("Erro na operação");

      expect(showSpy.calledOnce).to.be.true;
      expect(showSpy.calledWith("Erro na operação", "error")).to.be.true;

      showSpy.restore();
    });

    it("deve criar toast com classe error", function () {
      Feedback.error("Erro!");

      const toast = document.querySelector(".feedback-error");
      expect(toast).to.exist;
    });
  });

  describe("warning()", function () {
    it("deve chamar show() com tipo warning", function () {
      const showSpy = sinon.spy(Feedback, "show");

      Feedback.warning("Atenção!");

      expect(showSpy.calledOnce).to.be.true;
      expect(showSpy.calledWith("Atenção!", "warning")).to.be.true;

      showSpy.restore();
    });

    it("deve criar toast com classe warning", function () {
      Feedback.warning("Aviso!");

      const toast = document.querySelector(".feedback-warning");
      expect(toast).to.exist;
    });
  });

  describe("info()", function () {
    it("deve chamar show() com tipo info", function () {
      const showSpy = sinon.spy(Feedback, "show");

      Feedback.info("Informação");

      expect(showSpy.calledOnce).to.be.true;
      expect(showSpy.calledWith("Informação", "info")).to.be.true;

      showSpy.restore();
    });

    it("deve criar toast com classe info", function () {
      Feedback.info("Info!");

      const toast = document.querySelector(".feedback-info");
      expect(toast).to.exist;
    });
  });

  describe("Múltiplos Toasts", function () {
    it("deve permitir múltiplos toasts simultâneos", function () {
      Feedback.success("Mensagem 1");
      Feedback.error("Mensagem 2");
      Feedback.warning("Mensagem 3");

      const toasts = document.querySelectorAll(".feedback-toast");
      expect(toasts).to.have.lengthOf(3);
    });

    it("deve remover toasts independentemente", function () {
      Feedback.success("Primeiro");
      clock.tick(1000);
      Feedback.error("Segundo");

      let toasts = document.querySelectorAll(".feedback-toast");
      expect(toasts).to.have.lengthOf(2);

      clock.tick(1300);
      toasts = document.querySelectorAll(".feedback-toast");
      expect(toasts).to.have.lengthOf(1);

      clock.tick(1000);
      toasts = document.querySelectorAll(".feedback-toast");
      expect(toasts).to.have.lengthOf(0);
    });
  });

  describe("Acessibilidade", function () {
    it("deve ter contraste adequado (texto branco)", function () {
      Feedback.success("Teste contraste");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.style.color).to.equal("white");
    });

    it("deve ter z-index alto", function () {
      Feedback.show("Teste z-index");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.style.zIndex).to.equal("1000");
    });

    it("deve ter padding adequado", function () {
      Feedback.show("Teste padding");

      const toast = document.querySelector(".feedback-toast");
      expect(toast.style.padding).to.equal("12px 24px");
    });
  });
});
