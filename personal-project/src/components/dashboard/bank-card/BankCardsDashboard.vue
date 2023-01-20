<template>
  <div class="flex flex-col gap-[20px]">
    <div>
      <swiper effect="cards" grabCursor :modules="modules" class="mySwiper">
        <swiper-slide v-for="(card, index) in data?.accounts" :key="index">
          <BankCardDashboard
            :card="card"
            :name="data?.name"
            :currency-code="card?.currencyCode"
            :card-number="card?.maskedPan[0]"
            :balance="card?.balance"
          />
        </swiper-slide>
      </swiper>
    </div>
    <DatePickerDashboard
      @setEndDate="setEndDate"
      @setStartDate="setStartDate"
    />
    <BankOperationDashboard :startDate="startDate" :endDate="endDate" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards } from "swiper";
import BankCardDashboard from "@/components/dashboard/bank-card/BankCardDashboard.vue";
import BankOperationDashboard from "@/components/dashboard/bank-card/BankOperationDashboard.vue";
import DatePickerDashboard from "@/components/dashboard/DatePickerDashboard.vue";
import { useUserBankAccountStore } from "@/store/bank-account/useUserBankAccountStore";
import "swiper/css";
import "swiper/css/effect-cards";
import "@/assets/swiper-styles.scss";

const { getUserBankAccountInfo } = useUserBankAccountStore();

const modules = [EffectCards];

const startDate = ref("");
const endDate = ref("");

const setStartDate = (e) => (startDate.value = e);

const setEndDate = (e) => (endDate.value = e);

const data = ref("");

onMounted(async () => {
  data.value = await getUserBankAccountInfo();
});
</script>
