# Agent Context - Divino Alimento

## 📋 Padrão de Commits (Conventional Commits)

Este projeto segue o padrão **Conventional Commits** para mensagens de commit padronizadas e geração automática de changelogs.

### Formato Básico

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

#### 🐛 **fix** - Correção de bugs
Corrige um bug no código (correlaciona com PATCH no versionamento semântico).

```bash
git commit -m "fix(oferta): corrige erro ao atualizar quantidade de produtos"
git commit -m "fix(api): resolve problema de timeout em requisições"
git commit -m "fix(auth): corrige validação de token expirado"
```

#### 🚧 **wip** - Work In Progress
Trabalho em andamento, commit temporário que será mesclado depois.

```bash
git commit -m "wip(css): reorganizando estrutura de arquivos"
git commit -m "wip(refactor): extraindo lógica para services"
git commit -m "wip(feature): implementando busca em tempo real"
```

#### ✨ **feat** - Nova funcionalidade
Adiciona uma nova funcionalidade (correlaciona com MINOR no versionamento semântico).

```bash
git commit -m "feat(oferta): adiciona busca em tempo real de produtos"
git commit -m "feat(api): implementa endpoints REST para ofertas"
git commit -m "feat(notificacao): adiciona sistema de toast notifications"
```

#### ♻️ **refactor** - Refatoração de código
Mudança no código que não corrige bug nem adiciona funcionalidade.

```bash
git commit -m "refactor(oferta): extrai CSS inline para arquivos externos"
git commit -m "refactor(ajax): move lógica para camada de services"
git commit -m "refactor(controller): simplifica lógica de validação"
```

#### 📝 **docs** - Documentação
Apenas mudanças na documentação.

```bash
git commit -m "docs(readme): atualiza instruções de instalação"
git commit -m "docs(api): adiciona documentação dos endpoints"
git commit -m "docs(context): cria padrão de commits"
```

#### 🎨 **style** - Formatação
Mudanças que não afetam o significado do código (espaços, formatação, ponto-e-vírgula).

```bash
git commit -m "style(oferta): formata indentação do CSS"
git commit -m "style: aplica prettier em todo o projeto"
git commit -m "style(js): remove console.logs desnecessários"
```

#### 🧪 **test** - Testes
Adiciona ou corrige testes.

```bash
git commit -m "test(pedido): adiciona testes para PDC-02"
git commit -m "test(service): cria testes unitários para OfertaService"
git commit -m "test(integration): adiciona testes de integração da API"
```

#### ⚡ **perf** - Performance
Melhoria de performance.

```bash
git commit -m "perf(oferta): otimiza carregamento de produtos"
git commit -m "perf(css): reduz tamanho dos arquivos CSS"
git commit -m "perf(query): adiciona índices no banco de dados"
```

#### 🔧 **chore** - Manutenção
Tarefas de manutenção, build, configs, dependências.

```bash
git commit -m "chore(deps): atualiza dependências do projeto"
git commit -m "chore(build): configura webpack"
git commit -m "chore: adiciona .gitignore"
```

#### 🔥 **ci** - Integração Contínua
Mudanças em arquivos de CI/CD.

```bash
git commit -m "ci: adiciona GitHub Actions"
git commit -m "ci(deploy): configura pipeline de deploy"
```

#### ⏪ **revert** - Reverter commit
Reverte um commit anterior.

```bash
git commit -m "revert: reverte commit abc123"
```

---

### Escopos Comuns no Projeto

Use escopos para indicar qual parte do sistema foi afetada:

- **oferta** - Página/módulo de ofertas
- **pedido** - Pedidos de consumidores
- **composicao** - Composição de cestas
- **produto** - Produtos
- **usuario** - Usuários
- **ciclo** - Ciclos de entrega
- **cesta** - Cestas
- **api** - APIs e endpoints
- **service** - Camada de serviços
- **controller** - Controladores
- **model** - Modelos/entidades
- **view** - Views/templates
- **css** - Estilos
- **js** - JavaScript
- **auth** - Autenticação
- **db** - Banco de dados

---

### Exemplos Completos

#### Commit com corpo e rodapé
```bash
git commit -m "feat(oferta): adiciona atualização automática via AJAX

- Implementa OfertaService para requisições API
- Adiciona feedback visual com toast notifications
- Atualiza painel de produtos ofertados em tempo real

Closes #42"
```

#### Breaking Change
```bash
git commit -m "feat(api)!: altera estrutura de resposta da API

BREAKING CHANGE: A resposta agora retorna { success, data, error } 
ao invés de apenas os dados. Clientes precisam atualizar."
```

#### Múltiplas mudanças relacionadas
```bash
git commit -m "refactor(css): reestrutura arquivos CSS

- Cria common.css com estilos globais
- Extrai estilos específicos para pages/oferta.css
- Remove 642 linhas de CSS inline do oferta.ejs
- Implementa arquitetura híbrida (comum + específico)

Melhora cache e manutenibilidade"
```

---

### 🚫 Exemplos de Commits Ruins

❌ **Evite:**
```bash
git commit -m "mudanças"
git commit -m "fix bug"
git commit -m "atualização"
git commit -m "wip"
git commit -m "ajustes no código"
```

✅ **Prefira:**
```bash
git commit -m "fix(oferta): corrige cálculo de quantidade total"
git commit -m "wip(refactor): extraindo lógica de validação"
git commit -m "feat(api): adiciona endpoint de busca de produtos"
git commit -m "refactor(service): move lógica AJAX para OfertaService"
```

---

### 📌 Boas Práticas

1. **Use imperativos**: "adiciona" não "adicionado" ou "adicionando"
2. **Seja específico**: Mencione o que mudou, não "corrige bug"
3. **Limite a 72 caracteres**: Descrição curta deve ser concisa
4. **Use escopo**: Facilita navegação no histórico
5. **Commits atômicos**: Um commit = uma mudança lógica
6. **WIP temporário**: Use `wip` para commits que serão squashed depois

---

### 🔍 Buscar no Histórico

```bash
# Ver todos os commits de um tipo
git log --oneline --grep="^feat"

# Ver commits de um escopo
git log --oneline --grep="(oferta)"

# Ver commits de correção
git log --oneline --grep="^fix"
```

---

### 🛠️ Ferramentas Recomendadas

