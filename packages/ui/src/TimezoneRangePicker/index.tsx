import { Flex, Popover } from "@mantine/core";
import { Button } from "@mantine/core";
import { TimezonePanel } from "../TimezonePanel";
import { Sidebar } from "../Sidebar";
import { AroundTimePanel } from "../AroundTimePanel";
import { StartEndTimePanel } from "../StartEndTimePanel";
import { FC, useMemo, useState } from "react";
import { TzRange } from "../interfaces";
import { getPopoverButtonText } from "../util/dateTime";

export enum Panel {
  START_END_TIME = "Start and end times",
  AROUND_TIME = "Around a time",
  TIMEZONE = "Time zone",
}

export const TimezoneRangePicker: FC<TzRange> = (tzRange) => {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.START_END_TIME);

  const renderPanel = () => {
    switch (selectedPanel) {
      case Panel.START_END_TIME:
        return <StartEndTimePanel tzRange={tzRange} />;
      case Panel.AROUND_TIME:
        return <AroundTimePanel tzRange={tzRange} />;
      case Panel.TIMEZONE:
        return <TimezonePanel tzRange={tzRange} />;
      default:
        return null;
    }
  };

  const getButtonText = useMemo(
    () => getPopoverButtonText(tzRange),
    [tzRange.startDate, tzRange.startTime, tzRange.endDate, tzRange.endTime, tzRange.timezone]
  );

  return (
    <Popover position="bottom" shadow="md">
      <Popover.Target>
        <Button>{getButtonText}</Button>
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
