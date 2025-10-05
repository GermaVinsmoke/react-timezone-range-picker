import { Box, Flex, Text } from "@mantine/core";
import { IconClock, IconCalendarWeekFilled, IconWorld } from "@tabler/icons-react";
import styled from "./index.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { Panel } from "../TimezoneRangePicker";

interface ISidebar {
  setSelectedPanel: Dispatch<SetStateAction<Panel>>;
}

export const Sidebar: FC<ISidebar> = ({ setSelectedPanel }) => {
  return (
    <Flex direction="column" className={styled["sidebar-container"]} flex={1}>
      <Box className={styled["sidebar-row"]} onClick={() => setSelectedPanel(Panel.START_END_TIME)}>
        <IconCalendarWeekFilled />
        <Text>Start and end times</Text>
      </Box>
      <Box className={styled["sidebar-row"]} onClick={() => setSelectedPanel(Panel.AROUND_TIME)}>
        <IconClock />
        <Text>Around a time</Text>
      </Box>
      <Box className={styled["sidebar-row"]} onClick={() => setSelectedPanel(Panel.TIMEZONE)}>
        <IconWorld />
        <Text>Time zone</Text>
      </Box>
    </Flex>
  );
};
