import { Button, Flex, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useAppTheme } from "../hooks/useAppTheme";

export const Footer = () => {
  const { appTheme, theme } = useAppTheme();

  return (
    <Flex justify={"flex-end"}>
      <Flex columnGap={16}>
        <Button size="xs" variant="subtle" color={theme.primaryColor}>
          Cancel
        </Button>
        <Button size="xs" color={theme.primaryColor}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};
