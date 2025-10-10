import dayjs from "dayjs";

export interface ITimeOptions {
  label: string;
  searchKey: string;
  startTime: string;
  endTime: string;
  lineBreak?: boolean;
}

export const getTimeOptions = (timezoneName: string): ITimeOptions[] => [
  {
    label: "Today",
    searchKey: "today",
    startTime: dayjs().tz(timezoneName).startOf("day").format(),
    endTime: dayjs().tz(timezoneName).endOf("day").format(),
  },
  {
    label: "Tomorrow",
    searchKey: "tomorrow",
    startTime: dayjs().tz(timezoneName).add(1, "day").startOf("day").format(),
    endTime: dayjs().tz(timezoneName).add(1, "day").endOf("day").format(),
  },
  {
    label: "Yesterday",
    searchKey: "yesterday",
    startTime: dayjs().tz(timezoneName).subtract(1, "day").startOf("day").format(),
    endTime: dayjs().tz(timezoneName).subtract(1, "day").endOf("day").format(),
    lineBreak: true,
  },
  {
    label: "Last 15 seconds",
    searchKey: "-15s",
    startTime: dayjs().tz(timezoneName).subtract(15, "second").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 30 seconds",
    searchKey: "-30s",
    startTime: dayjs().tz(timezoneName).subtract(30, "second").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Next 15 seconds",
    searchKey: "+15s",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(15, "second").format(),
  },
  {
    label: "Next 30 seconds",
    searchKey: "+30s",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "second").format(),
    lineBreak: true,
  },
  {
    label: "Last 5 minutes",
    searchKey: "-5m",
    startTime: dayjs().tz(timezoneName).subtract(5, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 10 minutes",
    searchKey: "-10m",
    startTime: dayjs().tz(timezoneName).subtract(10, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 15 minutes",
    searchKey: "-15m",
    startTime: dayjs().tz(timezoneName).subtract(15, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 30 minutes",
    searchKey: "-30m",
    startTime: dayjs().tz(timezoneName).subtract(30, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 45 minutes",
    searchKey: "-45m",
    startTime: dayjs().tz(timezoneName).subtract(45, "minute").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Next 5 minutes",
    searchKey: "+5m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(5, "minute").format(),
  },
  {
    label: "Next 10 minutes",
    searchKey: "+10m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(10, "minute").format(),
  },
  {
    label: "Next 15 minutes",
    searchKey: "+15m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(15, "minute").format(),
  },
  {
    label: "Next 30 minutes",
    searchKey: "+30m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "minute").format(),
  },
  {
    label: "Next 45 minutes",
    searchKey: "+45m",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(45, "minute").format(),
    lineBreak: true,
  },
  {
    label: "Last 1 hour",
    searchKey: "-1h",
    startTime: dayjs().tz(timezoneName).subtract(1, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 3 hours",
    searchKey: "-3h",
    startTime: dayjs().tz(timezoneName).subtract(3, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 6 hours",
    searchKey: "-6h",
    startTime: dayjs().tz(timezoneName).subtract(6, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 12 hours",
    searchKey: "-12h",
    startTime: dayjs().tz(timezoneName).subtract(12, "hour").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Next 1 hour",
    searchKey: "+1h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(1, "hour").format(),
  },
  {
    label: "Next 3 hours",
    searchKey: "+3h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(3, "hour").format(),
  },
  {
    label: "Next 6 hours",
    searchKey: "+6h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(6, "hour").format(),
  },
  {
    label: "Next 12 hours",
    searchKey: "+12h",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(12, "hour").format(),
    lineBreak: true,
  },
  {
    label: "Last 1 day",
    searchKey: "-1d",
    startTime: dayjs().tz(timezoneName).subtract(1, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 2 days",
    searchKey: "-2d",
    startTime: dayjs().tz(timezoneName).subtract(2, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 7 days",
    searchKey: "-7d",
    startTime: dayjs().tz(timezoneName).subtract(7, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 14 days",
    searchKey: "-14d",
    startTime: dayjs().tz(timezoneName).subtract(14, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Last 30 days",
    searchKey: "-30d",
    startTime: dayjs().tz(timezoneName).subtract(30, "day").format(),
    endTime: dayjs().tz(timezoneName).format(),
  },
  {
    label: "Next 1 day",
    searchKey: "+1d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(1, "day").format(),
  },
  {
    label: "Next 2 days",
    searchKey: "+2d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(2, "day").format(),
  },
  {
    label: "Next 7 days",
    searchKey: "+7d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(7, "day").format(),
  },
  {
    label: "Next 14 days",
    searchKey: "+14d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(14, "day").format(),
  },
  {
    label: "Next 30 days",
    searchKey: "+30d",
    startTime: dayjs().tz(timezoneName).format(),
    endTime: dayjs().tz(timezoneName).add(30, "day").format(),
  },
];