- **commitlint** - Valida mensagens de commit
- **husky** - Git hooks para validar antes do commit
- **commitizen** - Interface CLI para criar commits
- **conventional-changelog** - Gera changelog automaticamente

---

### 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## 🎯 Resumo Rápido

| Tipo | Emoji | Quando usar |
|------|-------|-------------|
| `fix` | 🐛 | Corrige bug |
| `feat` | ✨ | Nova funcionalidade |
| `refactor` | ♻️ | Refatora código existente |
| `wip` | 🚧 | Trabalho em andamento |
| `docs` | 📝 | Atualiza documentação |
| `style` | 🎨 | Formatação de código |
| `test` | 🧪 | Adiciona/corrige testes |
| `perf` | ⚡ | Melhora performance |
| `chore` | 🔧 | Manutenção/build |

---

**Última atualização:** 2025-01-13
**Responsável:** Equipe Divino Alimento

---

## 📅 Histórico de Desenvolvimento

### 2025-11-13 | 12:00-13:15 (~75 min) - Refatoração Completa da Tela de Ofertas

**Objetivo:** Modernizar a interface e arquitetura da tela de ofertas, criando um padrão reutilizável para outras telas.

#### 🏗️ Arquitetura Frontend

**1. Camada de Services (38674cf)**
- ✅ Criado `app/public/js/services/api.service.js` (62 linhas)
  - Classe base com métodos HTTP (GET, POST, PUT, DELETE)
  - Tratamento centralizado de erros
  - Configuração de headers padrão
  
- ✅ Criado `app/public/js/services/oferta.service.js` (21 linhas)
  - `buscarProdutos(termo, usuarioId)` - Busca de produtos
  - `atualizarQuantidade(produtoId, quantidade, ofertaId)` - Update AJAX
  - `obterProdutosOferta(ofertaId)` - Lista produtos ofertados

**2. Sistema de Feedback (c39e235)**
- ✅ Criado `app/public/js/utils/feedback.js` (73 linhas)
  - Sistema de toast notifications
  - Métodos: `success()`, `error()`, `warning()`, `info()`
  - Animações CSS (slideIn/slideOut)
  - Auto-dismiss após 2 segundos

#### 🎨 Refatoração CSS

**3. CSS Modularizado (3bb2a94, 1733ece, 73ce11a)**
- ✅ Criado `app/public/css/common.css` (348 linhas)
  - Design system completo com variáveis CSS
  - Componentes reutilizáveis: cards, buttons, alerts, dropdowns
  - Sistema de cores, sombras, border-radius
  - Layout: header, container, grid
  - Utilitários de acessibilidade
  - Media queries responsivas
  
- ✅ Criado `app/public/css/pages/oferta.css` (361 linhas)
  - Progress steps (indicador visual do ciclo)
  - Product grid e cards com hover effects
  - Quantity controls (+/- buttons)
  - Summary card (produtos ofertados)
  - Bottom bar (fixada no rodapé)
  - Estilos mobile-first

- ✅ Refatorado `app/src/views/oferta.ejs`
  - Removidas 622 linhas de CSS inline
  - Adicionadas 456 linhas de HTML semântico
  - Redução líquida: 166 linhas
  - Melhor separação de responsabilidades

#### ⚙️ Backend REST API

**4. Endpoints REST (abe6de0)**
- ✅ Refatorado `app/src/controllers/OfertaController.js` (566 linhas modificadas)
  - Criados endpoints REST para operações CRUD
  - Separação entre rotas tradicionais e API
  - Respostas padronizadas: `{ success, data, error }`
  
- ✅ Atualizado `app/src/routes.js` (+13 endpoints)
  - `GET /api/produtos/buscar` - Busca de produtos
  - `POST /api/oferta/atualizar-quantidade` - Update quantidade
  - `GET /api/oferta/:id/produtos` - Lista produtos da oferta

#### ✨ Funcionalidades Implementadas

**Interface:**
- 🎯 Progress steps visual (4 etapas do ciclo)
- 🔍 Busca em tempo real de produtos (filtro client-side)
- 📊 Grid responsivo de produtos
- ➕➖ Controles de quantidade interativos
- 📦 Painel de produtos ofertados (summary card)
- 🎨 Visual feedback (cards mudam cor ao adicionar quantidade)
- 📱 Bottom bar com contador e botão de envio
- 👥 Dropdown de seleção de fornecedor (admin)

**Funcionalidades AJAX:**
- ⚡ Atualização de quantidade sem reload da página
- 🔄 Refresh automático do painel de ofertados
- 🎯 Feedback visual instantâneo (toast notifications)
- ⏱️ Debounce na busca (300ms)
- 🔢 Contador de produtos em tempo real

#### 📊 Estatísticas

**Código removido/otimizado:**
- CSS inline: -622 linhas (movido para arquivos externos)
- Total de código CSS: +709 linhas (melhor organizado)
- JavaScript modular: +156 linhas (services + feedback)
- Endpoints REST: +13 rotas

**Arquivos criados:**
- `app/public/css/common.css`
- `app/public/css/pages/oferta.css`
- `app/public/js/services/api.service.js`
- `app/public/js/services/oferta.service.js`
- `app/public/js/utils/feedback.js`

**Commits realizados:**
```
73ce11a - refactor(oferta): remove CSS inline e usa arquivos externos
1733ece - refactor(css): cria oferta.css com estilos específicos
3bb2a94 - refactor(css): cria common.css com estilos globais
abe6de0 - feat(api): implementa endpoints REST para ofertas
c39e235 - feat(js): adiciona sistema de notificações toast
38674cf - feat(js): adiciona camada de services para APIs
```

#### 🎯 Padrão Estabelecido

Esta refatoração estabelece um **padrão reutilizável** para outras telas:

**Estrutura CSS:**
```
/css
  ├── common.css        # Design system global
  └── pages/
      ├── oferta.css    # Estilos específicos
      ├── pedido.css    # Próximas telas...
      └── ...
```

**Estrutura JS:**
```
/js
  ├── services/
  │   ├── api.service.js     # Base HTTP
  │   ├── oferta.service.js  # Domain-specific
  │   └── ...
  └── utils/
      ├── feedback.js         # Notifications
      └── ...
```

