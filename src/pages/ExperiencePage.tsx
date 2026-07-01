import { motion } from "framer-motion";
import { timeline, education } from "../data/experience";
import { commits } from "../data/commits";

const commitTypeColor: Record<string, string> = {
  feat: "var(--color-accent-green)",
  fix: "var(--color-accent-yellow)",
  docs: "var(--color-accent-cyan)",
  chore: "var(--color-text-faint)",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-blue)]">export </span>
          <span className="text-[var(--color-accent-purple)]">const </span>
          <span className="text-white">journey </span>
          <span className="text-[var(--color-text-faint)]">{"// experience.ts"}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl font-black tracking-tight mb-3 text-gradient"
        >
          Learning Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[var(--color-text-faint)] text-sm mb-12"
        >
          No fake internships. Just an honest account of growth.
        </motion.p>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-[var(--color-border-subtle)]" />
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-6 mb-8 relative"
            >
              <div className="relative flex-shrink-0 flex items-start justify-center w-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 + 0.1 }}
                  className={`w-4 h-4 rounded-full border-2 mt-1 z-10 ${
                    entry.current
                      ? "border-[var(--color-accent-green)] bg-[var(--color-accent-green)]"
                      : "border-[var(--color-accent-blue)] bg-[var(--color-bg-editor)]"
                  }`}
                />
              </div>
              <div className="flex-1 pb-2">
                <div className="mono text-lg font-bold mb-2" style={{ color: entry.current ? "var(--color-accent-green)" : "var(--color-accent-blue)" }}>
                  {entry.year} {entry.current && <span className="text-xs font-normal ml-2 text-[var(--color-accent-green)]">← current</span>}
                </div>
                <ul className="space-y-1">
                  {entry.items.map((item) => (
                    <li key={item} className="text-[var(--color-text-dim)] text-sm flex gap-2">
                      <span className="text-[var(--color-text-faint)] mt-0.5">▸</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education card */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="mono text-xs tracking-widest text-[var(--color-accent-cyan)] mb-4 uppercase">Education</h2>
          <div className="border border-[var(--color-border-subtle)] rounded-lg p-5 bg-[var(--color-bg-elevated)] flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="font-bold text-white">{education.institution}</div>
              <div className="text-[var(--color-text-dim)] text-sm">{education.degree}</div>
              <div className="mono text-xs text-[var(--color-text-faint)] mt-1">{education.duration}</div>
            </div>
            <div className="text-right">
              <div className="mono text-3xl font-black text-gradient">{education.cgpa}</div>
              <div className="text-[10px] text-[var(--color-text-faint)] mono">CGPA</div>
            </div>
          </div>
        </motion.section>

        {/* git log */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="mono text-xs tracking-widest text-[var(--color-accent-purple)] mb-4 uppercase">git log</h2>
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-subtle)] rounded-lg overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-text-faint)] mono flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--color-accent-red)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[var(--color-accent-yellow)] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[var(--color-accent-green)] inline-block" />
              <span className="ml-2">bash — git log --oneline</span>
            </div>
            <div className="p-4 font-mono text-[12.5px] space-y-2.5">
              {commits.map((c) => (
                <motion.div
                  key={c.hash}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 flex-wrap"
                >
                  <span className="text-[var(--color-accent-yellow)]">{c.hash}</span>
                  <span style={{ color: commitTypeColor[c.type] }} className="font-bold">{c.type}:</span>
                  <span className="text-[var(--color-text-dim)]">{c.message.replace(/^(feat|fix|chore|docs): /, "")}</span>
                  <span className="text-[var(--color-text-faint)] text-[10px] ml-auto">{c.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
