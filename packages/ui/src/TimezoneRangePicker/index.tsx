import { Flex, Menu, Popover, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { TimezonePanel } from "../TimezonePanel";
import { Sidebar } from "../Sidebar";
import { AroundTimePanel } from "../AroundTimePanel";
import { StartEndTimePanel } from "../StartEndTimePanel";
import { useState } from "react";

export enum Panel {
  START_END_TIME = "Start and end times",
  AROUND_TIME = "Around a time",
  TIMEZONE = "Time zone",
}

export const TimezoneRangePicker = () => {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.START_END_TIME);

  const renderPanel = () => {
    switch (selectedPanel) {
      case Panel.START_END_TIME:
        return <StartEndTimePanel />;
      case Panel.AROUND_TIME:
        return <AroundTimePanel />;
      case Panel.TIMEZONE:
        return <TimezonePanel />;
      default:
        return null;
    }
  };

  return (
    <Popover position="bottom" shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown style={{ width: 600, height: 400 }}>
        <Flex style={{ height: "100%" }}>
          <Sidebar setSelectedPanel={setSelectedPanel} />
          {renderPanel()}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
