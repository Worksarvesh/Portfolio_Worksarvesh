import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useEditor } from "./context/EditorContext";
import { useKeyCombo } from "./hooks/useKeyCombo";

import TitleBar from "./components/layout/TitleBar";
import ActivityBar from "./components/layout/ActivityBar";
import Sidebar from "./components/layout/Sidebar";
import TabsBar from "./components/layout/TabsBar";
import StatusBar from "./components/layout/StatusBar";
import Terminal from "./components/Terminal";
import CommandPalette from "./components/CommandPalette";
import AIAssistant from "./components/AIAssistant";
import LoadingScreen from "./pages/LoadingScreen";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import AchievementsPage from "./pages/AchievementsPage";
import ReadmePage from "./pages/ReadmePage";
import ContactPage from "./pages/ContactPage";

const pageVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { setCommandPaletteOpen, toast, setToast } = useEditor();
  const [loading, setLoading] = useState(true);

  useKeyCombo({ key: "p", ctrlOrCmd: true }, () => setCommandPaletteOpen(true));
  useKeyCombo({ key: "`", ctrlOrCmd: true }, () => {});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="flex flex-col h-screen overflow-hidden select-none">
        <TitleBar />

        <div className="flex flex-1 min-h-0">
          <ActivityBar />
          <Sidebar />

          {/* Editor area */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden bg-[var(--color-bg-editor)]">
            <TabsBar />
            <div className="flex flex-col flex-1 min-h-0">
              <AnimatedRoutes />
              <Terminal />
            </div>
          </div>
        </div>

        <StatusBar />
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            className={`fixed top-4 left-4 z-[70] rounded-lg border px-4 py-2.5 shadow-2xl backdrop-blur ${
              toast.type === "error"
                ? "border-[var(--color-accent-red)]/40 bg-[#2a1114] text-[#f9b8bc]"
                : toast.type === "success"
                  ? "border-[var(--color-accent-green)]/40 bg-[#132116] text-[#ccf2c1]"
                  : toast.type === "warning"
                    ? "border-[var(--color-accent-yellow)]/40 bg-[#241c0f] text-[#f3dfab]"
                    : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]"
            }`}
            onClick={() => setToast(null)}
          >
            <div className="flex items-center gap-2 text-sm mono">
              <span>{toast.type === "error" ? "✕" : toast.type === "success" ? "✓" : toast.type === "warning" ? "⚠" : "›"}</span>
              <span>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette />
      <AIAssistant />
    </>
  );
}
