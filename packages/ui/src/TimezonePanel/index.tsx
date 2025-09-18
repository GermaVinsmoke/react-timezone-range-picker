import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { useDebounce } from "react-use";
import { TimezoneList } from "./components/TimezoneList";
import { TimezoneSearch } from "./components/TimezoneSearch";
import { getTimezones } from "./util/getTimezones";

// TODO - Should pass timezone value from playground app as our selection value

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

  useEffect(() => {
    setFilteredTimezones(getTimezones());
  }, []);

  useDebounce(
    () => {
      if (searchText === "") {
        setFilteredTimezones(getTimezones());
        return;
      }

      setFilteredTimezones(
        filteredTimezones.filter((timezone) =>
          timezone.name.toLowerCase().includes(searchText.toLocaleLowerCase())
        )
      );
    },
    250,
    [searchText]
  );

  return (
    <Flex direction="column">
      <TimezoneSearch searchText={searchText} setSearchText={setSearchText} />
      <Flex direction={"column"}>
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
    </Flex>
  );
};

export { TimezonePanel };
