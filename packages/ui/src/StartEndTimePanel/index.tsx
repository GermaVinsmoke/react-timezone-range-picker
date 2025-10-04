import { ChangeEvent, useState } from "react";
import { Flex, Text } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { getCurrentDate, getCurrentPlusDate, getCurrentTime } from "../util/dateTime";
import dayjs from "dayjs";

const StartEndTimePanel = () => {
  const [startDateValue, setStartDateValue] = useState<string | null>(getCurrentDate());
  const [startTimeValue, setStartTimeValue] = useState<string>(getCurrentTime());
  const [endDateValue, setEndDateValue] = useState<string | null>(getCurrentPlusDate(30));
  const [endTimeValue, setEndTimeValue] = useState<string>(getCurrentTime());

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTimeValue(e.currentTarget.value);
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTimeValue(e.currentTarget.value);
  };

  return (
    <Flex direction="column" flex={2} style={{ height: "100%" }}>
      <Text fw={600}>Start and end times</Text>
      <Flex direction="column" gap={8} mt={12}>
        <DatePickerInput
          label="Start time"
          value={startDateValue}
          onChange={setStartDateValue}
          popoverProps={{ withinPortal: false }}
          valueFormat="DD/MM/YYYY"
          leftSection={<IconCalendar stroke={1.5} />}
        />
        <TimeInput
          withSeconds
          defaultValue={getCurrentTime()}
          value={startTimeValue}
          onChange={handleStartTimeChange}
          leftSection={<IconClock stroke={1.5} />}
          rightSection={
            <Text style={{ fontSize: 12, fontStyle: "italic" }}>Hawaii-Aleutian Standard Time</Text>
          }
          rightSectionWidth={180}
          rightSectionProps={{
            style: {
              paddingRight: 1,
            },
          }}
        />
        <DatePickerInput
          label="End time"
          value={endDateValue}
          onChange={setEndDateValue}
          popoverProps={{ withinPortal: false }}
          valueFormat="DD/MM/YYYY"
          leftSection={<IconCalendar stroke={1.5} />}
        />
        <TimeInput
          withSeconds
          defaultValue={getCurrentTime()}
          value={endTimeValue}
          onChange={handleEndTimeChange}
          leftSection={<IconClock stroke={1.5} />}
          rightSection={
            <Text style={{ fontSize: 12, fontStyle: "italic" }}>Hawaii-Aleutian Standard Time</Text>
          }
          rightSectionWidth={180}
          rightSectionProps={{
            style: {
              paddingRight: 1,
            },
          }}
        />
      </Flex>
    </Flex>
  );
};

export { StartEndTimePanel };
