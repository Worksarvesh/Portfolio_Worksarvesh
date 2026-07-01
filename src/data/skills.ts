export interface Skill {
  name: string;
  level: number; // 0-100
}
export interface SkillCategory {
  key: string;
  label: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    label: "frontend",
    color: "var(--color-accent-blue)",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 88 },
      { name: "Responsive Design", level: 90 },
      { name: "REST APIs", level: 82 },
    ],
  },
  {
    key: "data_analysis",
    label: "data_analysis",
    color: "var(--color-accent-cyan)",
    skills: [
      { name: "Python", level: 88 },
      { name: "SQL", level: 85 },
      { name: "Pandas", level: 82 },
      { name: "NumPy", level: 78 },
      { name: "Power BI", level: 85 },
      { name: "Excel", level: 88 },
      { name: "Streamlit", level: 75 },
    ],
  },
  {
    key: "ai",
    label: "ai",
    color: "var(--color-accent-purple)",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "Scikit-learn", level: 72 },
      { name: "OpenCV", level: 80 },
      { name: "MediaPipe", level: 78 },
      { name: "OCR", level: 76 },
      { name: "Gemini Vision", level: 70 },
      { name: "Recommendation Systems", level: 68 },
    ],
  },
  {
    key: "workflow",
    label: "workflow",
    color: "var(--color-accent-green)",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
      { name: "Chrome DevTools", level: 85 },
      { name: "Vite", level: 85 },
    ],
  },
];
