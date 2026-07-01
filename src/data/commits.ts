export interface Commit {
  hash: string;
  message: string;
  date: string;
  type: "feat" | "fix" | "chore" | "docs";
}

export const commits: Commit[] = [
  { hash: "a1c92f4", message: "feat: build DevPulse analytics dashboard", date: "2026-05-12", type: "feat" },
  { hash: "9e21bb0", message: "feat: commerce analytics platform", date: "2025-11-03", type: "feat" },
  { hash: "55d7a6c", message: "fix: improve dashboard performance", date: "2025-10-21", type: "fix" },
  { hash: "2f0c8de", message: "feat: AI diagnostics OCR pipeline", date: "2025-08-14", type: "feat" },
  { hash: "70b41aa", message: "feat: gesture controlled media playback", date: "2025-06-02", type: "feat" },
  { hash: "c3e9012", message: "docs: write README and project notes", date: "2025-05-27", type: "docs" },
];
