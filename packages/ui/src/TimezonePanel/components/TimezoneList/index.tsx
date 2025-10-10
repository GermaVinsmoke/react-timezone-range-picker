import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import clsx from "clsx";
import styled from "./index.module.css";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { TimezoneData } from "packages/ui/src/interfaces";

interface ITimezoneList {
  name: string | null;
  longName: string | null;
  currentTime: string;
  utcOffset: string | null;
  selectedTimezone: TimezoneData | null;
  isBrowserTimezone?: boolean;
  handleTimezoneMouseClick?: (selectedTimezone: TimezoneData) => void;
}

export const TimezoneList: FC<ITimezoneList> = ({
  name,
  longName,
  currentTime,
  utcOffset,
  selectedTimezone,
  isBrowserTimezone = false,
  handleTimezoneMouseClick = undefined,
}) => {
  const { colorScheme } = useAppTheme();

  const onClick = () => {
    if (isBrowserTimezone) return;

    handleTimezoneMouseClick!({
      name,
      longName,
      utcOffset,
    });
  };

  return (
    <Flex
      direction="column"
      className={clsx(
        styled.row,
        isBrowserTimezone
          ? undefined
          : colorScheme === "dark"
          ? styled["row-dark"]
          : styled["row-light"],
        selectedTimezone?.name === name
          ? colorScheme === "dark"
            ? styled["row-selected-dark"]
            : styled["row-selected-light"]
          : undefined
      )}
      onClick={onClick}
    >
      <Flex justify="space-between">
        <Text size="sm">{name}</Text>
        <Text size="sm">
          {currentTime} • UTC{utcOffset}
        </Text>
      </Flex>
      <Text size="sm">{longName}</Text>
    </Flex>
  );
};
