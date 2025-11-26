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

---

## Tabela Principal de Integração

### AUTENTICAÇÃO E USUÁRIOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 1 | `index.ejs` | `IndexController`✅ | `Usuario`✅ `Ciclo`✅ `PedidoConsumidores`✅ | ❌ | `index.feature`🧪 (10 cenários) | `common.css`✅ `pages/index.css`✅ | N/A | N/A |
| 2 | `usuario.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ |
| 3 | `usuario-index.ejs` | `UsuarioIndexController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ |
| 4 | `usuario-edit.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | `usuario.feature`🧪 | ❌ | ❌ |
| 5 | `usuarionovo.ejs` | `UsuarioController`✅ | `Usuario`✅ | ❌ | ❌ | ❌ | ❌ |

### CICLOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 7 | `ciclo.ejs` | `CicloController`✅ | `Ciclo`✅ `CicloCestas`✅ `CicloEntregas`✅ `CicloProdutos`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ |
| 8 | `ciclo-index.ejs` | `CicloIndexController`✅ | `Ciclo`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ |
| 9 | `ciclo-edit.ejs` | `CicloController`✅ | `Ciclo`✅ | ❌ | `ciclo.feature`🧪 | ❌ | ❌ |

### CESTAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 10 | `cesta.ejs` | `CestaController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ |
| 11 | `cesta-index.ejs` | `CestaIndexController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ |
| 12 | `cesta-edit.ejs` | `CestaController`✅ | `Cesta`✅ | ❌ | `cesta.feature`🧪 | ❌ | ❌ |

### PRODUTOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 13 | `produto.ejs` | `ProdutoController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ |
| 14 | `produto-index.ejs` | `ProdutoIndexController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ |
| 15 | `produto-edit.ejs` | `ProdutoController`✅ | `Produto`✅ | ❌ | `produto.feature`🧪 | ❌ | ❌ |

### CATEGORIAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 16 | `categoria.ejs` | `CategoriaController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ |
| 17 | `categoria-index.ejs` | `CategoriaIndexController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ |
| 18 | `categoria-edit.ejs` | `CategoriaController`✅ | `CategoriaProdutos`✅ | ❌ | `categoriaprodutos.feature`🧪 | ❌ | ❌ |

### PONTOS DE ENTREGA

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 19 | `pontoentrega.ejs` | `PontoEntregaController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ |
| 20 | `pontoentrega-index.ejs` | `PontoEntregaIndexController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ |
| 21 | `pontoentrega-edit.ejs` | `PontoEntregaController`✅ | `PontoEntrega`✅ | ❌ | `pontoentrega.feature`🧪 | ❌ | ❌ |

### OFERTAS (FORNECEDORES)

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 22 | `oferta.ejs` | `OfertaController`✅ | `Oferta`✅ `OfertaProdutos`✅ | `OfertaService`✅ | `oferta.feature`🧪 | `common.css`✅ `pages/oferta.css`✅ | `api.service.js`✅ `oferta.service.js`✅ | `oferta.service.test.js`✅🧪 |
| 23 | `oferta-index.ejs` | `OfertaIndexController`✅ | `Oferta`✅ | ❌ | `oferta.feature`🧪 | ❌ | ❌ |

### COMPOSIÇÃO DE CESTAS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 24 | `composicao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ `ComposicaoOfertaProdutos`✅ `ComposicaoCestaProdutos`✅ `ComposicaoCestaOpcoes`✅ | ❌ | `composicao.feature`🧪 | ❌ | ❌ | ❌ |
| 25 | `composicaoofertassobras.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | `composicao.feature`🧪 | ❌ | ❌ | ❌ |
| 26 | `composicaoofertassobrasConfirmacao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 27 | `composicaopedidosextras.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 28 | `composicaopedidosextrasConfirmacao.ejs` | `ComposicaoController`✅ | `Composicoes`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### PEDIDOS DE CONSUMIDORES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 29 | `pedidoConsumidores.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ `PedidoConsumidoresProdutos`✅ | `PedidoConsumidoresService`✅ | `pedidoconsumidores.feature`🧪 (9/9 cenários) | `common.css`✅ `pages/pedidoConsumidores.css`✅ | `api.service.js`✅ `pedidoConsumidores.service.js`✅ | `pedidoConsumidores.service.test.js`✅🧪 |
| 30 | `pedidoConsumidoresConfirmacao.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ | ❌ | `pedidoconsumidores.feature`🧪 | ❌ | ❌ | ❌ |
| 31 | `pedidosConsumidoresTodos.ejs` | `PedidoConsumidoresController`✅ | `PedidoConsumidores`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 32 | `pedidosConsumidoresCiclos.ejs` | `RelatorioController`✅ | `PedidoConsumidores`✅ `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 33 | `pedidosConsumidoresCiclosProdutos.ejs` | `RelatorioController`✅ | `PedidoConsumidores`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 34 | `pedidosConsumidoresCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### RELATÓRIOS FORNECEDORES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 35 | `pedidosFornecedoresTodos.ejs` | `ComposicaoController`✅ | `Oferta`✅ `OfertaProdutos`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ |
| 36 | `pedidosFornecedoresIndiv.ejs` | `ComposicaoController`✅ | `Oferta`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 37 | `pedidosFornecedoresSobra.ejs` | `ComposicaoController`✅ | `Oferta`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 38 | `pedidosFornecedoresCiclos.ejs` | `RelatorioController`✅ | `Oferta`✅ `Ciclo`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ |
| 39 | `pedidosFornecedoresCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### RELATÓRIOS DE PRODUTOS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 40 | `relatorioProdutosCiclos.ejs` | `RelatorioController`✅ | `Produto`✅ `Ciclo`✅ | ❌ | `relatorios.feature`🧪 | ❌ | ❌ | ❌ |
| 41 | `relatorioProdutosCiclosSelecao.ejs` | `RelatorioController`✅ | `Ciclo`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### MOVIMENTAÇÕES

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
| 42 | `movimentacao.ejs` | `MovimentacaoController`✅ | `Movimentacao`✅ `TipoMovimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 43 | `movimentacao-index.ejs` | `MovimentacaoIndexController`✅ | `Movimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 44 | `movimentacaoTodos.ejs` | `MovimentacaoController`✅ | `Movimentacao`✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### OUTROS

