import dayjs from "dayjs";

export const getCurrentTime = () => dayjs().format("HH:mm:ss");

export const getCurrentDate = () => dayjs().format("YYYY-MM-DD");

export const getCurrentPlusDate = (amount: number) =>
  dayjs().add(amount, "day").format("YYYY-MM-DD");
