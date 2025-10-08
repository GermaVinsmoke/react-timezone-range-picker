import {
  TimezoneRangePicker,
  TimezoneData,
} from "@react-timezone-range-picker/ui";
import { Box, Button, Flex, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIMEZONE = {
  name: "Asia/Tokyo",
  longName: "Japan Standard Time",
  utcOffset: "+09:00",
};

function App() {
  const [timezone, setTimezone] = useState<TimezoneData>(DEFAULT_TIMEZONE);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggle = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <Box>
      <Text>
        Selected Timezone: {timezone.name} ({timezone.longName})
      </Text>
      <Text>
        Current Time: {dayjs().tz(timezone.name).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
      <Flex columnGap={8}>
        <TimezoneRangePicker timezone={timezone} setTimezone={setTimezone} />
        <Button onClick={toggle}>Toggle Theme</Button>
      </Flex>
    </Box>
  );
}

export default App;
