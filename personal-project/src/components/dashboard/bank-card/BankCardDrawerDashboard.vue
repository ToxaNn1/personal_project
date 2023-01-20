<template>
  <div>
    <el-drawer
      :key="userBankToken"
      class="overflow-hidden"
      v-model="openBankCards"
      direction="rtl"
      size="50%"
    >
      <template #header>
        <div class="mt-0 justify-between">
          <p class="text-green-500 text-[2rem]">My Bank Cards</p>
        </div>
      </template>
      <BankCardsDashboard v-if="userBankToken" />
      <BankStepsDashboard v-else />
    </el-drawer>
    <PButton
      type="success"
      class="fixed right-0 rotate-[270deg] text-grays text-[18px] origin-bottom-right bottom-[35%]"
      @click="openBankCards = true"
      text="Bank cards"
    />
  </div>
</template>

<script setup>
import { isRef, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import BankCardsDashboard from "@/components/dashboard/bank-card/BankCardsDashboard.vue";
import BankStepsDashboard from "@/components/dashboard/bank-card/BankStepsDashboard.vue";
import { useUserBankTokenStore } from "@/store/bank-account/useUserBankTokenStore";

const store = useUserBankTokenStore();
const { userBankToken } = storeToRefs(store);
watch(
  () => userBankToken,
  () => {
    console.log(isRef(userBankToken));
    console.log(userBankToken, "dsfgfd");
  }
);
const openBankCards = ref(false);
</script>

<style scoped lang="scss"></style>