**Benefícios:**
- ✅ Cache otimizado (CSS comum compartilhado)
- ✅ Manutenibilidade (separação de responsabilidades)
- ✅ Reutilização de código (design system)
- ✅ Performance (menos inline styles)
- ✅ Escalabilidade (padrão para novas telas)

#### 🔄 Próximos Passos

- [ ] Aplicar padrão em outras telas (pedido, composição, etc.)
- [ ] Criar mais componentes reutilizáveis no common.css
- [ ] Expandir camada de services para outros módulos
- [x] Implementar testes para os services ✅
- [ ] Documentar componentes CSS

---

### 2025-11-13 | 13:15-14:45 (~90 min) - Implementação de Testes Automatizados de Interface

**Objetivo:** Criar suite completa de testes automatizados para a interface de ofertas, cobrindo testes E2E e unitários.

#### 🧪 Infraestrutura de Testes

**1. Dependências Instaladas**
```json
{
  "puppeteer": "^24.30.0",    // Browser automation (E2E)
  "mocha": "^11.7.5",          // Test runner (unit tests)
  "jsdom": "^27.2.0",          // DOM virtual (unit tests)
  "sinon": "^21.0.0"           // Mocks e stubs
}
```

**2. Scripts de Teste Configurados** (`package.json`)
- `npm test` - Testes Cucumber backend (existentes)
- `npm run test:unit` - Testes unitários (Mocha)
- `npm run test:ui` - Testes E2E de interface (Cucumber + Puppeteer)
- `npm run test:all` - Todos os testes

#### 📁 Estrutura Criada

```
app/
├── features/
│   ├── oferta-ui.feature              # 10 cenários E2E de interface
│   └── step_definitions/
│       ├── oferta_ui_steps.js         # 200+ linhas de steps
│       └── support/
│           ├── browser-helper.js      # 200 linhas - Wrapper Puppeteer
│           └── page-objects/
│               └── oferta-page.js     # 350 linhas - Page Object
├── tests/
│   └── unit/
│       ├── services/
│       │   └── oferta.service.test.js  # 9 testes unitários
│       └── utils/
│           └── feedback.test.js        # 21 testes unitários
├── .mocharc.json                       # Configuração Mocha
└── README.tests.md                     # Documentação completa
```

#### 🎯 Testes E2E (End-to-End) - Puppeteer + Cucumber

**Cenários Implementados:** 10 cenários de teste de interface

**OFE-UI-01:** Visualizar progress steps do ciclo
- Valida indicador visual de progresso
- Verifica step ativo ("Seleção Produtos")

**OFE-UI-02:** Buscar produto em tempo real
- Testa filtro client-side
- Valida produtos visíveis/ocultos

**OFE-UI-03:** Adicionar quantidade com botão +
- Testa incremento de quantidade
- Valida destaque visual (classe `has-quantity`)

**OFE-UI-04:** Diminuir quantidade com botão -
- Testa decremento de quantidade

**OFE-UI-05:** Atualizar quantidade via AJAX sem reload
- **Crítico:** Valida que AJAX funciona
- Verifica notificação toast
- Confirma que página NÃO recarregou

**OFE-UI-06:** Contador de produtos em tempo real
- Testa atualização dinâmica do contador no rodapé
- Valida sincronização com produtos adicionados

**OFE-UI-07:** Validar responsividade mobile
- Simula viewport mobile (375x667)
- Verifica layout de 1 coluna
- Valida scroll horizontal do progress

**OFE-UI-08:** Painel de produtos ofertados atualiza dinamicamente
- Testa summary card
- Valida atualização automática após AJAX

**OFE-UI-09:** Limpar busca mostra todos os produtos
- Testa reset do filtro

**OFE-UI-10:** Validar feedback visual ao adicionar produto
- Testa mudança de cor do card
- Valida toast notification

#### 🧩 Arquitetura - Page Object Pattern

**BrowserHelper** (200 linhas)
- Abstração do Puppeteer
- Métodos: `goto()`, `click()`, `type()`, `waitForSelector()`, `evaluate()`
- Suporte a screenshots, viewports customizados
- Configurável via env vars: `HEADLESS`, `DEBUG_BROWSER`

**OfertaPage** (350 linhas)
- Encapsula toda interação com `oferta.ejs`
- 50+ métodos públicos
- Seletores centralizados (fácil manutenção)
- Métodos principais:
  - `abrirPagina(queryParams)`
  - `buscarProduto(termo)`
  - `clicarBotaoMais/Menos(nomeProduto)`
  - `definirQuantidade(produto, qtd)`
  - `obterContadorTotal()`
  - `verificarToast(tipo)`
  - `simularMobile/Desktop()`

**Benefícios do Page Object:**
- ✅ Mudou HTML? Atualiza só o Page Object
- ✅ Reutilização de código
- ✅ Testes mais legíveis
- ✅ Manutenção centralizada

#### 🔬 Testes Unitários - Mocha + Chai + Sinon

**30 testes passando** ✅

**OfertaService** (9 testes)
- `buscarProdutos()` - 3 testes
  - Sem filtro
  - Com termo de busca
  - Com usuarioId
- `atualizarQuantidade()` - 3 testes
  - POST com dados corretos
  - Resposta de sucesso
  - Resposta de erro
- `obterProdutosOferta()` - 2 testes
  - Buscar produtos
  - Lista vazia
- Tratamento de erros - 1 teste
  - Network error

**Feedback** (21 testes)
- `show()` - 8 testes
  - Criar elemento DOM
  - Classes corretas (success/error)
  - Estilos inline
  - Tipo padrão
  - Adicionar ao body
  - Remover após 2300ms
  - Animação de saída
- `success/error/warning/info()` - 8 testes
  - Chamar show() corretamente
  - Criar toast com classe adequada
- Múltiplos toasts - 2 testes
  - Simultâneos
  - Remoção independente
- Acessibilidade - 3 testes
  - Contraste (texto branco)
  - z-index alto
  - Padding adequado

**Técnicas Utilizadas:**
- **JSDOM** - DOM virtual para testar JavaScript
- **Sinon** - Mock de `fetch`, `setTimeout`
- **Fake Timers** - Controle de tempo (testes de animação)

#### 📊 Cobertura de Testes

