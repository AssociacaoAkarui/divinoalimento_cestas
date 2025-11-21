/**
 * PedidoConsumidoresService
 * Serviço para operações de pedidos de consumidores via API
 */
const PedidoConsumidoresService = {
  /**
   * Atualiza a quantidade de um produto no pedido
   * @param {number} produtoId - ID do produto
   * @param {number} quantidade - Nova quantidade
   * @param {number} pedidoId - ID do pedido do consumidor
   * @param {number} cicloId - ID do ciclo
   * @returns {Promise<Object>} Resposta da API
   */
  async atualizarQuantidade(produtoId, quantidade, pedidoId, cicloId) {
    return await ApiService.post('/api/pedidoconsumidores/atualizar-quantidade', {
      produtoId,
      quantidade,
      pedidoId,
      cicloId
    });
  },

  /**
   * Obtém os produtos do pedido atual
   * @param {number} pedidoId - ID do pedido
   * @returns {Promise<Object>} Lista de produtos do pedido
   */
  async obterProdutosPedido(pedidoId) {
    return await ApiService.get(`/api/pedidoconsumidores/${pedidoId}/produtos`);
  },

  /**
   * Confirma/finaliza o pedido
   * @param {number} pedidoId - ID do pedido
   * @param {number} cicloId - ID do ciclo
   * @param {number} usuarioId - ID do consumidor
   * @returns {Promise<Object>} Resposta da API
   */
  async confirmarPedido(pedidoId, cicloId, usuarioId) {
    return await ApiService.post('/api/pedidoconsumidores/confirmar', {
      pedidoId,
      cicloId,
      usuarioId
    });
  },

  /**
   * Remove um produto do pedido
   * @param {number} produtoId - ID do produto
   * @param {number} pedidoId - ID do pedido
   * @returns {Promise<Object>} Resposta da API
   */
  async removerProduto(produtoId, pedidoId) {
    return await ApiService.post('/api/pedidoconsumidores/remover-produto', {
      produtoId,
      pedidoId
    });
  },

  /**
   * Calcula o total do pedido
   * @param {Array} produtos - Lista de produtos com quantidade e valor
   * @param {number} taxaPorItem - Taxa administrativa por item (default: 0.50)
   * @returns {Object} Totais calculados
   */
  calcularTotais(produtos, taxaPorItem = 0.50) {
    let totalProdutos = 0;
    let totalItens = 0;
    let taxaAdministrativa = 0;

    produtos.forEach(produto => {
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
      totalGeral: totalProdutos + taxaAdministrativa
    };
  },

  /**
   * Formata valor para exibição em Real
   * @param {number} valor - Valor numérico
   * @returns {string} Valor formatado (ex: "12,50")
   */
  formatarValor(valor) {
    return valor.toFixed(2).replace('.', ',');
  }
};
