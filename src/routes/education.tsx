import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { education } from "@/lib/profile";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Sakshi Vilas Temghare" },
      { name: "description", content: "MCA at IMED, Bharati Vidyapeeth University and BSc in Computer Science." },
      { property: "og:title", content: "Education — Sakshi Vilas Temghare" },
      { property: "og:description", content: "MCA (pursuing) and BSc Computer Science." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <>
      <PageHeader index="03" eyebrow="Education" title={<>The path <em className="text-highlight">so far</em>.</>}>
        From the foundations of computer science to advanced applications and analytics.
      </PageHeader>
      <section className="mx-auto max-w-4xl px-6">
        <ol className="relative border-l border-foreground/20 pl-8 md:pl-12">
          {education.map((e, i) => (
            <Reveal as="li" key={e.short} delay={i * 150} className="relative pb-16 last:pb-0">
              <span className="absolute -left-[41px] top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-background md:-left-[57px]">
                <span className={i === 0 ? "h-2 w-2 rounded-full bg-highlight animate-pulse" : "h-2 w-2 rounded-full bg-ink"} />
              </span>
              <p className="font-mono text-sm text-muted-foreground">{e.period}</p>
              <div className="paper-card lift mt-4 p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="font-display text-6xl italic leading-none text-highlight">{e.short}</span>
                    <h2 className="mt-3 text-3xl">{e.degree}</h2>
                    <p className="mt-1 text-muted-foreground">{e.institution}</p>
                  </div>
                  <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs text-paper">{e.status}</span>
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                  {e.highlights.map((h) => (
                    <li key={h} className="rounded-lg bg-secondary px-3 py-2 text-sm">{h}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
