import { getTimeOptions, ITimeOptions } from "./timeOptions";
import { Box, Flex, Input, Text } from "@mantine/core";
import styled from "./index.module.css";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import clsx from "clsx";
import { useAppTheme } from "../hooks/useAppTheme";
import { TzRange } from "../interfaces";
import { usePopoverContext } from "../Provider/PopoverProvider";

interface IRelativeTimePanel {
  tzRange: TzRange;
}

export const RelativeTimePanel = ({ tzRange }: IRelativeTimePanel) => {
  const [filteredOptions, setFilteredOptions] = useState<ITimeOptions[]>([]);
  const [searchText, setSearchText] = useState("");
  const { colorScheme } = useAppTheme();
  const { closePopover } = usePopoverContext();

  useEffect(() => {
    if (tzRange.timezone.name !== null) {
      const timeOptions = getTimeOptions(tzRange.timezone.name, tzRange.options);
      setFilteredOptions(timeOptions);
    }
  }, [tzRange.timezone, tzRange.options]);

  useDebounce(
    () => {
      if (!tzRange.timezone.name) return;

      const allOptions = getTimeOptions(tzRange.timezone.name, tzRange.options);
      if (searchText === "") {
        setFilteredOptions(allOptions);
        return;
      }

      const normalizedSearchText = searchText.toLowerCase();
      setFilteredOptions(
        allOptions.filter(
          (value) =>
            value.searchKey.includes(normalizedSearchText) ||
            value.label.toLowerCase().includes(normalizedSearchText)
        )
      );
    },
    250,
    [searchText, tzRange.timezone, tzRange.options]
  );

  const handleRowClick = (option: ITimeOptions) => {
    const [startDate, startTime] = option.startTime.split("T");
    const [endDate, endTime] = option.endTime.split("T");

    tzRange.onApply({
      startDate,
      startTime: startTime.slice(0, 8),
      endDate,
      endTime: endTime.slice(0, 8),
      timezone: tzRange.timezone,
    });
    closePopover();
  };

  return (
    <Flex direction="column" className={styled["relative-time-root"]}>
      <Box style={{ width: "90%" }} mx={"auto"}>
        <Input
          placeholder="Relative time (15m, 1h, 1d, 1w)"
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
      </Box>
      <Flex direction={"column"} className={styled["relative-time-panel-container"]}>
        {filteredOptions.map((op) => (
          <Flex
            key={op.label}
            align={"center"}
            justify={"space-between"}
            className={clsx(
              colorScheme === "dark" ? styled["time-row-dark"] : styled["time-row-light"],
              styled["time-row"]
            )}
            py={4}
            px={12}
            mb={op.lineBreak ? 8 : 0}
            onClick={() => handleRowClick(op)}
          >
            <Text size="sm">{op.label}</Text>
            <Text size="xs" c="#5f6368">
              {op.searchKey}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
