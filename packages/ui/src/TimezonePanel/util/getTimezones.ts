import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { longTzName } from "./longTzName";
import { parseOffset } from "./parseOffest";

dayjs.extend(utc);
dayjs.extend(timezone);

const buildTimezoneOption = (timezone: string) => {
  const offset = dayjs().tz(timezone).format("Z");

  return {
    name: timezone,
    longName: longTzName(timezone),
    currentTime: dayjs().tz(timezone).format("h:mm A"),
    utcOffset: offset,
    offsetMinutes: parseOffset(offset),
  };
};

export const getTimezones = () => {
  const timezones = Intl.supportedValuesOf("timeZone");

  return ["UTC", ...timezones]
    .filter((timezone, index, list) => list.indexOf(timezone) === index)
    .map((timezone) => buildTimezoneOption(timezone))
    .sort((a, b) => {
      if (a.name === "UTC") return -1;
      if (b.name === "UTC") return 1;
      return a.offsetMinutes - b.offsetMinutes;
    });
};
