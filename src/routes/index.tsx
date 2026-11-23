import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, CreditCard, Database, MessageCircle, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { profile, projects, skills } from "@/lib/profile";
import desk from "@/assets/desk-illustration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sakshi Vilas Temghare — MCA Student & Aspiring Data Analyst" },
      { name: "description", content: "Portfolio of Sakshi Vilas Temghare: MCA student at IMED, Bharati Vidyapeeth University, skilled in Python, Java, SQL and data analytics." },
      { property: "og:title", content: "Sakshi Vilas Temghare — MCA Student & Aspiring Data Analyst" },
      { property: "og:description", content: "Python, Java, SQL, web and data analytics — projects, education and contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { Icon: Wand2, title: "Modern Design", text: "Responsive layout with smooth animations, on phone and desktop.", to: "/about" as const },
  { Icon: Database, title: "Database", text: "Messages and bookings are stored securely in the cloud.", to: "/contact" as const },
  { Icon: CreditCard, title: "Payments", text: "Book and pay for 1:1 mentoring sessions online.", to: "/mentoring" as const },
  { Icon: MessageCircle, title: "WhatsApp", text: "One tap to start a WhatsApp chat with me.", to: "/contact" as const },
  { Icon: Bot, title: "AI Chatbot", text: "Ask Ink, my AI assistant, anything about my work.", to: "/projects" as const },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 md:grid-cols-[1.25fr_1fr] md:pt-24">
        <div>
          <p className="eyebrow animate-fade-up">Portfolio · {new Date().getFullYear()}</p>
          <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl animate-fade-up [animation-delay:100ms]">
            Sakshi <br />
            <em className="text-highlight">Vilas</em> Temghare
          </h1>
          <p className="mt-6 font-mono text-sm text-muted-foreground animate-fade-up [animation-delay:200ms]">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed animate-fade-up [animation-delay:300ms]">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up [animation-delay:400ms]">
            <Button asChild variant="ink" size="xl">
              <Link to="/projects">
                View my work <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="paper" size="xl">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        {/* Profile photo frame */}
        <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:250ms]">
          <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-foreground/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink shadow-lift">
            {/* TODO: replace with Sakshi's real profile photo */}
            <div className="flex h-full flex-col items-center justify-center text-paper">
              <span className="font-display text-[9rem] leading-none italic">{profile.initials}</span>
              <span className="mt-4 font-mono text-xs tracking-[0.3em] opacity-70">MCA · 2025–27</span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-card px-4 py-3 shadow-paper animate-float">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Currently</p>
            <p className="text-sm font-medium">Open to internships</p>
          </div>
        </div>
      </section>

      {/* Skills marquee */}
      <section className="overflow-hidden border-y border-border bg-ink py-5 text-paper">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...skills, ...skills, ...skills, ...skills].map((s, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-3xl italic">
              {s.name} <span className="text-highlight not-italic">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Intro + illustration */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <Reveal>
          <img
            src={desk}
            alt="Ink illustration of a student's desk with laptop and data notebook"
            width={1280}
            height={960}
            loading="lazy"
            className="rounded-2xl border border-border shadow-paper"
          />
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow">Who I am</p>
          <h2 className="mt-4 text-5xl leading-tight">
            Curious about data, <em>careful</em> with code.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            I'm pursuing my MCA at {profile.university} after a BSc in Computer Science. I enjoy cleaning messy
            datasets, writing SQL that answers real questions, and building simple, useful software.
          </p>
          <Link to="/about" className="ink-link mt-8 inline-flex items-center gap-2 font-medium">
            More about me <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Inside this site</p>
            <h2 className="mt-4 text-5xl">Five features, one portfolio.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">More than a static page — this portfolio is a working web application.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ Icon, title, text, to }, i) => (
            <Reveal key={title} delay={i * 80}>
              <Link to={to} className="paper-card lift group flex h-full flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-6 font-mono text-[10px] text-highlight">0{i + 1}</span>
                <h3 className="mt-1 text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-5xl">Recent projects</h2>
          </div>
          <Link to="/projects" className="ink-link hidden items-center gap-2 font-medium sm:inline-flex">
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {projects.slice(0, 3).map((p, i) => {
            const inner = (
              <>
                <span className="font-mono text-sm text-muted-foreground">{p.year ?? p.tagline}</span>
                <div>
                  <h3 className="text-3xl transition-colors group-hover:text-highlight">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tech.join(" · ")}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </>
            );
            const rowClass =
              "group grid items-center gap-4 py-8 transition-all duration-300 hover:px-4 md:grid-cols-[80px_1fr_auto]";
            return (
              <Reveal key={p.title} delay={i * 80}>
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noreferrer" className={rowClass}>
                    {inner}
                  </a>
                ) : (
                  <Link to="/projects" className={rowClass}>
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
