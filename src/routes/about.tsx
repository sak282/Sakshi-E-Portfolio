import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Target, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { education, profile } from "@/lib/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sakshi Vilas Temghare" },
      { name: "description", content: "Educational background and career objectives of Sakshi Vilas Temghare, MCA student at IMED, Bharati Vidyapeeth University." },
      { property: "og:title", content: "About — Sakshi Vilas Temghare" },
      { property: "og:description", content: "Educational background and career objectives." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { k: "Learning", v: "Picking up a new tool every month and practising it on real datasets." },
  { k: "Clarity", v: "Clean code, clear charts and explanations anyone can follow." },
  { k: "Ownership", v: "Seeing a task through from idea to a working, tested result." },
];

function About() {
  return (
    <>
      <PageHeader index="01" eyebrow="About me" title={<>A student of code, <em className="text-highlight">data</em> and detail.</>}>
        {profile.intro}
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <Reveal className="paper-card p-8">
          <GraduationCap className="h-6 w-6" />
          <h2 className="mt-6 text-3xl">Educational background</h2>
          <ul className="mt-6 space-y-6">
            {education.map((e) => (
              <li key={e.short} className="border-l-2 border-highlight pl-4">
                <p className="font-mono text-xs text-muted-foreground">{e.period} · {e.status}</p>
                <p className="mt-1 text-lg font-medium">{e.degree}</p>
                <p className="text-sm text-muted-foreground">{e.institution}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="paper-card bg-ink p-8 text-paper">
          <Target className="h-6 w-6" />
          <h2 className="mt-6 text-3xl">Career objective</h2>
          <p className="mt-6 font-display text-2xl leading-snug italic">"{profile.objective}"</p>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest opacity-60">Target roles</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Data Analyst", "Software Developer", "Business Analyst", "Python Developer"].map((r) => (
              <span key={r} className="rounded-full border border-paper/30 px-3 py-1 text-sm">{r}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><p className="eyebrow">What I value</p></Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {values.map((item, i) => (
            <Reveal key={item.k} delay={i * 100}>
              <p className="font-mono text-xs text-highlight">0{i + 1}</p>
              <h3 className="mt-2 text-4xl">{item.k}</h3>
              <p className="mt-3 text-muted-foreground">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Reveal className="paper-card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-highlight text-highlight-foreground">
              <Wand2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-2xl">How this site works</h3>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                A responsive, full-stack portfolio: a cloud database behind the contact form and bookings,
                online mentoring payments, WhatsApp chat and an AI assistant that answers from my profile.
              </p>
            </div>
          </div>
          <Button asChild variant="ink">
            <Link to="/skills">See my skills</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
