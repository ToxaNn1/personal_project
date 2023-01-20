<template>
  <v-chart @click="changePieView" autoresize :option="option" :key="month" />
</template>

<script setup>
import { computed, ref, toRef, watch } from "vue";
import { getAllDaysInMonth } from "@/helpers/dateHelpers";
import { useDashboardChartConfigStore } from "@/store/useDashboardChartConfigStore";
import {
  getAllLinesForChart,
  pullAllDataForDataSet,
} from "@/helpers/echartAll";
import { december } from "@/constans/december";
import { september } from "@/constans/september";
import { october } from "@/constans/october";
import { november } from "@/constans/november";

// provide(THEME_KEY, "dark");
const { initDataForChart, incomeData, incomeDataInit } =
  useDashboardChartConfigStore();
const props = defineProps({
  month1: { type: String, default: "December" },
});

const month1 = toRef(props, "month1");
// переписати
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = computed(() => {
  let result;
  switch (month1.value) {
    case "December":
      result = december;
      break;
    case "September":
      result = september;
      break;
    case "October":
      result = october;
      break;
    case "November":
      result = november;
      break;
  }
  return result;
});
// TODO: reneame to monthIndex
const monthName = monthArray.findIndex((el) => el === month1.value);
console.log(monthName);
initDataForChart(month.value, monthName);
// переписати
watch(
  () => month.value,
  () => {
    initDataForChart(month.value, monthName);
    option.value.title = { text: month1.value };
    option.value.dataset.source = [
      ["product", ...getAllDaysInMonth()],
      ["Income", ...incomeData([15500], getAllDaysInMonth(monthName).length)],
      ...pullAllDataForDataSet(month.value),
    ];
    option.value.series = [
      {
        type: "pie",
        id: "pie",
        radius: "33%",
        center: ["50%", "25%"],
        emphasis: {
          focus: "self",
        },
        label: {
          formatter: "{b}: {@1} ({d}%)",
        },
        data: [
          incomeDataInit(15500, getAllDaysInMonth().length),
          ...getInitPieLabels(),
        ],
      },
      ...getAllLinesForChart(month.value),
    ];
  }
);

//get first pie chart labels
const getInitPieLabels = () => {
  return pullAllDataForDataSet(month.value).map((el) => {
    return {
      value: el[1],
      name: el[0],
      label: {
        show: el[1] > 1 ? true : false,
        fontSize: 18,
      },
    };
  });
};

const test = (month) => {
  const arr = [];
  month.map((el) => {
    arr.push({
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      showSymbol: false,
      emphasis: { focus: "self" },
      data: el,
    });
  });
};
test(pullAllDataForDataSet(month.value));

const option = ref({
  title: {
    text: month1.value,
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 10,
    top: 20,
    bottom: 20,
    z: 0,
  },
  tooltip: {
    trigger: "axis",
    showContent: true,
  },
  dataset: {
    source: [
      ["product", ...getAllDaysInMonth()],
      ["Income", ...incomeData([15500], getAllDaysInMonth().length)],
      ...pullAllDataForDataSet(month.value),
    ],
  },
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 30 },
  },
  yAxis: { gridIndex: 0 },
  grid: { top: "45%", border: 0 },
  series: [
    {
      type: "pie",
      id: "pie",
      radius: "33%",
      center: ["50%", "25%"],
      colorBy: "data",
      emphasis: {
        focus: "self",
      },
      label: {
        formatter: `{b}: {@1} ({d}%)`,
      },
      data: [
        incomeDataInit(15500, getAllDaysInMonth().length),
        ...getInitPieLabels(),
      ],
    },
    ...getAllLinesForChart(month.value),
  ],
});

const getPieLabels = (data = []) => {
  const result = data.data.map((el, index) => {
    return {
      value: data.data[index + 1],
      name: data.dimensionNames[index + 1],
      label: {
        show: data.data[index + 1] > 1 ? true : false,
        fontSize: 18,
        z: 55,
      },
    };
  });
  return result;
};

const changePieView = (e) => {
  if (e.seriesType === "pie") return;
  option.value.series = [
    {
      id: "pie",
      label: {
        formatter: "{b}: {@[" + e.name + "]} ({d}%)",
      },
      data: getPieLabels(e),
    },
  ];
};
</script>
