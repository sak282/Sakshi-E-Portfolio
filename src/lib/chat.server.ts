import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "./ai/responses.ts";
import { education, mentoringSessions, profile, projects, skills } from "./profile";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

function buildInstructions() {
  return `You are "Ink", the friendly AI assistant on ${profile.name}'s personal e-portfolio website.
Answer visitors' questions (recruiters, interviewers, classmates) about Sakshi in a warm, concise, professional tone.
Keep answers short (2–5 sentences or a short list). Use markdown lightly. Speak about Sakshi in the third person.
Only use the facts below. If something isn't covered, say you don't have that detail and suggest using the Contact page or emailing ${profile.email}.
Politely decline unrelated requests and steer back to Sakshi's profile, skills, projects, education or mentoring sessions.

PROFILE
Name: ${profile.name}
Role: ${profile.role}
University: ${profile.university}
Location: ${profile.location}
Email: ${profile.email}
Intro: ${profile.intro}
Career objective: ${profile.objective}

SKILLS
${skills.map((s) => `- ${s.name} (${s.level}%): ${s.note}`).join("\n")}

EDUCATION
${education.map((e) => `- ${e.degree} (${e.short}), ${e.institution}, ${e.period}, ${e.status}. ${e.highlights.join("; ")}`).join("\n")}

PROJECTS
${projects.map((p) => `- ${p.title} (${p.tagline}): ${p.description} Tech: ${p.tech.join(", ")}.${p.github ? ` GitHub: ${p.github}` : " No public repository link."}`).join("\n")}

MENTORING SESSIONS (bookable and payable on the Mentoring page)
${mentoringSessions.map((m) => `- ${m.title}: ₹${m.priceInr}, ${m.duration}. ${m.description}`).join("\n")}

The site pages are: Home, About, Skills, Education, Projects, Mentoring, Contact. Visitors can also chat on WhatsApp using the green button.`;
}

const MAX_MESSAGES = 30;
const MAX_TEXT = 2000;

function isValidMessages(value: unknown): value is UIMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return false;
  return value.every((m) => {
    if (!m || typeof m !== "object") return false;
    const msg = m as { role?: unknown; parts?: unknown };
    if (msg.role !== "user" && msg.role !== "assistant") return false;
    if (!Array.isArray(msg.parts)) return false;
    return msg.parts.every((p: { type?: unknown; text?: unknown }) =>
      p?.type !== "text" || (typeof p.text === "string" && p.text.length <= MAX_TEXT),
    );
  });
}

export async function handleChat(request: Request): Promise<Response> {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isValidMessages(body.messages)) {
    return Response.json({ error: "Invalid or too long conversation." }, { status: 400 });
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return Response.json({ error: "The assistant is not configured yet." }, { status: 500 });
  }

  const messages = body.messages;
  const modelMessages = await convertToModelMessages(messages);
  const call = createResponsesCall(
    request,
    { baseURL: GATEWAY_URL, apiKey, model: MODEL },
    modelMessages,
    buildInstructions(),
    messages,
  );
  return call.response();
}
