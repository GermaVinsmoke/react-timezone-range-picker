import dayjs from "dayjs";
import { TzRange } from "../interfaces";

export const getCurrentTime = () => dayjs().format("HH:mm:ss");

export const getCurrentDate = () => dayjs().format("YYYY-MM-DD");

export const getCurrentPlusDate = (amount: number) =>
  dayjs().add(amount, "day").format("YYYY-MM-DD");

export const getShortTimezoneName = (tz: string | null) => {
  if (!tz) return tz;
  return dayjs().tz(tz).format("Z");
};

export const getPopoverButtonText = (tzRange: TzRange) => {
  return `${dayjs(tzRange.startDate).format("YYYY/MM/DD")} ${tzRange.startTime} - ${dayjs(
    tzRange.endDate
  ).format("YYYY/MM/DD")} ${tzRange.endTime} (${getShortTimezoneName(tzRange.timezone.name)})`;
};

export const getPastDateTime = (
  date: string | null,
  time: string,
  amount: number,
  unit: dayjs.ManipulateType
) => {
  const d = dayjs(`${date} ${time}`).subtract(amount, unit);
  return {
    date: d.format("YYYY-MM-DD"),
    time: d.format("HH:mm:ss"),
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
    date: d.format("YYYY-MM-DD"),
    time: d.format("HH:mm:ss"),
  };
};
