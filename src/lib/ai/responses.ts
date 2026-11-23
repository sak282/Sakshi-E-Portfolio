import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage, type UIMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions: string,
  originalMessages: UIMessage[],
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses(config.model),
    instructions,
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return {
    result,
    response: () =>
      withLovableAiGatewayRunIdHeader(
        result.toUIMessageStreamResponse({
          originalMessages,
          sendReasoning: true,
          onError: (error) => {
            console.error("Chat stream error", error);
            const status = (error as { statusCode?: number })?.statusCode;
            if (status === 429) return "The assistant is busy right now. Please try again in a moment.";
            if (status === 402) return "The assistant is temporarily unavailable (AI credits exhausted).";
            return "Sorry, something went wrong while answering. Please try again.";
          },
        }),
        runIdFetch,
      ),
  };
}
