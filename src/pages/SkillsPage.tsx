import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="mono text-xs text-[var(--color-text-dim)]">{name}</span>
        <span className="mono text-[10px] text-[var(--color-text-faint)]">{level}%</span>
      </div>
      <div className="h-1.5 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-yellow)">{"/* "}</span>
          <span className="text-[var(--color-accent-yellow)]">skills</span>
          <span className="text-[var(--color-text-faint)">{"  .json */"}</span>
        </motion.p>

        {/* JSON header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="mono bg-[var(--color-bg-panel)] border border-[var(--color-border-subtle)] rounded-lg p-5 mb-10 text-sm"
        >
          <div><span className="text-white">{"{"}</span></div>
          <div className="pl-4">
            <span className="text-[var(--color-accent-cyan)]">"developer"</span>
            <span className="text-white">: </span>
            <span className="text-[var(--color-accent-green)]">"Sarvesh Sharma"</span>
            <span className="text-white">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[var(--color-accent-cyan)]">"status"</span>
            <span className="text-white">: </span>
            <span className="text-[var(--color-accent-green)]">"always_learning"</span>
            <span className="text-white">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[var(--color-accent-cyan)]">"openToWork"</span>
            <span className="text-white">: </span>
            <span className="text-[var(--color-accent-orange)]">true</span>
          </div>
          <div><span className="text-white">{"}"}</span></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: ci * 0.08 }}
              className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-lg p-5"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span className="mono text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>
                  {cat.label}
                </span>
              </div>
              {cat.skills.map((s, si) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={cat.color}
                  delay={si * 0.06}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
