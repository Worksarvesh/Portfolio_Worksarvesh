export interface TimelineEntry {
  year: string;
  items: string[];
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  { year: "2022", items: ["Started B.Tech in Information Technology at RCOEM, Nagpur"] },
  { year: "2023", items: ["Built my first React application", "Learned JavaScript deeply, beyond the basics"] },
  { year: "2024", items: ["Worked with SQL, Python and Power BI", "Started exploring Machine Learning fundamentals"] },
  { year: "2025", items: ["Built AI Vehicle Diagnostics", "Built CommerceIntel", "Built Gesture Controller", "Started DevPulse"] },
  { year: "2026", items: ["Actively seeking opportunities as a Frontend Developer / Data Analyst"], current: true },
];

export const education = {
  institution: "Ramdeobaba College of Engineering and Management",
  degree: "B.Tech, Information Technology",
  duration: "2022 — 2026",
  cgpa: "7.8",
};