| # | View (EJS) | Controller | Model DB | Service | Feature BDD | CSS Modular | JS Service | Tests Unit |
|---|------------|------------|----------|---------|-------------|-------------|------------|------------|
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
| **Tests Unit** | 44 | 2 | 0 | 42 | 5% |

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

### Features BDD Disponíveis (12)

1. 🧪 `index.feature` - **10 cenários** (Página inicial, filtragem de ciclos, perfis)
2. 🧪 `usuario.feature`
3. 🧪 `ciclo.feature`
4. 🧪 `cesta.feature`
5. 🧪 `produto.feature`
6. 🧪 `categoriaprodutos.feature`
7. 🧪 `pontoentrega.feature`
8. 🧪 `oferta.feature`
9. 🧪 `composicao.feature`
10. 🧪 `pedidoconsumidores.feature` - **9 cenários**
11. 🧪 `relatorios.feature`
12. 🧪 ~~`oferta-ui.feature`~~ (E2E removido - Mac ARM)

### Services Backend Implementados (2)

1. ✅ `OfertaService` - Operações AJAX de ofertas
2. ✅ `PedidoConsumidoresService` - Gestão completa de pedidos (10 métodos implementados)

### Frontend Modularizado (3 telas)

| Tela | CSS Comum | CSS Específico | JS Service | JS Utils |
|------|-----------|----------------|------------|----------|
| **Index** | `common.css`✅ | `pages/index.css`✅ | N/A | N/A |
| **Oferta** | `common.css`✅ | `pages/oferta.css`✅ | `oferta.service.js`✅ | `feedback.js`✅ |
| **PedidoConsumidores** | `common.css`✅ | `pages/pedidoConsumidores.css`✅ | `pedidoConsumidores.service.js`✅ | `feedback.js`✅ |

---

## Arquitetura de Modernização (Padrão Estabelecido)

