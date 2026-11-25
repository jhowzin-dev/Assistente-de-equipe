import { stripMentionsText, TokenCredentials } from "@microsoft/teams.api";
import { App } from "@microsoft/teams.apps";
import { LocalStorage } from "@microsoft/teams.common";
import config from "./config";
import { ManagedIdentityCredential } from "@azure/identity";

const storage = new LocalStorage();

const createTokenFactory = () => {
  return async (scope: string | string[], tenantId?: string): Promise<string> => {
    const managedIdentityCredential = new ManagedIdentityCredential({
      clientId: process.env.CLIENT_ID,
    });
    const scopes = Array.isArray(scope) ? scope : [scope];
    const tokenResponse = await managedIdentityCredential.getToken(scopes, { tenantId });
    return tokenResponse.token;
  };
};

const tokenCredentials: TokenCredentials = {
  clientId: process.env.CLIENT_ID || "",
  token: createTokenFactory(),
};

const credentialOptions =
  config.MicrosoftAppType === "UserAssignedMsi" ? { ...tokenCredentials } : undefined;

const app = new App({
  ...credentialOptions,
  storage,
  skipAuth: !process.env.CLIENT_ID,
});

interface ConversationState { count: number; }

const getConversationState = (conversationId: string): ConversationState => {
  let state = storage.get(conversationId);
  if (!state) { state = { count: 0 }; storage.set(conversationId, state); }
  return state;
};

app.on("message", async (context) => {
  const activity = context.activity;
  const text: string = stripMentionsText(activity);

  if (text === "/reset") { storage.delete(activity.conversation.id); await context.send("Ok I've deleted the current conversation state."); return; }
  if (text === "/count") { const state = getConversationState(activity.conversation.id); await context.send(`The count is ${state.count}`); return; }
  if (text === "/diag") { await context.send(JSON.stringify(activity)); return; }
  if (text === "/state") { const state = getConversationState(activity.conversation.id); await context.send(JSON.stringify(state)); return; }
  if (text === "/runtime") { await context.send(JSON.stringify({ nodeversion: process.version, sdkversion: "2.0.0" })); return; }

  if (text === "/tarefas") {
    await context.send(`[COMANDO] /tarefas
[FONTE] mock
[ATUALIZADO EM] 2026-10-20T00:00:00Z

Tarefa: Revisar PR #42
Vencimento: 2026-10-25
Status: em andamento

Tarefa: Atualizar documentação
Vencimento: 2026-10-28
Status: pendente

Tarefa: Planejar sprint
Vencimento: 2026-11-01
Status: pendente`);
    return;
  }

  if (text === "/status") {
    await context.send(`[COMANDO] /status
[FONTE] mock
[ATUALIZADO EM] 2026-10-20T00:00:00Z

Serviço: API principal
Status: operacional
Observação: resposta simulada para desenvolvimento

Serviço: Banco de dados
Status: operacional
Observação: resposta simulada para desenvolvimento`);
    return;
  }

  if (text === "/deploys") {
    await context.send(`[COMANDO] /deploys
[FONTE] mock
[ATUALIZADO EM] 2026-10-20T00:00:00Z

Deploy: assistente-equipe-prod
App: assistente-equipe
Versão: 1.2.3
Data: 2026-10-18T14:30:00Z
Status: sucesso`);
    return;
  }

  if (text === "/doc") {
    await context.send(`[COMANDO] /doc
[FONTE] mock
[ATUALIZADO EM] 2026-10-20T00:00:00Z

Resultado 1:
Título: Guia de uso do bot Teams
Resumo: Documentação inicial sobre comandos /reset, /count, /diag, /state e /runtime

Resultado 2:
Título: Padrões de mensagens e Adaptive Cards
Resumo: Convenções para respostas simples e cards acionáveis no Teams`);
    return;
  }

  if (text === "/incidentes") {
    await context.send(`[COMANDO] /incidentes
[FONTE] mock
[ATUALIZADO EM] 2026-10-20T00:00:00Z

Incidente: INC-1024
Severidade: média
Aberto em: 2026-10-19T22:10:00Z
Descrição: Latência elevada na API principal`);
    return;
  }

  const state = getConversationState(activity.conversation.id);
  state.count++;
  await context.send(`[${state.count}] you said: ${text}`);
});

export default app;