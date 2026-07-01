import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose, VscTerminal } from "react-icons/vsc";
import { useEditor } from "../context/EditorContext";

const PROFILE_LINKS = {
  github: "https://github.com/Worksarvesh",
  linkedin: "https://www.linkedin.com/in/sarvesh-sharma-432738354/",
};

type Line = { type: "input" | "output"; text: string };

const ASCII = `
   _____ _    _ ____  _    _ _____ ____  _    _
  / ____| |  | |  _ \\| |  | |_   _/ __ \\| |  | |
 | |  __| |  | | |_) | |  | | | || |  | | |__| |
 | | |_ | |  | |  _ <| |  | | | || |  | |  __  |
 | |__| | |__| | |_) | |__| |_| || |__| | |  | |
  \\_____|\\____/|____/ \\____/_____\\____/|_|  |_|
`;

export default function Terminal() {
  const { terminalOpen, setTerminalOpen, openFile, showToast } = useEditor();
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to sarvesh@portfolio:~ — type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
  }, [terminalOpen]);

  const run = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    const push = (text: string) => setLines((l) => [...l, { type: "output", text }]);

    switch (cmd) {
      case "":
        break;
      case "help":
        push("Available commands: help, about, projects, skills, resume, github, linkedin, contact, education, achievements, whoami, date, neofetch, clear");
        break;
      case "about":
        push("Sarvesh Sharma — Final-year B.Tech IT student at RCOEM, Nagpur. Frontend Developer & Data Analyst.");
        openFile("about");
        break;
      case "projects":
        push("Opening projects.js …");
        openFile("projects");
        break;
      case "skills":
        push("Opening skills.json …");
        openFile("skills");
        break;
      case "education":
        push("Opening experience.ts …");
        openFile("experience");
        break;
      case "achievements":
        push("Opening achievements.md …");
        openFile("achievements");
        break;
      case "resume":
        push("Downloading resume.pdf …");
        openFile("resume");
        showToast("Resume download started", "success");
        break;
      case "github":
        push("Opening GitHub profile in a new tab…");
        window.open(PROFILE_LINKS.github, "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        push("Opening LinkedIn profile in a new tab…");
        window.open(PROFILE_LINKS.linkedin, "_blank", "noopener,noreferrer");
        break;
      case "contact":
        push("Opening contact.css …");
        openFile("contact");
        break;
      case "whoami":
        push("sarvesh-sharma — frontend developer / data analyst / ai builder");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "neofetch":
        push(ASCII);
        push("OS: VS Code Portfolio Edition  |  Shell: react-bash  |  Stack: React + TS + Tailwind + Framer Motion");
        break;
      case "clear":
        setLines([]);
        return;
      default:
        push(`command not found: ${cmd} — type 'help' for a list of commands`);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLines((l) => [...l, { type: "input", text: input }]);
    if (input.trim()) setHistory((h) => [...h, input]);
    setHistoryIdx(-1);
    run(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 220, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 bg-[var(--color-bg-panel)] border-t border-[var(--color-border-subtle)] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-text-dim)]">
            <span className="flex items-center gap-2"><VscTerminal /> TERMINAL — bash</span>
            <button onClick={() => setTerminalOpen(false)} aria-label="Close terminal">
              <VscChromeClose className="hover:text-[var(--color-accent-red)]" />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto scroll-thin px-3 py-2 mono text-[12.5px] leading-relaxed cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <pre key={i} className={`whitespace-pre-wrap break-words ${l.type === "input" ? "text-[var(--color-accent-green)]" : "text-[var(--color-text-dim)]"}`}>
                {l.type === "input" ? `sarvesh@portfolio:~$ ${l.text}` : l.text}
              </pre>
            ))}
            <form onSubmit={onSubmit} className="flex items-center gap-1 text-[var(--color-accent-green)]">
              <span>sarvesh@portfolio:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="bg-transparent outline-none flex-1 text-[var(--color-text-primary)]"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-4 bg-[var(--color-accent-green)] caret-blink inline-block" />
            </form>
            <div ref={endRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
