import { useEffect } from "react";

export function useKeyCombo(combo: { key: string; ctrlOrCmd?: boolean }, handler: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const ctrlOk = combo.ctrlOrCmd ? e.ctrlKey || e.metaKey : true;
      if (ctrlOk && e.key.toLowerCase() === combo.key.toLowerCase()) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [combo.key, combo.ctrlOrCmd, handler]);
}
