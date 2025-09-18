import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import styled from "./index.module.css";

interface ITimezoneList {
  name: string;
  longName: string;
  currentTime: string;
  utcOffset: string;
  handleTimezoneMouseClick: (name: string) => void;
}

export const TimezoneList: FC<ITimezoneList> = ({
  name,
  longName,
  currentTime,
  utcOffset,
  handleTimezoneMouseClick,
}) => {
  const onClick = () => {
    handleTimezoneMouseClick(name);
  };

  return (
    <Flex direction="column" className={styled.row} onClick={onClick}>
      <Flex justify="space-between">
        <Text>{name}</Text>
        <Text>
          {currentTime} • UTC{utcOffset}
        </Text>
      </Flex>
      <Text>{longName}</Text>
    </Flex>
  );
};
