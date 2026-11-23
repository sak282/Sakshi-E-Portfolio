import { describe, expect, it } from "vitest";
import { profile, projects } from "@/lib/profile";

describe("portfolio project rules", () => {
  it("lists the three real projects", () => {
    expect(projects.map((p) => p.title)).toEqual([
      "Duplicate File Cleaner & Log Automation",
      "Surface-Crack Detection using CNN",
      "Text Sentiment Analysis using RNN / LSTM",
    ]);
  });

  it("only links repositories on Sakshi's GitHub account", () => {
    for (const p of projects) {
      if (p.github) expect(p.github.startsWith("https://github.com/sak282/")).toBe(true);
    }
    expect(profile.socials.github).toBe("https://github.com/sak282");
  });

  it("shows 2026 on every project card", () => {
    expect(projects.map((p) => p.year)).toEqual(["2026", "2026", "2026"]);
  });
});
