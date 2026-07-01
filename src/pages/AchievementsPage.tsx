import { motion } from "framer-motion";
import { achievements } from "../data/achievements";

export default function AchievementsPage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-cyan)]"># </span>
          achievements.md
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl font-black tracking-tight mb-12 text-gradient"
        >
          Achievements
        </motion.h1>

        {/* Markdown-style block */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-[var(--color-bg-panel)] border border-[var(--color-border-subtle)] rounded-lg overflow-hidden mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]">
            <span className="w-3 h-3 rounded-full bg-[#f07178]" />
            <span className="w-3 h-3 rounded-full bg-[#e3c878]" />
            <span className="w-3 h-3 rounded-full bg-[#6fcf6f]" />
            <span className="ml-2 text-xs mono text-[var(--color-text-faint)]">achievements.md — Preview</span>
          </div>
          <div className="p-6 mono text-[13.5px] leading-8">
            <p className="text-[var(--color-text-faint)]">## Certifications</p>
            <br />
            {achievements.map((a) => (
              <div key={a.title}>
                <p className="text-white font-bold">### {a.title}</p>
                <p className="text-[var(--color-text-dim)]">**Issued by:** {a.org}</p>
                <p className="text-[var(--color-text-dim)]">**Issued:** {a.issued}</p>
                <p className="text-[var(--color-text-dim)]">**Valid till:** {a.validTill}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rendered achievement cards */}
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-[var(--color-accent-cyan)]/30 rounded-xl p-6 bg-[var(--color-accent-cyan)]/5 hover:bg-[var(--color-accent-cyan)]/8 transition-colors"
          >
            <div className="flex items-start gap-4 flex-wrap">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-cyan)]/20 flex items-center justify-center shrink-0">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{a.title}</h3>
                <p className="text-[var(--color-accent-cyan)] text-sm mono mb-3">{a.org}</p>
                <div className="flex gap-4 flex-wrap">
                  <span className="text-[var(--color-text-faint)] text-xs mono">
                    Issued: <span className="text-[var(--color-text-dim)]">{a.issued}</span>
                  </span>
                  <span className="text-[var(--color-text-faint)] text-xs mono">
                    Valid till: <span className="text-[var(--color-text-dim)]">{a.validTill}</span>
                  </span>
                </div>
              </div>
              <div className="border border-[var(--color-accent-cyan)]/40 text-[var(--color-accent-cyan)] text-xs mono px-3 py-1 rounded-full self-start">
                ✓ Verified
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 mono text-xs text-[var(--color-text-faint)] border border-dashed border-[var(--color-border-subtle)] rounded-lg p-4 text-center"
        >
          More certifications in progress — always_learning = true
        </motion.div>
      </div>
    </div>
  );
}
