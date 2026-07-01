import { motion } from "framer-motion";
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSettingsGear, VscTerminal, VscAccount } from "react-icons/vsc";
import { useEditor } from "../../context/EditorContext";

const items = [
  { key: "explorer", icon: VscFiles, label: "Explorer" },
  { key: "search", icon: VscSearch, label: "Search" },
  { key: "git", icon: VscSourceControl, label: "Source Control" },
  { key: "extensions", icon: VscExtensions, label: "Extensions" },
];

export default function ActivityBar() {
  const { sidebarView, setSidebarView, sidebarCollapsed, setSidebarCollapsed, terminalOpen, setTerminalOpen } = useEditor();

  const select = (key: string) => {
    if (sidebarView === key && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    } else {
      setSidebarView(key);
      setSidebarCollapsed(false);
    }
  };

  return (
    <div className="w-12 shrink-0 bg-[var(--color-bg-activitybar)] border-r border-[var(--color-border-subtle)] flex flex-col items-center justify-between py-3">
      <div className="flex flex-col gap-1">
        {items.map(({ key, icon: Icon, label }) => {
          const active = sidebarView === key && !sidebarCollapsed;
          return (
            <motion.button
              key={key}
              aria-label={label}
              title={label}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => select(key)}
              className="relative w-12 h-11 flex items-center justify-center"
            >
              {active && (
                <motion.span
                  layoutId="activity-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--color-accent-blue)] rounded-full"
                />
              )}
              <Icon className={`text-xl transition-colors ${active ? "text-white" : "text-[var(--color-text-faint)] hover:text-[var(--color-text-dim)]"}`} />
            </motion.button>
          );
        })}
        <motion.button
          aria-label="Terminal"
          title="Terminal (Ctrl+`)"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="relative w-12 h-11 flex items-center justify-center"
        >
          {terminalOpen && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--color-accent-cyan)] rounded-full" />
          )}
          <VscTerminal className={`text-xl ${terminalOpen ? "text-white" : "text-[var(--color-text-faint)] hover:text-[var(--color-text-dim)]"}`} />
        </motion.button>
      </div>
      <div className="flex flex-col gap-1">
        <motion.button whileHover={{ scale: 1.12, rotate: 50 }} whileTap={{ scale: 0.9 }} className="w-12 h-11 flex items-center justify-center" title="Settings" aria-label="Settings" onClick={() => setSidebarView("extensions")}>
          <VscSettingsGear className="text-xl text-[var(--color-text-faint)] hover:text-[var(--color-text-dim)]" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} className="w-12 h-11 flex items-center justify-center" title="Profile" aria-label="Profile" onClick={() => setSidebarView("explorer")}>
          <VscAccount className="text-xl text-[var(--color-text-faint)] hover:text-[var(--color-text-dim)]" />
        </motion.button>
      </div>
    </div>
  );
}
