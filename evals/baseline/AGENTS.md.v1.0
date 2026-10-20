# Assistente de Equipe — Orquestração Teams [ENFORCEMENT v1.0]

---

## 📋 OBRIGATÓRIO — Fluxo de Trabalho

> **QUALQUER modelo de IA que ler este ficheiro DEVE seguir estas regras.**
> **NÃO há exceções. NÃO há atalhos. NÃO é opcional.**
> **VIOLAÇÃO = BLOQUEIO IMEDIATO E ESCALAÇÃO PARA HUMANO.**

---

### 🚫 Regra Central — INVIOLÁVEL

**NUNCA faça análise, revisão, implementação, debug ou teste — de código, infraestrutura ou configuração — diretamente.**

**SEMPRE delega para o agente especialista usando a ferramenta Task.**

**A ÚNICA exceção é pergunta informativa pura (conceitual, sem ler arquivos do projeto).**

---

## 🗺️ Tabela de Roteamento

| Intenção do usuário | Agente Especialista | Skill Necessária | Gatilhos |
|---------------------|--------------------|------------------|----------|
| Analisa/revisa diff/PR | `code-reviewer` | `teams-bot-skill` | "analisa", "revisa", "diff", "PR" |
| Implementa/ altera bot | `teams-implementer` | `teams-bot-skill` | "implementa", `app.ts`, `index.ts`, `manifest` |
| Adaptive Cards / UI Teams | `teams-frontend-engineer` | `teams-bot-skill` | "card", "adaptive", "manifest UI" |
| Testes / comandos Playground | `test-engineer` | `teams-bot-skill` | "testa", "comando", "/runtime", "/diag" |
| IA/LLM, RAG, orquestração | — | `teams-llm-skill` | "IA", "LLM", "RAG", "Copilot" |
| Pedido vago/multi-domínio | `orchestrator` | — | Clareza < 0.7 |
| Pergunta informativa simples | Responder diretamente | N/A | Sem modificar/analisar código |

---

## 🚫 Regras Invioláveis

| # | Regra | Agent |
|---|-------|-------|
| 1 | NUNCA analise código sem delegar | `code-reviewer` |
| 2 | NUNCA implemente sem delegar | `teams-implementer` / `teams-frontend-engineer` |
| 3 | NUNCA teste sem delegar | `test-engineer` |
| 4 | ÚNICA exceção: pergunta informativa | N/A |

**Enforcement:** Violação = BLOQUEIO IMEDIATO + LOG + ESCALAÇÃO

---

## 🗂️ Arquitetura

- **orchestrator**: roteia pedidos vagos/multi-domínio
- **teams-implementer**: `app.ts`, `index.ts`, `appPackage/manifest.json`, `m365agents*.yml`, `env/`
- **teams-frontend-engineer**: Adaptive Cards, UI Teams, manifest
- **code-reviewer**: revisão de diffs/PRs
- **test-engineer**: valida comandos e Playground

### Stack real
Node.js 22 / TypeScript / Teams SDK v2 / Microsoft 365 Agents Toolkit
Ferramentas: Agents Playground / Teams App Test Tool, Debug Bot Framework legado
Evolução: Copilot Studio, Bot Framework Connector/LLM, RAG, orquestração, SharePoint, Cosmos DB/SQL

---

## 🎯 Goal Gate

Não declarar feito sem validar:
- `npm run build` sem erros
- Bot responde a `/runtime` e `/diag` no Playground

---

## 📜 Convenções

- Idioma docs pt-BR, código inglês
- Estado por `conversationId`, hoje LocalStorage
- Confirmar ações sensíveis
- Não inventar dados, usar Graph quando necessário
- Mensagens curtas, cards acionáveis
