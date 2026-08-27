import { Temporal } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getTimeOptions } from "./timeOptions";

beforeEach(() => {
  vi.spyOn(Temporal.Now, "instant").mockReturnValue(
    Temporal.Instant.from("2024-03-10T12:00:00.500Z")
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Temporal quick ranges", () => {
  it("creates calendar-day boundaries across a DST transition", () => {
    const options = getTimeOptions("America/New_York");

    expect(options.find(({ label }) => label === "Today")).toMatchObject({
      startTime: "2024-03-10T00:00:00",
      endTime: "2024-03-11T00:00:00",
    });
    expect(options.find(({ label }) => label === "Tomorrow")).toMatchObject({
      startTime: "2024-03-11T00:00:00",
      endTime: "2024-03-12T00:00:00",
    });
    expect(options.find(({ label }) => label === "Yesterday")).toMatchObject({
      startTime: "2024-03-09T00:00:00",
      endTime: "2024-03-10T00:00:00",
    });
  });

  it("creates elapsed-time ranges from one consistent current instant", () => {
    const options = getTimeOptions("America/New_York");

    expect(options.find(({ label }) => label === "Last 15 seconds")).toMatchObject({
      searchKey: "-15s",
      startTime: "2024-03-10T07:59:45",
      endTime: "2024-03-10T08:00:00",
    });
    expect(options.find(({ label }) => label === "Next 1 hour")).toMatchObject({
      searchKey: "+1h",
      startTime: "2024-03-10T08:00:00",
      endTime: "2024-03-10T09:00:00",
    });
  });

  it("builds whole-day Last and Next ranges with optional inclusion of today", () => {
    const options = getTimeOptions("America/New_York");
    const optionsWithToday = getTimeOptions("America/New_York", {
      includeTodayInQuickRanges: true,
    });

    expect(options.find(({ label }) => label === "Last 2 days")).toMatchObject({
      startTime: "2024-03-08T00:00:00",
      endTime: "2024-03-10T00:00:00",
    });
    expect(options.find(({ label }) => label === "Next 2 days")).toMatchObject({
      startTime: "2024-03-11T00:00:00",
      endTime: "2024-03-13T00:00:00",
    });
    expect(optionsWithToday.find(({ label }) => label === "Last 2 days")).toMatchObject({
      startTime: "2024-03-08T00:00:00",
      endTime: "2024-03-11T00:00:00",
    });
    expect(optionsWithToday.find(({ label }) => label === "Next 2 days")).toMatchObject({
      startTime: "2024-03-10T00:00:00",
      endTime: "2024-03-13T00:00:00",
    });
  });

  it("filters quick ranges to past or future options", () => {
    const pastOptions = getTimeOptions("UTC", { allowedTimeRange: "past" });
    const futureOptions = getTimeOptions("UTC", { allowedTimeRange: "future" });

    expect(pastOptions.some(({ label }) => label.startsWith("Next") || label === "Tomorrow")).toBe(false);
    expect(pastOptions.some(({ label }) => label.startsWith("Last") || label === "Yesterday")).toBe(true);
    expect(futureOptions.some(({ label }) => label.startsWith("Last") || label === "Yesterday")).toBe(false);
    expect(futureOptions.some(({ label }) => label === "Next 1 day")).toBe(true);
    expect(pastOptions.some(({ label }) => label === "Today")).toBe(false);
    expect(futureOptions.some(({ label }) => label === "Today")).toBe(false);
  });

  it("filters disabled units and preserves section line breaks", () => {
    const options = getTimeOptions("UTC", {
      disableSeconds: true,
      disableHours: true,
    });

    expect(options.some(({ unit }) => unit === "seconds" || unit === "hours")).toBe(false);
    expect(options.some(({ unit }) => unit === "minutes")).toBe(true);
    expect(options.some(({ unit }) => unit === "days")).toBe(true);

    const lastMinute = options.filter(({ unit }) => unit === "minutes").at(-1);
    expect(lastMinute?.lineBreak).toBe(true);
    expect(options.at(-1)?.lineBreak).toBe(false);
  });
});
