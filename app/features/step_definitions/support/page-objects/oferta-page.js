/**
 * OfertaPage - Page Object para a tela de ofertas
 * Encapsula todos os seletores e ações da página oferta.ejs
 */
class OfertaPage {
  constructor(browserHelper) {
    this.browser = browserHelper;

    // Seletores da página
    this.selectors = {
      // Header
      headerTitle: '.header-title',
      userDropdown: '#userDropdown',
      dropdownToggle: '.dropdown-toggle',
      searchUsuario: '#searchUsuario',

      // Progress Steps
      progressSteps: '.progress-steps',
      progressLine: '.progress-line-fill',
      stepCircle: '.step-circle',
      activeStep: '.step.active',
      completedStep: '.step-circle.completed',

      // Alerts
      alertInfo: '.alert-info',
      alertWarning: '.alert-warning',
      alertSuccess: '.alert-success',

      // Summary Card (Produtos Ofertados)
      summaryCard: '.summary-card',
      totalOffered: '#totalOffered',
      offeredList: '#offeredList',
      offeredItem: '.offered-item',
      offeredItemName: '.offered-item-name',
      offeredItemQty: '.offered-item-qty',
      removeBtn: '.remove-btn',

      // Search Box
      searchBox: '.search-box',
      searchProduto: '#searchProduto',

      // Product Grid
      productGrid: '.product-grid',
      productCard: '.product-card',
      productName: '.product-name',
      productCategory: '.product-category',
      productPrice: '.product-price',
      productUnit: '.product-unit',

      // Quantity Controls
      quantityControl: '.quantity-control',
      quantityBtn: '.quantity-btn',
      quantityInput: '.quantity-input',

      // Bottom Bar
      bottomBar: '.bottom-bar',
      totalCount: '#totalCount',
      submitBtn: '#submitBtn',

      // Toast Notifications
      feedbackToast: '.feedback-toast',
      feedbackSuccess: '.feedback-success',
      feedbackError: '.feedback-error'
    };
  }

  /**
   * Navega para a página de ofertas
   * @param {string} queryParams - Query params opcionais (ex: ?usr=123)
   */
  async abrirPagina(queryParams = '') {
    await this.browser.goto(`/oferta${queryParams}`);
    await this.browser.waitForSelector(this.selectors.headerTitle);
  }

  /**
   * Busca um produto pelo nome
   * @param {string} termo - Termo de busca
   */
  async buscarProduto(termo) {
    await this.browser.type(this.selectors.searchProduto, termo);
    // Aguarda o debounce (300ms)
    await this.browser.getPage().waitForTimeout(400);
  }

  /**
   * Obtém lista de produtos visíveis após busca
   */
  async obterProdutosVisiveis() {
    return await this.browser.evaluate((selector) => {
      const cards = document.querySelectorAll(selector);
      return Array.from(cards)
        .filter(card => card.style.display !== 'none')
        .map(card => ({
          nome: card.querySelector('.product-name')?.textContent.trim(),
          categoria: card.querySelector('.product-category')?.textContent.trim(),
          visivel: card.style.display !== 'none'
        }));
    }, this.selectors.productCard);
  }

  /**
   * Clica no botão + de um produto específico
   * @param {string} nomeProduto - Nome do produto
   */
  async clicarBotaoMais(nomeProduto) {
    const selector = await this.obterSeletorProduto(nomeProduto);
    const btnMais = `${selector} .quantity-btn:last-child`;
    await this.browser.click(btnMais);
    // Aguarda atualização AJAX
    await this.browser.getPage().waitForTimeout(500);
  }

  /**
   * Clica no botão - de um produto específico
   * @param {string} nomeProduto - Nome do produto
   */
  async clicarBotaoMenos(nomeProduto) {
    const selector = await this.obterSeletorProduto(nomeProduto);
    const btnMenos = `${selector} .quantity-btn:first-child`;
    await this.browser.click(btnMenos);
    await this.browser.getPage().waitForTimeout(500);
  }

  /**
   * Define quantidade diretamente no input
   * @param {string} nomeProduto - Nome do produto
   * @param {number} quantidade - Quantidade desejada
   */
  async definirQuantidade(nomeProduto, quantidade) {
    const produtoId = await this.obterProdutoId(nomeProduto);
    const inputSelector = `#quantidade${produtoId}`;
    await this.browser.type(inputSelector, quantidade.toString(), true);
    // Trigger change event
    await this.browser.evaluate((sel) => {
      document.querySelector(sel).dispatchEvent(new Event('change'));
    }, inputSelector);
    await this.browser.getPage().waitForTimeout(500);
  }

