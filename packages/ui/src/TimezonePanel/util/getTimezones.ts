import { formatTwelveHourTime, nowInTimezone } from "../../util/dateTime";
import { longTzName } from "./longTzName";
import { parseOffset } from "./parseOffest";

const buildTimezoneOption = (timezone: string) => {
  const now = nowInTimezone(timezone);
  const offset = now.offset;

  return {
    name: timezone,
    longName: longTzName(timezone),
    currentTime: formatTwelveHourTime(now),
    utcOffset: offset,
    offsetMinutes: parseOffset(offset),
  };
};

export const getTimezones = () => {
  const supportedValuesOf = (
    Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] }
  ).supportedValuesOf;
  const timezones = supportedValuesOf
    ? supportedValuesOf.call(Intl, "timeZone")
    : [Intl.DateTimeFormat().resolvedOptions().timeZone];

  return ["UTC", ...timezones]
    .filter((timezone, index, list) => list.indexOf(timezone) === index)
    .map((timezone) => buildTimezoneOption(timezone))
    .sort((a, b) => {
      if (a.name === "UTC") return -1;
      if (b.name === "UTC") return 1;
      return a.offsetMinutes - b.offsetMinutes;
    });
};
