import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { profile, whatsappLink } from "@/lib/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl leading-tight">
            Let's build something <em className="text-highlight">thoughtful</em>.
          </p>
          <a href={`mailto:${profile.email}`} className="ink-link mt-4 inline-block text-muted-foreground">
            {profile.email}
          </a>
        </div>
        <div>
          <p className="eyebrow mb-4">Pages</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="ink-link">About</Link></li>
            <li><Link to="/projects" className="ink-link">Projects</Link></li>
            <li><Link to="/mentoring" className="ink-link">Mentoring</Link></li>
            <li><Link to="/contact" className="ink-link">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Elsewhere</p>
          <div className="flex gap-3">
            {[
              { href: profile.socials.github, label: "GitHub", Icon: Github },
              { href: profile.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              { href: whatsappLink(), label: "WhatsApp", Icon: MessageCircle },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-paper"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="font-mono">Designed & developed with React, TypeScript and a cloud database</p>
        </div>
      </div>
    </footer>
  );
}
