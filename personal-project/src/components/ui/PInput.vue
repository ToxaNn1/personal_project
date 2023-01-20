<template>
  <el-input
    :value="modelValue"
    @change="$emit('update:modelValue', $event)"
    v-bind="attrs"
  ></el-input>
</template>

<script setup>
import { defineProps, useAttrs } from "vue";

defineProps({
  modelValue: { type: String, default: "" },
});

const attrs = useAttrs();
</script>

<style scoped></style>
