import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useTypingEffect } from "../hooks/useTypingEffect";
import { useCounter } from "../hooks/useCounter";
import { useEditor } from "../context/EditorContext";

const words = [
  "Building Interfaces.",
  "Decoding Data.",
  "Shipping AI.",
  "Turning Data into Decisions.",
  "Building Better User Experiences.",
];

const stats = [
  { label: "Major Projects", value: 4, suffix: "+", integer: true },
  { label: "CGPA", value: 7.8, suffix: "", integer: false },
  { label: "Batch", value: 2026, suffix: "", integer: true },
  { label: "Always Learning", value: 999, suffix: "∞", integer: true, infinity: true },
];

function Particle({ i }: { i: number }) {
  const style = {
    left: `${(i * 13.7) % 100}%`,
    width: `${1 + (i % 2)}px`,
    height: `${40 + (i % 60)}px`,
    animationDuration: `${6 + (i % 8)}s`,
    animationDelay: `${(i * 0.4) % 5}s`,
    opacity: 0.12 + (i % 3) * 0.05,
  };
  return (
    <div
      className="absolute bottom-0 bg-[var(--color-accent-blue)] rounded-full"
      style={{ ...style, animation: `float-particle ${style.animationDuration} ${style.animationDelay} linear infinite` }}
    />
  );
}

function StatCounter({ value, suffix, label, integer, infinity: inf }: (typeof stats)[0]) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 1400, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const display = inf ? "∞" : integer ? Math.round(count).toString() + suffix : count.toFixed(1) + suffix;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mono text-4xl font-bold text-gradient">{display}</div>
      <div className="text-xs text-[var(--color-text-faint)] mt-1 tracking-wide">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  const typed = useTypingEffect(words);
  const { openFile } = useEditor();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  } as const;

  return (
    <div className="relative min-h-full overflow-y-auto scroll-thin bg-grid">
      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => <Particle key={i} i={i} />)}
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-24">
        {/* top comment */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mono text-sm text-[var(--color-accent-green)] mb-10"
        >
          <span className="text-[var(--color-text-faint)]">{"// "}</span>hello world 👋 welcome to my portfolio
        </motion.p>

        {/* Hero heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <motion.div variants={item} className="leading-none">
            <span className="text-[clamp(4rem,14vw,9rem)] font-black tracking-tight text-gradient block">
              Sarvesh
            </span>
            <span className="text-[clamp(4rem,14vw,9rem)] font-black tracking-tight text-[var(--color-text-dim)] block -mt-2">
              Sharma
            </span>
          </motion.div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {["Frontend Developer", "Data Analyst", "AI Projects", "Open to Work"].map((b) => (
            <span
              key={b}
              className={`mono text-[11px] font-semibold px-3 py-1 rounded-full border ${
                b === "Open to Work"
                  ? "border-[var(--color-accent-green)]/60 text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10"
                  : "border-[var(--color-accent-blue)]/40 text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10"
              }`}
            >
              {b === "Open to Work" ? "● " : ""}{b}
            </span>
          ))}
        </motion.div>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mono text-xl md:text-2xl text-[var(--color-text-dim)] mb-6 h-8 flex items-center"
        >
          <span className="text-[var(--color-accent-blue)]">&gt; </span>
          <span>{typed}</span>
          <span className="ml-0.5 inline-block w-0.5 h-6 bg-[var(--color-accent-blue)] caret-blink" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55 }}
          className="text-[var(--color-text-dim)] max-w-2xl leading-relaxed mb-10 text-[15px]"
        >
          Final-year B.Tech Information Technology student from RCOEM, Nagpur. I build fast, beautiful
          React interfaces and transform raw data into meaningful insights using Python, SQL, Power BI,
          and AI-powered applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-20"
        >
          {[
            { label: "Projects", action: () => openFile("projects"), primary: true },
            { label: "About Me", action: () => openFile("about"), primary: false },
            { label: "Resume", action: () => openFile("resume"), primary: false },
            { label: "Contact", action: () => openFile("contact"), primary: false },
          ].map(({ label, action, primary }) => (
            <motion.button
              key={label}
              onClick={action}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-md text-sm font-semibold mono transition-colors ${
                primary
                  ? "bg-[var(--color-accent-blue)] text-black hover:bg-[#5bc0ff]"
                  : "border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:border-[var(--color-accent-blue)] hover:text-white bg-[var(--color-bg-elevated)]"
              }`}
            >
              {primary ? "▶ " : ""}{label}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-[var(--color-border-subtle)] pt-12"
        >
          <p className="mono text-[11px] text-[var(--color-text-faint)] mb-8 tracking-widest">
            {`/* stats */`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => <StatCounter key={s.label} {...s} />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
