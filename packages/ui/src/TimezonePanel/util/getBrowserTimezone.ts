import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { longTzName } from "./longTzName";
import { parseOffset } from "./parseOffest";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getBrowserTimezone = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = dayjs().tz(tz).format("Z");

  return {
    name: tz,
    longName: longTzName(tz),
    currentTime: dayjs().tz(tz).format("h:mm A"),
    utcOffset: offset,
    offsetMinutes: parseOffset(offset),
  };
};
