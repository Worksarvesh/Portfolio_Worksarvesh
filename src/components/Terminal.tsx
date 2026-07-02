import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose, VscTerminal } from "react-icons/vsc";
import { useEditor } from "../context/EditorContext";

type Line = { type: "input" | "output"; text: string };

const ASCII = `
   ____  ___   ____  _    _________ __  __
  / __ \\/   | / __ \\| |  / / ____/ // / / /
 / /_/ / /| |/ /_/ / | / / __/ / // /_/ /
/ _, _/ ___ / _, _/| |/ / /___/__  __/
/_/ |_/_/  |_/_/ |_| |___/_____/  /_/
`;

export default function Terminal() {
  const { terminalOpen, setTerminalOpen, openFile } = useEditor();
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to sarvesh@portfolio — type 'help' to get started." },
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
        push(
          "Commands: help  about  projects  skills  resume  github  linkedin  contact  education  whoami  date  neofetch  clear"
        );
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
      case "resume":
        push("Opening resume.pdf in a new tab…");
        openFile("resume");
        break;
      case "github":
        push("Opening github.com/Worksarvesh …");
        window.open("https://github.com/Worksarvesh", "_blank");
        break;
      case "linkedin":
        push("Opening LinkedIn profile …");
        window.open("https://www.linkedin.com/in/sarvesh-sharma-432738354/", "_blank");
        break;
      case "contact":
        push("Opening contact.css …");
        openFile("contact");
        break;
      case "whoami":
        push("sarvesh-sharma  —  frontend developer / data analyst / ai builder");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "neofetch":
        push(ASCII);
        push(
          "OS: VS Code Portfolio Edition  |  Shell: react-bash  |  Stack: React + TS + Tailwind + Framer Motion"
        );
        break;
      case "clear":
        setLines([]);
        return;
      default:
        push(`command not found: ${cmd} — type 'help' for available commands`);
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
      if (!history.length) return;
      const next = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= history.length) { setHistoryIdx(-1); setInput(""); }
      else { setHistoryIdx(next); setInput(history[next]); }
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
            <span className="flex items-center gap-2">
              <VscTerminal /> TERMINAL — bash
            </span>
            <button onClick={() => setTerminalOpen(false)} aria-label="Close terminal">
              <VscChromeClose className="hover:text-[var(--color-accent-red)]" />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto scroll-thin px-3 py-2 mono text-[12.5px] leading-relaxed cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <pre
                key={i}
                className={`whitespace-pre-wrap break-words ${
                  l.type === "input"
                    ? "text-[var(--color-accent-green)]"
                    : "text-[var(--color-text-dim)]"
                }`}
              >
                {l.type === "input" ? `sarvesh@portfolio:~$ ${l.text}` : l.text}
              </pre>
            ))}
            <form onSubmit={onSubmit} className="flex items-center gap-1 text-[var(--color-accent-green)]">
              <span className="shrink-0">sarvesh@portfolio:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="bg-transparent outline-none flex-1 text-[var(--color-text-primary)] min-w-0"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-4 bg-[var(--color-accent-green)] caret-blink inline-block shrink-0" />
            </form>
            <div ref={endRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
