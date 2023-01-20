<template>
  <v-chart class="chart" :option="option" autoresize :key="activeBar" />
</template>

<script setup>
import VChart from "vue-echarts";
import { ref, toRef, watch } from "vue";
import { useSummaryChartStore } from "@/store/income-pages/useSummaryChartStore";

const props = defineProps({
  globalChart: {
    type: Object,
    default: () => {},
  },
  activeBar: { type: Boolean, default: false },
});

const activeBar = toRef(props, "activeBar");
const globalChart = toRef(props, "globalChart");

const categories2 = ref(globalChart.value);

const { sortedSummaryChartData } = useSummaryChartStore();

const pieChartConfig = {
  title: {
    text: "Загальний прибуток",
    textStyle: {
      height: 100,
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "8%",
    left: "center",
  },
  dataset: {
    source: {
      product: sortedSummaryChartData(categories2.value),
      count: sortedSummaryChartData(categories2.value, false),
    },
  },
  series: [
    {
      name: "Pie",
      type: "pie",
      top: 50,
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
      encode: {
        itemName: "product",
        value: "count",
      },
    },
  ],
};
const barChartConfig = {
  title: {
    text: "Загальний прибуток",
  },
  tooltip: {
    trigger: "item",
  },
  dataset: {
    source: {
      product: sortedSummaryChartData(categories2.value),
      count: sortedSummaryChartData(categories2.value, false),
    },
  },
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 30 },
  },
  yAxis: {},
  series: [
    {
      name: "Bar",
      type: "bar",
    },
  ],
};
const option = ref(pieChartConfig);

watch(
  () => activeBar.value,
  () => {
    activeBar.value
      ? (option.value = barChartConfig)
      : (option.value = pieChartConfig);
  }
);
</script>

<style scoped>
.chart {
  border: 1px solid gray;
  border-radius: 20px;
  padding: 10px;
  box-shadow: aliceblue;
  box-shadow: -2px -2px 9px -3px rgb(0 0 0 / 63%);
}
</style>
