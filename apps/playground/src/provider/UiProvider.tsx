import { MantineProvider, MantineProviderProps } from "@mantine/core";
import { theme } from "../theme";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

export type UiProviderProps = Omit<MantineProviderProps, "theme"> & {
  themeOverride?: MantineProviderProps["theme"];
};

export function UiProvider({
  children,
  themeOverride,
  ...rest
}: UiProviderProps) {
  return (
    <MantineProvider
      theme={{ ...theme, ...themeOverride }}
      defaultColorScheme="light"
      {...rest}
    >
      {children}
    </MantineProvider>
  );
}