### Estrutura CSS
```
/public/css/
├── common.css                    # Design system global (348 linhas)
└── pages/
    ├── index.css                 # ✅ Implementado (~630 linhas) - NOVO
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
    │   ├── api.service.test.js               # ✅ 14 testes (NOVO)
    │   ├── oferta.service.test.js            # ✅ 9 testes
    │   └── pedidoConsumidores.service.test.js # ✅ 14 testes (NOVO)
    └── utils/
        └── feedback.test.js                  # ✅ 21 testes

/features/
├── *.feature              # 14 features BDD backend
└── step_definitions/
    └── support/
        └── factories.js   # Factories para testes
```

**Nota sobre testes E2E:**
- Testes de UI (Puppeteer) foram removidos (incompatibilidade Mac ARM)
- Testes de interface serão feitos **manualmente**
- Foco em testes BDD backend + testes unitários

---

## Prioridades de Modernização

### Alta Prioridade - Telas Principais

| # | Tela | Impacto | Complexidade | Status |
|---|------|---------|--------------|--------|
| 1 | `index.ejs` | Alto | Média | ✅ Completo |
| 2 | `oferta.ejs` | Alto | Média | ✅ Completo |
| 3 | `pedidoConsumidores.ejs` | Alto | Alta | ✅ Completo |
| 4 | `composicao.ejs` | Alto | Alta | ❌ Pendente |
| 5 | `ciclo.ejs` | Médio | Média | ❌ Pendente |

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
| Views com CSS modular | 3 | 44 | 7% |
| Views com JS modular | 2 | 15* | 13% |
| Testes unitários JS | 58 | 100 | 58% |
| Testes E2E | 0 | Manual | N/A |

*Nem todas as views precisam de JS modular
**Testes E2E removidos - interface testada manualmente

### Cobertura de Testes

| Tipo | Cenários/Testes | Status |
|------|-----------------|--------|
| BDD Backend | 14 features | ✅ |
| Unit Frontend (Services) | 37 testes (3 arquivos) | ✅ |
| Unit Frontend (Utils) | 21 testes (1 arquivo) | ✅ |
| **Total Unitários** | **58 testes** | ✅ |
| E2E Interface | ~~10 cenários~~ Removido | ⚠️ Manual |

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

### 2025-11-22 - Remoção de Testes E2E e Expansão de Testes Unitários
- ❌ Removidos testes E2E com Puppeteer (4 arquivos, ~750 linhas)
  - `oferta-ui.feature` (10 cenários)
  - `oferta_ui_steps.js`
  - `browser-helper.js`
  - `page-objects/oferta-page.js`
  - Razão: Incompatibilidade Mac ARM + Docker
- ✅ Removida dependência Puppeteer (70 pacotes)
- ✅ Atualizado Rakefile com tasks de teste
  - `rake testes:test` - Todos os testes (BDD + Unit)
  - `rake testes:bdd` - Apenas BDD backend
  - `rake testes:unit` - Apenas testes unitários
- ✅ **Fase 1 - Testes Unitários de Services Frontend**
  - Criado `api.service.test.js` (14 testes)
  - Criado `pedidoConsumidores.service.test.js` (14 testes)
  - Total: +28 testes unitários
  - **58 testes unitários** no total (100% passando)
- 📊 Cobertura de services: 3/3 (api, oferta, pedidoConsumidores)
- ⚠️ Testes de UI agora são **manuais**

### 2025-11-25 - Implementação Completa dos Testes BDD de PedidoConsumidores
- ✅ **Resultado: 9/9 cenários passando (100%), 47 steps executados**
- ✅ **8 novos métodos no PedidoConsumidoresService**:
  - `buscarPedidoPorId()` - Busca pedido com includes completos
  - `adicionarProdutoAoPedido()` - Adiciona/atualiza produto
  - `atualizarQuantidadeProduto()` - Atualiza quantidade específica
  - `calcularValorTotalPedido()` - Calcula total do pedido
  - `atualizarStatusPedido()` - Atualiza status
  - `listarProdutosDoPedido()` - Lista produtos com detalhes
  - `listarPedidosDoConsumidor()` - Lista pedidos do consumidor
  - `listarPedidosDoCiclo()` - Lista pedidos do ciclo
- ✅ **Correção crítica no model PedidoConsumidores**:
  - Removidos `cicloId` e `usuarioId` de `init()`
  - FKs mantidos apenas em migrations (padrão Oferta)
  - Corrige erro "FOREIGN KEY constraint failed"
