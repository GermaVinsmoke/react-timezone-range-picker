import { Flex, Menu, Popover, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { TimezonePanel } from "../TimezonePanel";
import { Sidebar } from "../Sidebar";

export const TimezoneRangePicker = () => {
  return (
    <Popover position="bottom" shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown style={{ width: 600, height: 400 }}>
        <Flex style={{ height: "100%" }}>
          <Sidebar />
          <TimezonePanel />
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
