import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscSparkle, VscClose, VscSend } from "react-icons/vsc";
import { useEditor } from "../context/EditorContext";

const PROFILE_LINKS = {
  github: "https://github.com/Worksarvesh",
  linkedin: "https://www.linkedin.com/in/sarvesh-sharma-432738354/",
};

type Msg = { role: "user" | "bot"; text: string };

const knowledge: Record<string, string> = {
  sarvesh:
    "Sarvesh Sharma is a final-year B.Tech Information Technology student at RCOEM, Nagpur. He builds fast React interfaces and turns raw data into insights using Python, SQL, Power BI and AI.",
  projects:
    "Sarvesh has built DevPulse (developer analytics dashboard), CommerceIntel (sales BI platform), AI Vehicle Diagnostics (computer vision fault detection) and a Gesture Control media app.",
  skills:
    "Frontend: React, JavaScript, HTML/CSS. Data: Python, SQL, Pandas, Power BI. AI: OpenCV, MediaPipe, OCR, Gemini Vision. Workflow: Git, VS Code, Vite, Figma.",
  education:
    "He's pursuing a B.Tech in Information Technology at Ramdeobaba College of Engineering and Management, Nagpur (2022 — 2026), with a CGPA of 7.8.",
  contact: "You can reach Sarvesh via the contact.css page in the explorer, or directly over email, GitHub and LinkedIn.",
  resume: "You can download his resume from the sidebar — look for resume.pdf, or run the 'resume' command in the terminal.",
};

const quickPrompts = [
  "Tell me about Sarvesh",
  "Show frontend projects",
  "Show data analytics projects",
  "Show AI projects",
  "What technologies does Sarvesh know?",
  "Show skills",
  "Show education",
  "Show achievements",
  "Download Resume",
  "Open GitHub",
  "Open LinkedIn",
  "Contact Sarvesh",
];

function answer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("frontend project") || q.includes("frontend projects")) return "Frontend projects: DevPulse and the portfolio itself focus on polished React interfaces and UX.";
  if (q.includes("data analytics") || q.includes("analytics project")) return "Data analytics projects: CommerceIntel turns business data into dashboards and insight stories.";
  if (q.includes("ai project") || q.includes("ai projects")) return "AI projects: AI Vehicle Diagnostics uses computer vision and OCR, and Gesture Control uses MediaPipe for touch-free interaction.";
  if (q.includes("tech") || q.includes("technology") || q.includes("skills") || q.includes("know")) return knowledge.skills;
  if (q.includes("educat") || q.includes("college") || q.includes("cgpa")) return knowledge.education;
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) return knowledge.contact;
  if (q.includes("resume") || q.includes("cv")) return knowledge.resume;
  if (q.includes("sarvesh") || q.includes("who")) return knowledge.sarvesh;
  if (q.includes("achievement")) return "Achievements include hands-on project delivery across frontend, analytics, and AI, plus a strong academic record in B.Tech IT.";
  if (q.includes("github")) return "Opening Sarvesh's GitHub profile now.";
  if (q.includes("linkedin")) return "Opening Sarvesh's LinkedIn profile now.";
  return "I can help with: Sarvesh's background, projects, skills, education, contact info, or his resume. Try one of the quick prompts below.";
}

export default function AIAssistant() {
  const { assistantOpen, setAssistantOpen, openFile, showToast } = useEditor();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi, I'm Sarvesh's portfolio assistant. Ask me about his projects, skills, or experience." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, assistantOpen]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    const lower = text.toLowerCase();
    setTimeout(() => {
      const response = answer(text);
      setMessages((m) => [...m, { role: "bot", text: response }]);
      if (lower.includes("project")) openFile("projects");
      if (lower.includes("skill") || lower.includes("technology") || lower.includes("tech")) openFile("skills");
      if (lower.includes("contact")) openFile("contact");
      if (lower.includes("educat") || lower.includes("education")) openFile("experience");
      if (lower.includes("achievement")) openFile("achievements");
      if (lower.includes("resume")) openFile("resume");
      if (lower.includes("github")) {
        window.open(PROFILE_LINKS.github, "_blank", "noopener,noreferrer");
        showToast("Opening GitHub profile", "success");
      }
      if (lower.includes("linkedin")) {
        window.open(PROFILE_LINKS.linkedin, "_blank", "noopener,noreferrer");
        showToast("Opening LinkedIn profile", "success");
      }
    }, 380);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setAssistantOpen(!assistantOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] flex items-center justify-center shadow-lg shadow-black/40"
        aria-label="Open AI assistant"
      >
        <VscSparkle className="text-black text-xl" />
      </motion.button>

      <AnimatePresence>
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 right-5 z-40 w-[min(92vw,340px)] h-[440px] bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)]">
              <div className="flex items-center gap-2 text-sm">
                <VscSparkle className="text-[var(--color-accent-cyan)]" />
                <span className="font-medium">Portfolio Copilot</span>
              </div>
              <button onClick={() => setAssistantOpen(false)} aria-label="Close assistant">
                <VscClose className="hover:text-[var(--color-accent-red)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scroll-thin px-3 py-3 flex flex-col gap-2.5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-[12.5px] leading-relaxed rounded-lg px-3 py-2 ${
                    m.role === "user"
                      ? "self-end bg-[var(--color-accent-blue)]/20 text-white"
                      : "self-start bg-[var(--color-bg-panel)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-[var(--color-border-subtle)]">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-[10.5px] px-2 py-1 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-white hover:border-[var(--color-accent-blue)] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--color-border-subtle)]"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sarvesh…"
                className="flex-1 bg-[var(--color-bg-panel)] border border-[var(--color-border-subtle)] rounded-md px-2.5 py-1.5 text-xs outline-none focus:border-[var(--color-accent-blue)]"
              />
              <button type="submit" className="text-[var(--color-accent-blue)]" aria-label="Send">
                <VscSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
