<template>
  <v-chart
    class="chart p-[20px]"
    :option="option"
    :class="{ '!p-0': activeBar }"
    autoresize
    :key="activeBar"
  />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref, toRef, watch } from "vue";
import dayjs from "dayjs";
import { useMonthsChartStore } from "@/store/income-pages/useMonthsChartStore";

const props = defineProps({
  chart: { type: Array, default: () => [] },
  activeBar: { type: Boolean, default: false },
});

const activeBar = toRef(props, "activeBar");
const titleText = dayjs(props.chart[0].day.split(".")[1]).format("MMMM");
const chart = toRef(props, "chart");

const { getNameForSource, getValueForSource } = useMonthsChartStore();

const pieConfigChart = {
  title: {
    text: titleText,
  },
  dataset: {
    source: {
      product: getNameForSource(chart.value),
      count: getValueForSource(chart.value),
    },
  },
  tooltip: {
    trigger: "item",
    top: "8%",
  },
  legend: {
    top: "10%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      top: 90,
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      series: [
        {
          name: titleText,
          type: "pie",
        },
      ],
    },
  ],
};
console.log(titleText);
const barConfigChart = {
  title: {
    text: titleText,
    padding: [
      20, // up
      0, // right
      20, // down
      20, // left
    ],
  },
  dataset: {
    source: {
      product: getNameForSource(chart.value),
      count: getValueForSource(chart.value),
    },
  },
  grid: {
    show: true,
    left: "20%",
    borderWidth: 0,
    bottom: 55,
  },
  tooltip: {
    trigger: "item",
  },
  xAxis: {
    type: "category",
    axisLabel: {
      interval: 0,
      rotate: 20,
    },
  },
  yAxis: {},
  series: [
    {
      name: titleText,
      type: "bar",
    },
  ],
};

const option = ref(pieConfigChart);

watch(
  () => activeBar.value,
  () => {
    activeBar.value
      ? (option.value = barConfigChart)
      : (option.value = pieConfigChart);
  }
);
</script>

<style scoped>
.chart {
  border: 1px solid gray;
  border-radius: 20px;
  box-shadow: -2px -2px 9px -3px rgb(0 0 0 / 63%);
}
</style>
