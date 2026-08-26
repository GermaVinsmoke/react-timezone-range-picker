import {
  TimezoneRangePicker,
  type TimezoneData,
  type OnApplyParams,
} from "react-timezone-range-picker";
import { Box, Button, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";

const nowInTimezone = (tzName?: string) =>
  Temporal.Now.instant().toZonedDateTimeISO(tzName || Temporal.Now.timeZoneId());

const formatTime = (value: Temporal.ZonedDateTime) =>
  `${value.hour.toString().padStart(2, "0")}:${value.minute
    .toString()
    .padStart(2, "0")}:${value.second.toString().padStart(2, "0")}`;

const formatDate = (value: Temporal.ZonedDateTime) =>
  `${value.year.toString().padStart(4, "0")}/${value.month
    .toString()
    .padStart(2, "0")}/${value.day.toString().padStart(2, "0")}`;

const formatDateTime = (value: Temporal.ZonedDateTime) =>
  `${formatDate(value)} ${formatTime(value)}`;

const getCurrentTime = () => formatTime(nowInTimezone());
const getCurrentTimeInTz = (tzName: string) => formatTime(nowInTimezone(tzName));
const getCurrentDate = () => formatDate(nowInTimezone());
const getCurrentDateInTz = (tzName: string) => formatDate(nowInTimezone(tzName));
const getCurrentPlusDate = (amount: number) => formatDate(nowInTimezone().add({ days: amount }));
const getCurrentPlusDateInTz = (amount: number, tzName: string) =>
  formatDate(nowInTimezone(tzName).add({ days: amount }));

const getTimezoneOffset = (tzName: string) => nowInTimezone(tzName).offset;

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
  const name = Temporal.Now.timeZoneId();
  const utcOffset = getTimezoneOffset(name);
  const longName = getTimezoneLongName(name);

  return { name, longName, utcOffset };
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
        {range.timezone.name && formatDateTime(nowInTimezone(range.timezone.name))}
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
          options={{
            disableSeconds: true,
          }}
        />
        <Button onClick={toggle}>Toggle Theme</Button>
      </Flex>
    </Box>
  );
}

export default App;
