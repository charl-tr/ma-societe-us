export type ThemeKey = "institution";

export interface Theme {
  key: ThemeKey;
  name: string;
  colors: {
    background: string;
    backgroundAlt: string;
    foreground: string;
    foregroundMuted: string;
    primary: string;
    primaryHover: string;
    accent: string;
    accentLight: string;
    border: string;
    card: string;
    cardHover: string;
    navBg: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const themes: Record<ThemeKey, Theme> = {
  institution: {
    key: "institution",
    name: "Institution",
    colors: {
      background: "#FAFAF7",
      backgroundAlt: "#002868",
      foreground: "#002868",
      foregroundMuted: "#5C6670",
      primary: "#002868",
      primaryHover: "#1A2B3A",
      accent: "#8A7250",
      accentLight: "#C4AD8A",
      border: "#D8D4CD",
      card: "#FFFFFF",
      cardHover: "#F7F5F0",
      navBg: "#002868",
    },
    fonts: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
    },
  },
};

export const DEFAULT_THEME: ThemeKey = "institution";
