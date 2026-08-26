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

const UTC_TIMEZONE: TimezoneData = {
  name: "UTC",
  longName: "Coordinated Universal Time",
  utcOffset: "+00:00",
};

const convertDateTime = (date: string, time: string, sourceZone: string, targetZone: string) => {
  const value = Temporal.PlainDateTime.from(`${date.replace(/\//g, "-")}T${time}`)
    .toZonedDateTime(sourceZone)
    .toInstant()
    .toZonedDateTimeISO(targetZone);

  return { date: formatDate(value), time: formatTime(value) };
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

  const toggle = () => setColorScheme(colorScheme === "dark" ? "light" : "dark");

  const toggleTimezone = () => {
    setRange((currentRange) => {
      const localTimezone = getBrowserTimezone();
      const targetTimezone = currentRange.timezone.name === "UTC" ? localTimezone : UTC_TIMEZONE;
      const sourceZone = currentRange.timezone.name;
      const isDateOnlyRange =
        currentRange.startTime === "00:00:00" && currentRange.endTime === "00:00:00";

      // Basic mode represents calendar dates rather than absolute instants. Keep the
      // selected dates unchanged and anchor both boundaries to midnight when the
      // display timezone changes.
      if (isDateOnlyRange) {
        return {
          ...currentRange,
          startTime: "00:00:00",
          endTime: "00:00:00",
          timezone: targetTimezone,
        };
      }

      if (
        !sourceZone ||
        !targetTimezone.name ||
        !currentRange.startDate ||
        !currentRange.startTime ||
        !currentRange.endDate ||
        !currentRange.endTime
      ) {
        return { ...currentRange, timezone: targetTimezone };
      }

      const start = convertDateTime(
        currentRange.startDate,
        currentRange.startTime,
        sourceZone,
        targetTimezone.name
      );
      const end = convertDateTime(
        currentRange.endDate,
        currentRange.endTime,
        sourceZone,
        targetTimezone.name
      );

      return {
        startDate: start.date,
        startTime: start.time,
        endDate: end.date,
        endTime: end.time,
        timezone: targetTimezone,
      };
    });
  };

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
        <Button onClick={toggleTimezone} variant="outline">
          {range.timezone.name === "UTC" ? "Use Local Timezone" : "Use UTC"}
        </Button>
        <Button onClick={toggle}>Toggle Theme</Button>
      </Flex>
    </Box>
  );
}

export default App;
