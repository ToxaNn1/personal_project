import { defineStore } from "pinia";
import { pullAllDataForDataSet } from "@/helpers/echartAll";
import dayjs from "dayjs";

export const useCalendarPieStore = defineStore("useCalendarPieStore", () => {
  const generateCalendarPie = ({ day }, month, monthIndex) => {
    // if (type !== "current-month") return;
    if (Number(dayjs(day).format("M")) === Number(monthIndex)) return undefined; //remove undefined for chart past month
    day = day.split("-").at(-1);
    day = day[0] === "0" ? day[1] : day; /// переписати
    const arr = pullAllDataForDataSet(month);
    const result = arr.map((el) => {
      if (el[day] > 0) {
        return {
          name: el[0],
          value: el[day],
        };
      } else return undefined;
    });
    // if all data in pie === 0 must return undefined, but not array of undefined
    if (result.every((el) => el === undefined)) return undefined;
    return result;
  };
  return { generateCalendarPie };
});
