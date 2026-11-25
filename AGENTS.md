# Assistente de Equipe — Harness de desenvolvimento

Este harness orienta tarefas de engenharia no repositório. Ele é separado do runtime do bot: o bot atual não executa agentes, LLM ou RAG.

## Roteamento

| Pedido | Agente | Skill |
|---|---|---|
| Revisar diff/PR ou analisar segurança | `code-reviewer` | `teams-bot-skill`; `teams-llm-skill` quando tocar IA/RAG |
| Implementar handlers, estado, configuração ou integração | `teams-implementer` | `teams-bot-skill`; adicionar `teams-llm-skill` para IA/RAG |
| Adaptive Cards ou comandos/UI declarados no manifest | `teams-frontend-engineer` | `teams-bot-skill` |
| Testar ou validar execução no Playground | `test-engineer` | `teams-bot-skill` |
| Pedido ambíguo ou que cruza áreas | `orchestrator` planeja e delega em sequência | Skills relevantes |
| Pergunta conceitual sem análise do repositório | Responder diretamente | — |

O orquestrador deve usar a ferramenta de delegação `task` do runtime OpenCode, passando objetivo, contexto mínimo, arquivos de referência, restrições e resultado esperado. Não inventar nomes de ferramentas. Se não houver `task` disponível, explicar a limitação e não alegar que houve delegação.

## Fluxo de execução

1. Resolver o pedido e identificar se envolve código do bot, UI/manifest, revisão, testes ou IA.
2. Carregar a skill correspondente e verificar as restrições locais.
3. Para tarefa clara e de uma área, delegar ao agente especialista. Para tarefa multiárea, decompor em etapas e delegar sequencialmente, compartilhando resultados necessários.
4. Após implementação, solicitar validação independente quando aplicável.
5. Informar comandos executados, exit codes, evidências e limitações. Não declarar gates interativos como aprovados sem executá-los.

## Permissões e segurança

- Orquestrador, revisor e tarefas de análise: leitura; sem edição.
- Implementadores: edição apenas nos arquivos necessários ao pedido.
- Testes: executar validações solicitadas; editar somente quando a tarefa explicitamente pedir correção de testes.
- Segredos devem permanecer fora do repositório. Não registrar tokens, conteúdo de mensagens ou payloads sensíveis.
- Integrações Teams/Graph devem aplicar autenticação e autorização no servidor, com privilégio mínimo.
- Ações externas com efeito devem validar parâmetros e exigir confirmação quando apropriado.

## Limites e conclusão

- Cada comando delegado deve ter timeout apropriado e resultado/exit code reportado.
- No máximo 5 tentativas para uma mesma validação; parar antes se a falha exigir decisão humana.
- Gate local para mudanças de código: `npm run build` deve terminar com exit code 0.
- Gate de Playground (`/runtime`, `/diag`) é manual/interativo e só pode ser reportado como aprovado quando realmente verificado.
- `npm test` atualmente é um placeholder que retorna erro; não o tratar como suíte funcional.
- Se algum gate não for executado ou falhar, reportar `GOAL NOT REACHED` com motivo e evidência.
