# Tabela de Integração Completa: Backend - Frontend

**Data**: 2025-11-21
**Versão**: 1.1
**Projeto**: Divino Alimento - Cestas

## Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado e funcional |
| ⚠️ | Parcialmente implementado |
| ❌ | Não implementado / Pendente |
| 🧪 | Com testes automatizados |
| N/A | Não se aplica |

---

## Arquitetura do Projeto

Este projeto utiliza uma arquitetura **MVC tradicional com EJS**:
- **Backend**: Node.js + Express
- **Views**: EJS (Server-side rendering)
- **Database**: Sequelize ORM
- **Testes**: Cucumber (BDD) + Mocha (Unit)

### Colunas da Tabela

| Coluna | Descrição |
|--------|-----------|
| **View (EJS)** | Arquivo de template `.ejs` |
| **Controller** | Controlador que processa a requisição |
| **Model DB** | Modelo Sequelize utilizado |
| **Service** | Camada de serviço (se existir) |
| **Feature BDD** | Teste Cucumber |
| **CSS Modular** | CSS extraído para arquivo externo |
| **JS Service** | JavaScript modularizado (API calls) |
| **Testes Unit** | Testes unitários (Mocha) |
| **Testes E2E** | Testes de interface (Puppeteer) |

---

## Tabela Principal de Integração

### AUTENTICAÇÃO E USUÁRIOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 1 | `index.ejs` | `IndexController` | `Usuario`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 2 | `usuario.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 3 | `usuario-index.ejs` | `UsuarioIndexController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 4 | `usuario-edit.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 5 | `usuarionovo.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### CICLOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 7 | `ciclo.ejs` | `CicloController`✅ | `Ciclo`✅ `CicloCestas`✅ `CicloEntregas`✅ `CicloProdutos`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 8 | `ciclo-index.ejs` | `CicloIndexController`✅ | `Ciclo`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 9 | `ciclo-edit.ejs` | `CicloController`✅ | `Ciclo`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### CESTAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 10 | `cesta.ejs` | `CestaController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 11 | `cesta-index.ejs` | `CestaIndexController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 12 | `cesta-edit.ejs` | `CestaController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### PRODUTOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 13 | `produto.ejs` | `ProdutoController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 14 | `produto-index.ejs` | `ProdutoIndexController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 15 | `produto-edit.ejs` | `ProdutoController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### CATEGORIAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 16 | `categoria.ejs` | `CategoriaController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 17 | `categoria-index.ejs` | `CategoriaIndexController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 18 | `categoria-edit.ejs` | `CategoriaController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### PONTOS DE ENTREGA

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 19 | `pontoentrega.ejs` | `PontoEntregaController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 20 | `pontoentrega-index.ejs` | `PontoEntregaIndexController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 21 | `pontoentrega-edit.ejs` | `PontoEntregaController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### OFERTAS (FORNECEDORES)

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 22 | `oferta.ejs` | `OfertaController`✅ | `Oferta`✅ `OfertaProdutos`✅ | `OfertaService`✅ | `oferta.feature`🧪 | `common.css`✅ `pages/oferta.css`✅ | `api.service.js`✅ `oferta.service.js`✅ | `oferta.service.test.js`✅🧪 | `oferta-ui.feature`✅🧪 |
| 23 | `oferta-index.ejs` | `OfertaIndexController`✅ | `Oferta`✅ | ❌ | `oferta.feature`🧪 | ❌ | ❌ | ❌ | ❌ |

### COMPOSIÇÃO DE CESTAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 24 | `composicao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ `ComposicaoOfertaProdutos`✅ `ComposicaoCestaProdutos`✅ `ComposicaoCestaOpcoes`✅ | ❌ | `composicao.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 25 | `composicaoofertassobras.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | `composicao.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 26 | `composicaoofertassobrasConfirmacao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 27 | `composicaopedidosextras.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 28 | `composicaopedidosextrasConfirmacao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### PEDIDOS DE CONSUMIDORES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 29 | `pedidoConsumidores.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ `PedidoConsumidoresProdutos`✅ | `PedidoConsumidoresService`✅ | `pedidoconsumidores.feature`🧪 | `common.css`✅ `pages/pedidoConsumidores.css`✅ | `api.service.js`✅ `pedidoConsumidores.service.js`✅ | ❌ | ❌ |
| 30 | `pedidoConsumidoresConfirmacao.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ | ❌ | `pedidoconsumidores.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 31 | `pedidosConsumidoresTodos.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 32 | `pedidosConsumidoresCiclos.ejs` | `RelatorioController`✅ | `PedidoConsumidores`✅ `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 33 | `pedidosConsumidoresCiclosProdutos.ejs` | `RelatorioController`✅ | `PedidoConsumidores`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 34 | `pedidosConsumidoresCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### RELATÓRIOS FORNECEDORES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 35 | `pedidosFornecedoresTodos.ejs` | `ComposicaoController`✅ | `Oferta`✅ `OfertaProdutos`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 36 | `pedidosFornecedoresIndiv.ejs` | `ComposicaoController`✅ | `Oferta`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 37 | `pedidosFornecedoresSobra.ejs` | `ComposicaoController`✅ | `Oferta`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 38 | `pedidosFornecedoresCiclos.ejs` | `RelatorioController`✅ | `Oferta`✅ `Ciclo`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 39 | `pedidosFornecedoresCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### RELATÓRIOS DE PRODUTOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 40 | `relatorioProdutosCiclos.ejs` | `RelatorioController`✅ | `Produto`✅ `Ciclo`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ | ❌ |
| 41 | `relatorioProdutosCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### MOVIMENTAÇÕES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 42 | `movimentacao.ejs` | `MovimentacaoController`✅ | `Movimentacao`✅ `TipoMovimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 43 | `movimentacao-index.ejs` | `MovimentacaoIndexController`✅ | `Movimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 44 | `movimentacaoTodos.ejs` | `MovimentacaoController`✅ | `Movimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### OUTROS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit | Tests E2E |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|-----------|
| 45 | `cadastros.ejs` | N/A (estático) | N/A | N/A | N/A | ❌ | N/A | N/A | N/A |

