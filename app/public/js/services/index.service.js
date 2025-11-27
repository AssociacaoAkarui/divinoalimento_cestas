class IndexService extends ApiService {
  /**
   * Busca ciclos ativos
   * @param {number} usuarioId - ID do usuário (opcional)
   * @returns {Promise<Object>} { success, ciclos }
   */
  static async buscarCiclosAtivos(usuarioId = null) {
    const queryParams = new URLSearchParams();
    if (usuarioId) queryParams.append('usuarioId', usuarioId);

    return this.get(`/api/index/ciclos-ativos?${queryParams.toString()}`);
  }

  /**
   * Calcula status de uma etapa do ciclo
   * @param {Object} ciclo - Dados do ciclo
   * @param {string} perfil - Perfil do usuário
   * @param {string} etapa - Nome da etapa
   * @returns {Promise<Object>} { success, status: { ativo, status } }
   */
  static async calcularStatusEtapa(ciclo, perfil, etapa) {
    return this.post('/api/index/calcular-status-etapa', {
      ciclo,
      perfil,
      etapa
    });
  }

  /**
   * Atualiza cards de ciclos dinamicamente
   * @param {number} usuarioId - ID do usuário
   * @param {string} perfil - Perfil do usuário
   */
  static async atualizarCardsEtapas(usuarioId, perfil) {
    try {
      const response = await this.buscarCiclosAtivos(usuarioId);

      if (response.success) {
        // Atualizar badges de status nos cards
        response.ciclos.forEach(ciclo => {
          this._atualizarBadgeStatus(ciclo, perfil, 'oferta');
          this._atualizarBadgeStatus(ciclo, perfil, 'composicao');
          this._atualizarBadgeStatus(ciclo, perfil, 'pedidos');
          this._atualizarBadgeStatus(ciclo, perfil, 'entrega');
          this._atualizarBadgeStatus(ciclo, perfil, 'retirada');
        });
      }

      return response;
    } catch (error) {
      console.error('Erro ao atualizar cards:', error);
      throw error;
    }
  }

  /**
   * Atualiza badge de status de um card específico
   * @private
   */
  static async _atualizarBadgeStatus(ciclo, perfil, etapa) {
    const cardSelector = `[data-ciclo-id="${ciclo.id}"][data-etapa="${etapa}"]`;
    const card = document.querySelector(cardSelector);

    if (!card) return;

    const badge = card.querySelector('.status-badge');
    if (!badge) return;

    try {
      // Chamar API para calcular status
      const response = await this.calcularStatusEtapa(ciclo, perfil, etapa);

      if (response.success) {
        const statusInfo = response.status;

        // Atualizar classes e texto
        badge.classList.remove('active', 'inactive');
        badge.classList.add(statusInfo.ativo ? 'active' : 'inactive');
        badge.textContent = statusInfo.status;

        card.classList.remove('active', 'inactive');
        card.classList.add(statusInfo.ativo ? 'active' : 'inactive');
      }
    } catch (error) {
      console.error(`Erro ao atualizar badge ${etapa}:`, error);
    }
  }

  /**
   * Inicializa atributos data nos cards para facilitar seleção
   */
  static inicializarDataAttributes() {
    document.querySelectorAll('.action-card').forEach(card => {
      const link = card.querySelector('.card-link');
      if (!link) return;

      const href = link.getAttribute('href');

      // Identificar tipo de etapa pelo href
      let etapa = '';
      if (href.includes('/oferta/')) etapa = 'oferta';
      else if (href.includes('/composicao/')) etapa = 'composicao';
      else if (href.includes('/pedidoConsumidores')) etapa = 'pedidos';
      else if (href.includes('/pedidosfornecedores')) etapa = 'entrega';
      else if (href.includes('/pedidosconsumidorestodos')) etapa = 'retirada';

      if (etapa) {
        // Extrair cicloId do href
        const match = href.match(/\/(\d+)/);
        if (match) {
          card.setAttribute('data-ciclo-id', match[1]);
          card.setAttribute('data-etapa', etapa);
        }
      }
    });
  }
}
