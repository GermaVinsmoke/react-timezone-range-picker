import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { longTzName } from "./longTzName";
import { parseOffset } from "./parseOffest";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getTimezones = () => {
  const timezones = Intl.supportedValuesOf("timeZone");

  return timezones
    .map((timezone) => {
      const offset = dayjs().tz(timezone).format("Z");

      return {
        name: timezone,
        longName: longTzName(timezone),
        currentTime: dayjs().tz(timezone).format("h:mm A"),
        utcOffset: offset,
        offsetMinutes: parseOffset(offset),
      };
    })
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes);
};
