# 🕓 React Timezone Range Picker

**Flexible, Mantine-powered UI components for building timezone-aware date and time range pickers.**

[![npm version](https://img.shields.io/npm/v/react-timezone-range-picker?color=blue&label=npm)](https://www.npmjs.com/package/react-timezone-range-picker)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18%2B-61dafb?logo=react)](https://react.dev)

---

## ✨ Features

- 📅 **Start–End & Around-time panels** for absolute and relative time selection
- 🌍 **Timezone-aware** display and conversion (via `dayjs`)
- 🎨 **Mantine 8** components for accessibility and theming
- ⚡️ **TypeScript** support with generated definitions
- 🪶 **Lightweight** build via `vite`, tree-shakeable ESM + CJS outputs

---

## 📦 Installation

```bash
# npm
npm install react-timezone-range-picker

# yarn
yarn add react-timezone-range-picker

# pnpm
pnpm add react-timezone-range-picker
```

**Peer dependencies:**  
You must install these in your project:

- `react` (>=18)
- `react-dom` (>=18)
- `@mantine/core` (>=8.3.1)
- `@mantine/dates` (>=8.3.1)
- `@mantine/hooks` (>=8.3.1)

---

## Usage

```tsx
import {
  TimezoneRangePicker,
  type OnApplyParams,
  type TimezoneData,
} from "react-timezone-range-picker";
// Should import the css to make sure the application works
import "react-timezone-range-picker/style.css";

const DEFAULT_TIMEZONE = {
  name: "Asia/Tokyo",
  longName: "Japan Standard Time",
  utcOffset: "+09:00",
};

const DEFAULT_RANGE = {
  startDate: "2025-06-10",
  startTime: "09:00:00",
  endDate: "2025-06-11",
  endTime: "18:00:00",
  timezone: DEFAULT_TIMEZONE,
};

type TzRange = {
  startDate: string | null;
  startTime: string | null;

  endDate: string | null;
  endTime: string | null;

  timezone: TimezoneData;
};

function App() {
  const [range, setRange] = useState<TzRange>(DEFAULT_RANGE);

  const handleTimeRangeApply = ({
    startDate,
    startTime,
    endDate,
    endTime,
    timezone,
  }: OnApplyParams) => {
    setRange({ startDate, startTime, endDate, endTime, timezone });
  };

  return (
    <TimezoneRangePicker
      {...range}
      onApply={handleTimeRangeApply}
      buttonStyle={{ height: "50px", fontSize: "13px", fontWeight: 300 }}
    />
  );
}
```
