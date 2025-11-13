const puppeteer = require('puppeteer');

/**
 * BrowserHelper - Abstração para gerenciar browser e páginas do Puppeteer
 * Facilita a criação, navegação e limpeza de instâncias do navegador
 */
class BrowserHelper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  }

  /**
   * Inicializa uma instância do browser
   * @param {Object} options - Opções do Puppeteer
   */
  async init(options = {}) {
    const defaultOptions = {
      headless: process.env.HEADLESS !== 'false',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security'
      ],
      defaultViewport: {
        width: 1280,
        height: 720
      }
    };

    this.browser = await puppeteer.launch({
      ...defaultOptions,
      ...options
    });

    this.page = await this.browser.newPage();

    // Configurar timeout padrão
    this.page.setDefaultTimeout(30000);

    // Interceptar console logs do browser (útil para debug)
    this.page.on('console', msg => {
      if (process.env.DEBUG_BROWSER === 'true') {
        console.log(`[BROWSER] ${msg.type()}: ${msg.text()}`);
      }
    });

    return this.page;
  }

  /**
   * Navega para uma URL relativa ou absoluta
   * @param {string} path - Caminho relativo ou URL completa
   */
  async goto(path) {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    await this.page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
  }

  /**
   * Aguarda um seletor estar presente no DOM
   * @param {string} selector - Seletor CSS
   * @param {number} timeout - Timeout em ms
   */
  async waitForSelector(selector, timeout = 10000) {
    return await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Aguarda uma função JavaScript retornar true
   * @param {Function} fn - Função a ser executada no contexto da página
   * @param {Object} options - Opções de timeout
   */
  async waitForFunction(fn, options = {}) {
    return await this.page.waitForFunction(fn, options);
  }

  /**
   * Clica em um elemento
   * @param {string} selector - Seletor CSS
   */
  async click(selector) {
    await this.waitForSelector(selector);
    await this.page.click(selector);
  }

  /**
   * Digita texto em um input
   * @param {string} selector - Seletor CSS
   * @param {string} text - Texto a digitar
   * @param {boolean} clear - Limpar campo antes
   */
  async type(selector, text, clear = true) {
    await this.waitForSelector(selector);
    if (clear) {
      await this.page.click(selector, { clickCount: 3 });
      await this.page.keyboard.press('Backspace');
    }
    await this.page.type(selector, text);
  }

  /**
   * Obtém o texto de um elemento
   * @param {string} selector - Seletor CSS
   */
  async getText(selector) {
    await this.waitForSelector(selector);
    return await this.page.$eval(selector, el => el.textContent.trim());
  }

  /**
   * Obtém o valor de um input
   * @param {string} selector - Seletor CSS
   */
  async getValue(selector) {
    await this.waitForSelector(selector);
    return await this.page.$eval(selector, el => el.value);
  }

  /**
   * Verifica se um elemento existe
   * @param {string} selector - Seletor CSS
   */
  async exists(selector) {
    try {
      await this.page.waitForSelector(selector, { timeout: 2000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Conta elementos que correspondem ao seletor
   * @param {string} selector - Seletor CSS
   */
  async count(selector) {
    return await this.page.$$eval(selector, elements => elements.length);
  }

  /**
   * Executa JavaScript no contexto da página
   * @param {Function|string} fn - Função ou código JavaScript
   * @param {...any} args - Argumentos para a função
   */
  async evaluate(fn, ...args) {
    return await this.page.evaluate(fn, ...args);
  }

  /**
   * Tira screenshot (útil para debug)
   * @param {string} filename - Nome do arquivo
   */
  async screenshot(filename) {
    await this.page.screenshot({
      path: `screenshots/${filename}`,
      fullPage: true
    });
  }

  /**
   * Define o tamanho da viewport (para testes responsivos)
   * @param {number} width - Largura
   * @param {number} height - Altura
   */
  async setViewport(width, height) {
    await this.page.setViewport({ width, height });
  }

  /**
   * Aguarda navegação (útil após submits)
   */
  async waitForNavigation() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
  }

  /**
   * Fecha a página atual
   */
  async closePage() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
  }

  /**
   * Fecha o browser
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  /**
   * Retorna a instância do page (para operações avançadas)
   */
  getPage() {
    return this.page;
  }

  /**
   * Retorna a instância do browser (para operações avançadas)
   */
  getBrowser() {
    return this.browser;
  }
}

module.exports = BrowserHelper;
