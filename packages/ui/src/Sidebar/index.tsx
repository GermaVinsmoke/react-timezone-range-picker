import { Box, Flex, Text } from "@mantine/core";
import {
  IconClock,
  IconCalendarWeekFilled,
  IconWorld,
  IconChevronRight,
} from "@tabler/icons-react";
import styled from "./index.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { Panel } from "../TimezoneRangePicker";
import { RelativeTimePanel } from "../RelativeTimePanel";

interface ISidebar {
  setSelectedPanel: Dispatch<SetStateAction<Panel>>;
}

export const Sidebar: FC<ISidebar> = ({ setSelectedPanel }) => {
  return (
    <Box className={styled["sidebar-container"]} flex={1}>
      <RelativeTimePanel />
      <Flex direction="column" rowGap={16} py={8} style={{ borderTop: "1px solid #ddd" }}>
        <Flex
          className={styled["sidebar-row"]}
          justify={"space-between"}
          align={"center"}
          onClick={() => setSelectedPanel(Panel.START_END_TIME)}
        >
          <Flex align={"center"}>
            <IconCalendarWeekFilled stroke={1.5} />
            <Text size="sm">Start and end times</Text>
          </Flex>
          <IconChevronRight stroke={1.5} />
        </Flex>
        <Flex
          className={styled["sidebar-row"]}
          justify={"space-between"}
          align={"center"}
          onClick={() => setSelectedPanel(Panel.AROUND_TIME)}
        >
          <Flex align={"center"}>
            <IconClock stroke={1.5} />
            <Text size="sm">Around a time</Text>
          </Flex>
          <IconChevronRight stroke={1.5} />
        </Flex>
        <Flex
          className={styled["sidebar-row"]}
          justify={"space-between"}
          align={"center"}
          onClick={() => setSelectedPanel(Panel.TIMEZONE)}
        >
          <Flex align={"center"}>
            <IconWorld stroke={1.5} />
            <Text size="sm">Time zone</Text>
          </Flex>
          <IconChevronRight stroke={1.5} />
        </Flex>
      </Flex>
    </Box>
  );
};
