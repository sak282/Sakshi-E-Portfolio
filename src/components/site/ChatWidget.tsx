import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageSquareText, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";

const suggestions = [
  "What are Sakshi's strongest skills?",
  "Tell me about her projects",
  "What is her career objective?",
  "How do mentoring sessions work?",
];

function InkAvatar({ className }: { className?: string }) {
  return (
    <span className={cn("grid place-items-center rounded-full bg-ink font-display text-paper", className)}>
      <span className="italic">Ink</span>
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onError: (error) => {
      toast.error(error.message || "The assistant couldn't respond. Please try again.");
    },
  });

  const busy = status === "submitted" || status === "streaming";
  const last = messages[messages.length - 1];
  const waiting =
    busy && (!last || last.role === "user" || !last.parts.some((p) => p.type === "text" && p.text.length > 0));

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed.slice(0, 2000) });
  };

  const handleSubmit = (message: PromptInputMessage) => send(message.text ?? "");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Ask my AI assistant"}
        className="group fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-full bg-ink px-4 text-paper shadow-lift transition-all duration-300 hover:-translate-y-1"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
        {!open && (
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-40">
            Ask my AI assistant
          </span>
        )}
      </button>

      {open && (
        <section
          aria-label="AI assistant"
          className="fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift animate-fade-up sm:right-6"
        >
          <header className="flex items-center gap-3 border-b border-border px-4 py-3">
            <InkAvatar className="h-10 w-10 text-base" />
            <div className="flex-1">
              <p className="font-display text-xl leading-none">Ink</p>
              <p className="mt-1 text-xs text-muted-foreground">AI assistant · ask me about Sakshi</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <Conversation className="flex-1">
            <ConversationContent className="gap-5">
              {messages.length === 0 && (
                <div className="flex flex-col items-start gap-4 py-2">
                  <p className="font-display text-2xl leading-tight">
                    Hi! I'm Ink. Ask me anything about Sakshi's skills, projects or education.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-border px-3 py-1.5 text-left text-xs transition-colors hover:bg-ink hover:text-paper"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent
                    className={cn(
                      message.role === "user"
                        ? "!bg-ink !text-paper rounded-2xl rounded-br-sm px-4 py-2.5"
                        : "!bg-transparent px-0 text-foreground",
                    )}
                  >
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        message.role === "assistant" ? (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        ) : (
                          <p key={i} className="whitespace-pre-wrap text-sm">{part.text}</p>
                        )
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {waiting && (
                <div className="text-sm">
                  <Shimmer>Thinking…</Shimmer>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-3">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea placeholder="Ask about Sakshi…" maxLength={2000} />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} onStop={stop} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </section>
      )}
    </>
  );
}
