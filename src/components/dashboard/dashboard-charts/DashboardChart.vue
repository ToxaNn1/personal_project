<template>
  <v-chart class="w-full h-full pt-10" autoresize :option="option" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { december } from "@/constans/december";
import { addSummaryOfDay } from "@/helpers/echartAll";

onMounted(() => {
  addSummaryOfDay([december]);
});
const option = ref();
const colors = ["#5470C6", "#EE6666"];

const decemberIncome = 43950;

const test = (sum, piece) => {
  const arr = [];
  for (let i = 0; i <= piece; i++) {
    arr.push(sum / piece);
  }
  return arr;
};

onMounted(() => {
  option.value = {
    title: {
      text: "December ",
    },
    color: colors,
    xAxis: [
      {
        type: "category",
        data: Object.keys(december),
        axisLabel: { interval: 0, rotate: 30 },
      },
      {
        type: "category",
      },
    ],
    yAxis: {
      type: "value",
    },
    tooltip: {
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#283b56",
        },
      },
    },
    legend: {},
    series: [
      {
        showSymbol: false,
        data: Object.keys(december).map((item) => december[item].sumOfCategory),
        type: "line",
        areaStyle: {},
      },
      {
        showSymbol: false,
        data: test(decemberIncome, 10),
        type: "line",
        areaStyle: {},
      },
    ],
  };
});
</script>

<style scoped></style>