| Tipo | Quantidade | Linhas de Código | Status |
|------|-----------|------------------|--------|
| **E2E Interface** | 10 cenários | ~750 linhas | ✅ Implementado |
| **Unit Tests** | 30 testes | ~600 linhas | ✅ 100% passando |
| **Backend BDD** | 6 cenários | - | ✅ Existente |
| **Infraestruura** | - | ~550 linhas | ✅ Completo |
| **TOTAL** | **46 testes** | **~1.900 linhas** | ✅ |

#### 🚀 Como Executar

```bash
# Testes unitários (rápidos, ~100ms)
npm run test:unit

# Testes E2E (requer servidor rodando)
npm start  # Terminal 1
npm run test:ui  # Terminal 2

# Modo debug (ver browser)
HEADLESS=false npm run test:ui

# Todos os testes
npm run test:all
```

#### 🏗️ Padrões Estabelecidos

**Para criar novos testes E2E:**
1. Adicionar cenário em `features/*.feature`
2. Implementar steps em `step_definitions/*_steps.js`
3. Adicionar métodos no Page Object se necessário

**Para criar testes unitários:**
1. Criar arquivo em `tests/unit/**/*.test.js`
2. Usar Mocha + Chai + JSDOM
3. Mock de dependências externas com Sinon

#### 📚 Documentação

- ✅ `README.tests.md` - Guia completo de testes
- ✅ `.mocharc.json` - Configuração Mocha
- ✅ Comentários inline em todos os arquivos
- ✅ Exemplos de uso em cada teste

#### 🎓 Boas Práticas Implementadas

1. **Testes independentes** - Não dependem de ordem
2. **Page Object Pattern** - Separação de responsabilidades
3. **Waits inteligentes** - `waitForSelector` ao invés de `setTimeout`
4. **Hooks de limpeza** - `After` para cleanup
5. **Nomenclatura descritiva** - Testes auto-explicativos
6. **Arrange-Act-Assert** - Estrutura clara
7. **Mock de dependências** - Isolamento de testes unitários

#### 🔄 CI/CD Ready

**Variáveis de ambiente suportadas:**
- `TEST_BASE_URL` - URL do servidor (default: localhost:3000)
- `HEADLESS` - Browser headless (default: true)
- `DEBUG_BROWSER` - Logs do browser (default: false)

**Compatível com:**
- ✅ GitHub Actions
- ✅ GitLab CI
- ✅ Jenkins
- ✅ Qualquer CI com Node.js

#### 📈 Benefícios Alcançados

✅ **Confiabilidade** - Detecta regressões automaticamente  
✅ **Documentação viva** - Testes servem como documentação  
✅ **Refatoração segura** - Testes garantem que funcionalidades não quebram  
✅ **Qualidade** - Valida comportamento esperado  
✅ **Manutenibilidade** - Page Object facilita atualizações  
✅ **Velocidade** - Unit tests executam em ~100ms  
✅ **Cobertura** - E2E + Unit cobrem camadas diferentes  

#### 🎯 Próximos Passos

- [x] ~~Executar testes E2E (requer servidor)~~ - **Abandonado** (ver seção abaixo)
- [ ] Adicionar testes para outras telas (pedido, composição)
- [ ] Configurar CI/CD pipeline
- [ ] Adicionar cobertura de código (Istanbul/NYC)
- [ ] Criar testes de performance (Lighthouse)

---

### 2025-11-12 | Implementação da Camada de Serviços - PedidoConsumidores

**Objetivo:** Extrair a lógica de negócio do `PedidoConsumidoresController` para a camada de serviços, seguindo os padrões já estabelecidos no projeto (Clean Architecture, uso de `ServiceError`, `filterPayload`, `normalizePayload`).

#### 🏗️ Trabalho Realizado

**1. Criação da Classe `PedidoConsumidoresService`**

Arquivo: `app/src/services/services.js`

**Métodos implementados:**
- `criarPedidoConsumidor(dados)`
  - Validações: campos permitidos (`cicloId`, `usuarioId`, `status`, `observacao`)
  - Verifica existência do Ciclo e Usuário
  - Usa `filterPayload` e `normalizePayload`
  - Lança `ServiceError` com contexto

- `buscarOuCriarPedidoConsumidor(cicloId, usuarioId)`
  - Buscar pedido existente ou criar novo (evita duplicação)
  - Usa `findOrCreate` do Sequelize
  - Status padrão: "ativo"
  - Validação: requer `cicloId` e `usuarioId`

**2. Atualização do Controller**

Arquivo: `app/src/controllers/PedidoConsumidoresController.js`
- Import de `PedidoConsumidoresService` e `ServiceError`
- Instância do service dentro dos métodos (não global)
- Método `showCreateEdit` refatorado para usar service
- Tratamento de erro adequado

**3. Testes BDD**

Arquivo: `app/features/pedidoconsumidores.feature`

**Cenários implementados:**
- PDC-01: Criar um novo pedido de consumidor ✅
- PDC-09: Buscar ou criar pedido de consumidor (sem duplicação) ✅

**Steps:** `app/features/step_definitions/pedidoconsumidores_steps.js`
- Factory criada: `PedidoConsumidoresFactory`
- Compartilhamento de `cicloAtivo` via `this.cicloAtivo`

#### 📊 Métricas

| Item | Valor |
|------|-------|
| Linhas de código | ~150 |
| Métodos criados | 2 |
| Testes BDD | 2 cenários (10 steps) |
| Arquivos modificados | 6 |
| Cobertura | 2/8 cenários |

#### ✅ Padrões Seguidos

1. Arquitetura em Camadas: Controller → Service → Model
2. Validação de Payload: `filterPayload` e `normalizePayload`
3. Tratamento de Erros: `ServiceError` consistente
4. Instanciação de Services: Dentro dos métodos
5. TDD/BDD: Testes escritos antes da implementação
6. Nomenclatura: Convenções do projeto
7. DRY: Reuso de steps compartilhados

#### 🎯 Cenários Restantes (Sugeridos)

1. PDC-02: Ver detalhes de um pedido existente
2. PDC-03: Adicionar produto a um pedido
3. PDC-04: Atualizar quantidade de produto
4. PDC-05: Calcular valor total do pedido
5. PDC-06: Atualizar status do pedido
6. PDC-07: Listar pedido de um consumidor
7. PDC-08: Listar todos os pedidos de um ciclo

---

