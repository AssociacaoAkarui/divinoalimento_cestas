# 🧪 Guia de Testes - Divino Alimento

Este documento descreve a estratégia de testes implementada para a interface de ofertas.

## 📋 Índice

- [Estrutura de Testes](#estrutura-de-testes)
- [Tipos de Testes](#tipos-de-testes)
- [Executando Testes](#executando-testes)
- [Escrevendo Novos Testes](#escrevendo-novos-testes)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Estrutura de Testes

```
app/
├── features/
│   ├── oferta.feature              # Testes backend (BDD)
│   ├── oferta-ui.feature           # Testes frontend E2E (BDD)
│   └── step_definitions/
│       ├── oferta_steps.js         # Steps backend
│       ├── oferta_ui_steps.js      # Steps frontend
│       └── support/
│           ├── browser-helper.js   # Wrapper Puppeteer
│           ├── factories.js        # Data factories
│           └── page-objects/
│               └── oferta-page.js  # Page Object da tela oferta
├── tests/
│   └── unit/
│       ├── services/
│       │   └── oferta.service.test.js    # Testes unitários do service
│       └── utils/
│           └── feedback.test.js          # Testes unitários do feedback
├── .mocharc.json                   # Configuração Mocha
├── cucumber.js                     # Configuração Cucumber
└── package.json                    # Scripts de teste
```

---

## 🎯 Tipos de Testes

### 1️⃣ Testes E2E (End-to-End) - Cucumber + Puppeteer

**O que testa:** Interação completa do usuário com a interface real no navegador.

**Localização:** `features/oferta-ui.feature`

**Cenários implementados:**
- ✅ OFE-UI-01: Visualizar progress steps do ciclo
- ✅ OFE-UI-02: Buscar produto em tempo real
- ✅ OFE-UI-03: Adicionar quantidade com botão +
- ✅ OFE-UI-04: Diminuir quantidade com botão -
- ✅ OFE-UI-05: Atualizar quantidade via AJAX sem reload
- ✅ OFE-UI-06: Contador de produtos em tempo real
- ✅ OFE-UI-07: Validar responsividade mobile
- ✅ OFE-UI-08: Painel de produtos ofertados atualiza dinamicamente
- ✅ OFE-UI-09: Limpar busca mostra todos os produtos
- ✅ OFE-UI-10: Validar feedback visual ao adicionar produto

### 2️⃣ Testes Unitários - Mocha + Chai + JSDOM

**O que testa:** Lógica isolada de componentes JavaScript.

**Localização:** `tests/unit/`

**Arquivos:**
- `services/oferta.service.test.js` - Testa OfertaService (requisições AJAX)
- `utils/feedback.test.js` - Testa sistema de notificações toast

---

## 🚀 Executando Testes

### Comandos

```bash
# Todos os testes (backend BDD)
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de interface (E2E)
npm run test:ui

# Todos os testes
npm run test:all
```

### Testes Específicos

```bash
# Executar cenário específico por tag
npx cucumber features/oferta-ui.feature --tags "@OFE-UI-01"

# Executar teste unitário específico
npx mocha tests/unit/utils/feedback.test.js

# Modo debug (ver browser)
HEADLESS=false npm run test:ui
```

---

## 🐛 Troubleshooting

### Erro: "Navigation timeout"
**Solução:** Certifique-se que o servidor está rodando com `npm run dev`

### Erro: "Element not found"
**Solução:** Use `waitForSelector` antes de interagir com elementos

---

**Última atualização:** 2025-11-13
