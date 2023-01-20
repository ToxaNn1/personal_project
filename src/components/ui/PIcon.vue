<template>
  <a-icon
    :icon="icon"
    :class="{ 'move-left': mouseOnElement && moveArrowLeft }"
    :beat="mouseOnElement && !moveArrowLeft"
    v-bind="attrs"
  />
</template>

<script setup>
import { defineProps, useAttrs } from "vue";

defineProps({
  icon: { type: String, default: "" },
  mouseOnElement: { type: Boolean, default: false },
  moveArrowLeft: { type: Boolean, default: false },
});

const attrs = useAttrs();
</script>

<style scoped lang="scss">
.move-left {
  @apply duration-500 translate-x-[-16px];
}

.move-left {
  @apply duration-500 translate-x-[-16px];
}
</style>
