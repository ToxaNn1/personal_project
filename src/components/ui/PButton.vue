<template>
  <el-button :type="type" v-bind="attrs">{{ text }}</el-button>
</template>

<script setup>
import { useSlots } from "vue";

defineProps({
  text: { type: String, default: "" },
  type: { type: String, default: "primary" },
});
const attrs = useSlots();
</script>

<style scoped></style>
