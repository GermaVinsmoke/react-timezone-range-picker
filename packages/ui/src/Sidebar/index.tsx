import { Flex, Text } from "@mantine/core";
import {
  IconClock,
  IconCalendarWeekFilled,
  IconWorld,
  IconChevronRight,
} from "@tabler/icons-react";
import styled from "./index.module.css";
import { Dispatch, FC, SetStateAction } from "react";
import { Panel } from "../TimezoneRangePicker";

interface ISidebar {
  setSelectedPanel: Dispatch<SetStateAction<Panel>>;
}

export const Sidebar: FC<ISidebar> = ({ setSelectedPanel }) => {
  return (
    <Flex direction="column" className={styled["sidebar-container"]} flex={1}>
      <Flex
        className={styled["sidebar-row"]}
        justify={"space-between"}
        align={"center"}
        onClick={() => setSelectedPanel(Panel.START_END_TIME)}
      >
        <Flex>
          <IconCalendarWeekFilled stroke={1.5} />
          <Text>Start and end times</Text>
        </Flex>
        <IconChevronRight stroke={1.5} />
      </Flex>
      <Flex
        className={styled["sidebar-row"]}
        justify={"space-between"}
        align={"center"}
        onClick={() => setSelectedPanel(Panel.AROUND_TIME)}
      >
        <Flex>
          <IconClock stroke={1.5} />
          <Text>Around a time</Text>
        </Flex>
        <IconChevronRight stroke={1.5} />
      </Flex>
      <Flex
        className={styled["sidebar-row"]}
        justify={"space-between"}
        align={"center"}
        onClick={() => setSelectedPanel(Panel.TIMEZONE)}
      >
        <Flex>
          <IconWorld stroke={1.5} />
          <Text>Time zone</Text>
        </Flex>
        <IconChevronRight stroke={1.5} />
      </Flex>
    </Flex>
  );
};
