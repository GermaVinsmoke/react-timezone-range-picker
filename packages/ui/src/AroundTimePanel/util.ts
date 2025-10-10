import dayjs from "dayjs";

export enum TimeOption {
  ThirtySeconds = "± 30 seconds",
  OneMinute = "± 1 minute",
  FifteenMinutes = "± 15 minutes",
  ThirtyMinutes = "± 30 minutes",
  OneHour = "± 1 hour",
  OneDay = "± 1 day",
}

export const TIME_OPTIONS = [
  TimeOption.ThirtySeconds,
  TimeOption.OneMinute,
  TimeOption.FifteenMinutes,
  TimeOption.ThirtyMinutes,
  TimeOption.OneHour,
  TimeOption.OneDay,
];

const getPastDateTime = (
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

const getFutureDateTime = (
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

export const getStartEndDateTime = (date: string | null, time: string, timeOption: TimeOption) => {
  switch (timeOption) {
    case TimeOption.ThirtySeconds:
      const startDateTime = getPastDateTime(date, time, 30, "second");
      const endDateTime = getFutureDateTime(date, time, 30, "second");
      return {
        startDate: startDateTime.date,
        startTime: startDateTime.time,
        endDate: endDateTime.date,
        endTime: endDateTime.time,
      };
    case TimeOption.OneMinute:
      const startDateTime1 = getPastDateTime(date, time, 1, "minute");
      const endDateTime1 = getFutureDateTime(date, time, 1, "minute");
      return {
        startDate: startDateTime1.date,
        startTime: startDateTime1.time,
        endDate: endDateTime1.date,
        endTime: endDateTime1.time,
      };
    case TimeOption.FifteenMinutes:
      const startDateTime15 = getPastDateTime(date, time, 15, "minute");
      const endDateTime15 = getFutureDateTime(date, time, 15, "minute");
      return {
        startDate: startDateTime15.date,
        startTime: startDateTime15.time,
        endDate: endDateTime15.date,
        endTime: endDateTime15.time,
      };
    case TimeOption.ThirtyMinutes:
      const startDateTime30 = getPastDateTime(date, time, 30, "minute");
      const endDateTime30 = getFutureDateTime(date, time, 30, "minute");
      return {
        startDate: startDateTime30.date,
        startTime: startDateTime30.time,
        endDate: endDateTime30.date,
        endTime: endDateTime30.time,
      };
    case TimeOption.OneHour:
      const startDateTime60 = getPastDateTime(date, time, 1, "hour");
      const endDateTime60 = getFutureDateTime(date, time, 1, "hour");
      return {
        startDate: startDateTime60.date,
        startTime: startDateTime60.time,
        endDate: endDateTime60.date,
        endTime: endDateTime60.time,
      };
    case TimeOption.OneDay:
      const startDateTimeDay = getPastDateTime(date, time, 1, "day");
      const endDateTimeDay = getFutureDateTime(date, time, 1, "day");
      return {
        startDate: startDateTimeDay.date,
        startTime: startDateTimeDay.time,
        endDate: endDateTimeDay.date,
        endTime: endDateTimeDay.time,
      };
    default:
      return {
        startDate: date,
        startTime: time,
        endDate: date,
        endTime: time,
      };
  }
};
