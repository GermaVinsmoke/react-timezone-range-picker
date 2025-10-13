import dayjs from "dayjs";
import { TzRange } from "../interfaces";

export const DATEFORMAT = "YYYY/MM/DD";
export const TIMEFORMAT = "HH:mm:ss";

export const getCurrentTime = () => dayjs().format(TIMEFORMAT);

export const getCurrentDate = () => dayjs().format(DATEFORMAT);

export const getCurrentPlusDate = (amount: number) => dayjs().add(amount, "day").format(DATEFORMAT);

export const getShortTimezoneName = (tz: string | null) => {
  if (!tz) return tz;
  return dayjs().tz(tz).format("Z");
};

export const getPopoverButtonText = (tzRange: TzRange) => {
  return `${dayjs(tzRange.startDate).format(DATEFORMAT)} ${tzRange.startTime} - ${dayjs(
    tzRange.endDate
  ).format(DATEFORMAT)} ${tzRange.endTime} (${getShortTimezoneName(tzRange.timezone.name)})`;
};

export const getPastDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: dayjs.ManipulateType
) => {
  const d = dayjs(`${date} ${time}`).subtract(amount, unit);
  return {
    date: d.format(DATEFORMAT),
    time: d.format(TIMEFORMAT),
  };
};

export const getFutureDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: dayjs.ManipulateType
) => {
  const d = dayjs(`${date} ${time}`).add(amount, unit);
  return {
    date: d.format(DATEFORMAT),
    time: d.format(TIMEFORMAT),
  };
};

export const toUtcIso = (dateStr: string, timeStr: string, sourceZone: string) => {
  return dayjs
    .tz(`${dateStr} ${timeStr}`, `${DATEFORMAT} ${TIMEFORMAT}`, sourceZone)
    .utc()
    .toISOString();
};

export const renderIn = (utcIso: string, zone: string) => {
  const d = dayjs.utc(utcIso).tz(zone);
  return { date: d.format(DATEFORMAT), time: d.format(TIMEFORMAT) };
};
