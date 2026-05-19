import dayjs from "dayjs";
import { TimezoneRangePickerOptions } from "../interfaces";

export type QuickRangeUnit = "seconds" | "minutes" | "hours" | "days";

export interface ITimeOptions {
  label: string;
  searchKey: string;
  startTime: string;
  endTime: string;
  unit: QuickRangeUnit;
  lineBreak?: boolean;
}

const baseTimeOptions = (timezoneName: string): ITimeOptions[] => [
  {
    label: "Today",
    searchKey: "today",
    startTime: dayjs().tz(timezoneName).startOf("day").format(),
    endTime: dayjs().tz(timezoneName).endOf("day").format(),
    unit: "days",
  },
  {
    label: "Tomorrow",
    searchKey: "tomorrow",
    startTime: dayjs().tz(timezoneName).add(1, "day").startOf("day").format(),
    endTime: dayjs().tz(timezoneName).add(1, "day").endOf("day").format(),
    unit: "days",
  },
  {
    label: "Yesterday",
    searchKey: "yesterday",
    startTime: dayjs().tz(timezoneName).subtract(1, "day").startOf("day").format(),
    endTime: dayjs().tz(timezoneName).subtract(1, "day").endOf("day").format(),
    unit: "days",
  },
  {
    label: "Last 15 seconds",
    searchKey: "-15s",
    startTime: dayjs().tz(timezoneName).subtract(15, "second").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "seconds",
  },
  {
    label: "Last 30 seconds",
    searchKey: "-30s",
    startTime: dayjs().tz(timezoneName).subtract(30, "second").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "seconds",
  },
  {
    label: "Next 15 seconds",
    searchKey: "+15s",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(15, "second").format(),
    unit: "seconds",
  },
  {
    label: "Next 30 seconds",
    searchKey: "+30s",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "second").format(),
    unit: "seconds",
  },
  {
    label: "Last 5 minutes",
    searchKey: "-5m",
    startTime: dayjs().tz(timezoneName).subtract(5, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "minutes",
  },
  {
    label: "Last 10 minutes",
    searchKey: "-10m",
    startTime: dayjs().tz(timezoneName).subtract(10, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "minutes",
  },
  {
    label: "Last 15 minutes",
    searchKey: "-15m",
    startTime: dayjs().tz(timezoneName).subtract(15, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "minutes",
  },
  {
    label: "Last 30 minutes",
    searchKey: "-30m",
    startTime: dayjs().tz(timezoneName).subtract(30, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "minutes",
  },
  {
    label: "Last 45 minutes",
    searchKey: "-45m",
    startTime: dayjs().tz(timezoneName).subtract(45, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "minutes",
  },
  {
    label: "Next 5 minutes",
    searchKey: "+5m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(5, "minute").format(),
    unit: "minutes",
  },
  {
    label: "Next 10 minutes",
    searchKey: "+10m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(10, "minute").format(),
    unit: "minutes",
  },
  {
    label: "Next 15 minutes",
    searchKey: "+15m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(15, "minute").format(),
    unit: "minutes",
  },
  {
    label: "Next 30 minutes",
    searchKey: "+30m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "minute").format(),
    unit: "minutes",
  },
  {
    label: "Next 45 minutes",
    searchKey: "+45m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(45, "minute").format(),
    unit: "minutes",
  },
  {
    label: "Last 1 hour",
    searchKey: "-1h",
    startTime: dayjs().tz(timezoneName).subtract(1, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "hours",
  },
  {
    label: "Last 3 hours",
    searchKey: "-3h",
    startTime: dayjs().tz(timezoneName).subtract(3, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "hours",
  },
  {
    label: "Last 6 hours",
    searchKey: "-6h",
    startTime: dayjs().tz(timezoneName).subtract(6, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "hours",
  },
  {
    label: "Last 12 hours",
    searchKey: "-12h",
    startTime: dayjs().tz(timezoneName).subtract(12, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "hours",
  },
  {
    label: "Next 1 hour",
    searchKey: "+1h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(1, "hour").format(),
    unit: "hours",
  },
  {
    label: "Next 3 hours",
    searchKey: "+3h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(3, "hour").format(),
    unit: "hours",
  },
  {
    label: "Next 6 hours",
    searchKey: "+6h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(6, "hour").format(),
    unit: "hours",
  },
  {
    label: "Next 12 hours",
    searchKey: "+12h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(12, "hour").format(),
    unit: "hours",
  },
  {
    label: "Last 1 day",
    searchKey: "-1d",
    startTime: dayjs().tz(timezoneName).subtract(1, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "days",
  },
  {
    label: "Last 2 days",
    searchKey: "-2d",
    startTime: dayjs().tz(timezoneName).subtract(2, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "days",
  },
  {
    label: "Last 7 days",
    searchKey: "-7d",
    startTime: dayjs().tz(timezoneName).subtract(7, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "days",
  },
  {
    label: "Last 14 days",
    searchKey: "-14d",
    startTime: dayjs().tz(timezoneName).subtract(14, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "days",
  },
  {
    label: "Last 30 days",
    searchKey: "-30d",
    startTime: dayjs().tz(timezoneName).subtract(30, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
    unit: "days",
  },
  {
    label: "Next 1 day",
    searchKey: "+1d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(1, "day").format(),
    unit: "days",
  },
  {
    label: "Next 2 days",
    searchKey: "+2d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(2, "day").format(),
    unit: "days",
  },
  {
    label: "Next 7 days",
    searchKey: "+7d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(7, "day").format(),
    unit: "days",
  },
  {
    label: "Next 14 days",
    searchKey: "+14d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(14, "day").format(),
    unit: "days",
  },
  {
    label: "Next 30 days",
    searchKey: "+30d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "day").format(),
    unit: "days",
  },
];

const shouldIncludeUnit = (unit: QuickRangeUnit, options?: TimezoneRangePickerOptions) => {
  if (unit === "seconds") return !options?.disableSeconds;
  if (unit === "minutes") return !options?.disableMinutes;
  if (unit === "hours") return !options?.disableHours;
  if (unit === "days") return !options?.disableDays;
  return true;
};

export const getTimeOptions = (
  timezoneName: string,
  options?: TimezoneRangePickerOptions
): ITimeOptions[] => {
  const filtered = baseTimeOptions(timezoneName).filter((option) =>
    shouldIncludeUnit(option.unit, options)
  );

  return filtered.map((option, index) => ({
    ...option,
    lineBreak: index < filtered.length - 1 && filtered[index + 1].unit !== option.unit,
  }));
};
