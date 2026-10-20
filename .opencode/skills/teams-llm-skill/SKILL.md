---
name: teams-llm-skill
description: Convenções de IA/LLM para bot Microsoft Teams — Copilot Studio, Bot Framework Connector, RAG, tool calling, multi-agente, guardrails, automação backend e persistência. Use ao adicionar IA ao bot, orquestrar agentes ou integrar dados externos. Não use para código base do bot — teams-bot-skill.
---

# Teams LLM Skill

## 1. Quando aplicar

| Situação | Aplicar |
| -------- | ------- |
| Adicionar IA/LLM ao bot | Sim |
| RAG, tool calling, multi-agente | Sim |
| Orquestração com guardrails | Sim |
| Automação backend, SharePoint | Sim |
| Código base Teams SDK | Não — teams-bot-skill |

## 2. Capacidades

- Copilot Studio: alternativa low-code com IA
- Bot Framework Connector / LLM: RAG, tool calling, multi-agente
- Orquestração de agentes: modelo, RAG, guardrails
- Automação de backend: disparar bot, enviar cards, integrar SharePoint
- Persistência: Cosmos DB / SQL para estado real

## 3. Regras

- Governança de segurança e permissões
- Confirmar ações destrutivas
- Logar erros sem expor detalhes internos
- Não inventar dados; usar Graph quando necessário

## 4. Integração

- Entrada via activity Teams
- Saídas curtas + cards acionáveis
- Estado por conversationId

