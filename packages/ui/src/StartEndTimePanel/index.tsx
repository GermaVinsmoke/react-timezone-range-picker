import { FC } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { getCurrentDate, getCurrentPlusDate, getCurrentTime } from "../util/dateTime";
import { Footer } from "../Footer";
import { TzRange } from "../interfaces";
import { useForm } from "@mantine/form";
import styled from "../styles/index.module.css";

interface IStartEndTimePanel {
  tzRange: TzRange;
}

const StartEndTimePanel: FC<IStartEndTimePanel> = ({ tzRange }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      startDate: getCurrentDate(),
      startTime: getCurrentTime(),
      endDate: getCurrentPlusDate(30),
      endTime: getCurrentTime(),
    },
  });

  const onSubmit = (values: typeof form.values) => {
    tzRange.onApply({
      startDate: values.startDate,
      startTime: values.startTime,
      endDate: values.endDate,
      endTime: values.endTime,
      timezone: tzRange.timezone,
    });
  };

  return (
    <Flex direction="column" flex={2} style={{ height: "100%" }} px={12}>
      <form className={styled["form-container"]} onSubmit={form.onSubmit(onSubmit)}>
        <Box>
          <Text fw={600}>Start and end times</Text>
          <Flex direction="column" gap={8} mt={12}>
            <DatePickerInput
              label="Start time"
              key={form.key("startDate")}
              {...form.getInputProps("startDate")}
              popoverProps={{ withinPortal: false }}
              valueFormat="YYYY/MM/DD"
              leftSection={<IconCalendar stroke={1.5} />}
            />
            <TimeInput
              withSeconds
              defaultValue={getCurrentTime()}
              key={form.key("startTime")}
              {...form.getInputProps("startTime")}
              leftSection={<IconClock stroke={1.5} />}
              rightSection={
                <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                  {tzRange.timezone?.longName}
                </Text>
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
              key={form.key("endDate")}
              {...form.getInputProps("endDate")}
              popoverProps={{ withinPortal: false }}
              valueFormat="YYYY/MM/DD"
              leftSection={<IconCalendar stroke={1.5} />}
            />
            <TimeInput
              withSeconds
              defaultValue={getCurrentTime()}
              key={form.key("endTime")}
              {...form.getInputProps("endTime")}
              leftSection={<IconClock stroke={1.5} />}
              rightSection={
                <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                  {tzRange.timezone?.longName}
                </Text>
              }
              rightSectionWidth={180}
              rightSectionProps={{
                style: {
                  paddingRight: 1,
                },
              }}
            />
          </Flex>
        </Box>
        <Footer />
      </form>
    </Flex>
  );
};

export { StartEndTimePanel };