### 2025-11-21 | Tentativa de Execução dos Testes E2E - NÃO FUNCIONOU

**Objetivo:** Executar os testes E2E de interface (Puppeteer + Cucumber) que foram criados em 2025-11-13.

#### ❌ Problemas Encontrados

**1. Incompatibilidade Docker + Mac ARM + Puppeteer**
- Puppeteer não consegue rodar dentro do container Docker em Mac ARM (Apple Silicon)
- Erro: `rosetta error: failed to open elf at /lib64/ld-linux-x86-64.so.2`
- O Chrome/Chromium do Puppeteer é x86 e não roda via emulação no Docker ARM

**2. Configuração de Banco de Dados**
- Testes BDD backend usam PostgreSQL (`db.dev`)
- Testes E2E precisam de SQLite para rodar localmente
- `NODE_ENV=test` usa SQLite em memória (`:memory:`), mas isso impede compartilhamento entre processos

**3. Arquitetura dos Testes E2E**
- Os testes criam dados via Services (camada backend)
- O servidor roda em processo separado com seu próprio banco
- Dados criados nos testes não existem no banco do servidor
- Tentativa de usar arquivo SQLite (`/tmp/test-db.sqlite`) não resolveu o problema de sincronização

**4. Modificações Tentadas (todas revertidas)**
- `server.js`: Adicionado bloco `NODE_ENV=test` com sync do banco
- `config/config.js`: Alterado SQLite de `:memory:` para arquivo
- `hook.js`: Filtro para não sincronizar banco em testes `@oferta-ui`
- `oferta-page.js`: Corrigido path da rota (`/oferta/:id` em vez de `/oferta`)
- `oferta_ui_steps.js`: Passando `cicloId` para navegação
- `compose.tests.yml`: Exposição de porta 13001
- `Rakefile`: Novas tasks para testes E2E

**5. Erros Sequenciais**
```
1. SequelizeHostNotFoundError: db.dev → Resolvido com NODE_ENV=test
2. SQLITE_ERROR: no such table → Servidor não sincronizava banco em test
3. ServiceError: Falha ao criar ponto de entrega → Dados locais vs servidor
4. Timeout 5000ms → Página não carregava corretamente
5. curl travando → Servidor com problema na rota /oferta/:id
```

#### 🔄 Ações Tomadas

1. **Revertido tudo**: `git checkout -- .` para voltar ao estado limpo
2. **Decisão**: Testes E2E serão feitos manualmente por enquanto
3. **Mantidos**: Testes unitários (Mocha) continuam funcionando

#### 📝 Lições Aprendidas

1. **Testes E2E com Puppeteer** requerem:
   - Mesmo ambiente (banco compartilhado) entre testes e servidor
   - Ou API de seed para criar dados no servidor
   - Ou rodar tudo no mesmo processo

2. **Docker + Mac ARM** não é ideal para Puppeteer:
   - Preferir rodar testes localmente
   - Ou usar CI/CD em ambiente Linux x86

3. **SQLite em memória** não permite compartilhamento entre processos

4. **Arquitetura alternativa para E2E**:
   - Criar endpoints de API para seed de dados de teste
   - Ou usar banco PostgreSQL em Docker para testes
   - Ou abandonar Puppeteer e usar testes de API + testes manuais de UI

#### ✅ O Que Continua Funcionando

- Testes unitários: `npm run test:unit` (30 testes passando)
- Testes BDD backend: `npm test` (Cucumber)
- Infraestrutura de Page Objects está pronta para uso futuro

#### 🎯 Recomendação Futura

Se quiser reativar testes E2E:
1. Usar ambiente CI (GitHub Actions) com Linux x86
2. Criar endpoint `/api/test/seed` para popular dados de teste
3. Ou migrar para Playwright (melhor suporte cross-platform)

---

### 2025-11-21 | Modernização da Tela de Pedidos de Consumidores

**Objetivo:** Aplicar o mesmo padrão de modernização da tela de ofertas na tela de pedidos de consumidores.

#### 📁 Arquivos Criados/Modificados

**1. CSS Modular**
- ✅ Criado `app/public/css/pages/pedidoConsumidores.css` (~350 linhas)
  - Progress steps (indicador visual do fluxo)
  - Product grid e cards com hover effects
  - Quantity controls (+/- buttons)
  - Summary card (resumo do pedido com totais)
  - Cesta da semana card
  - Bottom bar fixa
  - Responsividade mobile

**2. JS Service**
- ✅ Criado `app/public/js/services/pedidoConsumidores.service.js` (~90 linhas)
  - `atualizarQuantidade()` - Update AJAX
  - `obterProdutosPedido()` - Lista produtos
  - `confirmarPedido()` - Finalizar pedido
  - `removerProduto()` - Remover item
  - `calcularTotais()` - Cálculo de valores
  - `formatarValor()` - Formatação R$

**3. View Refatorada**
- ✅ Refatorado `app/src/views/pedidoConsumidores.ejs`
  - Removido CSS inline
  - Removido JS inline (extraído para script organizado)
  - Adicionado header consistente com oferta.ejs
  - Progress steps (4 etapas: Ciclo Ativo → Seleção → Pedido Enviado → Finalizado)
  - Cards de produto modernos com +/- buttons
  - Summary card com totais e taxa administrativa
  - Bottom bar fixa com contador e botão confirmar
  - Integração com common.css e feedback.js

#### 🎨 Elementos Visuais Implementados

| Elemento | Descrição |
|----------|-----------|
| **Header** | Título + dropdown de consumidores (admin) |
| **Progress Steps** | 4 etapas visuais do fluxo do pedido |
| **Cesta Card** | Exibe observação do ciclo (cesta da semana) |
| **Summary Card** | Resumo com itens, valores e taxa |
| **Product Grid** | Grid responsivo de produtos disponíveis |
| **Product Card** | Nome, medida, fornecedor, disponibilidade, preço, controles |
| **Quantity Control** | Botões +/- com validação de estoque |
| **Bottom Bar** | Contador de produtos + total + botão confirmar |

#### 🎯 Funcionalidades

- ✅ Busca em tempo real de produtos (filtro client-side)
- ✅ Controles de quantidade com +/- e validação de estoque máximo
- ✅ Cálculo automático de totais (produtos + taxa administrativa)
- ✅ Visual feedback (cards mudam cor ao adicionar quantidade)
- ✅ Dropdown de seleção de consumidor (admin)
- ✅ Responsividade mobile
- ✅ Integração com sistema de feedback (toast notifications)

