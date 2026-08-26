import { formatTwelveHourTime, nowInTimezone } from "../../util/dateTime";
import { longTzName } from "./longTzName";
import { parseOffset } from "./parseOffest";

const normalizeTimezone = (timezone: string) => {
  if (["UTC", "Etc/UTC", "GMT", "Etc/GMT"].includes(timezone)) return "UTC";
  return timezone;
};

export const getBrowserTimezone = () => {
  const tz = normalizeTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const now = nowInTimezone(tz);
  const offset = now.offset;

  return {
    name: tz,
    longName: longTzName(tz),
    currentTime: formatTwelveHourTime(now),
    utcOffset: offset,
    offsetMinutes: parseOffset(offset),
  };
};
