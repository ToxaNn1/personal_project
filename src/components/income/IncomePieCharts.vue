<template>
  <div
    class="w-[300px] h-[450px]"
    v-for="(chart, index) in charts"
    :key="index"
  >
    <IncomePieChart :activeBar="activeBar" :chart="chart" />
  </div>
</template>

<script setup>
import IncomePieChart from "@/components/income/IncomePieChart.vue";

defineProps({
  charts: { type: Array, default: () => [] },
  activeBar: { type: Boolean, default: false },
});
</script>
