import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { skills, type Skill } from "@/lib/profile";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Sakshi Vilas Temghare" },
      { name: "description", content: "Technical skills: Python, Java, HTML, CSS, JavaScript, SQL and Data Analytics." },
      { property: "og:title", content: "Skills — Sakshi Vilas Temghare" },
      { property: "og:description", content: "Python, Java, HTML, CSS, JavaScript, SQL and Data Analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Skills,
});

function SkillBar({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) setShown(true); }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="paper-card lift group p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-3xl">{skill.name}</h3>
        <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{skill.note}</p>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-ink transition-[width] duration-[1400ms] ease-out group-hover:bg-highlight"
          style={{ width: shown ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

const groups = ["Languages", "Web", "Data"] as const;

function Skills() {
  return (
    <>
      <PageHeader index="02" eyebrow="Skills" title={<>Tools I <em className="text-highlight">think</em> with.</>}>
        A balanced toolkit across programming, the web and data — sharpened through coursework and personal projects.
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        {groups.map((g) => (
          <section key={g}>
            <Reveal className="mb-6 flex items-center gap-4">
              <h2 className="text-2xl italic">{g}</h2>
              <span className="h-px flex-1 bg-border" />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skills
                .filter((s) => s.group === g)
                .map((s, i) => (
                  <Reveal key={s.name} delay={i * 80}>
                    <SkillBar skill={s} />
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
        <Reveal className="paper-card p-8">
          <p className="eyebrow">Also familiar with</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Git & GitHub", "MySQL", "Pandas", "NumPy", "Matplotlib", "Power BI", "MS Excel", "VS Code", "Jupyter", "OOP", "Data Structures"].map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-sm transition-colors hover:bg-ink hover:text-paper">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
