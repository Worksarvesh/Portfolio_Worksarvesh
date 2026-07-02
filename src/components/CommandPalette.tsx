import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  VscHome, VscFolderOpened, VscCloudDownload, VscMail,
  VscGithub, VscColorMode, VscSearch, VscTerminal,
} from "react-icons/vsc";
import { useEditor } from "../context/EditorContext";

interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, openFile, setTerminalOpen, terminalOpen } =
    useEditor();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      { id: "home",         label: "Go Home",                               icon: <VscHome />,          action: () => openFile("home") },
      { id: "projects",     label: "Open Projects",                         icon: <VscFolderOpened />,   action: () => openFile("projects") },
      { id: "resume",       label: "Download Resume",                       icon: <VscCloudDownload />,  action: () => openFile("resume") },
      { id: "contact",      label: "Contact",                               icon: <VscMail />,           action: () => openFile("contact") },
      {
        id: "github",
        label: "Open GitHub — github.com/Worksarvesh",
        icon: <VscGithub />,
        action: () => window.open("https://github.com/Worksarvesh", "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn — sarvesh-sharma-432738354",
        icon: <VscGithub />,
        action: () => window.open("https://www.linkedin.com/in/sarvesh-sharma-432738354/", "_blank"),
      },
      {
        id: "theme",
        label: "Toggle Theme (Dark mode — it's VS Code, always dark)",
        icon: <VscColorMode />,
        action: () => {},
      },
      { id: "search-project", label: "Search Project",  icon: <VscSearch />,       action: () => openFile("projects") },
      { id: "terminal",       label: "Toggle Terminal",  icon: <VscTerminal />,     action: () => setTerminalOpen(!terminalOpen) },
      { id: "skills",         label: "Open Skills",      icon: <VscFolderOpened />, action: () => openFile("skills") },
      { id: "about",          label: "Open About",       icon: <VscFolderOpened />, action: () => openFile("about") },
      { id: "readme",         label: "Open README",      icon: <VscFolderOpened />, action: () => openFile("readme") },
      { id: "achievements",   label: "Open Achievements",icon: <VscFolderOpened />, action: () => openFile("achievements") },
      { id: "experience",     label: "Open Experience",  icon: <VscFolderOpened />, action: () => openFile("experience") },
    ],
    [openFile, setTerminalOpen, terminalOpen]
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { setHighlight(0); }, [query]);

  useEffect(() => {
    if (!commandPaletteOpen) setQuery("");
  }, [commandPaletteOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      if (e.key === "Escape") { setCommandPaletteOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(h + 1, filtered.length - 1)); return; }
      if (e.key === "ArrowUp")   { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); return; }
      if (e.key === "Enter") {
        const cmd = filtered[highlight];
        if (cmd) { cmd.action(); setCommandPaletteOpen(false); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandPaletteOpen, filtered, highlight, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-subtle)]">
              <VscSearch className="text-[var(--color-text-faint)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                className="bg-transparent outline-none w-full text-sm mono placeholder:text-[var(--color-text-faint)]"
              />
              <span className="text-[10px] text-[var(--color-text-faint)] border border-[var(--color-border-subtle)] rounded px-1.5 py-0.5">
                Esc
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto scroll-thin">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-[var(--color-text-faint)]">
                  No matching commands
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => { cmd.action(); setCommandPaletteOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    highlight === i
                      ? "bg-[var(--color-accent-blue)]/15 text-white"
                      : "text-[var(--color-text-dim)]"
                  }`}
                >
                  <span className="text-[var(--color-accent-blue)]">{cmd.icon}</span>
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
