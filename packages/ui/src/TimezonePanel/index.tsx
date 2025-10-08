import { useEffect, useMemo, useState } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { useDebounce } from "react-use";
import { TimezoneList } from "./components/TimezoneList";
import { TimezoneSearch } from "./components/TimezoneSearch";
import { getTimezones } from "./util/getTimezones";
import styled from "./index.module.css";
import { getBrowserTimezone } from "./util/getBrowserTimezone";
import { Footer } from "../Footer";

// TODO - Should pass timezone value from playground app as our selection value
// TODO - Should also have a way in which it shows selected/default timezone (by browser)

interface ITimezoneData {
  name: string;
  longName: string;
  currentTime: string;
  utcOffset: string;
  offsetMinutes: number;
}

const TimezonePanel = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [filteredTimezones, setFilteredTimezones] = useState<ITimezoneData[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleTimezoneMouseClick = (name: string) => {
    setSelectedTimezone(name);
  };

  const timezones = useMemo(() => getTimezones(), []);

  useEffect(() => {
    setFilteredTimezones(timezones);
  }, []);

  useDebounce(
    () => {
      if (searchText === "") {
        setFilteredTimezones(timezones);
        return;
      }

      setFilteredTimezones(
        timezones.filter(
          (timezone) =>
            timezone.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            timezone.longName.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            timezone.currentTime.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            timezone.utcOffset.toLowerCase().includes(searchText.toLocaleLowerCase())
        )
      );
    },
    250,
    [searchText]
  );

  const browserTimezone = useMemo(() => getBrowserTimezone(), []);

  return (
    <Flex direction="column" flex={2} justify={"space-between"} style={{ height: "100%" }}>
      <Flex direction="column" style={{ height: "calc(100% - 40px)" }}>
        <Box style={{ width: "95%" }} mx="auto">
          <TimezoneSearch searchText={searchText} setSearchText={setSearchText} />
        </Box>
        <Box style={{ overflowY: "scroll" }}>
          <Text fw={600} px={12}>
            MY LOCATION
          </Text>
          <Flex direction="column">
            <TimezoneList
              isBrowserTimezone
              name={browserTimezone.name}
              longName={browserTimezone.longName}
              currentTime={browserTimezone.currentTime}
              utcOffset={browserTimezone.utcOffset}
            />
          </Flex>
          <Text fw={600} px={12}>
            LOCATIONS
          </Text>
          <Flex direction={"column"} className={styled["list-container"]}>
            {filteredTimezones.map((timezone, idx) => (
              <TimezoneList
                key={idx}
                name={timezone.name}
                longName={timezone.longName}
                currentTime={timezone.currentTime}
                utcOffset={timezone.utcOffset}
                handleTimezoneMouseClick={handleTimezoneMouseClick}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Box px={12}>
        <Footer />
      </Box>
    </Flex>
  );
};

export { TimezonePanel };
