import { ITimeOptions, TIME_OPTIONS } from "./timeOptions";
import { Box, Flex, Input, Text } from "@mantine/core";
import styled from "./index.module.css";
import { useState } from "react";
import { useDebounce } from "react-use";
import clsx from "clsx";
import { useAppTheme } from "../hooks/useAppTheme";

export const RelativeTimePanel = () => {
  const [filteredOptions, setFilteredOptions] = useState<ITimeOptions[]>(TIME_OPTIONS);
  const [searchText, setSearchText] = useState("");
  const { colorScheme } = useAppTheme();

  useDebounce(
    () => {
      if (searchText === "") {
        setFilteredOptions(TIME_OPTIONS);
        return;
      }

      const newTimeOptions = filteredOptions.filter((value) =>
        value.searchKey.includes(searchText)
      );
      setFilteredOptions(newTimeOptions);
    },
    250,
    [searchText]
  );

  return (
    <>
      <Box style={{ width: "90%" }} mx={"auto"}>
        <Input
          placeholder="Relative time (15m, 1h, 1d, 1w)"
          //   leftSection={<IconFilter2 stroke={2} color="#313B49" />}
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
          >
            <Text size="sm">{op.label}</Text>
            <Text size="xs" c="#5f6368">
              {op.searchKey}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
