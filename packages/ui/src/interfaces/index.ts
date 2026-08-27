import { MantineStyleProp } from "@mantine/core";

export interface TimezoneData {
  name: string | null;
  longName: string | null;
  utcOffset: string | null;
}

export interface OnApplyParams {
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  timezone: TimezoneData;
}

export type AllowedTimeRange = "past" | "future" | "all";

export interface TimezoneRangePickerOptions {
  /** Limits quick options and manual selection. Defaults to all time. */
  allowedTimeRange?: AllowedTimeRange;
  /** Adds the whole current calendar day to Last/Next day quick ranges. Defaults to false. */
  includeTodayInQuickRanges?: boolean;
  disableSeconds?: boolean;
  disableMinutes?: boolean;
  disableHours?: boolean;
  disableDays?: boolean;
}

export interface TzRange {
  startDate: string | null;
  startTime: string | null;

  endDate: string | null;
  endTime: string | null;

  timezone: TimezoneData;

  onApply: ({ startDate, startTime, endDate, endTime, timezone }: OnApplyParams) => void;

  buttonStyle?: MantineStyleProp;
  options?: TimezoneRangePickerOptions;
}
