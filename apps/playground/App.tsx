import {
  TimezoneRangePicker,
  TimezoneData,
  OnApplyParams,
} from "@react-timezone-range-picker/ui";
import { Box, Button, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const getCurrentTime = () => dayjs().format("HH:mm:ss");

const getCurrentDate = () => dayjs().format("YYYY-MM-DD");

const getCurrentPlusDate = (amount: number) =>
  dayjs().add(amount, "day").format("YYYY-MM-DD");

const DEFAULT_TIMEZONE = {
  name: "Asia/Tokyo",
  longName: "Japan Standard Time",
  utcOffset: "+09:00",
};

const DEFAULT_RANGE = {
  startDate: getCurrentDate(),
  startTime: getCurrentTime(),
  endDate: getCurrentPlusDate(30),
  endTime: getCurrentTime(),
  timezone: DEFAULT_TIMEZONE,
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
  const [range, setRange] = useState<TzRange>(DEFAULT_RANGE);

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
          dayjs().tz(range.timezone.name).format("YYYY-MM-DD HH:mm:ss")}
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
        <TimezoneRangePicker {...range} onApply={handleTimeRangeApply} />
        <Button onClick={toggle}>Toggle Theme</Button>
      </Flex>
    </Box>
  );
}

export default App;
