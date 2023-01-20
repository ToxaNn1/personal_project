<template>
  <el-switch
    :value="modelValue"
    inline-prompt
    :active-icon="activeIcon"
    :inactive-icon="inActiveIcon"
    v-bind="attrs"
    @change="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
import { defineProps, useAttrs } from "vue";

defineProps({
  modelValue: { type: Boolean, default: false },
  activeIcon: {
    type: Object,
    default: () => {},
  },
  inActiveIcon: {
    type: Object,
    default: () => {},
  },
});

const attrs = useAttrs();
</script>

<style scoped></style>
