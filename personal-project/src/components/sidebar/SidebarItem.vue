<template>
  <div @mouseover="mouseOnElement = true" @mouseleave="mouseOnElement = false">
    <el-menu-item :index="index" :route="link" class="flex gap-[1rem]">
      <el-icon>
        <p-icon size="xl" :mouseOnElement="mouseOnElement" :icon="icon" />
      </el-icon>
      <template #title>
        <span class="text-[22px] font-semibold">{{ title }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

defineProps({
  index: { type: String, default: "1" },
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
  link: { type: String, default: "" },
});
const mouseOnElement = ref(false);
</script>

<style scoped></style>
