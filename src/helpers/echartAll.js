import { december } from "@/constans/december";
import { getAllDaysInMonth } from "@/helpers/dateHelpers";

export const addSummaryOfDay = (months) => {
  months.map((month) => {
    const keys = Object.keys(month);
    keys.map((item) => {
      month[item].map((elItem) => {
        let values = Object.values(elItem);
        values.reduce((acum, current) => {
          if (typeof current === "number") {
            if (current === 0) {
              return 0;
            }
            return acum + current;
          } else if (typeof current === "object") {
            return acum + current.price;
          }
          elItem.summaryOfDay = acum;
          return acum;
        }, 0);
      });
    });
    keys.map((category) => {
      month[category].sumOfCategory = 0;
      month[category].map((item) => {
        month[category].sumOfCategory += item.summaryOfDay;
      });
    });
  });
};

export const incomeSummary = (month) => {
  let sum = 0;
  month.forEach((current) => {
    sum += current.value;
  }, 0);
  return sum;
};

//change december to month
export const addOmittedDays = (
  category = "food",
  month = december,
  monthName
) => {
  const allDaysInMonth = [...getAllDaysInMonth(monthName, "DD.MM")];
  allDaysInMonth.map((data, index) => {
    if (data !== month[category][index]) {
      month[category].push({ day: data });
    }
  });
};

export const sortAndDeleteDuplicateDays = (
  category = "food",
  month = december
) => {
  month[category].sort((a, b) => a.day - b.day);
  const resultArr = month[category].filter((value, index, self) => {
    return (
      index ===
      self.findIndex((t) => {
        return t.day === value.day;
      })
    );
  });
  return resultArr;
};

// add lines to chart
export const getAllLinesForChart = (month) => {
  const arr = [];
  Object.keys(month).map(() => {
    arr.push({
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      showSymbol: false,
      emphasis: { focus: "self" },
    });
  });
  return arr;
};

const getArrWithDataForDataSet = (category, month) => {
  const arr = [];
  month[category].map((el) => {
    arr.push(el.summaryOfDay);
  });
  return arr;
};

export const pullAllDataForDataSet = (month) => {
  return Object.keys(month).map((el) => {
    return [el, ...getArrWithDataForDataSet(el, month)];
  });
};