#### 📊 Comparação Antes/Depois

| Aspecto | Antes | Depois |
|---------|-------|--------|
| CSS | Arquivo próprio com cores fortes | common.css + pedidoConsumidores.css |
| JS | Inline no HTML | Service modularizado |
| Header | Genérico | Consistente com oferta.ejs |
| Progress | Não tinha | 4 etapas visuais |
| Quantidade | Select dropdown | Botões +/- modernos |
| Resumo | Inline verde | Summary card destacado |
| Bottom | Botão no meio | Barra fixa com totais |

#### 📁 Estrutura Final

```
/public/css/
├── common.css                          # Design system global
└── pages/
    ├── oferta.css                      # ✅ Ofertas
    └── pedidoConsumidores.css          # ✅ Pedidos (NOVO)

/public/js/
├── services/
│   ├── api.service.js                  # Base HTTP
│   ├── oferta.service.js               # Ofertas
│   └── pedidoConsumidores.service.js   # Pedidos (NOVO)
└── utils/
    └── feedback.js                     # Toast notifications
```

#### 🔄 Backup

- Backup da view original: `pedidoConsumidores.ejs.bak`

#### ⚠️ STATUS: AGUARDANDO TESTE

**Sessão interrompida em:** 2025-11-21

**O que foi feito:**
- ✅ CSS criado: `public/css/pages/pedidoConsumidores.css`
- ✅ JS Service criado: `public/js/services/pedidoConsumidores.service.js`
- ✅ View refatorada: `src/views/pedidoConsumidores.ejs`
- ✅ Backup criado: `pedidoConsumidores.ejs.bak`
- ✅ Documentação atualizada: `docs/integracao.md` e `.context/agent.md`

**Pendente ao retornar:**
1. Testar a nova interface de pedidoConsumidores.ejs
2. O servidor crashou mas NÃO por causa da nossa mudança - erro é de banco de dados:
   - `column "valor" does not exist` na tabela `ComposicaoOfertaProdutos`
   - Isso é problema de migração/schema, não da view
3. Validar sintaxe EJS da nova view
4. Se houver erros na view, corrigir ou restaurar backup

**Para restaurar backup (se necessário):**
```bash
cp app/src/views/pedidoConsumidores.ejs.bak app/src/views/pedidoConsumidores.ejs
```

**Próximas telas para modernizar (prioridade):**
1. `composicao.ejs` - Alta prioridade
2. `ciclo.ejs` - Média prioridade
3. `index.ejs` - Alta prioridade

---

### 2025-11-21 | Correções de Bugs e Melhorias no Sistema

**Objetivo:** Corrigir erros de banco de dados, associações Sequelize e melhorar script de populate.

#### 🐛 Problemas Corrigidos

**1. Coluna "valor" ausente em ComposicaoOfertaProdutos**
- ❌ Erro: `column "valor" does not exist`
- ✅ Solução: Criada migration `20251121000000-composicaoofertaprodutos-add-valor.js`
- Adiciona coluna `valor REAL` na tabela
- Commit: `1bfcf63` - fix(db)

**2. Erros de Alias em Associações Sequelize**
- ❌ Erro: `EagerLoadingError: composicaoOfertaProdutos doesn't match composicao`
- ✅ Solução: Corrigido em `app/src/db/composicaoSql.js`
  - Linha 291: `as: "composicao"` (era "composicaoOfertaProdutos")
  - Linha 478: `as: "composicao"`
  - Linha 534: `as: "composicao"`
  - Linha 567: `as: "composicoes"` (era "cicloCesta")
- Commit: `8baff20` - fix(composicao)

**3. Associação Faltante: ComposicaoOfertaProdutos → OfertaProdutos**
- ❌ Erro: `OfertaProdutos is not associated to ComposicaoOfertaProdutos`
- ✅ Solução: Adicionada associação em `app/models/composicaoofertaprodutos.js`
  ```javascript
  ComposicaoOfertaProdutos.belongsTo(models.OfertaProdutos, {
    foreignKey: "ofertaProdutoId",
    as: "ofertaProduto",
  });
  ```
- Commit: `a8ffe18` - fix(model)

**4. Links Quebrados na Tela ciclo-index**
- ❌ Problema: `/composicao/1?cst=` sem ID do CicloCesta
- ✅ Solução: Modificado `CicloService.listarCiclos()` em `services.js`
  - Inclui `CicloCestas` no findAndCountAll
  - Busca dinâmica de cestas auxiliares (cestaId=1 e cestaId=5)
  - Adiciona propriedades `cicloCestaOfertas_1` e `cicloCestaPedidosExtras_5`
- Links agora funcionam: `/composicao/1?cst=<ID_CORRETO>`
- Commit: `af5bc55` - feat(ciclo)

#### 📊 Melhorias no sql_populate.sql

**Problema:** Script não era idempotente e faltavam dados essenciais

**Soluções implementadas:**
- ✅ Tornado completamente idempotente usando `INSERT...SELECT...WHERE NOT EXISTS`
- ✅ Adicionadas cestas auxiliares do sistema:
  - Cesta id=1: "Itens Adicionais Oferta"
  - Cesta id=5: "Pedidos Adicionais"
- ✅ Adicionados CicloCestas auxiliares:
  - id=1: ciclo 1 + cesta 1 (Itens Adicionais)
  - id=2: ciclo 1 + cesta 5 (Pedidos Adicionais)
  - id=3: ciclo 1 + cesta 2 (Divino Alimento, 30 unidades)
- ✅ Criados dados de teste completos:
  - Ponto de entrega (id=1)
  - Ciclo ativo (id=1, status "oferta")
  - Usuário fornecedor (id=100, evita conflito com admin id=1)
  - 10 produtos (5 frutas + 5 verduras)
  - 1 oferta com 10 produtos
- Commit: `c8567d3` - chore(sql)

#### 🔍 Descobertas de Arquitetura

**Cestas Auxiliares do Sistema:**
- `cestaSql.js` (linhas 50-85): Cria cestas id=1 e id=5 automaticamente se não existirem
- `cicloSql.js` (linhas 390-398): Cria CicloCestas para cestas auxiliares quando ciclo é criado
- Agora `sql_populate.sql` garante que essas cestas existam desde o início

