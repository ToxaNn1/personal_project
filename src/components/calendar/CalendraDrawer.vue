<template>
  <div>
    <el-drawer v-model="openCalendarDrawer" direction="rtl" size="50%">
      {{ dayjs(defaultMonth).format("D MMMM YYYY") }}
      <el-table border stripe :data="tableData" height="300" class="w-[600px]">
        <el-table-column
          prop="category"
          sortable
          label="Category"
          width="120"
        />
        <el-table-column
          prop="description"
          sortable
          label="Description"
          width="220"
        />
        <el-table-column prop="card" sortable label="Pay type" width="120" />
        <el-table-column prop="summary" sortable label="Summary" width="120" />
        <template #empty>
          <el-empty description="No data" />
        </template>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import { december } from "@/constans/december";

const props = defineProps({
  defaultMonth: { type: Date, default: () => new Date("2022,12,1") },
});
const openCalendarDrawer = ref(false);
defineExpose({ openCalendarDrawer });

const tableData = ref([]);

const modifyArray = (month) => {
  const keys = Object.keys(month);
  keys.map((el) => {
    month[el].map((item, index) => {
      if (item.day === dayjs(props.defaultMonth).format("DD.MM")) {
        Object.values(item).map((element) => {
          console.log(element);
        });
        if (typeof item[index] === "number") return 0;
      }
    });
  });
};
onMounted(() => {
  modifyArray(december);
});
</script>

<style scoped></style>
