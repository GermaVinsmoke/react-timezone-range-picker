import { Button, Drawer, Flex, Popover, SegmentedControl } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TimezonePanel } from "../TimezonePanel";
import { Sidebar } from "../Sidebar";
import { AroundTimePanel } from "../AroundTimePanel";
import { StartEndTimePanel } from "../StartEndTimePanel";
import { FC, useEffect, useMemo, useState } from "react";
import { TzRange } from "../interfaces";
import { getPopoverButtonText } from "../util/dateTime";
import { PopoverProvider, usePopoverContext } from "../Provider/PopoverProvider";
import styled from "./index.module.css";

export enum Panel {
  RELATIVE_TIME = "Relative time",
  START_END_TIME = "Start and end times",
  AROUND_TIME = "Around a time",
  TIMEZONE = "Time zone",
}

const TimezoneRangePickerView: FC<TzRange> = (tzRange) => {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.START_END_TIME);
  const { popoverOpened, setPopoverOpened } = usePopoverContext();
  const isMobile = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");

  useEffect(() => {
    if (!isTablet && selectedPanel === Panel.RELATIVE_TIME) {
      setSelectedPanel(Panel.START_END_TIME);
    }
  }, [isTablet, selectedPanel]);

  const renderPanel = () => {
    switch (selectedPanel) {
      case Panel.RELATIVE_TIME:
        return <Sidebar tzRange={tzRange} setSelectedPanel={setSelectedPanel} mobileOnlyRelative />;
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

  const handleButtonClick = () => {
    setPopoverOpened((p) => !p);
  };

  const fullButtonText = useMemo(
    () => getPopoverButtonText(tzRange, "desktop"),
    [tzRange.startDate, tzRange.startTime, tzRange.endDate, tzRange.endTime, tzRange.timezone]
  );

  const buttonText = useMemo(() => {
    if (isMobile) return getPopoverButtonText(tzRange, "mobile");
    if (isTablet) return getPopoverButtonText(tzRange, "tablet");
    return fullButtonText;
  }, [fullButtonText, isMobile, isTablet, tzRange]);

  const pickerContent = isTablet ? (
    <div className={styled["mobile-layout"]}>
      <div className={styled["mobile-nav"]}>
        <SegmentedControl
          fullWidth
          value={selectedPanel}
          onChange={(value) => setSelectedPanel(value as Panel)}
          data={[
            { label: "Quick", value: Panel.RELATIVE_TIME },
            { label: "Range", value: Panel.START_END_TIME },
            { label: "Around", value: Panel.AROUND_TIME },
            { label: "TZ", value: Panel.TIMEZONE },
          ]}
        />
      </div>
      <div className={styled["mobile-content"]}>{renderPanel()}</div>
    </div>
  ) : (
    <Flex className={styled["picker-shell"]}>
      <Sidebar tzRange={tzRange} setSelectedPanel={setSelectedPanel} />
      {renderPanel()}
    </Flex>
  );

  if (isTablet) {
    return (
      <>
        <Button
          onClick={handleButtonClick}
          style={tzRange.buttonStyle || {}}
          className={styled["trigger-button"]}
          title={fullButtonText}
        >
          {buttonText}
        </Button>
        <Drawer
          opened={popoverOpened}
          onClose={() => setPopoverOpened(false)}
          size="100%"
          padding={0}
          title="Select time range"
          styles={{
            content: { display: "flex", flexDirection: "column" },
            body: { flex: 1, overflow: "hidden", padding: 0 },
          }}
        >
          <div className={styled["picker-shell"]}>{pickerContent}</div>
        </Drawer>
      </>
    );
  }

  return (
    <Popover position="bottom" shadow="md" opened={popoverOpened} onChange={setPopoverOpened}>
      <Popover.Target>
        <Button
          onClick={handleButtonClick}
          style={tzRange.buttonStyle || {}}
          className={styled["trigger-button"]}
          title={fullButtonText}
        >
          {buttonText}
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ width: 700, height: 400, padding: 0 }} py={8}>
        {pickerContent}
      </Popover.Dropdown>
    </Popover>
  );
};

const TimezoneRangePickerWrapper = (props: TzRange) => {
  return (
    <PopoverProvider>
      <TimezoneRangePickerView {...props} />
    </PopoverProvider>
  );
};

export { TimezoneRangePickerWrapper as TimezoneRangePicker };
