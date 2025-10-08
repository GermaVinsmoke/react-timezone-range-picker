import type { ThemeTokens, ThemeMode } from "@/theme/tokens";

declare module "@mantine/core" {
  // This merges with Mantine's theme types:
  export interface MantineThemeOther {
    appTheme: Record<ThemeMode, ThemeTokens>;
  }
}
