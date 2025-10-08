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
      placeholder="Timezone search (Asia, Tokyo, +09:00, etc)"
      leftSection={<IconFilter2 stroke={2} />}
      value={searchText}
      onChange={(e) => setSearchText(e.currentTarget.value)}
    />
  );
};
