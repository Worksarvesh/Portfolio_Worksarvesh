import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { files } from "../data/files";

type ToastType = "info" | "success" | "error" | "warning";

interface ToastState {
  message: string;
  type: ToastType;
}

interface EditorContextValue {
  openTabs: string[];
  activeTab: string;
  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
  sidebarView: string;
  setSidebarView: (v: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toast: ToastState | null;
  setToast: (toast: ToastState | null) => void;
  showToast: (message: string, type?: ToastType) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialId = files.find((f) => f.path === location.pathname)?.id ?? "home";

  const [openTabs, setOpenTabs] = useState<string[]>([initialId]);
  const [activeTab, setActiveTab] = useState<string>(initialId);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState("explorer");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 3000);
  }, []);

  const openFile = useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (!file) return;
      if (file.id === "resume") {
        setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setActiveTab(id);

        const link = document.createElement("a");
        link.href = `${import.meta.env.BASE_URL}resume.pdf`;
        link.download = "Sarvesh-Sharma-Resume.pdf";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast("Resume download started", "success");
        return;
      }
      setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setActiveTab(id);
      navigate(file.path);
    },
    [navigate, showToast]
  );

  const closeTab = useCallback(
    (id: string) => {
      if (id === "home") {
        showToast("git restore tabs");
        return;
      }
      showToast("git restore tabs");
    },
    [showToast]
  );

  return (
    <EditorContext.Provider
      value={{
        openTabs,
        activeTab,
        openFile,
        closeTab,
        commandPaletteOpen,
        setCommandPaletteOpen,
        terminalOpen,
        setTerminalOpen,
        assistantOpen,
        setAssistantOpen,
        sidebarView,
        setSidebarView,
        sidebarCollapsed,
        setSidebarCollapsed,
        toast,
        setToast,
        showToast,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
