import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscGithub, VscMail, VscLocation } from "react-icons/vsc";
import { FiLinkedin } from "react-icons/fi";
import { useEditor } from "../context/EditorContext";

const FORMSPREE_ID = "mojokpqj";

const links = [
  { icon: VscMail, label: "Email", value: "worksarvesh05@gmail.com", href: "mailto:worksarvesh05@gmail.com" },
  { icon: VscGithub, label: "GitHub", value: "github.com/Worksarvesh", href: "https://github.com/Worksarvesh" },
  { icon: FiLinkedin, label: "LinkedIn", value: "linkedin.com/in/sarvesh-sharma-432738354", href: "https://www.linkedin.com/in/sarvesh-sharma-432738354/" },
  { icon: VscLocation, label: "Location", value: "Nagpur, Maharashtra, India", href: null },
];

export default function ContactPage() {
  const { showToast } = useEditor();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (touched.name && form.name.trim().length < 2) next.name = "Please enter your name.";
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (touched.subject && form.subject.trim().length < 3) next.subject = "Please add a short subject.";
    if (touched.message && form.message.trim().length < 10) next.message = "Please share a few more details.";
    return next;
  }, [form, touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextTouched = { name: true, email: true, subject: true, message: true };
    setTouched(nextTouched);
    if (Object.keys(errors).length > 0) {
      showToast("Please fix the form errors before sending.", "error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        showToast("Message sent successfully.", "success");
      } else {
        setStatus("error");
        showToast("Message delivery failed. Please email me directly.", "error");
      }
    } catch {
      setStatus("error");
      showToast("Network issue while sending. Please try again later.", "error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="min-h-full overflow-y-auto scroll-thin bg-[var(--color-bg-editor)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mono text-sm text-[var(--color-text-faint)] mb-8"
        >
          <span className="text-[var(--color-accent-purple)]">.</span>contact <span className="text-[var(--color-accent-purple)">{"{"}</span> <span className="text-[var(--color-text-faint)]">/* contact.css */</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-5xl font-black tracking-tight mb-3 text-gradient"
        >
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[var(--color-text-faint)] text-sm mb-12"
        >
          Open to frontend, data, and AI roles. Let's build something great.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="mono text-xs tracking-widest text-[var(--color-accent-blue)] uppercase mb-6">Contact Info</h2>
            {links.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-panel)] flex items-center justify-center shrink-0">
                  <Icon className="text-[var(--color-accent-blue)] text-lg" />
                </div>
                <div>
                  <div className="text-[10px] mono text-[var(--color-text-faint)] uppercase tracking-wider">{label}</div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-dim)] hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--color-text-dim)]">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="pt-4 mono text-xs text-[var(--color-text-faint)] border border-dashed border-[var(--color-border-subtle)] rounded-lg p-4">
              <span className="text-[var(--color-accent-green)]">● </span>
              Available for full-time roles starting mid-2026.
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="mono text-xs tracking-widest text-[var(--color-accent-blue)] uppercase mb-6">Send Message</h2>

            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mono text-[11px] text-[var(--color-text-faint)] mb-1 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, [field.name]: e.target.value }));
                    setTouched((prev) => ({ ...prev, [field.name]: true }));
                  }}
                  placeholder={field.placeholder}
                  className={`w-full bg-[var(--color-bg-elevated)] border rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent-blue)] focus:outline-none transition-colors ${errors[field.name] ? "border-[var(--color-accent-red)]" : "border-[var(--color-border-subtle)]"}`}
                />
                {errors[field.name] && <p className="mt-1 text-[11px] text-[var(--color-accent-red)]">{errors[field.name]}</p>}
              </div>
            ))}

            <div>
              <label className="block mono text-[11px] text-[var(--color-text-faint)] mb-1 uppercase tracking-wider">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => {
                  setForm((f) => ({ ...f, message: e.target.value }));
                  setTouched((prev) => ({ ...prev, message: true }));
                }}
                placeholder="Tell me about the role or project..."
                className={`w-full bg-[var(--color-bg-elevated)] border rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent-blue)] focus:outline-none transition-colors resize-none ${errors.message ? "border-[var(--color-accent-red)]" : "border-[var(--color-border-subtle)]"}`}
              />
              {errors.message && <p className="mt-1 text-[11px] text-[var(--color-accent-red)]">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-[var(--color-accent-blue)] text-black font-bold text-sm mono hover:bg-[#5bc0ff] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "sending" ? "Sending…" : "▶ Send Message"}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-3 rounded-lg bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/40 text-[var(--color-accent-green)] text-sm text-center mono"
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-3 rounded-lg bg-[var(--color-accent-red)]/15 border border-[var(--color-accent-red)]/40 text-[var(--color-accent-red)] text-sm text-center mono"
                >
                  ✕ Something went wrong. Try emailing me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
