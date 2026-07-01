import { useState } from "react";
import { motion } from "framer-motion";
import { VscGithub, VscLinkExternal } from "react-icons/vsc";
import { projects } from "../data/projects";

const statusColor: Record<string, string> = {
  "Currently Building": "var(--color-accent-yellow)",
  "Completed": "var(--color-accent-green)",
  "Maintained": "var(--color-accent-cyan)",
};

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="relative rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] overflow-hidden transition-transform duration-150 ease-out group"
    >
      {/* glow */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: hovered ? 0.06 : 0,
          background: `radial-gradient(circle at 50% 50%, ${project.accent}, transparent 70%)`,
        }}
      />

      {/* accent top bar */}
      <div className="h-[2px]" style={{ background: project.accent }} />

      {/* visual concept */}
      <div
        className="h-44 flex items-center justify-center bg-[var(--color-bg-panel)] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${project.accent}, transparent 70%)`,
          }}
        />
        <div className="mono text-6xl font-black opacity-10" style={{ color: project.accent }}>
          {project.name.split(" ").map(w => w[0]).join("")}
        </div>
        <div className="absolute bottom-2 right-2">
          <span
            className="mono text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: statusColor[project.status],
              background: `${statusColor[project.status]}18`,
              border: `1px solid ${statusColor[project.status]}40`,
            }}
          >
            ● {project.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-0.5">{project.name}</h3>
        <p className="mono text-[11px] text-[var(--color-text-faint)] mb-3">{project.tagline}</p>
        <p className="text-[var(--color-text-dim)] text-sm leading-relaxed mb-4">{project.description}</p>

        {/* tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="mono text-[10.5px] px-2 py-0.5 rounded border border-[var(--color-border-subtle)] text-[var(--color-text-faint)]">
              {t}
            </span>
          ))}
        </div>

        {/* buttons */}
        <div className="flex gap-2">
          <motion.a
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            href={project.github ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-white hover:border-white transition-colors"
          >
            <VscGithub /> GitHub
          </motion.a>
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border text-black font-semibold transition-colors"
              style={{ background: project.accent, borderColor: project.accent }}
            >
              <VscLinkExternal /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-yellow)]">{"// "}</span>
          <span className="text-[var(--color-accent-yellow)]">projects</span>
          <span className="text-[var(--color-text-faint)]">.js</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl font-black tracking-tight mb-3 text-gradient"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[var(--color-text-faint)] mb-12 text-sm"
        >
          Things I've built — from analytics dashboards to computer vision systems.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
        </div>
      </div>
    </div>
  );
}
