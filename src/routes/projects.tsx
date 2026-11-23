import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { profile, projects } from "@/lib/profile";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sakshi Vilas Temghare" },
      { name: "description", content: "Data analytics, Java, SQL and web projects by Sakshi Vilas Temghare, with GitHub links." },
      { property: "og:title", content: "Projects — Sakshi Vilas Temghare" },
      { property: "og:description", content: "Selected projects with descriptions and GitHub links." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <>
      <PageHeader index="04" eyebrow="Projects" title={<>Things I've <em className="text-highlight">built</em>.</>}>
        A selection of academic and personal projects, with source code on GitHub where available.
      </PageHeader>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 120}>
            <article className="paper-card lift group flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{p.tagline}</span>
                {p.year && <span className="font-mono text-xs text-muted-foreground">{p.year}</span>}
              </div>
              <h2 className="mt-6 text-4xl leading-tight transition-colors group-hover:text-highlight">{p.title}</h2>
              <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs">{t}</span>
                ))}
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-sm font-medium"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </section>
      <Reveal className="mx-auto mt-16 max-w-6xl px-6 text-center">
        <Button asChild variant="paper" size="xl">
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            <Github /> See all repositories
          </a>
        </Button>
      </Reveal>
    </>
  );
}
