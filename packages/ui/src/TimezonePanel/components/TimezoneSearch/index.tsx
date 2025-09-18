import { Input } from "@mantine/core";
import { IconFilter2 } from "@tabler/icons-react";
import { Dispatch, FC, SetStateAction } from "react";

interface ITimezoneSearch {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export const TimezoneSearch: FC<ITimezoneSearch> = ({ searchText, setSearchText }) => {
  return (
    <Input
      placeholder="Search by city or country"
      leftSection={<IconFilter2 stroke={2} color="#313B49" />}
      value={searchText}
      onChange={(e) => setSearchText(e.currentTarget.value)}
    />
  );
};
