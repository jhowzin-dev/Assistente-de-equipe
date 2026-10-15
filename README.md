# 🤖 Assistente de Equipe

![Assistente de Equipe](./img/image.png)

Bot Microsoft Teams desenvolvido com **Microsoft 365 Agents Toolkit** e Teams SDK v2. Baseado no template Basic Bot, pronto para evoluir em um assistente real de equipe.

## 🚀 Rodando localmente

**Pré-requisitos**
- Node.js 22
- Microsoft 365 Agents Toolkit VS Code Extension ≥5.0 ou CLI

```bash
npm install
npm run dev:teamsfx:playground
# ou F5 no VS Code > Debug in Microsoft 365 Agents Playground
```

O Playground abre em `http://localhost:56150`. O bot escuta em `http://127.0.0.1:3978`.

## 📁 Estrutura

- `app.ts` → lógica do bot, handler de mensagens e estado
- `index.ts` → inicialização do app
- `appPackage/manifest.json` → nome, descrição e metadados do app
- `m365agents.yml` / `m365agents.playground.yml` → configuração do Toolkit
- `env/` → variáveis por ambiente

## 💬 Comandos disponíveis

Atualmente o bot é um echo com estado por conversa:

- Qualquer mensagem → `[n] you said: <texto>`
- `/reset` → apaga estado da conversa
- `/count` → mostra quantas mensagens você enviou
- `/state` → exibe JSON do estado salvo
- `/diag` → exibe a activity completa
- `/runtime` → exibe versão Node e SDK

Estado é armazenado em `LocalStorage` por `conversationId`.

## 🛠️ Próximos passos

- Trocar o echo por intenções reais em `app.ts`
- Adicionar Adaptive Cards e comandos no manifest
- Integrar Microsoft Graph com autenticação
- Persistência real: Cosmos DB / SQL
- Publicar para Teams via Toolkit

## 📝 Objetivo

Criar base limpa para um assistente de trabalho, com evolução gradual para automações, notificações e integração com dados da organização.