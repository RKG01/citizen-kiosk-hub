import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type TextScaleLevel = "default" | "increase" | "decrease";

interface TextScaleContextValue {
  level: TextScaleLevel;
  setLevel: (level: TextScaleLevel) => void;
  scale: number;
}

const SCALE_MAP: Record<TextScaleLevel, number> = {
  default: 1,
  increase: 1.2,
  decrease: 0.9,
};

const STORAGE_KEY = "citizen-kiosk-text-scale";

const TextScaleContext = createContext<TextScaleContextValue | undefined>(undefined);

const getInitialLevel = (): TextScaleLevel => {
  if (typeof window === "undefined") return "default";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "increase" || stored === "decrease" || stored === "default") {
    return stored;
  }
  return "default";
};

const applyScale = (level: TextScaleLevel) => {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--kiosk-font-scale", SCALE_MAP[level].toString());
};

export const TextScaleProvider = ({ children }: { children: ReactNode }) => {
  const [level, setLevel] = useState<TextScaleLevel>(getInitialLevel);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, level);
    }
    applyScale(level);
  }, [level]);

  const value = useMemo<TextScaleContextValue>(
    () => ({
      level,
      setLevel,
      scale: SCALE_MAP[level],
    }),
    [level],
  );

  return <TextScaleContext.Provider value={value}>{children}</TextScaleContext.Provider>;
};

export const useTextScale = () => {
  const context = useContext(TextScaleContext);
  if (!context) {
    throw new Error("useTextScale must be used within a TextScaleProvider");
  }
  return context;
};
