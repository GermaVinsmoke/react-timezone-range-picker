export const longTzName = (timezone: string, locale = "en-US") => {
  return (
    new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      timeZoneName: "long",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value || ""
  );
};
