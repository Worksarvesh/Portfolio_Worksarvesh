import { motion } from "framer-motion";

const techBadges = [
  { label: "React", color: "#61dafb" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Python", color: "#3776ab" },
  { label: "SQL", color: "#e3c878" },
  { label: "Power BI", color: "#f0a868" },
  { label: "TailwindCSS", color: "#06b6d4" },
  { label: "OpenCV", color: "#6fcf6f" },
  { label: "Vite", color: "#c79bf2" },
];

const funFacts = [
  "I name every project like it's a startup.",
  "I debug best at night when it's quiet.",
  "I learn a new framework, then build something real with it immediately.",
  "My terminal history is basically my diary.",
  "Coffee, dark theme, full-screen editor — nothing else needed.",
];

const goals = [
  "Land a role at a company building meaningful products.",
  "Master TypeScript patterns and advanced React architecture.",
  "Build a full-stack AI product from zero to production.",
  "Contribute to open source.",
  "Never stop shipping.",
];

export default function ReadmePage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* GitHub README look */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden"
        >
          {/* README header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] text-xs text-[var(--color-text-faint)] mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f07178]" />
              <span className="w-3 h-3 rounded-full bg-[#e3c878]" />
              <span className="w-3 h-3 rounded-full bg-[#6fcf6f]" />
            </div>
            <span>README.md</span>
            <span>Raw · Blame · History</span>
          </div>

          <div className="p-8">
            {/* Big heading */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-center mb-8">
              <h1 className="text-4xl font-black text-gradient mb-2">Sarvesh Sharma</h1>
              <p className="text-[var(--color-text-dim)] text-sm">
                Frontend Developer • Data Analyst • AI Enthusiast
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {["Open to Work", "React", "Python", "2026 Graduate", "RCOEM Nagpur"].map((b) => (
                  <span key={b} className="mono text-[10.5px] px-2.5 py-1 rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-faint)]">{b}</span>
                ))}
              </div>
            </motion.div>

            <hr className="border-[var(--color-border-subtle)] mb-8" />

            {/* About */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">👋 About</h2>
              <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">
                Final-year B.Tech IT student at RCOEM, Nagpur. I build production-grade React interfaces, 
                turn raw data into business insights, and experiment with AI-powered applications. 
                I'm looking for frontend, data, or AI-focused engineering roles where I can create real impact.
              </p>
            </motion.section>

            {/* Tech Badges */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">🛠 Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((b) => (
                  <span
                    key={b.label}
                    className="mono text-[11px] font-bold px-3 py-1.5 rounded-md"
                    style={{ background: `${b.color}20`, color: b.color, border: `1px solid ${b.color}40` }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* GitHub Stats Placeholder */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">📊 GitHub Stats</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Repos", value: "12+" },
                  { label: "Contributions", value: "180+" },
                  { label: "Projects Shipped", value: "4" },
                  { label: "Focus Areas", value: "3" },
                ].map((s) => (
                  <div key={s.label} className="border border-[var(--color-border-subtle)] rounded-lg p-4 text-center bg-[var(--color-bg-panel)]">
                    <div className="mono text-2xl font-black text-gradient">{s.value}</div>
                    <div className="text-[10.5px] text-[var(--color-text-faint)] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Fun Facts */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">⚡ Fun Facts</h2>
              <ul className="space-y-1.5">
                {funFacts.map((f, i) => (
                  <li key={i} className="text-[var(--color-text-dim)] text-sm flex gap-2">
                    <span className="text-[var(--color-accent-blue)]">›</span> {f}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Learning Goals */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-xl font-bold text-white mb-3">🎯 Goals</h2>
              <ul className="space-y-1.5">
                {goals.map((g, i) => (
                  <li key={i} className="text-[var(--color-text-dim)] text-sm flex gap-2">
                    <span className="text-[var(--color-accent-green)]">☐</span> {g}
                  </li>
                ))}
              </ul>
            </motion.section>

            <hr className="border-[var(--color-border-subtle)] mt-8 mb-4" />
            <div className="text-center mono text-[10.5px] text-[var(--color-text-faint)]">
              Built with React + TypeScript + TailwindCSS + Framer Motion — in VS Code, obviously.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
