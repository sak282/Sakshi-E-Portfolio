import type { ReactNode } from "react";

export function PageHeader({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
      <div className="flex items-center gap-4 animate-fade-up">
        <span className="font-mono text-xs text-highlight">{index}</span>
        <span className="h-px w-12 bg-foreground/30" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] md:text-7xl animate-fade-up [animation-delay:120ms]">{title}</h1>
      {children && (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-fade-up [animation-delay:240ms]">
          {children}
        </div>
      )}
    </header>
  );
}
