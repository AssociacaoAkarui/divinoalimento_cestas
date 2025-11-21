-- ============================================
-- Script idempotente - pode rodar múltiplas vezes sem duplicar
-- ============================================

-- Categorias de Produtos
INSERT INTO "CategoriaProdutos" (id, nome, status, "createdAt", "updatedAt")
SELECT 1, 'fruta', 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "CategoriaProdutos" WHERE id = 1);

INSERT INTO "CategoriaProdutos" (id, nome, status, "createdAt", "updatedAt")
SELECT 2, 'verduras', 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "CategoriaProdutos" WHERE id = 2);

-- Cestas auxiliares do sistema (criadas automaticamente pelo código se não existirem)
INSERT INTO "Cesta" (id, nome, valormaximo, status, "createdAt", "updatedAt")
SELECT 1, 'Itens Adicionais Oferta', 1, 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Cesta" WHERE id = 1);

INSERT INTO "Cesta" (id, nome, valormaximo, status, "createdAt", "updatedAt")
SELECT 5, 'Pedidos Adicionais', 1, 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Cesta" WHERE id = 5);

-- Cestas padrões (necessárias para emissão dos relatórios específicos)
INSERT INTO "Cesta" (id, nome, valormaximo, status, "createdAt", "updatedAt")
SELECT 2, 'Divino Alimento', 20, 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Cesta" WHERE id = 2);

INSERT INTO "Cesta" (id, nome, valormaximo, status, "createdAt", "updatedAt")
SELECT 4, 'Vila São Vicente de Paulo', 30, 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Cesta" WHERE id = 4);

INSERT INTO "Cesta" (id, nome, valormaximo, status, "createdAt", "updatedAt")
SELECT 7, 'Grupo de Compras SLP', 31.5, 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Cesta" WHERE id = 7);

-- Ponto de Entrega (necessário para criar ciclo)
INSERT INTO "PontoEntregas" (id, nome, endereco, status, "createdAt", "updatedAt")
SELECT 1, 'Ponto Central', 'Rua Principal, 100', 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "PontoEntregas" WHERE id = 1);

-- Ciclo de teste
INSERT INTO "Ciclos" (id, nome, "ofertaInicio", "ofertaFim", "pontoEntregaId", "itensAdicionaisInicio", "itensAdicionaisFim", "retiradaConsumidorInicio", "retiradaConsumidorFim", observacao, status, "createdAt", "updatedAt")
SELECT 1, 'Ciclo Teste',
       CURRENT_DATE,
       CURRENT_DATE + INTERVAL '7 days',
       1,
       CURRENT_DATE + INTERVAL '8 days',
       CURRENT_DATE + INTERVAL '10 days',
       CURRENT_DATE + INTERVAL '11 days',
       CURRENT_DATE + INTERVAL '14 days',
       'Ciclo para testes',
       'oferta',
       CURRENT_DATE,
       CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Ciclos" WHERE id = 1);

-- CicloCestas auxiliares (criadas automaticamente pelo sistema quando ciclo é criado)
INSERT INTO "CicloCestas" (id, "cicloId", "cestaId", "quantidadeCestas", "createdAt", "updatedAt")
SELECT 1, 1, 1, 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "CicloCestas" WHERE id = 1);

INSERT INTO "CicloCestas" (id, "cicloId", "cestaId", "quantidadeCestas", "createdAt", "updatedAt")
SELECT 2, 1, 5, 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "CicloCestas" WHERE id = 2);

-- CicloCesta de cesta real (Divino Alimento com 30 cestas)
INSERT INTO "CicloCestas" (id, "cicloId", "cestaId", "quantidadeCestas", "createdAt", "updatedAt")
SELECT 3, 1, 2, 30, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "CicloCestas" WHERE id = 3);

-- Usuário fornecedor (necessário para oferta) - id=100 para não conflitar com usuários criados pelo sistema
INSERT INTO "Usuarios" (id, nome, nomeoficial, celular, email, perfil, status, "createdAt", "updatedAt")
SELECT 100, 'Fornecedor Teste', 'Fornecedor Teste LTDA', '11999999999', 'fornecedor@teste.com', '{fornecedor}', 'ativo', CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Usuarios" WHERE id = 100);

-- Produtos (10 produtos de teste)
INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 1, 'Banana Prata', 'kg', 1000, 5.50, 'ativo', 'Banana prata orgânica', 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 1);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 2, 'Maçã Fuji', 'kg', 1000, 8.00, 'ativo', 'Maçã fuji orgânica', 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 2);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 3, 'Laranja Pera', 'kg', 1000, 4.00, 'ativo', 'Laranja pera orgânica', 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 3);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 4, 'Mamão Papaia', 'unidade', 500, 6.00, 'ativo', 'Mamão papaia orgânico', 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 4);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 5, 'Abacate', 'unidade', 400, 7.00, 'ativo', 'Abacate orgânico', 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 5);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 6, 'Alface Crespa', 'maço', 200, 3.50, 'ativo', 'Alface crespa orgânica', 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 6);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 7, 'Couve Manteiga', 'maço', 250, 4.00, 'ativo', 'Couve manteiga orgânica', 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 7);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 8, 'Cenoura', 'kg', 1000, 5.00, 'ativo', 'Cenoura orgânica', 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 8);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 9, 'Beterraba', 'kg', 1000, 4.50, 'ativo', 'Beterraba orgânica', 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 9);

INSERT INTO "Produtos" (id, nome, medida, "pesoGrama", "valorReferencia", status, descritivo, "categoriaId", "createdAt", "updatedAt")
SELECT 10, 'Tomate', 'kg', 1000, 7.00, 'ativo', 'Tomate orgânico', 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Produtos" WHERE id = 10);

-- Oferta (vinculada ao ciclo 1 e usuário fornecedor 100)
INSERT INTO "Oferta" (id, status, observacao, "cicloId", "usuarioId", "createdAt", "updatedAt")
SELECT 1, 'ativo', 'Oferta de teste', 1, 100, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "Oferta" WHERE id = 1);

-- OfertaProdutos (produtos ofertados com quantidades)
INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 1, 50, 5.50, 5.00, 1, 1, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 1);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 2, 30, 8.00, 7.50, 1, 2, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 2);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 3, 40, 4.00, 3.50, 1, 3, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 3);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 4, 20, 6.00, 5.50, 1, 4, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 4);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 5, 25, 7.00, 6.50, 1, 5, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 5);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 6, 60, 3.50, 3.00, 1, 6, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 6);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 7, 45, 4.00, 3.50, 1, 7, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 7);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 8, 35, 5.00, 4.50, 1, 8, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 8);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 9, 30, 4.50, 4.00, 1, 9, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 9);

INSERT INTO "OfertaProdutos" (id, quantidade, "valorReferencia", "valorOferta", "ofertaId", "produtoId", "createdAt", "updatedAt")
SELECT 10, 40, 7.00, 6.00, 1, 10, CURRENT_DATE, CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM "OfertaProdutos" WHERE id = 10);
