import { describe, expect, it } from "vitest";
import { contactSchema, mentoringSchema } from "@/lib/forms";

describe("contact form rules", () => {
  it("rejects messages longer than 2000 characters", () => {
    const r = contactSchema.safeParse({ name: "A", email: "a@b.co", subject: "", message: "x".repeat(2001) });
    expect(r.success).toBe(false);
  });
  it("rejects an invalid email", () => {
    const r = contactSchema.safeParse({ name: "A", email: "not-an-email", message: "hi" });
    expect(r.success).toBe(false);
  });
});

describe("mentoring form rules", () => {
  it("only accepts the three offered sessions", () => {
    const r = mentoringSchema.safeParse({ name: "A", email: "a@b.co", session_type: "guitar" });
    expect(r.success).toBe(false);
  });
});