---

## Resumo Estatístico

### Por Camada

| Camada | Total | Implementado | Parcial | Pendente | % Completo |
|--------|-------|--------------|---------|----------|------------|
| **Views (EJS)** | 44 | 44 | 0 | 0 | 100% |
| **Controllers** | 44 | 44 | 0 | 0 | 100% |
| **Models DB** | 44 | 42 | 0 | 2 | 95% |
| **Services Backend** | 44 | 2 | 0 | 42 | 5% |
| **Features BDD** | 44 | 11 | 0 | 33 | 25% |
| **CSS Modular** | 44 | 2 | 0 | 42 | 5% |
| **JS Services** | 44 | 2 | 0 | 42 | 5% |
| **Tests Unit** | 44 | 1 | 0 | 43 | 2% |
| **Tests E2E** | 44 | 1 | 0 | 43 | 2% |

### Modelos DB Existentes (20)

1. ✅ `Usuario`
2. ✅ `Ciclo`
3. ✅ `CicloCestas`
4. ✅ `CicloEntregas`
5. ✅ `CicloProdutos`
6. ✅ `Cesta`
7. ✅ `Produto`
8. ✅ `CategoriaProdutos`
9. ✅ `PontoEntrega`
10. ✅ `Oferta`
11. ✅ `OfertaProdutos`
12. ✅ `Composicoes`
13. ✅ `ComposicaoOfertaProdutos`
14. ✅ `ComposicaoCestaProdutos`
15. ✅ `ComposicaoCestaOpcoes`
16. ✅ `PedidoConsumidores`
17. ✅ `PedidoConsumidoresProdutos`
18. ✅ `PedidosFornecedores`
19. ✅ `Movimentacao`
20. ✅ `TipoMovimentacao`

### Features BDD Disponíveis (11)

1. 🧪 `usuario.feature`
2. 🧪 `ciclo.feature`
3. 🧪 `cesta.feature`
4. 🧪 `produto.feature`
5. 🧪 `categoriaprodutos.feature`
6. 🧪 `pontoentrega.feature`
7. 🧪 `oferta.feature`
8. 🧪 `oferta-ui.feature` (E2E)
9. 🧪 `composicao.feature`
10. 🧪 `pedidoconsumidores.feature`
11. 🧪 `relatorios.feature`

### Services Backend Implementados (2)

1. ✅ `OfertaService` - Operações AJAX de ofertas
2. ✅ `PedidoConsumidoresService` - Gestão de pedidos

### Frontend Modularizado (2 telas)

| Tela | CSS Comum | CSS Específico | JS Service | JS Utils |
|------|-----------|----------------|------------|----------|
| **Oferta** | `common.css`✅ | `pages/oferta.css`✅ | `oferta.service.js`✅ | `feedback.js`✅ |
| **PedidoConsumidores** | `common.css`✅ | `pages/pedidoConsumidores.css`✅ | `pedidoConsumidores.service.js`✅ | `feedback.js`✅ |

---

## Arquitetura de Modernização (Padrão Estabelecido)

### Estrutura CSS
```
/public/css/
├── common.css                    # Design system global (348 linhas)
└── pages/
    ├── oferta.css                # ✅ Implementado (361 linhas)
    ├── pedidoConsumidores.css    # ✅ Implementado (~350 linhas)
    ├── composicao.css            # ❌ Pendente
    └── ...
```

### Estrutura JavaScript
```
/public/js/
├── services/
│   ├── api.service.js                  # ✅ Base HTTP (62 linhas)
│   ├── oferta.service.js               # ✅ Ofertas (21 linhas)
│   ├── pedidoConsumidores.service.js   # ✅ Pedidos (~90 linhas)
│   └── ...
└── utils/
    ├── feedback.js                     # ✅ Toast notifications (73 linhas)
    └── ...
```

