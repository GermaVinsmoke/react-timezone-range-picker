import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import clsx from "clsx";
import styled from "./index.module.css";

interface ITimezoneList {
  name: string;
  longName: string;
  currentTime: string;
  utcOffset: string;
  isBrowserTimezone?: boolean;
  handleTimezoneMouseClick?: (name: string) => void;
}

export const TimezoneList: FC<ITimezoneList> = ({
  name,
  longName,
  currentTime,
  utcOffset,
  isBrowserTimezone = false,
  handleTimezoneMouseClick = undefined,
}) => {
  const onClick = () => {
    if (isBrowserTimezone) return;

    handleTimezoneMouseClick!(name);
  };

  return (
    <Flex
      direction="column"
      className={clsx(styled.row, isBrowserTimezone ? styled["row-active"] : styled["row-select"])}
      onClick={onClick}
    >
      <Flex justify="space-between">
        <Text>{name}</Text>
        <Text>
          {currentTime} • UTC{utcOffset}
        </Text>
      </Flex>
      <Text size="sm">{longName}</Text>
    </Flex>
  );
};
