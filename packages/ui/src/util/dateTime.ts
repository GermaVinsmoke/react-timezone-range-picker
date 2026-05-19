import dayjs from "dayjs";
import { TzRange } from "../interfaces";

export const DATEFORMAT = "YYYY/MM/DD";
export const TIMEFORMAT = "HH:mm:ss";

export const getCurrentTime = (tzRange: TzRange) => {
  if (!tzRange.timezone.name) return dayjs().format(TIMEFORMAT);
  return dayjs().tz(tzRange.timezone.name).format(TIMEFORMAT);
};

export const getCurrentDate = (tzRange: TzRange) => {
  if (!tzRange.timezone.name) return dayjs().format(DATEFORMAT);
  return dayjs().tz(tzRange.timezone.name).format(DATEFORMAT);
};

export const getCurrentPlusDate = (amount: number) => dayjs().add(amount, "day").format(DATEFORMAT);

export const getShortTimezoneName = (tz: string | null) => {
  if (!tz) return tz;
  return dayjs().tz(tz).format("Z");
};

type ButtonTextSize = "desktop" | "tablet" | "mobile";

export const getPopoverButtonText = (tzRange: TzRange, size: ButtonTextSize = "desktop") => {
  const startDate = tzRange.startDate ? dayjs(tzRange.startDate) : null;
  const endDate = tzRange.endDate ? dayjs(tzRange.endDate) : null;
  const tz = getShortTimezoneName(tzRange.timezone.name);

  if (!startDate || !endDate || !tzRange.startTime || !tzRange.endTime) return "Select range";

  if (size === "mobile") {
    const sameDay = startDate.isSame(endDate, "day");
    return sameDay
      ? `${startDate.format("MMM D")} · ${tzRange.startTime}`
      : `${startDate.format("MMM D")}–${endDate.format("MMM D")}`;
  }

  if (size === "tablet") {
    return `${startDate.format("MMM D, HH:mm")} → ${endDate.format("MMM D, HH:mm")}${tz ? ` (${tz})` : ""}`;
  }

  return `${startDate.format(DATEFORMAT)} ${tzRange.startTime} - ${endDate.format(DATEFORMAT)} ${tzRange.endTime}${tz ? ` (${tz})` : ""}`;
};

export const getTimezoneMetaLabel = (
  timezone: TzRange["timezone"],
  compact = false
) => {
  if (!timezone.utcOffset && !timezone.longName) return "";
  if (compact) return timezone.utcOffset ? `GMT${timezone.utcOffset}` : (timezone.longName ?? "");
  return timezone.longName ?? (timezone.utcOffset ? `GMT${timezone.utcOffset}` : "");
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

export const toTz = (utcIso: string, zone: string) => {
  const d = dayjs.utc(utcIso).tz(zone);
  return { date: d.format(DATEFORMAT), time: d.format(TIMEFORMAT) };
};
