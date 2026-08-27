import { FC } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import {
  DATEFORMAT,
  getCurrentDate,
  getCurrentPlusDate,
  getCurrentTime,
  parseDateTime,
  toTz,
  toUtcIso,
} from "../util/dateTime";
import { Footer } from "../Footer";
import { TzRange } from "../interfaces";
import { useForm } from "@mantine/form";
import styled from "../styles/index.module.css";
import { Temporal } from "@js-temporal/polyfill";
import { useMediaQuery } from "@mantine/hooks";
import { usePopoverContext } from "../Provider/PopoverProvider";

interface IStartEndTimePanel {
  tzRange: TzRange;
  onBasic: () => void;
}

const StartEndTimePanel: FC<IStartEndTimePanel> = ({ tzRange, onBasic }) => {
  const isTablet = useMediaQuery("(max-width: 64em)");
  const { closePopover } = usePopoverContext();
  const timezoneMeta = tzRange.timezone.utcOffset
    ? `GMT${tzRange.timezone.utcOffset}`
    : tzRange.timezone?.longName;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      startDate: tzRange.startDate ?? getCurrentDate(tzRange),
      startTime: tzRange.startTime ?? getCurrentTime(tzRange),
      endDate: tzRange.endDate ?? getCurrentPlusDate(30),
      endTime: tzRange.endTime ?? getCurrentTime(tzRange),
    },
    validate: {
      startDate: (value) => (value ? null : "Start date is required"),
      startTime: (value) => (value ? null : "Start time is required"),
      endDate: (value, values) => {
        if (!value) return "End date is required";
        const start = parseDateTime(values.startDate, values.startTime);
        const end = parseDateTime(value, values.endTime);
        return Temporal.PlainDateTime.compare(end, start) >= 0
          ? null
          : "End time must be after start time";
      },
      endTime: (value, values) => {
        if (!value) return "End time is required";
        const start = parseDateTime(values.startDate, values.startTime);
        const end = parseDateTime(values.endDate, value);
        return Temporal.PlainDateTime.compare(end, start) >= 0
          ? null
          : "End time must be after start time";
      },
    },
  });

  const onSubmit = (values: typeof form.values) => {
    if (!tzRange.timezone.name) return;

    const startDateUtc = toUtcIso(values.startDate, values.startTime, tzRange.timezone.name);
    const endDateUtc = toUtcIso(values.endDate, values.endTime, tzRange.timezone.name);

    const startDateInTz = toTz(startDateUtc, tzRange.timezone.name);
    const endDateInTz = toTz(endDateUtc, tzRange.timezone.name);

    tzRange.onApply({
      startDate: startDateInTz.date,
      startTime: startDateInTz.time,
      endDate: endDateInTz.date,
      endTime: endDateInTz.time,
      timezone: tzRange.timezone,
    });

    if (isTablet) {
      closePopover();
    }
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
              valueFormat={DATEFORMAT}
              leftSection={<IconCalendar stroke={1.5} />}
            />
            <TimeInput
              withSeconds
              key={form.key("startTime")}
              {...form.getInputProps("startTime")}
              leftSection={<IconClock stroke={1.5} />}
              rightSection={
                !isTablet ? (
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    {tzRange.timezone?.longName}
                  </Text>
                ) : undefined
              }
              rightSectionWidth={!isTablet ? 180 : undefined}
              rightSectionProps={{
                style: {
                  paddingRight: 1,
                },
              }}
            />
            {isTablet && timezoneMeta ? (
              <Text size="xs" c="dimmed" mt={-4}>
                {timezoneMeta}
              </Text>
            ) : null}
            <DatePickerInput
              label="End time"
              key={form.key("endDate")}
              {...form.getInputProps("endDate")}
              popoverProps={{ withinPortal: false }}
              valueFormat={DATEFORMAT}
              leftSection={<IconCalendar stroke={1.5} />}
            />
            <TimeInput
              withSeconds
              key={form.key("endTime")}
              {...form.getInputProps("endTime")}
              leftSection={<IconClock stroke={1.5} />}
              rightSection={
                !isTablet ? (
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    {tzRange.timezone?.longName}
                  </Text>
                ) : undefined
              }
              rightSectionWidth={!isTablet ? 180 : undefined}
              rightSectionProps={{
                style: {
                  paddingRight: 1,
                },
              }}
            />
            {isTablet && timezoneMeta ? (
              <Text size="xs" c="dimmed" mt={-4}>
                {timezoneMeta}
              </Text>
            ) : null}
          </Flex>
        </Box>
        <Footer onBasic={onBasic} />
      </form>
    </Flex>
  );
};

export { StartEndTimePanel };
