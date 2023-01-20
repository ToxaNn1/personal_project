<template>
  <el-avatar v-bind="attrs" />
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<style scoped>

</style>