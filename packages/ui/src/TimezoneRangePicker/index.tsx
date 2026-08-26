import { Button, Drawer, Popover } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useMemo, useState } from "react";
import { PopoverProvider, usePopoverContext } from "../Provider/PopoverProvider";
import { TzRange } from "../interfaces";
import { getPopoverButtonText } from "../util/dateTime";
import { AdvancedPickerView } from "./AdvancedPickerView";
import { BasicPickerView } from "./BasicPickerView";
import styled from "./index.module.css";

export { Panel } from "./panels";

type PickerMode = "basic" | "advanced";

const TimezoneRangePickerView: FC<TzRange> = (tzRange) => {
  const [mode, setMode] = useState<PickerMode>("basic");
  const { popoverOpened, setPopoverOpened } = usePopoverContext();
  const isMobile = useMediaQuery("(max-width: 48em)");
  const isTablet = useMediaQuery("(max-width: 64em)");

  const handleButtonClick = () => {
    setPopoverOpened((opened) => !opened);
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

  const pickerView =
    mode === "basic" ? (
      <BasicPickerView tzRange={tzRange} onAdvanced={() => setMode("advanced")} />
    ) : (
      <AdvancedPickerView tzRange={tzRange} />
    );

  const trigger = (
    <Button
      onClick={handleButtonClick}
      style={tzRange.buttonStyle || {}}
      className={styled["trigger-button"]}
      title={fullButtonText}
    >
      {buttonText}
    </Button>
  );

  if (isTablet) {
    return (
      <>
        {trigger}
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
          <div className={styled["drawer-view"]}>{pickerView}</div>
        </Drawer>
      </>
    );
  }

  return (
    <Popover position="bottom" shadow="md" opened={popoverOpened} onChange={setPopoverOpened}>
      <Popover.Target>{trigger}</Popover.Target>
      <Popover.Dropdown
        style={{
          width: mode === "basic" ? 260 : 700,
          height: mode === "basic" ? "auto" : 400,
          padding: 0,
        }}
      >
        {pickerView}
      </Popover.Dropdown>
    </Popover>
  );
};

const TimezoneRangePickerWrapper = (props: TzRange) => (
  <PopoverProvider>
    <TimezoneRangePickerView {...props} />
  </PopoverProvider>
);

export { TimezoneRangePickerWrapper as TimezoneRangePicker };
