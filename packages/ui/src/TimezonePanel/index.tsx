import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { useDebounce } from "react-use";
import { TimezoneList } from "./components/TimezoneList";
import { TimezoneSearch } from "./components/TimezoneSearch";
import { getTimezones } from "./util/getTimezones";
import styled from "./index.module.css";
import commonStyled from "../styles/index.module.css";
import { Footer } from "../Footer";
import { TimezoneData, TzRange } from "../interfaces";
import dayjs from "dayjs";
import { renderIn, toUtcIso } from "../util/dateTime";

interface ITimezoneDataInternal {
  name: string;
  longName: string;
  currentTime: string;
  utcOffset: string;
  offsetMinutes: number;
}

interface ITimezonePanel {
  tzRange: TzRange;
}

const TimezonePanel: FC<ITimezonePanel> = ({ tzRange }) => {
  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneData | null>(tzRange.timezone);
  const [filteredTimezones, setFilteredTimezones] = useState<ITimezoneDataInternal[]>([]);
  const [searchText, setSearchText] = useState("");

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

  const handleTimezoneMouseClick = (selectedTimezone: TimezoneData) => {
    setSelectedTimezone(selectedTimezone);
  };

  const handleApply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !selectedTimezone?.name ||
      !tzRange.timezone.name ||
      !tzRange.startDate ||
      !tzRange.startTime ||
      !tzRange.endDate ||
      !tzRange.endTime
    )
      return;

    const startUtcIso = toUtcIso(tzRange.startDate, tzRange.startTime, tzRange.timezone.name);
    const endUtcIso = toUtcIso(tzRange.endDate, tzRange.endTime, tzRange.timezone.name);

    const tzStartDate = renderIn(startUtcIso, selectedTimezone.name);
    const tzEndDate = renderIn(endUtcIso, selectedTimezone.name);

    tzRange.onApply({
      startDate: tzStartDate.date,
      startTime: tzStartDate.time,
      endDate: tzEndDate.date,
      endTime: tzEndDate.time,
      timezone: selectedTimezone || {
        name: null,
        longName: null,
        utcOffset: null,
      },
    });
  };

  const getCurrentTimeInTz = (tzName: string | null) => {
    if (!tzName) return "";
    return dayjs().tz(tzName).format("h:mm A");
  };

  return (
    <form className={commonStyled["form-container"]} onSubmit={handleApply}>
      <Flex direction="column" style={{ height: "calc(100% - 40px)" }}>
        <Box style={{ width: "95%" }} mx="auto">
          <TimezoneSearch searchText={searchText} setSearchText={setSearchText} />
        </Box>
        <Box style={{ overflowY: "scroll" }}>
          <Text fw={600} px={12}>
            My Location
          </Text>
          <Flex direction="column">
            <TimezoneList
              isBrowserTimezone
              name={tzRange.timezone?.name}
              longName={tzRange.timezone?.longName}
              currentTime={getCurrentTimeInTz(tzRange.timezone?.name)}
              utcOffset={tzRange.timezone?.utcOffset}
              selectedTimezone={selectedTimezone}
            />
          </Flex>
          <Text fw={600} px={12}>
            Locations
          </Text>
          <Flex direction={"column"} className={styled["list-container"]}>
            {filteredTimezones.map((tz, idx) => (
              <TimezoneList
                key={idx}
                name={tz.name}
                longName={tz.longName}
                currentTime={tz.currentTime}
                utcOffset={tz.utcOffset}
                selectedTimezone={selectedTimezone}
                handleTimezoneMouseClick={handleTimezoneMouseClick}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Box px={12}>
        <Footer />
      </Box>
    </form>
  );
};

export { TimezonePanel };
