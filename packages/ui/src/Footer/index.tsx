import { Button, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAppTheme } from "../hooks/useAppTheme";
import { usePopoverContext } from "../Provider/PopoverProvider";

export const Footer = () => {
  const { theme } = useAppTheme();
  const { closePopover } = usePopoverContext();
  const isMobile = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");

  return (
    <Flex justify={"flex-end"} mt={12} pb={12}>
      <Flex
        direction={isMobile ? "column" : "row"}
        gap={12}
        w={isTablet ? "100%" : undefined}
      >
        <Button
          size="xs"
          variant="subtle"
          color={theme.primaryColor}
          onClick={closePopover}
          fullWidth={isTablet}
        >
          Cancel
        </Button>
        <Button type="submit" size="xs" color={theme.primaryColor} fullWidth={isTablet}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};
