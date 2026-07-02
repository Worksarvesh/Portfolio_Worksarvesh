import type { IconType } from "react-icons";
import {
  SiReact, SiHtml5, SiJavascript, SiJson, SiTypescript, SiMarkdown,
} from "react-icons/si";
import { FiCode, FiFileText } from "react-icons/fi";

export interface FileEntry {
  id: string;
  filename: string;
  path: string; // route path used with HashRouter (e.g. "/about")
  icon: IconType;
  color: string;
}

export const files: FileEntry[] = [
  { id: "home",         filename: "home.tsx",        path: "/",             icon: SiReact,    color: "#3fb1ff" },
  { id: "about",        filename: "about.html",      path: "/about",        icon: SiHtml5,    color: "#f0a868" },
  { id: "projects",     filename: "projects.js",     path: "/projects",     icon: SiJavascript, color: "#e3c878" },
  { id: "skills",       filename: "skills.json",     path: "/skills",       icon: SiJson,     color: "#e3c878" },
  { id: "experience",   filename: "experience.ts",   path: "/experience",   icon: SiTypescript, color: "#3fb1ff" },
  { id: "achievements", filename: "achievements.md", path: "/achievements", icon: SiMarkdown, color: "#4dd6c4" },
  { id: "contact",      filename: "contact.css",     path: "/contact",      icon: FiCode,     color: "#c79bf2" },
  { id: "readme",       filename: "README.md",       path: "/readme",       icon: SiMarkdown, color: "#4dd6c4" },
  { id: "resume",       filename: "resume.pdf",      path: "/resume.pdf",   icon: FiFileText, color: "#f07178" },
];
