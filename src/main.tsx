import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { EditorProvider } from "./context/EditorContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <EditorProvider>
        <App />
      </EditorProvider>
    </HashRouter>
  </StrictMode>
);