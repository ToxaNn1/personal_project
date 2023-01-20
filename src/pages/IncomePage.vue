<template>
  <PButton
    class="mb-[30px]"
    @click="activeBar = !activeBar"
    :text="'Change to bar'"
  />
  <div class="flex flex-wrap gap-[35px]">
    <IncomeSummaryPieChart
      class="w-[575px] h-[500px]"
      :globalChart="getAllSummaryIncomeData(charts)"
      :activeBar="activeBar"
    />
    <IncomePieCharts :activeBar="activeBar" :charts="charts" />
  </div>
</template>

<script setup>
import IncomePieCharts from "@/components/income/IncomePieCharts.vue";
import IncomeSummaryPieChart from "@/components/income/IncomeSummaryPieChart.vue";
import { decemberIncome } from "@/constans/december";
import { novemberIncome } from "@/constans/november";
import { octoberIncome } from "@/constans/october";
import { septemberIncome } from "@/constans/september";
import { ref } from "vue";
import { useSummaryChartStore } from "@/store/income-pages/useSummaryChartStore";

const { getAllSummaryIncomeData } = useSummaryChartStore();
const activeBar = ref(false);

const charts = [
  decemberIncome,
  novemberIncome,
  octoberIncome,
  septemberIncome,
  septemberIncome,
  septemberIncome,
];
</script>

<style scoped></style>
