# Sakshi Vilas Temghare — Personal e-Portfolio

A responsive personal portfolio for an MCA first-year student, built as a working web
application rather than a static page.

## Features

| Feature | Where |
| --- | --- |
| Home, About, Skills, Education, Projects, Contact pages | `src/routes/` |
| Database integration — contact messages and mentoring bookings are stored | `src/routes/contact.tsx`, `src/routes/mentoring.tsx`, `drizzle/migrations/` |
| Payment gateway — paid 1:1 mentoring sessions | `src/routes/mentoring.tsx` |
| WhatsApp — one-tap click-to-chat button | `src/components/site/WhatsAppButton.tsx` |
| AI chatbot — "Ink", answers from the profile data | `src/routes/api/chat.ts`, `src/lib/chat.server.ts` |
| Smooth scroll animations, fully responsive layout | `src/styles.css`, `src/components/site/Reveal.tsx` |

## Tech stack

React 19 · TanStack Start (Vite 7) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Zod · AI SDK · PostgreSQL-backed cloud database.

## Content

All portfolio content — profile, skills, education, projects, mentoring sessions,
WhatsApp number — lives in one file: **`src/lib/profile.ts`**. Pages and the chatbot
both read from it, so editing content there updates the whole site.

Form validation rules live in `src/lib/forms.ts` and mirror the database limits.

## Run it locally

You need Node.js 20+ and Bun (or npm).

```sh
bun install      # or: npm install
bun run dev      # or: npm run dev
```

Then open http://localhost:8080.

The `.env` file holds the backend connection settings. Keep it alongside the code
if you want the contact form, bookings and chatbot to talk to the live database.

## Tests

```sh
bunx vitest run
```

## Structure

```text
src/
  routes/        one file per page (/, /about, /skills, /education, /projects,
                 /mentoring, /contact) plus /api/chat for the assistant
  components/    site chrome (header, footer, chat widget) and UI primitives
  lib/           profile.ts (content), forms.ts (validation), chat.server.ts (AI)
  styles.css     colour palette, fonts, animations
drizzle/         database schema and migration for the two tables
```