**Padrão de Associações Sequelize:**
- `belongsTo` usa alias singular (ex: `composicao`, `ofertaProduto`)
- `hasMany` usa alias plural (ex: `composicoes`, `composicaoOfertaProdutos`)
- Ao fazer `include` em query, usar o alias correto da direção da relação

#### 📈 Estatísticas

| Aspecto | Valor |
|---------|-------|
| Commits | 5 |
| Arquivos modificados | 5 |
| Migration criada | 1 |
| Bugs corrigidos | 4 |
| Linhas no sql_populate | +140 |
| Push para remote | ✅ Codeberg |

#### 🚀 Como Usar

**Popular banco de dados:**
```bash
rake vivo:popular  # Pode rodar múltiplas vezes sem duplicar
```

**Rodar migration:**
```bash
rake vivo:migrate
```

**Testar aplicação:**
```bash
rake vivo:restart
# Acesse: http://localhost:13000/ciclo-index
```

#### ✅ Refatoração Completa: Tela de Pedidos de Consumidores

**Commit:** `50de439` - refactor(pedidoConsumidores)

**Arquivos criados/modificados:**
- ✅ `app/src/views/pedidoConsumidores.ejs` - View refatorada
- ✅ `app/public/css/pages/pedidoConsumidores.css` - CSS modular (~350 linhas)
- ✅ `app/public/js/services/pedidoConsumidores.service.js` - Service layer (~90 linhas)
- 📦 Backup: `pedidoConsumidores.ejs.bak`

**Melhorias implementadas:**
- CSS inline extraído para arquivo externo
- Service layer com métodos AJAX
- Progress steps (4 etapas do ciclo)
- Cards de produto modernos com controles +/-
- Summary card com totais e taxa administrativa
- Bottom bar fixa com contador e botão confirmar
- Integração com common.css e feedback.js
- Visual feedback em tempo real
- Responsividade mobile

**Estatísticas:**
- +1.016 linhas adicionadas
- -412 linhas removidas
- Testado e aprovado para produção

#### 🎯 Próximos Passos

- [ ] Aplicar padrão de modernização em outras telas:
  - [ ] `composicao.ejs` - Alta prioridade
  - [ ] `index.ejs` - Alta prioridade
  - [ ] `ciclo.ejs` - Média prioridade

---

### 2025-11-21 | Limpeza de Código e Remoção de Arquivos Obsoletos

**Objetivo:** Remover arquivos antigos, features não utilizadas e limpar referências no código.

#### 🗑️ Arquivos Removidos

**Controllers e Views:**
- `LimiteSolarController.js` e `limitesolar.ejs` - Feature não utilizada
- `ProfileController.js` e `profile.ejs` - Feature não utilizada

**CSS:**
- `limitesolar.css` - CSS órfão sem view correspondente

**Backups antigos:**
- `oferta copy.ejs`
- `oferta_bk20230306.ejs`
- `old_pedidosFornecedoresTodos.ejs`

**Código obsoleto:**
- `produtoSql_30112022.js` - Código antigo não utilizado

#### 🔧 Alterações em routes.js

**Imports removidos:**
- `LimiteSolarController`
- `ProfileController`
- Objeto `profile` (não utilizado)

**Rotas removidas:**
- `GET /limitesolar` → LimiteSolarController.showIndex
- `GET /profile` → ProfileController.index (duplicada)
- `POST /profile` → ProfileController.update
- `GET /profile` → inline render (duplicada)

#### 📊 Estatísticas

| Item | Valor |
|------|-------|
| Arquivos deletados | 10 |
| Linhas removidas | 2.107 |
| Controllers removidos | 2 |
| Rotas removidas | 4 |
| Imports limpos | 3 |

#### ✅ Verificação de Impacto

- ✅ Nenhuma referência ativa no código
- ✅ Aplicação testada após remoções
- ✅ Nenhum crash ou erro
- ✅ Routes.js limpo e organizado

#### 🎯 Benefícios

- Codebase mais limpo e manutenível
- Menos confusão com arquivos antigos
- Routes.js mais legível
- Redução de ~2.100 linhas de código morto

**Commit:** `5780e57` - chore: remove arquivos obsoletos e rotas não utilizadas

---

### 2025-11-22 | Remoção de Testes de UI Não Funcionais

**Objetivo:** Remover testes de interface E2E (Puppeteer) que não funcionavam em Mac ARM, mantendo apenas os testes que funcionam.

#### 🗑️ Arquivos de Teste Removidos

**Testes E2E de Interface (Puppeteer):**
- `app/features/oferta-ui.feature` (10 cenários E2E)
- `app/features/step_definitions/oferta_ui_steps.js` (200+ linhas)
- `app/features/step_definitions/support/browser-helper.js` (200 linhas)
- `app/features/step_definitions/support/page-objects/oferta-page.js` (350 linhas)

**Total removido:** ~750 linhas de código de testes não funcionais

#### ✅ Testes Mantidos (Funcionando)

**Testes BDD Backend (Cucumber):**
- 14 features funcionando (`app/features/`)
  - `categoriaprodutos.feature`
  - `cesta.feature`
  - `ciclo.feature`
  - `composicao.feature`
  - `mercado.feature`
  - `oferta.feature` (backend)
  - `pedidoconsumidores.feature`
  - `pontoentrega.feature`
  - `produto.feature`
  - `produtocomercializavel.feature`
  - `relatorios.feature`
  - `sessions.feature`
  - `submissaoproduto.feature`
  - `usuario.feature`

**Testes Unitários (Mocha):**
- `tests/unit/services/oferta.service.test.js` (210 linhas) - 9 testes
- `tests/unit/utils/feedback.test.js` (309 linhas) - 21 testes
- **Total:** 30 testes unitários funcionando ✅

**Arquivos de Suporte Mantidos:**
- `app/features/step_definitions/support/factories.js` (usado pelos testes backend)
- Todos os step definitions dos testes backend
- Configuração Mocha (`.mocharc.json`)

#### 📊 Estrutura Final de Testes

