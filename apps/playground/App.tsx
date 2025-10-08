import {
  TimezoneRangePicker,
  TimezonePanel,
} from "@react-timezone-range-picker/ui";
import { Button, useMantineColorScheme, useMantineTheme } from "@mantine/core";

function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggle = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <div>
      <TimezoneRangePicker />
      {/* <TimezonePanel /> */}
      <Button onClick={toggle}>Toggle Theme</Button>
    </div>
  );
}

export default App;
