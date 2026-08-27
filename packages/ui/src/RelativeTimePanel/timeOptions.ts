import { Temporal } from "@js-temporal/polyfill";
import { TimezoneRangePickerOptions } from "../interfaces";
import { nowInTimezone } from "../util/dateTime";

export type QuickRangeUnit = "seconds" | "minutes" | "hours" | "days";

export interface ITimeOptions {
  label: string;
  searchKey: string;
  startTime: string;
  endTime: string;
  unit: QuickRangeUnit;
  direction: "past" | "future" | "present";
  lineBreak?: boolean;
}

const toDateTimeString = (value: Temporal.ZonedDateTime) =>
  value.toPlainDateTime().toString({ smallestUnit: "second" });

const duration = (amount: number, unit: QuickRangeUnit): Temporal.DurationLike => ({
  [unit]: amount,
});

const rangeOption = (
  now: Temporal.ZonedDateTime,
  direction: "Last" | "Next",
  amount: number,
  unit: QuickRangeUnit
): ITimeOptions => {
  const singularUnit = unit.slice(0, -1);
  const delta = duration(amount, unit);
  const isLast = direction === "Last";

  return {
    label: `${direction} ${amount} ${amount === 1 ? singularUnit : unit}`,
    searchKey: `${isLast ? "-" : "+"}${amount}${singularUnit[0]}`,
    startTime: toDateTimeString(isLast ? now.subtract(delta) : now),
    endTime: toDateTimeString(isLast ? now : now.add(delta)),
    unit,
    direction: isLast ? "past" : "future",
  };
};

const dayOption = (
  now: Temporal.ZonedDateTime,
  label: string,
  dayOffset: number
): ITimeOptions => {
  const day = now.add({ days: dayOffset });
  return {
    label,
    searchKey: label.toLowerCase(),
    startTime: toDateTimeString(day.startOfDay()),
    endTime: toDateTimeString(day.startOfDay().add({ days: 1 })),
    unit: "days",
    direction: dayOffset < 0 ? "past" : dayOffset > 0 ? "future" : "present",
  };
};

const dayRangeOption = (
  now: Temporal.ZonedDateTime,
  direction: "Last" | "Next",
  amount: number,
  includeToday: boolean
): ITimeOptions => {
  const today = now.startOfDay();
  const isLast = direction === "Last";
  const start = isLast
    ? today.subtract({ days: amount })
    : includeToday
      ? today
      : today.add({ days: 1 });
  const end = isLast
    ? includeToday
      ? today.add({ days: 1 })
      : today
    : today.add({ days: amount + 1 });

  return {
    label: `${direction} ${amount} ${amount === 1 ? "day" : "days"}`,
    searchKey: `${isLast ? "-" : "+"}${amount}d`,
    startTime: toDateTimeString(start),
    endTime: toDateTimeString(end),
    unit: "days",
    direction: isLast ? "past" : "future",
  };
};

const baseTimeOptions = (
  now: Temporal.ZonedDateTime,
  includeToday: boolean
): ITimeOptions[] => {
  return [
    dayOption(now, "Today", 0),
    dayOption(now, "Tomorrow", 1),
    dayOption(now, "Yesterday", -1),
    ...[15, 30].map((amount) => rangeOption(now, "Last", amount, "seconds")),
    ...[15, 30].map((amount) => rangeOption(now, "Next", amount, "seconds")),
    ...[5, 10, 15, 30, 45].map((amount) => rangeOption(now, "Last", amount, "minutes")),
    ...[5, 10, 15, 30, 45].map((amount) => rangeOption(now, "Next", amount, "minutes")),
    ...[1, 3, 6, 12].map((amount) => rangeOption(now, "Last", amount, "hours")),
    ...[1, 3, 6, 12].map((amount) => rangeOption(now, "Next", amount, "hours")),
    ...[1, 2, 7, 14, 30].map((amount) =>
      dayRangeOption(now, "Last", amount, includeToday)
    ),
    ...[1, 2, 7, 14, 30].map((amount) =>
      dayRangeOption(now, "Next", amount, includeToday)
    ),
  ];
};

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
  const now = nowInTimezone(timezoneName);
  const allowedTimeRange = options?.allowedTimeRange ?? "all";
  const filtered = baseTimeOptions(now, options?.includeTodayInQuickRanges ?? false).filter(
    (option) => {
      if (!shouldIncludeUnit(option.unit, options)) return false;
      if (allowedTimeRange === "past") return option.direction === "past";
      if (allowedTimeRange === "future") return option.direction === "future";
      return true;
    }
  );

  return filtered.map((option, index) => ({
    ...option,
    lineBreak: index < filtered.length - 1 && filtered[index + 1].unit !== option.unit,
  }));
};
