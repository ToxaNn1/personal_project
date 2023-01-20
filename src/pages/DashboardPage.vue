<template>
  <div class="flex">
    <div class="flex flex-col">
      <div class="centered-item-btw">
        <PSelect v-model="selectValue" :options="options" />
        <div class="flex gap-[20px]">
          <PButton round size="large" :text="'Week'" />
          <PButton round size="large" :text="'Month'" />
          <PButton round size="large" :text="'Full time'" />
        </div>
      </div>
      <div class="flex justify-between w-full">
        <DashboardChart2 :month1="selectValue" class="h-[600px] w-[700px]" />
        <DashboardPie :month1="selectValue" class="h-[350px] w-[450px]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardChart2 from "@/components/dashboard/dashboard-charts/DashboardChart2.vue";
import { ref, watch } from "vue";
import { NAME_MONTHS } from "@/constans/months";
import DashboardPie from "@/components/dashboard/dashboard-charts/DashboardPie.vue";

const options = ref([
  { value: NAME_MONTHS.SEPTEMBER, label: NAME_MONTHS.SEPTEMBER },
  { value: NAME_MONTHS.OCTOBER, label: NAME_MONTHS.OCTOBER },
  { value: NAME_MONTHS.NOVEMBER, label: NAME_MONTHS.NOVEMBER },
  { value: NAME_MONTHS.DECEMBER, label: NAME_MONTHS.DECEMBER },
]);
const selectValue = ref("December");
watch(
  () => selectValue.value,
  () => {
    console.log(selectValue.value);
  }
);
</script>

<style scoped></style>
