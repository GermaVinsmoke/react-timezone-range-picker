export type ThemeMode = "light" | "dark";

export type ThemeTokens = {
  background: string;
  text: string;
  card: string;
  border: string;
  mutedText: string;
  accent: string;
  hover: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
};

export const appTheme: Record<ThemeMode, ThemeTokens> = {
  light: {
    background: "#f9fafb", // subtle gray, not pure white
    card: "#ffffff",
    text: "#1f2937", // slate-800
    border: "#e5e7eb", // slate-200
    mutedText: "#6b7280", // slate-500
    accent: "#2563eb", // blue-600 (primary accent)
    hover: "#f3f4f6", // slate-100

    // Status colors
    success: "#16a34a", // green-600
    warning: "#d97706", // amber-600
    error: "#dc2626", // red-600
    info: "#0284c7", // sky-600
  },
  dark: {
    background: "#0f172a", // slate-900
    card: "#1e293b", // slate-800
    text: "#f1f5f9", // slate-100
    border: "#334155", // slate-700
    mutedText: "#94a3b8", // slate-400
    accent: "#3b82f6", // blue-500
    hover: "#334155", // slate-700

    // Status colors
    success: "#22c55e", // green-500
    warning: "#f59e0b", // amber-500
    error: "#ef4444", // red-500
    info: "#38bdf8", // sky-400
  },
};
