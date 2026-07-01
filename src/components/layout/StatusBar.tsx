import { VscSourceControl, VscBell, VscCircleFilled } from "react-icons/vsc";
import { useEditor } from "../../context/EditorContext";
import { files } from "../../data/files";

export default function StatusBar() {
  const { activeTab, setTerminalOpen, terminalOpen } = useEditor();
  const file = files.find((f) => f.id === activeTab);

  return (
    <div className="h-6 shrink-0 bg-[var(--color-bg-statusbar)] text-white flex items-center justify-between px-3 text-[11px] mono select-none">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <VscSourceControl /> main
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <VscCircleFilled className="text-[8px] text-[#6fcf6f]" /> Open to Work
        </span>
        <button onClick={() => setTerminalOpen(!terminalOpen)} className="hidden sm:inline hover:underline">
          Terminal {terminalOpen ? "▼" : "▲"}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">{file?.filename ?? "home.tsx"}</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span>TypeScript React</span>
        <VscBell />
      </div>
    </div>
  );
}
