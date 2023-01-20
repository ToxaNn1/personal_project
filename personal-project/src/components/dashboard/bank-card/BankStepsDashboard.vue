<template>
  <div class="mb-[20px]" v-if="active === 0">
    <p>
      API for obtaining information about statements and the status of personal
      accounts and FOP accounts. In order to grant access, you must be
      authorized in your personal account
      <el-link target="_blank" href="https://api.monobank.ua/" type="success"
        >https://api.monobank.ua/
      </el-link>
      and receive a token for personal use.
    </p>
  </div>
  <div class="mb-[20px]" v-else-if="active === 1">
    <p>Please scan QR-code</p>
    <img src="@/assets/images/drawerBank/qr_code.png" />
  </div>
  <div class="mb-[20px]" v-else-if="active === 2">
    <p>Please approve</p>
    <img
      class="h-[300px]"
      src="@/assets/images/drawerBank/monobank_approve.jpeg"
    />
  </div>
  <div class="gap-[10px] mb-[20px] flex flex-col" v-else-if="active === 3">
    <p>Please copy token and enter in input</p>
    <img src="@/assets/images/drawerBank/token.png" />
    <input v-model="inputValue" placeholder="Please enter token" />
    <PButton @click="test" size="large" :text="'Save'" />
  </div>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
    <el-step title="Step 3" />
  </el-steps>
  <el-button style="margin-top: 12px" @click="prev">Prev step</el-button>
  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>

<script setup>
import { ref } from "vue";
import { useUserBankTokenStore } from "@/store/bank-account/useUserBankTokenStore";

const { setUserBankToken } = useUserBankTokenStore();

const active = ref(0);
const inputValue = ref("");

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
const prev = () => {
  if (active.value-- <= 0) active.value = 0;
};

const test = () => {
  setUserBankToken(inputValue.value);
  inputValue.value = "";
};
</script>
