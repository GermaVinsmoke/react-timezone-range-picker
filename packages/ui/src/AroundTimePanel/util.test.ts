import { describe, expect, it } from "vitest";
import { getAllowedTimeOptions, TIME_OPTIONS, TimeOption } from "./util";

describe("Around-a-time durations", () => {
  it("offers every duration without a maximum range", () => {
    expect(getAllowedTimeOptions()).toEqual(TIME_OPTIONS);
  });

  it("drops durations whose whole window exceeds the maximum range", () => {
    // ± 1 day spans two days; ± 1 hour spans two hours.
    expect(getAllowedTimeOptions({ days: 1 })).not.toContain(TimeOption.OneDay);
    expect(getAllowedTimeOptions({ days: 1 })).toContain(TimeOption.OneHour);
    expect(getAllowedTimeOptions({ days: 2 })).toContain(TimeOption.OneDay);
    expect(getAllowedTimeOptions({ hours: 1 })).not.toContain(TimeOption.OneHour);
  });
});
