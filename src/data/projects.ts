export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Currently Building" | "Completed" | "Maintained";
  github?: string;
  demo?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "devpulse",
    name: "DevPulse",
    tagline: "Developer Productivity Analytics Dashboard",
    description:
      "A modern developer analytics dashboard for tracking coding productivity, project health, KPIs, activity timelines, and engineering metrics through interactive visualizations.",
    tech: ["React", "JavaScript", "CSS", "Charts"],
    status: "Currently Building",
    github: "https://github.com/Worksarvesh/DevPulse.git",
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
    accent: "var(--color-accent-yellow)",
  },
];
