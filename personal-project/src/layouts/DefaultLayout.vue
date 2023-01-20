<template>
  <Header />
  <div class="flex relative">
    <Sidebar />
    <main class="main-container max-h-[calc(100vh-70px)] overflow-auto">
      <router-view></router-view>
    </main>
    <BankCardComponentDrawerDashboard />
  </div>
</template>

<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/Header.vue";
import BankCardComponentDrawerDashboard from "@/components/dashboard/bank-card/BankCardDrawerDashboard.vue";
</script>

<style scoped></style>