  /**
   * Obtém a quantidade atual de um produto
   * @param {string} nomeProduto - Nome do produto
   */
  async obterQuantidade(nomeProduto) {
    const produtoId = await this.obterProdutoId(nomeProduto);
    const value = await this.browser.getValue(`#quantidade${produtoId}`);
    return parseInt(value) || 0;
  }

  /**
   * Verifica se o card do produto tem classe 'has-quantity'
   * @param {string} nomeProduto - Nome do produto
   */
  async produtoTemQuantidade(nomeProduto) {
    const selector = await this.obterSeletorProduto(nomeProduto);
    return await this.browser.evaluate((sel) => {
      return document.querySelector(sel)?.classList.contains('has-quantity');
    }, selector);
  }

  /**
   * Obtém o número total de produtos no contador do rodapé
   */
  async obterContadorTotal() {
    const texto = await this.browser.getText(this.selectors.totalCount);
    return parseInt(texto) || 0;
  }

  /**
   * Obtém o número de produtos ofertados (no summary card)
   */
  async obterTotalOfertados() {
    const texto = await this.browser.getText(this.selectors.totalOffered);
    return parseInt(texto) || 0;
  }

  /**
   * Verifica se o toast de notificação apareceu
   * @param {string} tipo - 'success' ou 'error'
   */
  async verificarToast(tipo = 'success') {
    const selector = tipo === 'success'
      ? this.selectors.feedbackSuccess
      : this.selectors.feedbackError;

    try {
      await this.browser.waitForSelector(selector, 3000);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifica se a página recarregou (útil para validar AJAX)
   */
  async verificarSeRecarregou() {
    // Injeta um marcador antes da ação
    await this.browser.evaluate(() => {
      window.__testeReload = Date.now();
    });

    const timestampAntes = await this.browser.evaluate(() => window.__testeReload);

    // Após ação, verifica se o marcador ainda existe
    await this.browser.getPage().waitForTimeout(1000);

    const timestampDepois = await this.browser.evaluate(() => window.__testeReload);

    return timestampAntes !== timestampDepois;
  }

  /**
   * Obtém o step ativo do progress
   */
  async obterStepAtivo() {
    return await this.browser.evaluate(() => {
      const activeStep = document.querySelector('.step.active .step-label');
      return activeStep?.textContent.trim();
    });
  }

  /**
   * Conta quantos steps estão completados
   */
  async contarStepsCompletados() {
    return await this.browser.count(this.selectors.completedStep);
  }

  /**
   * Obtém lista de produtos ofertados no summary card
   */
  async obterProdutosOfertados() {
    return await this.browser.evaluate(() => {
      const items = document.querySelectorAll('.offered-item');
      return Array.from(items).map(item => ({
        nome: item.querySelector('.offered-item-name')?.textContent.trim(),
        quantidade: parseInt(item.querySelector('.offered-item-qty')?.textContent) || 0
      }));
    });
  }

  /**
   * Clica no botão de enviar oferta
   */
  async enviarOferta() {
    await this.browser.click(this.selectors.submitBtn);
  }

  /**
   * Define viewport para simular mobile
   */
  async simularMobile() {
    await this.browser.setViewport(375, 667); // iPhone 8
  }

  /**
   * Define viewport para desktop
   */
  async simularDesktop() {
    await this.browser.setViewport(1280, 720);
  }

  /**
   * Verifica se o grid está em layout mobile (1 coluna)
   */
  async verificarLayoutMobile() {
    return await this.browser.evaluate(() => {
      const grid = document.querySelector('.product-grid');
      const computedStyle = window.getComputedStyle(grid);
      const columns = computedStyle.gridTemplateColumns;
      // Em mobile, deve ter apenas 1 coluna
      return !columns.includes(' ');
    });
  }

  // ========== MÉTODOS AUXILIARES ==========

  /**
   * Obtém o seletor de um produto pelo nome
   * @private
   */
  async obterSeletorProduto(nomeProduto) {
    const produtoId = await this.obterProdutoId(nomeProduto);
    return `[data-product-id="${produtoId}"]`;
  }

  /**
   * Obtém o ID de um produto pelo nome
   * @private
   */
  async obterProdutoId(nomeProduto) {
    return await this.browser.evaluate((nome) => {
      const cards = document.querySelectorAll('.product-card');
      for (let card of cards) {
        const productName = card.querySelector('.product-name')?.textContent.trim();
        if (productName === nome) {
          return card.getAttribute('data-product-id');
        }
      }
      return null;
    }, nomeProduto);
  }
}

module.exports = OfertaPage;
