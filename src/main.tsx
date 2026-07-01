import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EditorProvider } from "./context/EditorContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <EditorProvider>
        <App />
      </EditorProvider>
    </BrowserRouter>
  </StrictMode>
);
