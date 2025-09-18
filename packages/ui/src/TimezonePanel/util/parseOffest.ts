export const parseOffset = (offsetUtc: string) => {
  const sign = offsetUtc[0] === "-" ? -1 : 1;
  const [hours, minutes] = offsetUtc.slice(1).split(":").map(Number);
  return sign * (hours * 60 + minutes);
};
