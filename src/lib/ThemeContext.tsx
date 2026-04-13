"use client";

import { createContext, useContext, type ReactNode } from "react";
import { themes, type Theme } from "./themes";

const ThemeContext = createContext<Theme>(themes.institution);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={themes.institution}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
