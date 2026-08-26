import { Temporal } from "@js-temporal/polyfill";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getTimeOptions } from "./timeOptions";

beforeEach(() => {
  vi.spyOn(Temporal.Now, "instant").mockReturnValue(
    Temporal.Instant.from("2024-03-10T12:00:00Z")
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
      endTime: "2024-03-10T23:59:59",
    });
    expect(options.find(({ label }) => label === "Tomorrow")).toMatchObject({
      startTime: "2024-03-11T00:00:00",
      endTime: "2024-03-11T23:59:59",
    });
    expect(options.find(({ label }) => label === "Yesterday")).toMatchObject({
      startTime: "2024-03-09T00:00:00",
      endTime: "2024-03-09T23:59:59",
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
