import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/profile";

const nav = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/mentoring", label: "Mentoring" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-lg text-paper transition-transform duration-500 group-hover:rotate-[360deg]">
            {profile.initials}
          </span>
          <span className="font-display text-xl">Sakshi Temghare</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="ink-link text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 pb-6 pt-2 md:hidden animate-fade-up">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-2xl"
              activeProps={{ className: "text-highlight" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
