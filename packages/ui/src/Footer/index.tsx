import { Button, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAppTheme } from "../hooks/useAppTheme";
import { usePopoverContext } from "../Provider/PopoverProvider";

interface FooterProps {
  onBasic: () => void;
}

export const Footer = ({ onBasic }: FooterProps) => {
  const { theme } = useAppTheme();
  const { closePopover } = usePopoverContext();
  const isMobile = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");

  return (
    <Flex justify="space-between" align="flex-end" gap={12} mt={12} pb={12}>
      <Button
        type="button"
        size="xs"
        variant="subtle"
        color={theme.primaryColor}
        onClick={onBasic}
      >
        Basic
      </Button>
      <Flex
        direction={isMobile ? "column" : "row"}
        gap={12}
        flex={isTablet ? 1 : undefined}
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
