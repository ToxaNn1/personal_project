<template>
  <div class="centered-item-btw">
    <div>
      <span class="text-[18px]">From: </span>
      <el-date-picker
        v-model="value"
        type="date"
        @change="setStartDate"
        placeholder="Pick start date"
      />
    </div>
    <div>
      <span class="text-[18px] text-head-status-text-green">To: </span>
      <el-date-picker
        v-model="value1"
        type="date"
        @change="setEndDate"
        placeholder="Pick end date"
      />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";
import dayjs from "dayjs";

const emits = defineEmits(["setEndDate", "setStartDate"]);

const value = ref("");
const value1 = ref("");

const setEndDate = (e) => {
  emits("setEndDate", dayjs(e).unix());
};

const setStartDate = (e) => {
  emits("setStartDate", dayjs(e).unix());
};
</script>

<style scoped></style>
