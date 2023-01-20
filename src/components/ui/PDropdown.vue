<template>
  <el-dropdown  v-bind="attrs">
    <slot name="content"/>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Settings</el-dropdown-item>
        <el-dropdown-item>Log out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<style scoped>

</style>