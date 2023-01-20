<template>
  <el-calendar v-model="defaultMonth">
    <!-- <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-month')">
          Previous Month
        </el-button>
      </el-button-group>
    </template> -->
    <template #date-cell="{ data }">
      <div
        ref="testRef"
        class="w-full h-full !cursor-pointer"
        @click="getDataFromCalendarCell(data)"
      >
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ dayjs(data.day).format("D - MMMM") }}
        </p>
        <v-chart :option="dataPie(data, monthData, monthIndex)" autoresize />
      </div>
    </template>
  </el-calendar>
  <CalendraDrawer ref="calendarComponent" :defaultMonth="defaultMonth" />
</template>

<script setup>
import { ref, watch, computed } from "vue";
import CalendraDrawer from "@/components/calendar/CalendraDrawer.vue";
import { december } from "@/constans/december";
import { november } from "@/constans/november";
import { october } from "@/constans/october";
import { september } from "@/constans/september";
import { january } from "@/constans/january";
import { useDashboardChartConfigStore } from "@/store/useDashboardChartConfigStore";
import { useCalendarPieStore } from "@/store/calendar/useCalendarPieStore";
import dayjs from "dayjs";
const { initDataForChart } = useDashboardChartConfigStore();

initDataForChart(december, 11);
const { generateCalendarPie } = useCalendarPieStore();

const calendarComponent = ref(null);
const defaultMonth = ref(new Date("2022,12,1"));
console.log(2);

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

const monthData = computed(() => {
  let result;
  switch (dayjs(defaultMonth.value).format("MMMM")) {
    case "January":
      result = january;
      break;
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

const monthIndex = computed(() =>
  monthArray.findIndex((el) => el === dayjs(defaultMonth.value).format("MMMM"))
);

const dataPie = (data, month, monthIndex) => {
  return {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: data.day,
        type: "pie",
        radius: "80%",
        data: generateCalendarPie(data, month, monthIndex),
        label: {
          show: false,
        },
      },
    ],
  };
};

const dataFromCalendarCell = ref();
const getDataFromCalendarCell = (data) => {
  calendarComponent.value.openCalendarDrawer = true;
  console.log(data);
  dataFromCalendarCell.value = data;
};

const testRef = ref();
const prevMonth = (date) => {
  console.log(date);
  testRef.value.click({
    type: "prev-month",
    isSelected: false,
    day: dayjs().subtract(1, "month").format("YYYY-MM-D"),
    date: dayjs().subtract(1, "month"),
    test: 2,
  });
};

watch(
  () => monthData.value,
  () => {
    initDataForChart(monthData.value, monthIndex.value);
    dataPie(dataFromCalendarCell.value, monthData.value, monthIndex.value);
  }
);
</script>

<style lang="scss">
.is-selected {
  color: #1989fa;
}
.el-calendar-table .el-calendar-day {
  height: 200px !important;
}
</style>
