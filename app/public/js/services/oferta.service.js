class OfertaService extends ApiService {
  static async buscarProdutos(termo, usuarioId) {
    const queryParams = new URLSearchParams();
    if (termo) queryParams.append('termo', termo);
    if (usuarioId) queryParams.append('usuarioId', usuarioId);

    return this.get(`/api/produtos/buscar?${queryParams.toString()}`);
  }

  static async atualizarQuantidade(produtoId, quantidade, ofertaId) {
    return this.post('/api/oferta/atualizar-quantidade', {
      produtoId,
      quantidade,
      ofertaId
    });
  }

  static async obterProdutosOferta(ofertaId) {
    return this.get(`/api/oferta/${ofertaId}/produtos`);
  }
}
