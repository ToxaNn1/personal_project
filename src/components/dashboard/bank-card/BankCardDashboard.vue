<template>
  <div
    class="rounded-[20px] bg-gray-700 flex flex-col text-white p-[2rem] gap-[15px]"
  >
    <div class="centered-item-btw gap-[20px]">
      <p class="text-mischka">Monobank</p>
      <p>{{ name }}</p>
    </div>
    <p v-if="card" class="centered-item-center gap-[20px]">
      <span>Card Number:</span>
      {{ cardNumber }}
    </p>
    <div v-if="card" class="centered-item-start gap-[20px]">
      <p>Balance:</p>
      <p>
        {{
          showBalance ? formatterBankBalance(balance) : hiddenBalance(balance)
        }}
        {{ convertorISO4217(currencyCode) }}
      </p>
      <div class="flex self-center">
        <el-icon
          v-if="!showBalance"
          @click="showBalance.value = true"
          class="cursor-pointer"
        >
          <View />
        </el-icon>
        <el-icon
          v-else
          @click="showBalance.value = false"
          class="cursor-pointer"
        >
          <Hide />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { formatterBankBalance } from "@/helpers/formatterBankBalance";
import { convertorISO4217 } from "@/helpers/convertorISO4217";

defineProps({
  name: { type: String, default: "" },
  balance: { type: Number, default: 0 },
  currencyCode: { type: Number, default: 960 },
  cardNumber: { type: String, default: "" },
  card: { type: Object },
});

const showBalance = ref(false);

const hiddenBalance = (balance) => {
  let string = ["*"];
  for (let i = 0; i <= balance.toString().length; i++) {
    string.push("*");
  }
  return string.join("");
};
</script>
