import { motion, AnimatePresence } from "framer-motion";
import { VscClose } from "react-icons/vsc";
import { files } from "../../data/files";
import { useEditor } from "../../context/EditorContext";

export default function TabsBar() {
  const { openTabs, activeTab, openFile, closeTab, showToast } = useEditor();

  return (
    <div className="h-9 shrink-0 flex items-stretch bg-[var(--color-bg-tab)] border-b border-[var(--color-border-subtle)] overflow-x-auto scroll-thin select-none">
      <AnimatePresence initial={false}>
        {openTabs.map((id) => {
          const file = files.find((f) => f.id === id);
          if (!file) return null;
          const Icon = file.icon;
          const active = activeTab === id;
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className={`group relative flex items-center gap-2 px-3 border-r border-[var(--color-border-subtle)] cursor-pointer whitespace-nowrap ${
                active ? "bg-[var(--color-bg-tab-active)] text-white" : "text-[var(--color-text-dim)] hover:bg-[#171922]"
              }`}
              onClick={() => openFile(id)}
            >
              {active && <span className="absolute" />}
              <Icon style={{ color: file.color }} className="text-[14px]" />
              <span className="text-xs mono">{file.filename}</span>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showToast("git restore tabs");
                  closeTab(id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-[#2a2d35] rounded p-0.5 transition-opacity"
                aria-label={`Close ${file.filename}`}
              >
                <VscClose className="text-[12px]" />
              </button>
              {active && (
                <motion.div layoutId="tab-underline" className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--color-accent-blue)]" />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
