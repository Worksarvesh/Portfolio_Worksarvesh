import { motion } from "framer-motion";
import { education } from "../data/experience";

const focuses = [
  "Frontend Engineering", "React Ecosystem", "Data Analytics",
  "Machine Learning", "Power BI Dashboards", "AI Applications",
  "Problem Solving", "Always Learning",
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function AboutPage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* filename comment */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-orange)]">&lt;!--</span> about.html{" "}
          <span className="text-[var(--color-accent-orange)]">--&gt;</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl font-black tracking-tight mb-8 text-gradient"
        >
          About Me
        </motion.h1>

        <motion.div
          variants={container} initial="hidden" animate="show"
          className="space-y-4 text-[var(--color-text-dim)] leading-relaxed text-[15px] mb-14"
        >
          {[
            "I'm Sarvesh Sharma, a final-year B.Tech Information Technology student from Ramdeobaba College of Engineering and Management (RCOEM), Nagpur.",
            "I enjoy building products that combine great user experience with meaningful data.",
            "On the frontend side, I focus on creating responsive, performant interfaces using React, JavaScript, and modern CSS.",
            "On the data side, I analyze business data using Python, SQL, Pandas, and Power BI to uncover actionable insights.",
            "I also enjoy experimenting with AI-powered applications — computer vision, OCR pipelines, recommendation systems, and Gemini Vision API integrations.",
            "I'm currently looking for opportunities as a Frontend Developer, Data Analyst, or hybrid AI-focused Software Engineer where I can contribute, learn, and grow.",
          ].map((p, i) => (
            <motion.p key={i} variants={item}>{p}</motion.p>
          ))}
        </motion.div>

        {/* Current Focus */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="mono text-xs tracking-widest text-[var(--color-accent-blue)] mb-4 uppercase">
            Current Focus
          </h2>
          <div className="flex flex-wrap gap-2">
            {focuses.map((f) => (
              <motion.span
                key={f}
                whileHover={{ scale: 1.05, y: -1 }}
                className="mono text-xs px-3 py-1.5 rounded-md border border-[var(--color-accent-blue)]/30 text-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/8 cursor-default"
              >
                {f}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="mono text-xs tracking-widest text-[var(--color-accent-cyan)] mb-4 uppercase">
            Education
          </h2>
          <div className="border border-[var(--color-border-subtle)] rounded-lg p-5 bg-[var(--color-bg-elevated)]">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <div className="font-bold text-white text-lg">{education.institution}</div>
                <div className="text-[var(--color-text-dim)] text-sm mt-0.5">{education.degree}</div>
                <div className="mono text-[var(--color-text-faint)] text-xs mt-1">{education.duration}</div>
              </div>
              <div className="text-right">
                <div className="mono text-3xl font-black text-gradient">{education.cgpa}</div>
                <div className="text-[10px] text-[var(--color-text-faint)] mono">CGPA</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech stack visual */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="mono text-xs tracking-widest text-[var(--color-accent-purple)] mb-4 uppercase">
            Profile Snapshot
          </h2>
          <div className="mono text-[13px] bg-[var(--color-bg-panel)] border border-[var(--color-border-subtle)] rounded-lg p-5 leading-7">
            <div><span className="text-[var(--color-accent-purple)]">const </span><span className="text-[var(--color-accent-blue)]">sarvesh</span> <span className="text-white">= {"{"}</span></div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">name</span>: <span className="text-[var(--color-accent-green)]">"Sarvesh Sharma"</span>,</div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">roles</span>: <span className="text-white">["</span><span className="text-[var(--color-accent-green)]">Frontend Dev</span><span className="text-white">", "</span><span className="text-[var(--color-accent-green)]">Data Analyst</span><span className="text-white">", "</span><span className="text-[var(--color-accent-green)]">AI Builder</span><span className="text-white">"],</span></div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">location</span>: <span className="text-[var(--color-accent-green)]">"Nagpur, India"</span>,</div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">openToWork</span>: <span className="text-[var(--color-accent-orange)]">true</span>,</div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">cgpa</span>: <span className="text-[var(--color-accent-orange)]">7.8</span>,</div>
            <div className="pl-6"><span className="text-[var(--color-accent-cyan)]">graduating</span>: <span className="text-[var(--color-accent-orange)]">2026</span>,</div>
            <div><span className="text-white">{"}"};</span></div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
