import { Button, Flex, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import { useAppTheme } from "../hooks/useAppTheme";
import { usePopoverContext } from "../Provider/PopoverProvider";
import { getTimeOptions } from "../RelativeTimePanel/timeOptions";
import quickStyles from "../RelativeTimePanel/index.module.css";
import { TzRange } from "../interfaces";
import { DATEFORMAT } from "../util/dateTime";
import styled from "./index.module.css";

interface BasicPickerViewProps {
  tzRange: TzRange;
  onAdvanced: () => void;
}

type DateRangeValue = [string | null, string | null];

const toPickerDate = (date: string | null) => date?.replace(/\//g, "-") ?? null;
const toOutputDate = (date: string) => date.replace(/-/g, "/");

export const BasicPickerView: FC<BasicPickerViewProps> = ({ tzRange, onAdvanced }) => {
  const [dateRange, setDateRange] = useState<DateRangeValue>([
    toPickerDate(tzRange.startDate),
    toPickerDate(tzRange.endDate),
  ]);
  const { colorScheme } = useAppTheme();
  const { closePopover } = usePopoverContext();

  useEffect(() => {
    setDateRange([toPickerDate(tzRange.startDate), toPickerDate(tzRange.endDate)]);
  }, [tzRange.startDate, tzRange.endDate]);

  const quickOptions = useMemo(() => {
    if (!tzRange.timezone.name) return [];
    return getTimeOptions(tzRange.timezone.name, {
      disableSeconds: true,
      disableMinutes: true,
      disableHours: true,
    });
  }, [tzRange.timezone.name]);

  const applyDateRange = ([startDate, endDate]: DateRangeValue) => {
    setDateRange([startDate, endDate]);
    if (!startDate || !endDate) return;

    tzRange.onApply({
      startDate: toOutputDate(startDate),
      startTime: "00:00:00",
      endDate: toOutputDate(endDate),
      endTime: "00:00:00",
      timezone: tzRange.timezone,
    });
  };

  const applyQuickOption = (startTime: string, endTime: string) => {
    const [startDate] = startTime.split("T");
    const [endDate] = endTime.split("T");

    tzRange.onApply({
      startDate: toOutputDate(startDate),
      startTime: "00:00:00",
      endDate: toOutputDate(endDate),
      endTime: "00:00:00",
      timezone: tzRange.timezone,
    });
    closePopover();
  };

  return (
    <Flex direction="column" className={styled["basic-view"]}>
      <DatePickerInput
        type="range"
        label="Date range"
        value={dateRange}
        onChange={applyDateRange}
        valueFormat={DATEFORMAT}
        popoverProps={{ withinPortal: false }}
        leftSection={<IconCalendar stroke={1.5} />}
      />

      <Text size="sm" fw={600} mt={12}>
        Quick options
      </Text>
      <Flex direction="column" className={styled["basic-quick-options"]} mt={4}>
        {quickOptions.map((option) => (
          <Flex
            key={option.label}
            align="center"
            justify="space-between"
            className={clsx(
              quickStyles["time-row"],
              colorScheme === "dark"
                ? quickStyles["time-row-dark"]
                : quickStyles["time-row-light"]
            )}
            py={4}
            px={8}
            onClick={() => applyQuickOption(option.startTime, option.endTime)}
          >
            <Text size="sm">{option.label}</Text>
            <Text size="xs" c="dimmed">
              {option.searchKey}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Button variant="subtle" size="xs" fullWidth mt={8} onClick={closePopover}>
        Cancel
      </Button>
      <Button variant="subtle" size="xs" fullWidth mt={4} onClick={onAdvanced}>
        Advanced
      </Button>
    </Flex>
  );
};
