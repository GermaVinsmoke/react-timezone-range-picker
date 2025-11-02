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

export interface TzRange {
  startDate: string | null;
  startTime: string | null;

  endDate: string | null;
  endTime: string | null;

  timezone: TimezoneData;

  onApply: ({ startDate, startTime, endDate, endTime, timezone }: OnApplyParams) => void;

  buttonStyle?: MantineStyleProp;
}
