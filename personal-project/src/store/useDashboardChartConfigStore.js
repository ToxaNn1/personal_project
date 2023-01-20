import { defineStore } from "pinia";
import {
  addOmittedDays,
  addSummaryOfDay,
  sortAndDeleteDuplicateDays,
} from "@/helpers/echartAll";
import { ref } from "vue";

export const useDashboardChartConfigStore = defineStore(
  "useDashboardChartConfigStore",
  () => {
    const income = ref(42500);
    // return summary of spending for all months
    const spendingForAllTime = (months) => {
      let sum = 0;
      months.map((month) => {
        const { spendingForAllMonth } = getSumSpendingOfAllMonth(month);
        sum += spendingForAllMonth;
      });
      return { spendingForAllTime: sum };
    };
    //return  summary of spending for one month
    const getSumSpendingOfAllMonth = (month) => {
      let sum = 0;
      let card = 0;
      let cash = 0;
      const keys = Object.keys(month);
      keys.map((item) => {
        sum += month[item].sumOfCategory;
        month[item].map((el) => {
          if (el.card) {
            card += el.summaryOfDay;
          } else cash += el.summaryOfDay;
        });
      });
      return {
        card,
        cash,
        spendingForAllMonth: sum,
        monthName: getNameOfMonth(month),
      };
    };
    // return  spending for one good in one month
    const getSumOfOneGoods = (field, month) => {
      const keys = Object.keys(month);
      let countGoods = 0;
      let sumOfGoods = 0;
      keys.map((goods) => {
        month[goods].map((item) => {
          if (item[field]) {
            // countGoods++
            sumOfGoods += item.summaryOfDay;
          }
        });
      });
      return {
        countGoods,
        sumOfGoods,
        field,
        monthName: getNameOfMonth(month),
      };
    };

    // переписати
    const getNameOfMonth = (month) => {
      const keys = Object.keys(month);
      let monthName = "";
      keys.map((item) => {
        month[item].map((item) => {
          if (item.day) {
            switch (item.day.slice(-2)) {
              case "09":
                monthName = "september";
                break;
              case "10":
                monthName = "october";
                break;
              case "11":
                monthName = "november";
                break;
              case "12":
                monthName = "december";
                break;
            }
          }
        });
      });
      return monthName;
    };

    const getSumOfCategoryForDays = (
      category,
      days = ["01.11", "29.11"],
      month
    ) => {
      let sum = 0;
      month[category].map((item) => {
        if (item.day >= days[0] && item.day <= days[1]) {
          sum += item.summaryOfDay;
        }
      });
      return {
        days,
        sumOfCategoryForDays: sum,
        category,
        monthName: getNameOfMonth(month),
      };
    };

    // add ommited days for month data, add summary of each day in category, sort data for days
    const initDataForChart = (month, monthName) => {
      // change december to month
      Object.keys(month).map((el) => {
        addOmittedDays(el, month, monthName);
        month[el] = sortAndDeleteDuplicateDays(el, month);
      });
      addSummaryOfDay([month]);
    };
    // for line in chart dashboard
    const incomeData = (sum = income.value, piece) => {
      const arr = [];
      const summary = sum?.reduce((acc, current) => acc + current, 0);
      for (let i = 0; i <= piece; i++) {
        arr.push(Math.round(summary / piece));
      }
      return arr;
    };
    //income data in vies
    const incomeDataInit = (sum, piece) => {
      return {
        name: "Income",
        value: Math.round(sum / piece),
        label: {
          show: sum > 1 ? true : false,
          fontSize: 18,
        },
      };
    };

    return {
      spendingForAllTime,
      getSumOfOneGoods,
      getSumSpendingOfAllMonth,
      getNameOfMonth,
      getSumOfCategoryForDays,
      initDataForChart,
      incomeData,
      incomeDataInit,
      income,
    };
  }
);
