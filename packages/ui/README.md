# 🕓 React Timezone Range Picker

**Flexible, Mantine-powered UI components for building timezone-aware date and time range pickers.**

[![npm version](https://img.shields.io/npm/v/react-timezone-range-picker?color=blue&label=npm)](https://www.npmjs.com/package/react-timezone-range-picker)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-19.2%2B-61dafb?logo=react)](https://react.dev)

---

## ✨ Features

- 📅 **Basic picker by default** with a date-only range field and scrollable day quick ranges
- 🛠️ **Advanced mode** with separate start/end date and time fields, relative ranges, around-time selection, and timezone changes
- 🌍 **Timezone-aware** display and conversion via the Temporal API with an old-browser polyfill
- 🎨 **Mantine 9** components for accessibility and theming
- ⚡️ **TypeScript** support with generated definitions
- 🪶 **Lightweight** build via `vite`, tree-shakeable ESM + CJS outputs

---

## Picker modes

### Basic mode

The picker opens in basic mode on every mount. It provides a compact date-only range field and day-based quick options. Date and quick-option selections are applied immediately without an Apply button, and both returned times are set to `00:00:00`.

Select **Advanced** to switch modes for the lifetime of the mounted component. Reloading the page or remounting the picker resets it to basic mode.

### Advanced mode

Advanced mode provides the full picker with separate start/end date and time fields, relative time options, around-time selection, and timezone selection. Changes to its form-based panels are submitted with the Apply button.

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

- `react` (>=19.2.0)
- `react-dom` (>=19.2.0)
- `@mantine/core` (>=9.5.2)
- `@mantine/dates` (>=9.5.2)
- `@mantine/form` (>=9.5.2)
- `@mantine/hooks` (>=9.5.2)

---

## Usage

```tsx
import { useState } from "react";
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
  startDate: "2025/06/10",
  startTime: "09:00:00",
  endDate: "2025/06/11",
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
