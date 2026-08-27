import { Temporal } from "@js-temporal/polyfill";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatShortDate,
  formatTwelveHourTime,
  getAllowedDateBounds,
  getCurrentDate,
  getCurrentTime,
  getFutureDateTime,
  getPastDateTime,
  getShortTimezoneName,
  parseDate,
  parseDateTime,
  toTz,
  toUtcIso,
  validateAllowedDateTime,
} from "./dateTime";
import type { TzRange } from "../interfaces";

const rangeFor = (timezone: string): TzRange => ({
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  timezone: { name: timezone, longName: timezone, utcOffset: null },
  onApply: vi.fn(),
});

const setNow = (instant: string) =>
  vi.spyOn(Temporal.Now, "instant").mockReturnValue(Temporal.Instant.from(instant));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Temporal date parsing and formatting", () => {
  it("parses picker dates and date-times", () => {
    expect(parseDate("2024/02/29").toString()).toBe("2024-02-29");
    expect(parseDateTime("2024/02/29", "23:45:12").toString()).toBe(
      "2024-02-29T23:45:12"
    );
  });

  it("formats short dates and twelve-hour times", () => {
    expect(formatShortDate(Temporal.PlainDate.from("2024-07-04"))).toBe("Jul 4");
    expect(
      formatTwelveHourTime(
        Temporal.Instant.from("2024-07-04T00:05:00Z").toZonedDateTimeISO("UTC")
      )
    ).toBe("12:05 AM");
    expect(
      formatTwelveHourTime(
        Temporal.Instant.from("2024-07-04T13:07:00Z").toZonedDateTimeISO("UTC")
      )
    ).toBe("1:07 PM");
  });
});

describe("Temporal arithmetic", () => {
  it("handles leap-day and year-boundary arithmetic", () => {
    expect(getFutureDateTime("2024/02/28", "23:59:30", 1, "day")).toEqual({
      date: "2024/02/29",
      time: "23:59:30",
    });
    expect(getPastDateTime("2025/01/01", "00:00:15", 30, "second")).toEqual({
      date: "2024/12/31",
      time: "23:59:45",
    });
  });

  it("carries additions across midnight", () => {
    expect(getFutureDateTime("2024/06/01", "23:30:00", 2, "hour")).toEqual({
      date: "2024/06/02",
      time: "01:30:00",
    });
  });
});

describe("Temporal timezone conversion", () => {
  it("converts local picker values to UTC and into another timezone", () => {
    const utc = toUtcIso("2024/01/15", "12:00:00", "America/New_York");

    expect(utc).toBe("2024-01-15T17:00:00Z");
    expect(toTz(utc, "Asia/Tokyo")).toEqual({
      date: "2024/01/16",
      time: "02:00:00",
    });
  });

  it("uses Temporal compatible disambiguation for a skipped DST time", () => {
    expect(toUtcIso("2024/03/10", "02:30:00", "America/New_York")).toBe(
      "2024-03-10T07:30:00Z"
    );
  });

  it("returns the correct seasonal UTC offset", () => {
    setNow("2024-01-15T12:00:00Z");
    expect(getShortTimezoneName("America/New_York")).toBe("-05:00");

    vi.restoreAllMocks();
    setNow("2024-07-15T12:00:00Z");
    expect(getShortTimezoneName("America/New_York")).toBe("-04:00");
  });

  it("creates date bounds and validates past/future selections", () => {
    setNow("2024-01-15T12:00:00Z");

    expect(getAllowedDateBounds("UTC", "future")).toEqual({
      minDate: "2024-01-15",
      maxDate: undefined,
    });
    expect(getAllowedDateBounds("UTC", "past")).toEqual({
      minDate: undefined,
      maxDate: "2024-01-15",
    });
    expect(validateAllowedDateTime("2024/01/15", "11:59:59", "UTC", "future")).toBe(
      "Date and time must not be before now"
    );
    expect(validateAllowedDateTime("2024/01/15", "12:00:01", "UTC", "past")).toBe(
      "Date and time must not be after now"
    );
    expect(validateAllowedDateTime("2024/01/15", "12:00:01", "UTC", "future")).toBeNull();
  });

  it("gets the current date and time in the selected timezone", () => {
    setNow("2024-01-01T23:30:45Z");
    const range = rangeFor("Asia/Tokyo");

    expect(getCurrentDate(range)).toBe("2024/01/02");
    expect(getCurrentTime(range)).toBe("08:30:45");
  });
});
