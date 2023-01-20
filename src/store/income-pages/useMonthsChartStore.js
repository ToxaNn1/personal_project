import { defineStore } from "pinia";

export const useMonthsChartStore = defineStore("useMonthsChartStore", () => {
  const sortedData = (chart = []) => {
    return chart.sort((a, b) => b.value - a.value);
  };

  const getNameForSource = (chart) => {
    return sortedData(chart).map((el) => {
      return el.name;
    });
  };

  const getValueForSource = (chart) => {
    return sortedData(chart).map((el) => {
      return el.value;
    });
  };
  return { getNameForSource, getValueForSource };
});
