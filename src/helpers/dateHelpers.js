import dayjs from "dayjs";

export function getAllDaysInMonth(
  month = dayjs().month(),
  format = "DD",
  year = 2023
) {
  const date = new Date(year, month, 1);
  const dates = [];

  while (date.getMonth() === month) {
    dates.push(dayjs(date).format(format));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
