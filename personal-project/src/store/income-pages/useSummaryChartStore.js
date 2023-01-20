import { defineStore } from "pinia";

export const useSummaryChartStore = defineStore("useSummaryChartStore", () => {
  const getAllSummaryIncomeData = (months) => {
    let arr = months.flat(); // get big massive array with all data from month income array
    let arrayWithAccumValues = [];
    // get arr with accumulate values for every category ( but there are duplicates )
    arr.map((el, index, array) => {
      if (el.name) {
        let sum = 0;
        array.map((item) => {
          if (el.name === item.name) {
            arrayWithAccumValues.push({
              name: el.name,
              value: (sum += item.value),
            });
          }
        });
      }
    });
    // delete  half duplicates (Why?)
    const resultArr = arrayWithAccumValues.filter((value, index, self) => {
      return (
        index ===
        self.findIndex((t) => {
          return t.value === value.value;
        })
      );
    });
    // return arr in view {Field:value} but with duplicates
    const mapped = resultArr.map((item) => {
      return { [item.name]: item.value };
    });
    //  Object.assign({}, ...mapped) remove all duplicates in view {Field:value}
    return Object.assign({}, ...mapped);
  };

  const sortedSummaryChartData = (arr, keys = true) => {
    if (keys) {
      return Object.keys(arr).sort((a, b) => {
        return arr[b] - arr[a];
      });
    } else {
      return Object.values(arr).sort((a, b) => {
        return b - a;
      });
    }
  };

  return { getAllSummaryIncomeData, sortedSummaryChartData };
});