### Estrutura de Testes
```
/tests/
└── unit/
    ├── services/
    │   └── oferta.service.test.js  # ✅ 9 testes
    └── utils/
        └── feedback.test.js        # ✅ 21 testes

/features/
├── *.feature              # BDD backend
└── step_definitions/
    └── support/
        └── page-objects/  # Page Objects para E2E
```

---

## Prioridades de Modernização

### Alta Prioridade - Telas Principais

| # | Tela | Impacto | Complexidade | Status |
|---|------|---------|--------------|--------|
| 1 | `oferta.ejs` | Alto | Média | ✅ Completo |
| 2 | `pedidoConsumidores.ejs` | Alto | Alta | ✅ Completo |
| 3 | `composicao.ejs` | Alto | Alta | ❌ Pendente |
| 4 | `ciclo.ejs` | Médio | Média | ❌ Pendente |
| 5 | `index.ejs` | Alto | Média | ❌ Pendente |

### Média Prioridade - Telas de Cadastro

| # | Tela | Impacto | Complexidade | Status |
|---|------|---------|--------------|--------|
| 6 | `produto.ejs` | Médio | Baixa | ❌ Pendente |
| 7 | `usuario.ejs` | Médio | Baixa | ❌ Pendente |
| 8 | `categoria.ejs` | Baixo | Baixa | ❌ Pendente |
| 9 | `cesta.ejs` | Baixo | Baixa | ❌ Pendente |
| 10 | `pontoentrega.ejs` | Baixo | Baixa | ❌ Pendente |

### Baixa Prioridade - Relatórios

| # | Tela | Impacto | Complexidade | Status |
|---|------|---------|--------------|--------|
| 11 | `pedidosFornecedoresTodos.ejs` | Médio | Média | ❌ Pendente |
| 12 | `pedidosConsumidoresTodos.ejs` | Médio | Média | ❌ Pendente |
| 13 | `relatorioProdutosCiclos.ejs` | Baixo | Baixa | ❌ Pendente |

---

## Padrão de Implementação

Para cada tela a ser modernizada, seguir:

```
1. ✅ Verificar/Atualizar Controller
2. ✅ Criar/Verificar Service Backend (se necessário API)
3. ✅ Criar CSS específico em /css/pages/
4. ✅ Criar JS Service em /js/services/ (se AJAX)
5. ✅ Refatorar View (remover CSS/JS inline)
6. 🧪 Criar/Atualizar Feature BDD
7. 🧪 Criar testes unitários
8. 🧪 Criar testes E2E (se interativo)
```

---

## Métricas de Progresso

### Modernização Frontend

| Métrica | Atual | Meta | % |
|---------|-------|------|---|
| Views com CSS modular | 2 | 44 | 5% |
| Views com JS modular | 2 | 15* | 13% |
| Testes unitários JS | 30 | 100 | 30% |
| Testes E2E | 10 | 50 | 20% |

*Nem todas as views precisam de JS modular

### Cobertura de Testes

| Tipo | Cenários/Testes | Status |
|------|-----------------|--------|
| BDD Backend | 11 features | ✅ |
| Unit Frontend | 30 testes | ✅ |
| E2E Interface | 10 cenários | ✅ |

---

## Histórico de Atualizações

### 2025-11-13 - Modernização da Tela de Ofertas
- ✅ CSS modularizado (common.css + oferta.css)
- ✅ JS Services (api.service.js + oferta.service.js)
- ✅ Sistema de feedback (toast notifications)
- ✅ Testes unitários (30 passando)
- ✅ Testes E2E (10 cenários)

### 2025-11-21 - Correções de Bugs e Modernização de PedidoConsumidores
- ✅ Corrigido coluna "valor" em ComposicaoOfertaProdutos (migration)
- ✅ Corrigidos erros de alias Sequelize em composicaoSql.js
- ✅ Adicionada associação OfertaProdutos em ComposicaoOfertaProdutos
- ✅ Corrigidos links na tela ciclo-index (IDs de CicloCestas dinâmicos)
- ✅ sql_populate.sql tornado idempotente e completo
- ✅ Modernizada tela de pedidoConsumidores.ejs
  - CSS modularizado (pedidoConsumidores.css)
  - JS Service (pedidoConsumidores.service.js)
  - Progress steps, cards modernos, summary card
  - Integração com common.css e feedback.js
- ✅ Limpeza de código e remoção de arquivos obsoletos
  - Removidos LimiteSolarController e ProfileController
  - Removidas rotas /limitesolar e /profile
  - Removidos 10 arquivos obsoletos (~2.100 linhas)
- 📊 10 commits realizados (5 fixes + 1 refactor + 3 docs + 1 chore)

---

**Última atualização**: 2025-11-21
**Documento gerado por**: Claude Code Agent
