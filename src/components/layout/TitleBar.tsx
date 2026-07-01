import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscMenu } from "react-icons/vsc";
import { useEditor } from "../../context/EditorContext";

const menuSections = [
  {
    label: "File",
    items: [
      { label: "Home", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("home") },
      { label: "Projects", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("projects") },
      { label: "Skills", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("skills") },
      { label: "Resume", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("resume") },
      { label: "Download Resume", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("resume") },
      { label: "Exit Portfolio", action: (editor: ReturnType<typeof useEditor>) => editor.showToast("Playful exit: this portfolio stays open ✨") },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Copy Email", action: (editor: ReturnType<typeof useEditor>) => navigator.clipboard.writeText("sarveshsharma.official@gmail.com").then(() => editor.showToast("Email copied", "success")) },
      { label: "Copy GitHub", action: (editor: ReturnType<typeof useEditor>) => navigator.clipboard.writeText("https://github.com/Worksarvesh").then(() => editor.showToast("GitHub copied", "success")) },
      { label: "Copy LinkedIn", action: (editor: ReturnType<typeof useEditor>) => navigator.clipboard.writeText("https://www.linkedin.com/in/sarvesh-sharma-432738354/").then(() => editor.showToast("LinkedIn copied", "success")) },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Toggle Sidebar", action: (editor: ReturnType<typeof useEditor>) => editor.setSidebarCollapsed(!editor.sidebarCollapsed) },
      { label: "Toggle Terminal", action: (editor: ReturnType<typeof useEditor>) => editor.setTerminalOpen(!editor.terminalOpen) },
      { label: "Zoom In", action: () => {
          const root = document.documentElement;
          const next = Math.min(1.25, (parseFloat(root.style.zoom || "1") || 1) + 0.1);
          root.style.zoom = `${next}`;
        } },
      { label: "Zoom Out", action: () => {
          const root = document.documentElement;
          const next = Math.max(0.8, (parseFloat(root.style.zoom || "1") || 1) - 0.1);
          root.style.zoom = `${next}`;
        } },
      { label: "Reset Zoom", action: () => {
          document.documentElement.style.zoom = "1";
        } },
      { label: "Toggle Full Screen", action: () => document.documentElement.requestFullscreen?.() },
    ],
  },
  {
    label: "Run",
    items: [
      { label: "Run Portfolio", action: (editor: ReturnType<typeof useEditor>) => editor.showToast("Portfolio is already running locally", "success") },
      { label: "Reload Portfolio", action: () => window.location.reload() },
      { label: "Open DevPulse Project", action: () => window.open("https://github.com/Worksarvesh/DevPulse.git", "_blank", "noopener,noreferrer") },
    ],
  },
  {
    label: "Terminal",
    items: [
      { label: "Show Terminal", action: (editor: ReturnType<typeof useEditor>) => editor.setTerminalOpen(true) },
      { label: "Hide Terminal", action: (editor: ReturnType<typeof useEditor>) => editor.setTerminalOpen(false) },
      { label: "Clear Terminal", action: (editor: ReturnType<typeof useEditor>) => editor.showToast("Terminal cleared", "success") },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Keyboard Shortcuts", action: (editor: ReturnType<typeof useEditor>) => editor.showToast("Ctrl+P opens command palette · Ctrl+` opens terminal", "info") },
      { label: "About Portfolio", action: (editor: ReturnType<typeof useEditor>) => editor.openFile("readme") },
      { label: "Version Information", action: (editor: ReturnType<typeof useEditor>) => editor.showToast("Portfolio v1.0.0 · React + TypeScript + Vite", "info") },
    ],
  },
  {
    label: "Copilot",
    items: [
      { label: "Open AI Assistant", action: (editor: ReturnType<typeof useEditor>) => editor.setAssistantOpen(true) },
    ],
  },
];

export default function TitleBar() {
  const editor = useEditor();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { setCommandPaletteOpen, showToast } = editor;

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    showToast("404: Close button found. Action ignored.", "warning");
  };

  return (
    <div className="h-9 shrink-0 bg-[var(--color-bg-titlebar)] border-b border-[var(--color-border-subtle)] flex items-center justify-between px-3 select-none relative">
      <div className="flex items-center gap-3 text-[var(--color-text-dim)]">
        <VscMenu className="text-base" />
        {menuSections.map((section) => (
          <div key={section.label} className="relative hidden sm:block">
            <button
              onClick={() => setOpenMenu(openMenu === section.label ? null : section.label)}
              className="text-xs hover:text-white transition-colors"
            >
              {section.label}
            </button>
            <AnimatePresence>
              {openMenu === section.label && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] shadow-2xl py-1 z-50"
                >
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action(editor);
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-[var(--color-text-dim)] hover:bg-[#1d2129] hover:text-white"
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="mono text-[11px] text-[var(--color-text-faint)] bg-[var(--color-bg-elevated)] hover:bg-[#1f222a] border border-[var(--color-border-subtle)] rounded px-3 py-1 flex items-center gap-2 transition-colors"
      >
        <span>sarvesh-sharma — portfolio</span>
        <span className="text-[var(--color-text-faint)] opacity-70">Ctrl+P</span>
      </button>
      <div className="flex items-center gap-4 text-[var(--color-text-dim)]">
        <VscChromeMinimize className="hidden sm:block" />
        <VscChromeMaximize className="hidden sm:block" />
        <button
          type="button"
          onClick={handleCloseClick}
          aria-label="Close window"
          className="hidden sm:block rounded p-1 transition-colors hover:bg-[#2a2d35] hover:text-[var(--color-accent-red)]"
        >
          <VscChromeClose className="text-base" />
        </button>
      </div>
    </div>
  );
}
