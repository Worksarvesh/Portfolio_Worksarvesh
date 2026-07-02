import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { EditorProvider } from "./context/EditorContext";
import App from "./App";
import "./index.css";

// HashRouter is required for GitHub Pages (static hosting with no server-side
// routing). BrowserRouter causes a blank page / 404 on any hard refresh or
// direct URL because GitHub Pages has no fallback to index.html.
// With HashRouter every URL looks like:
//   https://worksarvesh.github.io/Portfolio_Worksarvesh/#/about
// and navigation, back/forward, and page refresh all work correctly.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <EditorProvider>
        <App />
      </EditorProvider>
    </HashRouter>
  </StrictMode>
);
