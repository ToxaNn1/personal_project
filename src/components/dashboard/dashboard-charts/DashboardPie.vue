<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import VChart from "vue-echarts";
import { computed, toRef } from "vue";
import { useDashboardChartConfigStore } from "@/store/useDashboardChartConfigStore";
import { december, decemberIncome } from "@/constans/december";
import { incomeSummary } from "@/helpers/echartAll";
import { september, septemberIncome } from "@/constans/september";
import { october, octoberIncome } from "@/constans/october";
import { november, novemberIncome } from "@/constans/november";

// provide(THEME_KEY, "dark");

const props = defineProps({
  month1: { type: String, default: "December" },
});

const month1 = toRef(props, "month1");
// переписати
const month = computed(() => {
  let income;
  let spending;
  switch (month1.value) {
    case "December":
      income = decemberIncome;
      spending = december;
      break;
    case "September":
      income = septemberIncome;
      spending = september;
      break;
    case "October":
      income = octoberIncome;
      spending = october;
      break;
    case "November":
      income = novemberIncome;
      spending = november;
      break;
  }
  return { income, spending };
});

const { getSumSpendingOfAllMonth } = useDashboardChartConfigStore();
const { spendingForAllMonth } = getSumSpendingOfAllMonth(month.value.spending);

const option = computed(() => {
  return {
    title: {
      text: "Income/Spending",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Income", "Spending"],
    },
    series: [
      {
        name: "Income/Spending",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: incomeSummary(month.value.income), name: "Income" },
          { value: spendingForAllMonth, name: "Spending" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
