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

/** A span of calendar time, such as `{ months: 1 }`, `{ days: 30 }` or `{ weeks: 2 }`. */
export interface RangeDuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface TimezoneRangePickerOptions {
  /** Limits quick options and manual selection. Defaults to all time. */
  allowedTimeRange?: AllowedTimeRange;
  /**
   * Longest range that can be selected, measured from the start in calendar terms
   * (`{ months: 1 }` allows Jan 15 → Feb 15). Longer quick options are hidden,
   * calendar days past the limit are disabled and longer manual ranges fail
   * validation. Defaults to no limit.
   */
  maxRange?: RangeDuration;
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