```
app/
├── features/
│   ├── *.feature                      # 14 features BDD backend ✅
│   └── step_definitions/
│       ├── *_steps.js                 # Step definitions backend ✅
│       ├── hook.js                    # Hooks dos testes ✅
│       └── support/
│           └── factories.js           # Factories para testes ✅
└── tests/
    └── unit/
        ├── services/
        │   └── oferta.service.test.js  # 9 testes unitários ✅
        └── utils/
            └── feedback.test.js        # 21 testes unitários ✅
```

#### 🎯 Razão da Remoção

Conforme documentado em **2025-11-21**:
- Puppeteer não funciona corretamente em Mac ARM (Apple Silicon)
- Erro: `rosetta error: failed to open elf at /lib64/ld-linux-x86-64.so.2`
- Incompatibilidade Docker + Mac ARM + Puppeteer
- Decisão: Fazer testes de UI de forma manual

#### ✅ O Que Continua Funcionando

| Tipo | Quantidade | Comando | Status |
|------|-----------|---------|--------|
| **BDD Backend** | 14 features | `npm test` | ✅ Funcionando |
| **Testes Unitários** | 30 testes | `npm run test:unit` | ✅ Funcionando |
| **UI Manual** | - | Manual | ✅ Estratégia adotada |

#### 📝 Dependências Removidas

- ✅ `puppeteer: ^24.30.0` - Removido do package.json (70 pacotes dependentes removidos)
- ✅ Script `test:ui` - Removido do package.json
- ✅ `npm install` executado para atualizar node_modules

#### 🎯 Decisão de Testes

**Mantidos:**
- ✅ Testes BDD backend (Cucumber) - Testam lógica de negócio
- ✅ Testes unitários (Mocha) - Testam services e utils

**Removidos:**
- ❌ Testes E2E de UI (Puppeteer) - Não funcionam em Mac ARM

**Estratégia:**
- Testes de interface serão feitos de forma **manual**
- Foco em testes backend e unitários automatizados
- Se necessário E2E no futuro: usar CI/CD em ambiente Linux x86 ou migrar para Playwright

#### 🔧 Atualização do Rakefile

**Tasks de teste atualizadas:**
- `rake testes:test` - Executa **TODOS** os testes (BDD + Unitários)
- `rake testes:bdd` - Executa apenas testes BDD backend (Cucumber)
- `rake testes:bdd[detalhe]` - BDD com output detalhado
- `rake testes:unit` - Executa apenas testes unitários (Mocha)
- `rake testes:all` - Executa todos incluindo @pending
- `rake testes:funcionalidade[nome]` - Testa funcionalidade específica
- `rake testes:tags[expressao]` - Testa por tags

**Mudanças:**
- Renomeado `testes:test` para `testes:bdd` (mais semântico)
- Criado novo `testes:test` que executa BDD + Unit
- Adicionado `testes:unit` para testes Mocha
- Output visual melhorado com separadores

---

### 2025-11-22 | Fase 1 - Testes Unitários de Services (Frontend)

**Objetivo:** Criar testes unitários para os novos services frontend criados nas refatorações anteriores.

#### 📁 Arquivos Criados

**1. Testes para PedidoConsumidoresService**
- ✅ `app/tests/unit/services/pedidoConsumidores.service.test.js` (~440 linhas)
  - 14 testes implementados
  - Cobertura de 6 métodos do service

**2. Testes para ApiService**
- ✅ `app/tests/unit/services/api.service.test.js` (~340 linhas)
  - 14 testes implementados
  - Cobertura completa da classe base

#### 🧪 Cobertura de Testes

**PedidoConsumidoresService (14 testes):**
- `atualizarQuantidade()` - 3 testes
  - POST com dados corretos
  - Retorno de sucesso
  - Tratamento de erro HTTP
- `obterProdutosPedido()` - 2 testes
  - Busca de produtos
  - Lista vazia
- `confirmarPedido()` - 2 testes
  - POST de confirmação
  - Retorno de sucesso
- `removerProduto()` - 2 testes
  - POST para remoção
  - Retorno de sucesso
- `calcularTotais()` - 4 testes
  - Cálculo com produtos
  - Taxa customizada
  - Lista vazia
  - Quantidade zero
- `formatarValor()` - 2 testes
  - Formatação R$
  - Arredondamento

**ApiService (14 testes):**
- `get()` - 3 testes
  - GET com sucesso
  - Erro HTTP
  - Headers customizados
- `post()` - 3 testes
  - POST com body JSON
  - Erro HTTP
  - Options customizadas
- `put()` - 2 testes
  - PUT com body JSON
  - Erro HTTP
- `delete()` - 2 testes
  - DELETE com sucesso
  - Erro HTTP
- `request()` - 4 testes
  - Merge de headers
  - Log de erro no console
  - Propagação de erro
  - Network error

#### 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Novos arquivos de teste | 2 |
| Novos testes | 28 |
| Linhas de código | ~780 |
| Services cobertos | 2/3 (falta OfertaService já tem) |
| Taxa de sucesso | 100% ✅ |

**Total de testes unitários no projeto:**
- Antes: 30 testes (2 arquivos)
- Depois: **58 testes (4 arquivos)** ✅

#### ✅ Ferramentas Utilizadas

- **Mocha** - Test runner
- **Chai** - Assertions
- **Sinon** - Mocks e stubs (fetch, console.error)
- **JSDOM** - Não necessário (services puros)

#### 🎯 Padrões Aplicados

1. **Arrange-Act-Assert** - Estrutura clara
2. **Mock de fetch** - Isolamento de dependências externas
3. **Stub de console.error** - Não poluir output
4. **Testes independentes** - beforeEach/afterEach
5. **Nomenclatura descritiva** - "deve fazer X quando Y"
6. **Cobertura completa** - Todos os métodos públicos testados
7. **Edge cases** - Lista vazia, quantidade zero, errors

#### 🚀 Como Executar

```bash
# Todos os testes unitários
npm run test:unit

# Localmente (sem Docker)
cd app && npm run test:unit

# Com Rake
rake testes:unit
```

#### 🎯 Próximos Passos

**Fase 2 - Completar BDD de PedidoConsumidores:**
- PDC-03: Adicionar produto ao pedido
- PDC-04: Atualizar quantidade
- PDC-05: Calcular valor total
- PDC-06: Atualizar status
- PDC-07: Listar pedido do consumidor
- PDC-08: Listar pedidos do ciclo

---
