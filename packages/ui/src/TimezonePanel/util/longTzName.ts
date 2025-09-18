export const longTzName = (timezone: string, locale = "en-US") => {
  return (
    new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      timeZoneName: "longGeneric",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value || ""
  );
};
