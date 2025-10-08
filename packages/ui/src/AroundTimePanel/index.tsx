import { ChangeEvent, useState } from "react";
import { Box, Flex, Select, Text } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { getCurrentDate, getCurrentTime } from "../util/dateTime";
import { Footer } from "../Footer";

const AroundTimePanel = () => {
  const [dateValue, setDateValue] = useState<string | null>(getCurrentDate());
  const [timeValue, setTimeValue] = useState<string>(getCurrentTime());
  const [duration, setDuration] = useState<string | null>("± 1 day");

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.currentTarget.value);
  };

  return (
    <Flex direction="column" flex={2} justify={"space-between"} style={{ height: "100%" }} px={12}>
      <Box>
        <Text fw={600}>Around a time</Text>
        <Flex direction="column" gap={8} mt={12}>
          <DatePickerInput
            label="Pick date"
            placeholder="Pick date"
            value={dateValue}
            onChange={setDateValue}
            popoverProps={{ withinPortal: false }}
            valueFormat="DD/MM/YYYY"
            leftSection={<IconCalendar stroke={1.5} />}
          />
          <TimeInput
            label="Pick time"
            placeholder="Pick time"
            withSeconds
            defaultValue={getCurrentTime()}
            value={timeValue}
            onChange={handleTimeChange}
            leftSection={<IconClock stroke={1.5} />}
            rightSection={
              <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                Hawaii-Aleutian Standard Time
              </Text>
            }
            rightSectionWidth={180}
            rightSectionProps={{
              style: {
                paddingRight: 1,
              },
            }}
          />
          <Select
            label="Duration"
            placeholder="Pick value"
            data={[
              "± 30 seconds",
              "± 1 minute",
              "± 15 minutes",
              "± 30 minutes",
              "± 1 hour",
              "± 1 day",
            ]}
            value={duration}
            onChange={setDuration}
            comboboxProps={{ withinPortal: false }}
          />
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};

export { AroundTimePanel };
