import {
  TimezoneRangePicker,
  type TimezoneData,
  type OnApplyParams,
} from "react-timezone-range-picker";
import { Box, Button, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const getCurrentTime = () => dayjs().format("HH:mm:ss");
const getCurrentTimeInTz = (tzName: string) =>
  dayjs().tz(tzName).format("HH:mm:ss");

const getCurrentDate = () => dayjs().format("YYYY/MM/DD");
const getCurrentDateInTz = (tzName: string) =>
  dayjs().tz(tzName).format("YYYY/MM/DD");

const getCurrentPlusDate = (amount: number) =>
  dayjs().add(amount, "day").format("YYYY/MM/DD");
const getCurrentPlusDateInTz = (amount: number, tzName: string) =>
  dayjs().tz(tzName).add(amount, "day").format("YYYY/MM/DD");

const getTimezoneOffest = (tzName: string) => dayjs().tz(tzName).format("Z");

const getTimezoneLongName = (tzName: string) => {
  return (
    Intl.DateTimeFormat("en", {
      timeZone: tzName,
      timeZoneName: "long",
    })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value || tzName
  );
};

export const getBrowserTimezone = () => {
  const name = dayjs.tz.guess();
  const offset = getTimezoneOffest(name);
  const longName = getTimezoneLongName(name);

  return { name, longName, offset };
};

const DEFAULT_TIMEZONE = {
  name: "Asia/Tokyo",
  longName: "Japan Standard Time",
  utcOffset: "+09:00",
};

const getDefaultTzRange = () => {
  const timezone = getBrowserTimezone();

  return {
    startDate: getCurrentDateInTz(timezone.name),
    startTime: getCurrentTimeInTz(timezone.name),
    endDate: getCurrentPlusDateInTz(30, timezone.name),
    endTime: getCurrentTimeInTz(timezone.name),
    timezone,
  };
};

const DEFAULT_RANGE = {
  startDate: getCurrentDate(),
  startTime: getCurrentTime(),
  endDate: getCurrentPlusDate(30),
  endTime: getCurrentTime(),
  timezone: getBrowserTimezone(),
};

const EMPTY_RANGE = {
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  timezone: {
    name: null,
    longName: null,
    utcOffset: null,
  },
};

type TzRange = {
  startDate: string | null;
  startTime: string | null;

  endDate: string | null;
  endTime: string | null;

  timezone: TimezoneData;
};

function App() {
  const [range, setRange] = useState<TzRange>(getDefaultTzRange());

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleTimeRangeApply = ({
    startDate,
    startTime,
    endDate,
    endTime,
    timezone,
  }: OnApplyParams) => {
    setRange({ startDate, startTime, endDate, endTime, timezone });
  };

  const toggle = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <Box>
      <Text>
        Selected Timezone: {range.timezone.name} ({range.timezone.longName})
      </Text>
      <Text>
        Current Time:{" "}
        {range.timezone.name &&
          dayjs().tz(range.timezone.name).format("YYYY/MM/DD HH:mm:ss")}
      </Text>
      <Text>UTC Offset: {range.timezone.utcOffset}</Text>
      <Text>
        Start: {range.startDate} {range.startTime}
      </Text>
      <Text>
        End: {range.endDate} {range.endTime}
      </Text>
      <br />
      <Flex columnGap={8}>
        <TimezoneRangePicker
          {...range}
          onApply={handleTimeRangeApply}
          // buttonStyle={{ height: "50px", fontSize: "13px", fontWeight: 300 }}
        />
        <Button onClick={toggle}>Toggle Theme</Button>
      </Flex>
    </Box>
  );
}

export default App;
