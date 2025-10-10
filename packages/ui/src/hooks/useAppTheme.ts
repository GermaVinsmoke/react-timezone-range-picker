import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export const useAppTheme = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return { colorScheme, theme };
};