- ✅ **Implementados 7 cenários BDD** (PDC-02 a PDC-08):
  - PDC-02: Ver detalhes do pedido
  - PDC-03: Adicionar produto ao pedido
  - PDC-04: Atualizar quantidade de produto
  - PDC-05: Calcular valor total do pedido
  - PDC-06: Atualizar status do pedido
  - PDC-07: Listar pedidos do consumidor
  - PDC-08: Listar pedidos do ciclo
- ✅ **Melhorias nos testes**:
  - Adicionado Before hook para reset de variáveis globais
  - Criada `PedidoConsumidoresProdutosFactory` com Faker
  - Uso consistente de services (não Model.create())
  - Step condicional para "salvo as alterações"
- ✅ **Limpeza de dependências**:
  - Removida `cucumber@6.0.7` do package.json
- 📊 **Arquivos modificados**: 6 arquivos (+745 linhas, -107 linhas)
- 🐛 **Bugs corrigidos**: 5 erros documentados com soluções
- 📝 **Documentação**: Histórico completo adicionado ao agent.md
- 🎓 **Insight principal**: Comparação com modelo Oferta revelou padrão correto de FKs

### 2025-11-26 - Modernização da Tela Index (Página Inicial) com Acessibilidade Alta
- ✅ **Página inicial modernizada com foco em acessibilidade para usuários mais velhos e inexperientes**
- ✅ **Criado `app/public/css/pages/index.css`** (~630 linhas):
  - Section headers com gradientes
  - Cycle info cards (informações do ciclo)
  - Action cards com 5 estados (active/inactive/admin/personal)
  - Touch targets grandes (44px+ WCAG AA)
  - Ícones 80x80px (48px internos)
  - Badges de status visíveis ("DISPONÍVEL"/"INDISPONÍVEL")
  - 4 breakpoints responsivos (desktop, tablet, mobile, muito pequeno)
  - Suporte a `prefers-contrast: high`
  - Suporte a `prefers-reduced-motion: reduce`
  - Print styles otimizados
- ✅ **Refatorado `app/src/views/index.ejs`** (~550 linhas):
  - HTML semântico (`<section>`, `<article>`, `<time>`)
  - ARIA labels completos em todos os cards
  - `role="list"` e `role="listitem"` para navegação
  - `aria-labelledby` para associar seções
  - `.sr-only` para leitores de tela
  - Estado vazio (quando não há ciclos)
  - Cards inteiros clicáveis (touch target grande)
  - Backup criado: `index.ejs.bak`
- ✅ **5 tipos de cards por ciclo**:
  1. Oferta de Produtos (Fornecedor)
  2. Composição das Cestas (Admin)
  3. Pedidos Extras (Consumidor)
  4. Lista para Entrega (Fornecedor)
  5. Relatório de Entrega (Consumidor)
- ✅ **Seção Pessoal** (1 card): Dados Pessoais
- ✅ **Seção Admin** (4 cards): Ciclos, Relatório Fornecedores, Relatório Consumidores, Cadastros
- 🎯 **Características de acessibilidade implementadas**:
  - Textos grandes (títulos 1.375rem, datas 1.125rem)
  - Alto contraste (verde vibrante para ativo, cinza para inativo)
  - Barra superior colorida (6px) em cada card
  - Badges sempre visíveis no topo direito
  - Focus por teclado (outline 4px laranja)
  - Fonte monospace para datas (legibilidade de números)
  - Grid responsivo `auto-fill minmax(300px, 1fr)`
  - Opacidade reduzida em cards inativos (0.7)
  - Cursor `not-allowed` em cards inativos
- 📊 **Estatísticas**:
  - 630 linhas CSS criadas
  - 550 linhas HTML refatoradas
  - 3 telas modernizadas (index, oferta, pedidoConsumidores)
  - Progresso: 7% (3/44 views com CSS modular)
- ♿ **WCAG AA alcançado**:
  - Contraste mínimo 4.5:1
  - Touch targets 44px+
  - HTML semântico com landmarks
  - Navegação por teclado completa
  - Suporte a leitores de tela
  - Preferências do sistema respeitadas
- 🎓 **Lição principal**: Visual design é 80% da acessibilidade - estados óbvios reduzem carga cognitiva

---

**Última atualização**: 2025-11-26
**Documento gerado por**: Claude Code Agent
