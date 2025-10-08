import { Button, Flex } from "@mantine/core";
import { useAppTheme } from "../hooks/useAppTheme";
import { FC } from "react";

interface IFooter {
  handleApplyClick?: () => void;
  handleCancelClick?: () => void;
}

export const Footer: FC<IFooter> = ({ handleApplyClick, handleCancelClick }) => {
  const { theme } = useAppTheme();

  return (
    <Flex justify={"flex-end"}>
      <Flex columnGap={16}>
        <Button size="xs" variant="subtle" color={theme.primaryColor} onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button size="xs" color={theme.primaryColor} onClick={handleApplyClick}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};
