import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VscChevronDown, VscChevronRight, VscSearch, VscGitCommit } from "react-icons/vsc";
import { files } from "../../data/files";
import { commits } from "../../data/commits";
import { useEditor } from "../../context/EditorContext";

function ExplorerView() {
  const { openFile, activeTab } = useEditor();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="text-[13px]">
      <div className="px-3 py-2 text-[11px] tracking-wider text-[var(--color-text-faint)] font-semibold">
        Explorer
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-1 px-2 py-1 text-[var(--color-text-dim)] hover:text-white"
      >
        {expanded ? <VscChevronDown /> : <VscChevronRight />}
        <span className="font-semibold text-xs tracking-wide">PORTFOLIO</span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {files.map((f) => {
              const Icon = f.icon;
              const active = activeTab === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => openFile(f.id)}
                  className={`w-full flex items-center gap-2 pl-7 pr-2 py-[5px] text-left transition-colors ${
                    active ? "bg-[#1c2230] text-white" : "text-[var(--color-text-dim)] hover:bg-[#171922] hover:text-white"
                  }`}
                >
                  <Icon style={{ color: f.color }} className="text-[15px] shrink-0" />
                  <span className="truncate mono text-[12.5px]">{f.filename}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchView() {
  const { openFile } = useEditor();
  const [q, setQ] = useState("");
  const haystack = [
    { id: "home", label: "Building Interfaces. Decoding Data." },
    { id: "about", label: "Final-year B.Tech IT student, RCOEM Nagpur" },
    { id: "projects", label: "DevPulse, CommerceIntel, AI Vehicle Diagnostics, Gesture Control" },
    { id: "skills", label: "React, Python, SQL, Power BI, Machine Learning" },
    { id: "experience", label: "Learning journey 2022 — 2026" },
    { id: "achievements", label: "SAP Certified Data Analyst" },
    { id: "contact", label: "Email, GitHub, LinkedIn, contact form" },
  ];
  const results = q.trim()
    ? haystack.filter((h) => h.label.toLowerCase().includes(q.toLowerCase()) || h.id.includes(q.toLowerCase()))
    : haystack;

  return (
    <div className="text-[13px] px-3 py-2">
      <div className="text-[11px] tracking-wider text-[var(--color-text-faint)] font-semibold mb-2">Search</div>
      <div className="flex items-center gap-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded px-2 py-1.5 mb-3">
        <VscSearch className="text-[var(--color-text-faint)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search portfolio"
          className="bg-transparent outline-none text-xs w-full placeholder:text-[var(--color-text-faint)]"
        />
      </div>
      <div className="flex flex-col gap-1">
        {results.map((r) => (
          <button
            key={r.id}
            onClick={() => openFile(r.id)}
            className="text-left text-xs text-[var(--color-text-dim)] hover:text-white px-1 py-1 rounded hover:bg-[#171922]"
          >
            {r.label}
          </button>
        ))}
        {results.length === 0 && <div className="text-xs text-[var(--color-text-faint)]">No results found.</div>}
      </div>
    </div>
  );
}

function GitView() {
  return (
    <div className="text-[13px] px-3 py-2">
      <div className="text-[11px] tracking-wider text-[var(--color-text-faint)] font-semibold mb-2">Source Control</div>
      <div className="text-xs text-[var(--color-text-dim)] mb-3">main — up to date</div>
      <div className="flex flex-col gap-3">
        {commits.map((c) => (
          <div key={c.hash} className="flex items-start gap-2">
            <VscGitCommit className="text-[var(--color-accent-green)] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs text-white">{c.message}</div>
              <div className="text-[10.5px] mono text-[var(--color-text-faint)]">{c.hash} · {c.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtensionsView() {
  const ext = [
    { name: "react.dev", desc: "React component architecture", v: "18.3.1" },
    { name: "tailwind-css", desc: "Utility-first styling", v: "4.3.2" },
    { name: "framer-motion", desc: "Production animation library", v: "11.x" },
    { name: "data-analyst", desc: "Python, SQL, Power BI toolkit", v: "1.0.0" },
    { name: "ai-vision", desc: "OpenCV, OCR, Gemini Vision", v: "1.0.0" },
  ];
  return (
    <div className="text-[13px] px-3 py-2">
      <div className="text-[11px] tracking-wider text-[var(--color-text-faint)] font-semibold mb-2">Extensions</div>
      <div className="flex flex-col gap-3">
        {ext.map((e) => (
          <div key={e.name} className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[var(--color-accent-blue)]/30 to-[var(--color-accent-cyan)]/20 flex items-center justify-center text-[10px] mono text-[var(--color-accent-blue)] shrink-0">
              {e.name[0].toUpperCase()}
            </div>
            <div>
              <div className="text-xs text-white">{e.name}</div>
              <div className="text-[10.5px] text-[var(--color-text-faint)]">{e.desc} · v{e.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { sidebarView, sidebarCollapsed } = useEditor();

  if (sidebarCollapsed) return null;

  return (
    <div className="w-60 shrink-0 bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border-subtle)] overflow-y-auto scroll-thin hidden md:block">
      {sidebarView === "explorer" && <ExplorerView />}
      {sidebarView === "search" && <SearchView />}
      {sidebarView === "git" && <GitView />}
      {sidebarView === "extensions" && <ExtensionsView />}
    </div>
  );
}
