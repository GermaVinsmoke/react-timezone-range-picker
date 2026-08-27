import { Temporal } from "@js-temporal/polyfill";
import { AllowedTimeRange, TzRange } from "../interfaces";

export const DATEFORMAT = "YYYY/MM/DD";
export const TIMEFORMAT = "HH:mm:ss";

export type DateTimeUnit = "second" | "minute" | "hour" | "day";

const formatDate = (date: Temporal.PlainDate) =>
  `${date.year.toString().padStart(4, "0")}/${date.month.toString().padStart(2, "0")}/${date.day
    .toString()
    .padStart(2, "0")}`;

const formatTime = (time: Temporal.PlainTime) =>
  `${time.hour.toString().padStart(2, "0")}:${time.minute
    .toString()
    .padStart(2, "0")}:${time.second.toString().padStart(2, "0")}`;

export const formatShortDate = (date: Temporal.PlainDate) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(date.year, date.month - 1, date.day))
  );
  return `${month} ${date.day}`;
};

export const formatTwelveHourTime = (dateTime: Temporal.ZonedDateTime) => {
  const hour = dateTime.hour % 12 || 12;
  return `${hour}:${dateTime.minute.toString().padStart(2, "0")} ${dateTime.hour < 12 ? "AM" : "PM"}`;
};

export const nowInTimezone = (zone?: string | null) =>
  Temporal.Now.instant().toZonedDateTimeISO(zone || Temporal.Now.timeZoneId());

export const getCurrentTime = (tzRange: TzRange) =>
  formatTime(nowInTimezone(tzRange.timezone.name).toPlainTime());

export const getCurrentDate = (tzRange: TzRange) =>
  formatDate(nowInTimezone(tzRange.timezone.name).toPlainDate());

export const getCurrentPlusDate = (amount: number) =>
  formatDate(nowInTimezone().add({ days: amount }).toPlainDate());

export const getShortTimezoneName = (tz: string | null) =>
  tz ? nowInTimezone(tz).offset : tz;

type ButtonTextSize = "desktop" | "tablet" | "mobile";

export const getPopoverButtonText = (tzRange: TzRange, size: ButtonTextSize = "desktop") => {
  const startDate = tzRange.startDate ? parseDate(tzRange.startDate) : null;
  const endDate = tzRange.endDate ? parseDate(tzRange.endDate) : null;
  const tz = getShortTimezoneName(tzRange.timezone.name);

  if (!startDate || !endDate || !tzRange.startTime || !tzRange.endTime) return "Select range";

  if (size === "mobile") {
    const sameDay = Temporal.PlainDate.compare(startDate, endDate) === 0;
    return sameDay
      ? `${formatShortDate(startDate)} · ${tzRange.startTime}`
      : `${formatShortDate(startDate)}–${formatShortDate(endDate)}`;
  }

  if (size === "tablet") {
    return `${formatShortDate(startDate)}, 00:00 → ${formatShortDate(endDate)}, 00:00${tz ? ` (${tz})` : ""}`;
  }

  return `${formatDate(startDate)} ${tzRange.startTime} - ${formatDate(endDate)} ${tzRange.endTime}${tz ? ` (${tz})` : ""}`;
};

export const getTimezoneMetaLabel = (timezone: TzRange["timezone"], compact = false) => {
  if (!timezone.utcOffset && !timezone.longName) return "";
  if (compact) return timezone.utcOffset ? `GMT${timezone.utcOffset}` : (timezone.longName ?? "");
  return timezone.longName ?? (timezone.utcOffset ? `GMT${timezone.utcOffset}` : "");
};

export const parseDate = (date: string) => Temporal.PlainDate.from(date.replace(/\//g, "-"));

export const parseDateTime = (date: string, time: string) =>
  Temporal.PlainDateTime.from(`${date.replace(/\//g, "-")}T${time}`);

export const getAllowedDateBounds = (
  timezone: string | null,
  allowedTimeRange: AllowedTimeRange = "all"
) => {
  const today = nowInTimezone(timezone).toPlainDate().toString();
  return {
    minDate: allowedTimeRange === "future" ? today : undefined,
    maxDate: allowedTimeRange === "past" ? today : undefined,
  };
};

export const validateAllowedDateTime = (
  date: string,
  time: string,
  timezone: string | null,
  allowedTimeRange: AllowedTimeRange = "all"
) => {
  if (allowedTimeRange === "all") return null;

  const value = parseDateTime(date, time);
  const now = nowInTimezone(timezone).toPlainDateTime();
  const comparison = Temporal.PlainDateTime.compare(value, now);

  if (allowedTimeRange === "future" && comparison < 0) {
    return "Date and time must not be before now";
  }
  if (allowedTimeRange === "past" && comparison > 0) {
    return "Date and time must not be after now";
  }
  return null;
};

const durationFor = (amount: number, unit: DateTimeUnit): Temporal.DurationLike => ({
  [`${unit}s`]: amount,
});

const adjustDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: DateTimeUnit,
  direction: 1 | -1
) => {
  const value = parseDateTime(date!, time).add(durationFor(amount * direction, unit));
  return { date: formatDate(value.toPlainDate()), time: formatTime(value.toPlainTime()) };
};

export const getPastDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: DateTimeUnit
) => adjustDateTime(date, time, amount, unit, -1);

export const getFutureDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: DateTimeUnit
) => adjustDateTime(date, time, amount, unit, 1);

export const toUtcIso = (dateStr: string, timeStr: string, sourceZone: string) =>
  parseDateTime(dateStr, timeStr).toZonedDateTime(sourceZone).toInstant().toString();

export const toTz = (utcIso: string, zone: string) => {
  const value = Temporal.Instant.from(utcIso).toZonedDateTimeISO(zone);
  return { date: formatDate(value.toPlainDate()), time: formatTime(value.toPlainTime()) };
};
