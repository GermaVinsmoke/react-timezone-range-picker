import dayjs from "dayjs";

export interface ITimeOptions {
  label: string;
  searchKey: string;
  startTime: string;
  endTime: string;
  lineBreak?: boolean;
}

export const TIME_OPTIONS: ITimeOptions[] = [
  {
    label: "Today",
    searchKey: "today",
    startTime: dayjs().startOf("day").format(),
    endTime: dayjs().endOf("day").format(),
  },
  {
    label: "Tomorrow",
    searchKey: "tomorrow",
    startTime: dayjs().add(1, "day").startOf("day").format(),
    endTime: dayjs().add(1, "day").endOf("day").format(),
  },
  {
    label: "Yesterday",
    searchKey: "yesterday",
    startTime: dayjs().subtract(1, "day").startOf("day").format(),
    endTime: dayjs().subtract(1, "day").endOf("day").format(),
    lineBreak: true,
  },
  {
    label: "Last 15 seconds",
    searchKey: "-15s",
    startTime: dayjs().subtract(15, "second").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 30 seconds",
    searchKey: "-30s",
    startTime: dayjs().subtract(30, "second").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Next 15 seconds",
    searchKey: "+15s",
    startTime: dayjs().format(),
    endTime: dayjs().add(15, "second").format(),
  },
  {
    label: "Next 30 seconds",
    searchKey: "+30s",
    startTime: dayjs().format(),
    endTime: dayjs().add(30, "second").format(),
    lineBreak: true,
  },
  {
    label: "Last 5 minutes",
    searchKey: "-5m",
    startTime: dayjs().subtract(5, "minute").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 10 minutes",
    searchKey: "-10m",
    startTime: dayjs().subtract(10, "minute").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 15 minutes",
    searchKey: "-15m",
    startTime: dayjs().subtract(15, "minute").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 30 minutes",
    searchKey: "-30m",
    startTime: dayjs().subtract(30, "minute").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 45 minutes",
    searchKey: "-45m",
    startTime: dayjs().subtract(45, "minute").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Next 5 minutes",
    searchKey: "+5m",
    startTime: dayjs().format(),
    endTime: dayjs().add(5, "minute").format(),
  },
  {
    label: "Next 10 minutes",
    searchKey: "+10m",
    startTime: dayjs().format(),
    endTime: dayjs().add(10, "minute").format(),
  },
  {
    label: "Next 15 minutes",
    searchKey: "+15m",
    startTime: dayjs().format(),
    endTime: dayjs().add(15, "minute").format(),
  },
  {
    label: "Next 30 minutes",
    searchKey: "+30m",
    startTime: dayjs().format(),
    endTime: dayjs().add(30, "minute").format(),
  },
  {
    label: "Next 45 minutes",
    searchKey: "+45m",
    startTime: dayjs().format(),
    endTime: dayjs().add(45, "minute").format(),
    lineBreak: true,
  },
  {
    label: "Last 1 hour",
    searchKey: "-1h",
    startTime: dayjs().subtract(1, "hour").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 3 hours",
    searchKey: "-3h",
    startTime: dayjs().subtract(3, "hour").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 6 hours",
    searchKey: "-6h",
    startTime: dayjs().subtract(6, "hour").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 12 hours",
    searchKey: "-12h",
    startTime: dayjs().subtract(12, "hour").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Next 1 hour",
    searchKey: "+1h",
    startTime: dayjs().format(),
    endTime: dayjs().add(1, "hour").format(),
  },
  {
    label: "Next 3 hours",
    searchKey: "+3h",
    startTime: dayjs().format(),
    endTime: dayjs().add(3, "hour").format(),
  },
  {
    label: "Next 6 hours",
    searchKey: "+6h",
    startTime: dayjs().format(),
    endTime: dayjs().add(6, "hour").format(),
  },
  {
    label: "Next 12 hours",
    searchKey: "+12h",
    startTime: dayjs().format(),
    endTime: dayjs().add(12, "hour").format(),
    lineBreak: true,
  },
  {
    label: "Last 1 day",
    searchKey: "-1d",
    startTime: dayjs().subtract(1, "day").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 2 days",
    searchKey: "-2d",
    startTime: dayjs().subtract(2, "day").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 7 days",
    searchKey: "-7d",
    startTime: dayjs().subtract(7, "day").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 14 days",
    searchKey: "-14d",
    startTime: dayjs().subtract(14, "day").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Last 30 days",
    searchKey: "-30d",
    startTime: dayjs().subtract(30, "day").format(),
    endTime: dayjs().format(),
  },
  {
    label: "Next 1 day",
    searchKey: "+1d",
    startTime: dayjs().format(),
    endTime: dayjs().add(1, "day").format(),
  },
  {
    label: "Next 2 days",
    searchKey: "+2d",
    startTime: dayjs().format(),
    endTime: dayjs().add(2, "day").format(),
  },
  {
    label: "Next 7 days",
    searchKey: "+7d",
    startTime: dayjs().format(),
    endTime: dayjs().add(7, "day").format(),
  },
  {
    label: "Next 14 days",
    searchKey: "+14d",
    startTime: dayjs().format(),
    endTime: dayjs().add(14, "day").format(),
  },
  {
    label: "Next 30 days",
    searchKey: "+30d",
    startTime: dayjs().format(),
    endTime: dayjs().add(30, "day").format(),
  },
];
