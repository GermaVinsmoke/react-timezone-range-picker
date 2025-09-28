import { Box, Flex, Text } from "@mantine/core";
import { IconClock, IconCalendarWeekFilled, IconWorld } from "@tabler/icons-react";
import styled from "./index.module.css";

export const Sidebar = () => {
  return (
    <Flex direction="column" className={styled["sidebar-container"]} flex={1}>
      <Box className={styled["sidebar-row"]}>
        <IconCalendarWeekFilled />
        <Text>Start and end times</Text>
      </Box>
      <Box className={styled["sidebar-row"]}>
        <IconClock />
        <Text>Around a time</Text>
      </Box>
      <Box className={styled["sidebar-row"]}>
        <IconWorld />
        <Text>Time zone</Text>
      </Box>
    </Flex>
  );
};
