import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, CreditCard } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { fieldErrors, mentoringSchema, type FieldErrors } from "@/lib/forms";
import { mentoringSessions, type MentoringSession } from "@/lib/profile";

export const Route = createFileRoute("/mentoring")({
  head: () => ({
    meta: [
      { title: "1:1 Mentoring Sessions — Sakshi Vilas Temghare" },
      { name: "description", content: "Book a paid 1:1 session on Python, SQL & data analytics, or college project guidance with Sakshi." },
      { property: "og:title", content: "1:1 Mentoring Sessions — Sakshi Vilas Temghare" },
      { property: "og:description", content: "Python, SQL & analytics, and project guidance sessions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mentoring,
});

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Mentoring() {
  const [selected, setSelected] = useState<MentoringSession["id"]>("sql-analytics");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const session = mentoringSessions.find((s) => s.id === selected)!;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = { ...Object.fromEntries(new FormData(form)), session_type: selected };
    const parsed = mentoringSchema.safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setSending(true);
    const { preferred_date, ...rest } = parsed.data;
    const { error } = await supabase
      .from("mentoring_requests")
      .insert({ ...rest, preferred_date: preferred_date || null });
    setSending(false);
    if (error) {
      toast.error("Couldn't save your booking. Please try again.");
      return;
    }
    form.reset();
    setDone(true);
    toast.success("Booking request received!");
  }

  return (
    <>
      <PageHeader index="06" eyebrow="Mentoring" title={<>Learn with me, <em className="text-highlight">one on one</em>.</>}>
        Short, focused online sessions for juniors and classmates. Pick a session, choose a date and pay securely online.
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {mentoringSessions.map((s, i) => (
          <Reveal key={s.id} delay={i * 100}>
            <button
              type="button"
              onClick={() => setSelected(s.id)}
              className={cn(
                "paper-card lift flex h-full w-full flex-col p-7 text-left",
                selected === s.id && "!bg-ink text-paper ring-2 ring-highlight ring-offset-4 ring-offset-background",
              )}
            >
              <span className="flex items-center gap-2 font-mono text-xs opacity-70">
                <Clock className="h-3.5 w-3.5" /> {s.duration}
              </span>
              <h2 className="mt-5 text-3xl">{s.title}</h2>
              <p className={cn("mt-3 text-sm", selected === s.id ? "opacity-80" : "text-muted-foreground")}>{s.description}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-highlight" /> {inc}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-display text-5xl">{inr(s.priceInr)}</p>
            </button>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-3xl px-6">
        <Reveal className="paper-card p-8">
          {done ? (
            <div className="flex flex-col items-start gap-4 py-6">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="text-4xl">Request received.</h2>
              <p className="text-muted-foreground">
                Thanks! I'll email you to confirm the time. Online payment is being set up — you'll receive a secure payment link with your confirmation.
              </p>
              <Button variant="paper" onClick={() => setDone(false)}>Book another session</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="eyebrow">Booking</p>
                  <h2 className="mt-1 text-3xl">{session.title}</h2>
                </div>
                <p className="font-display text-4xl text-highlight">{inr(session.priceInr)}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" error={errors.name}>
                  <Input id="name" name="name" maxLength={100} />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <Input id="email" name="email" type="email" maxLength={255} />
                </Field>
              </div>
              <Field label="Preferred date" name="preferred_date" error={errors.preferred_date}>
                <Input id="preferred_date" name="preferred_date" type="date" />
              </Field>
              <Field label="What would you like help with?" name="notes" error={errors.notes}>
                <Textarea id="notes" name="notes" rows={4} maxLength={1000} />
              </Field>
              <Button type="submit" variant="ink" size="xl" disabled={sending} className="w-full sm:w-auto">
                <CreditCard /> {sending ? "Saving…" : `Book session · ${inr(session.priceInr)}`}
              </Button>
              <p className="text-xs text-muted-foreground">Payments are processed securely. You'll get a confirmation by email.</p>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="eyebrow">{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
