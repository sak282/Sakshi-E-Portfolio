import { createFileRoute } from "@tanstack/react-router";
import { Check, Github, Linkedin, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, fieldErrors, type FieldErrors } from "@/lib/forms";
import { profile, whatsappLink } from "@/lib/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sakshi Vilas Temghare" },
      { name: "description", content: "Send Sakshi a message, chat on WhatsApp or connect on LinkedIn and GitHub." },
      { property: "og:title", content: "Contact — Sakshi Vilas Temghare" },
      { property: "og:description", content: "Get in touch for internships, projects or collaborations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "WhatsApp", value: "Start a chat", href: whatsappLink(), Icon: MessageCircle },
  { label: "LinkedIn", value: "Connect with me", href: profile.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", value: "Browse my code", href: profile.socials.github, Icon: Github },
];

function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);
    if (error) {
      toast.error("Couldn't send your message. Please try again or email me directly.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Message sent — thank you! I'll reply soon.");
  }

  return (
    <>
      <PageHeader index="05" eyebrow="Contact" title={<>Let's <em className="text-highlight">talk</em>.</>}>
        Internship opportunities, project ideas or just a hello — my inbox is open.
      </PageHeader>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-3">
          {channels.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="paper-card lift group flex items-center gap-4 p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors group-hover:bg-ink group-hover:text-paper">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="eyebrow block">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </span>
            </a>
          ))}
          <p className="flex items-center gap-2 pt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {profile.location}
          </p>
        </Reveal>

        <Reveal delay={120} className="paper-card p-8">
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 py-10">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper">
                <Check className="h-6 w-6" />
              </span>
              <h2 className="text-4xl">Message received.</h2>
              <p className="text-muted-foreground">Thanks for reaching out — I'll get back to you by email.</p>
              <Button variant="paper" onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <h2 className="text-3xl">Send a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" error={errors.name}>
                  <Input id="name" name="name" maxLength={100} placeholder="Jane Doe" />
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  <Input id="email" name="email" type="email" maxLength={255} placeholder="jane@company.com" />
                </Field>
              </div>
              <Field label="Subject" name="subject" error={errors.subject}>
                <Input id="subject" name="subject" maxLength={150} placeholder="Internship opportunity" />
              </Field>
              <Field label="Message" name="message" error={errors.message}>
                <Textarea id="message" name="message" rows={6} maxLength={2000} placeholder="Hi Sakshi, …" />
              </Field>
              <Button type="submit" variant="ink" size="xl" disabled={sending}>
                {sending ? "Sending…" : "Send message"} <Send />
              </Button>
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
