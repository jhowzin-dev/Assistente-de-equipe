---
name: teams-bot-skill
description: Convenções canônicas do bot Microsoft Teams com Teams SDK v2 + Microsoft 365 Agents Toolkit — mensagens, Adaptive Cards, estado por conversationId, comandos de diagnóstico e integração Graph. Use ao ler, escrever ou revisar app.ts, index.ts, manifest.json, m365agents.yml ou ao definir contratos de mensagens. Não use para IA/LLM avançada — teams-llm-skill.
---

# Teams Bot Skill

Base de conhecimento do bot Teams: fatos do repositório, regras de camada, comandos e anti-padrões.
Não é perfil de comportamento — comportamento está nos agents teams-implementer e teams-frontend-engineer.

## 1. Quando aplicar

| Situação | Aplicar |
| -------- | ------- |
| Alterações em app.ts, index.ts | Sim |
| manifest.json, m365agents.yml | Sim |
| Comandos /reset /count /state /diag /runtime | Sim |
| Adaptive Cards e UI Teams | Sim |
| IA/LLM, RAG, tool calling | Não — teams-llm-skill |
| Especificação de feature | Não — orchestrator |

## 2. Princípios

| Princípio | Como se traduz |
| --------- | -------------- |
| Estado isolado | conversationId → LocalStorage hoje |
| Mensagens curtas | Saídas objetivas + card opcional |
| Segurança | Confirmar ações sensíveis, respeitar permissões |
| Veracidade | Não inventar dados; usar Graph quando necessário |

## 3. Convenções de código

- Entrada via activity Teams
- Handler central em app.ts
- Respostas acionáveis com Adaptive Cards
- Logging de negócio em pt-BR; identificadores em inglês

## 4. Ferramentas

| Ferramenta | Para quê |
| ---------- | -------- |
| Microsoft 365 Agents Toolkit | Scaffold, deploy, tunneling, debug |
| Agents Playground / Teams App Test Tool | Teste local sem registro |
| Debug Bot Framework legado | Diagnóstico profundo |

## 5. Goal Gate

- `npm run build` sem erros
- Bot responde `/runtime` e `/diag` no Playground

