export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Currently Building" | "Completed" | "Maintained";
  github?: string;
  demo?: string;
  thumbnail?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "applybot",
    name: "ApplyBot AI",
    tagline: "AI-Powered Job Application Automation Platform",
    description:
      "Full-stack platform that researches a target company, tailors resume bullets, and drafts a personalized cold email end-to-end, then sends it via the user's own Gmail account and tracks every application on a live dashboard.",
    tech: ["React", "TypeScript", "n8n", "Google Gemini", "Supabase"],
    status: "Currently Building",
    github: "https://github.com/Worksarvesh/applybot-ai.git",
    demo: "https://applybot-ai.vercel.app/",
    thumbnail: "/Portfolio_Worksarvesh/projects/applybot.png",
    accent: "var(--color-accent-blue)",
  },
  {
    id: "commerceintel",
    name: "CommerceIntel",
    tagline: "Sales & Inventory Business Intelligence Platform",
    description:
      "Business intelligence platform that transforms sales and inventory datasets into dashboards revealing customer behavior, revenue trends, inventory performance, and business KPIs.",
    tech: ["Python", "SQL", "Power BI", "Flask"],
    status: "Completed",
    github: "https://github.com/Worksarvesh/CommerceIntel.git",
    thumbnail: "/Portfolio_Worksarvesh/projects/commerceintel.png",
    accent: "var(--color-accent-green)",
  },
  {
    id: "ai-vehicle-diagnostics",
    name: "AI Vehicle Diagnostics",
    tagline: "Computer Vision Fault Detection System",
    description:
      "Automated vehicle inspection system using computer vision and OCR pipelines to identify faults and generate structured DDR (Detailed Damage Report) reports.",
    tech: ["Python", "OpenCV", "OCR", "Computer Vision"],
    status: "Completed",
    github: "https://github.com/Worksarvesh/ai-vehicle-diagnostics-ddr-generator-with-vision.git",
    accent: "var(--color-accent-purple)",
  },
  {
    id: "gesture-control",
    name: "Gesture Control",
    tagline: "Hands-Free Media Controller",
    description:
      "Hand gesture recognition application enabling hands-free YouTube media controls including play, pause, volume adjustment, and navigation.",
    tech: ["Python", "MediaPipe", "OpenCV", "Flask"],
    status: "Completed",
    github: "https://github.com/Worksarvesh/Youtube_Gesture_Control.git",
    demo: "https://youtube-gesture-control.vercel.app/",
    accent: "var(--color-accent-yellow)",
  },
];