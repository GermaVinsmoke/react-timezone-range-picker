import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { TimezoneRangePicker } from ".";

const renderPicker = (
  onApply = vi.fn(),
  props: Partial<ComponentProps<typeof TimezoneRangePicker>> = {}
) =>
  render(
    <MantineProvider>
      <TimezoneRangePicker
        startDate="2024/01/01"
        startTime="09:00:00"
        endDate="2024/01/02"
        endTime="10:00:00"
        timezone={{ name: "UTC", longName: "Coordinated Universal Time", utcOffset: "+00:00" }}
        onApply={onApply}
        {...props}
      />
    </MantineProvider>
  );

describe("TimezoneRangePicker modes", () => {
  it("opens with the dedicated date-only basic view", async () => {
    renderPicker();
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));

    expect(await screen.findByLabelText("Date range")).toBeInTheDocument();
    expect(screen.getByText("Quick options")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
    expect(screen.queryByText("Start and end times")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Apply" })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Quick range/i)).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).toHaveStyle({
      width: "260px",
      height: "auto",
    });
  });

  it("applies a basic quick option immediately with midnight times", async () => {
    const onApply = vi.fn();
    renderPicker(onApply);
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));
    fireEvent.click(await screen.findByText("Today"));

    expect(onApply).toHaveBeenCalledOnce();
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({
        startTime: "00:00:00",
        endTime: "00:00:00",
      })
    );
  });

  it("switches between the basic and advanced views", async () => {
    renderPicker();
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));
    fireEvent.click(await screen.findByText("Advanced"));

    expect((await screen.findAllByText("Start and end times")).length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Start time")).toBeInTheDocument();
    expect(screen.getByLabelText("End time")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply", hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Basic", hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).toHaveStyle({
      width: "700px",
      height: "400px",
    });

    fireEvent.click(screen.getByRole("button", { name: "Basic", hidden: true }));

    expect(await screen.findByLabelText("Date range")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Apply" })).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).toHaveStyle({
      width: "260px",
      height: "auto",
    });
  });
});

describe("TimezoneRangePicker maximum range", () => {
  it("hides basic quick options longer than the maximum range", async () => {
    renderPicker(vi.fn(), { options: { maxRange: { days: 14 } } });
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));

    expect(await screen.findByText("Last 14 days")).toBeInTheDocument();
    expect(screen.queryByText("Last 30 days")).not.toBeInTheDocument();
  });

  it("rejects a manual range longer than the maximum", async () => {
    const onApply = vi.fn();
    renderPicker(onApply, {
      endDate: "2024/03/01",
      options: { maxRange: { months: 1 } },
    });
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));
    fireEvent.click(await screen.findByText("Advanced"));

    expect(await screen.findByText("At most 1 month after the start")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Apply", hidden: true }));

    expect((await screen.findAllByText("Range must not exceed 1 month")).length).toBeGreaterThan(0);
    expect(onApply).not.toHaveBeenCalled();
  });

  it("applies a manual range within the maximum", async () => {
    const onApply = vi.fn();
    // Exactly one month: 2024/01/01 09:00 → 2024/02/01 09:00.
    renderPicker(onApply, {
      endDate: "2024/02/01",
      endTime: "09:00:00",
      options: { maxRange: { months: 1 } },
    });
    fireEvent.click(screen.getByRole("button", { name: /2024\/01\/01/ }));
    fireEvent.click(await screen.findByText("Advanced"));
    fireEvent.click(await screen.findByRole("button", { name: "Apply", hidden: true }));

    await vi.waitFor(() => expect(onApply).toHaveBeenCalledOnce());
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ startDate: "2024/01/01", endDate: "2024/02/01" })
    );
  });
});
