import { FC } from "react";
import { Box, Flex, Select, Text } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import {
  DATEFORMAT,
  getAllowedDateBounds,
  getCurrentDate,
  getCurrentTime,
  toTz,
  toUtcIso,
  validateAllowedDateTime,
} from "../util/dateTime";
import { Footer } from "../Footer";
import { TzRange } from "../interfaces";
import { getStartEndDateTime, TIME_OPTIONS, TimeOption } from "./util";
import styled from "../styles/index.module.css";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { usePopoverContext } from "../Provider/PopoverProvider";

interface IAroundTimePanel {
  tzRange: TzRange;
  onBasic: () => void;
}

const AroundTimePanel: FC<IAroundTimePanel> = ({ tzRange, onBasic }) => {
  const isTablet = useMediaQuery("(max-width: 64em)");
  const { closePopover } = usePopoverContext();
  const timezoneMeta = tzRange.timezone.utcOffset
    ? `GMT${tzRange.timezone.utcOffset}`
    : tzRange.timezone?.longName;
  const allowedTimeRange = tzRange.options?.allowedTimeRange;
  const dateBounds = getAllowedDateBounds(tzRange.timezone.name, allowedTimeRange);

  const form = useForm({
    initialValues: {
      date: tzRange.startDate ?? getCurrentDate(tzRange),
      time: tzRange.startTime ?? getCurrentTime(tzRange),
      duration: TimeOption.OneDay,
    },
    validate: {
      date: (value, values) => {
        if (!value) return "Date is required";
        if (!values.time) return null;
        return validateAllowedDateTime(
          value,
          values.time,
          tzRange.timezone.name,
          allowedTimeRange
        );
      },
      time: (value, values) => {
        if (!value) return "Time is required";
        if (!values.date) return null;
        return validateAllowedDateTime(
          values.date,
          value,
          tzRange.timezone.name,
          allowedTimeRange
        );
      },
      duration: (value, values) => {
        if (!value) return "Duration is required";
        if (!values.date || !values.time) return null;
        const range = getStartEndDateTime(values.date, values.time, value);
        return (
          validateAllowedDateTime(
            range.startDate!,
            range.startTime,
            tzRange.timezone.name,
            allowedTimeRange
          ) ||
          validateAllowedDateTime(
            range.endDate!,
            range.endTime,
            tzRange.timezone.name,
            allowedTimeRange
          )
        );
      },
    },
  });

  const onSubmit = (values: typeof form.values) => {
    if (!tzRange.timezone.name) return;

    const dateUtc = toUtcIso(values.date, values.time, tzRange.timezone.name);
    const dateInTz = toTz(dateUtc, tzRange.timezone.name);

    const { startDate, startTime, endDate, endTime } = getStartEndDateTime(
      dateInTz.date,
      dateInTz.time,
      values.duration
    );

    tzRange.onApply({
      startDate,
      startTime,
      endDate,
      endTime,
      timezone: tzRange.timezone,
    });

    if (isTablet) {
      closePopover();
    }
  };

  return (
    <Flex direction="column" flex={2} justify={"space-between"} style={{ height: "100%" }} px={12}>
      <form className={styled["form-container"]} onSubmit={form.onSubmit(onSubmit)}>
        <Box>
          <Text fw={600}>Around a time</Text>
          <Flex direction="column" gap={8} mt={12}>
            <DatePickerInput
              label="Pick date"
              placeholder="Pick date"
              key={form.key("date")}
              {...form.getInputProps("date")}
              popoverProps={{ withinPortal: false }}
              minDate={dateBounds.minDate}
              maxDate={dateBounds.maxDate}
              valueFormat={DATEFORMAT}
              leftSection={<IconCalendar stroke={1.5} />}
            />
            <TimeInput
              label="Pick time"
              placeholder="Pick time"
              withSeconds
              key={form.key("time")}
              {...form.getInputProps("time")}
              leftSection={<IconClock stroke={1.5} />}
              rightSection={
                !isTablet ? (
                  <Text style={{ fontSize: 12, fontStyle: "italic", textAlign: "right" }}>
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
            <Select
              label="Duration"
              placeholder="Pick value"
              data={TIME_OPTIONS}
              key={form.key("duration")}
              {...form.getInputProps("duration")}
              comboboxProps={{ withinPortal: false }}
            />
          </Flex>
        </Box>
        <Footer onBasic={onBasic} />
      </form>
    </Flex>
  );
};

export { AroundTimePanel };
