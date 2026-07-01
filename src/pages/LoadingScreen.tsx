import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[var(--color-bg-app)] flex items-center justify-center z-[100]"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-[var(--color-border-subtle)] border-t-[var(--color-accent-blue)] rounded-full mx-auto mb-5"
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mono text-sm text-[var(--color-text-faint)]"
        >
          Initialising workspace…
        </motion.p>
        <motion.div
          initial={{ width: 0 }} animate={{ width: 180 }} transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] mx-auto mt-4 rounded"
        />
      </div>
    </motion.div>
  );
}
