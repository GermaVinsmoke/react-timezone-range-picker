import { Flex, Menu, Popover, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { TimezonePanel } from "../TimezonePanel";
import { Sidebar } from "../Sidebar";
import { AroundTimePanel } from "../AroundTimePanel";
import { StartEndTimePanel } from "../StartEndTimePanel";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TimezoneData } from "../interfaces";

export enum Panel {
  START_END_TIME = "Start and end times",
  AROUND_TIME = "Around a time",
  TIMEZONE = "Time zone",
}

interface ITimezoneRangePicker {
  timezone: TimezoneData;
  setTimezone: Dispatch<SetStateAction<TimezoneData>>;
}

export const TimezoneRangePicker: FC<ITimezoneRangePicker> = ({ timezone, setTimezone }) => {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.START_END_TIME);

  const renderPanel = () => {
    switch (selectedPanel) {
      case Panel.START_END_TIME:
        return <StartEndTimePanel timezone={timezone} />;
      case Panel.AROUND_TIME:
        return <AroundTimePanel timezone={timezone} />;
      case Panel.TIMEZONE:
        return <TimezonePanel timezone={timezone} setTimezone={setTimezone} />;
      default:
        return null;
    }
  };

  return (
    <Popover position="bottom" shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown style={{ width: 700, height: 400, padding: 0 }} py={8}>
        <Flex style={{ height: "100%" }}>
          <Sidebar setSelectedPanel={setSelectedPanel} />
          {renderPanel()}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
