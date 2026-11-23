import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  subject: z.string().trim().max(150, "Subject must be under 150 characters").default(""),
  message: z.string().trim().min(1, "Please write a message").max(2000, "Message must be under 2000 characters"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const mentoringSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  session_type: z.enum(["python", "sql-analytics", "project-guidance"]),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(1000, "Notes must be under 1000 characters").default(""),
});
export type MentoringInput = z.infer<typeof mentoringSchema>;

export type FieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message" | "session_type" | "preferred_date" | "notes" | "form", string>
>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form") as keyof FieldErrors;
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
