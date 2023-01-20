<template>
  <el-select
    v-bind="attrs"
    :value="modelValue"
    placeholder="Select"
    size="large"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { useAttrs } from "vue";

defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  modelValue: { type: String, default: "" },
});
const attrs = useAttrs();
</script>

<style scoped></style>
