import { Button, Flex } from "@mantine/core";
import { useAppTheme } from "../hooks/useAppTheme";
import { usePopoverContext } from "../Provider/PopoverProvider";

export const Footer = () => {
  const { theme } = useAppTheme();
  const { closePopover } = usePopoverContext();

  return (
    <Flex justify={"flex-end"}>
      <Flex columnGap={16}>
        <Button size="xs" variant="subtle" color={theme.primaryColor} onClick={closePopover}>
          Cancel
        </Button>
        <Button type="submit" size="xs" color={theme.primaryColor}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};
