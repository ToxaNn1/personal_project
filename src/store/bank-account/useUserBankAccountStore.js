import { defineStore } from "pinia";
import { notification } from "@/helpers/notification";
import BankCardService from "@/services/bank-card-api";
import { ref } from "vue";
import { useUserBankTokenStore } from "@/store/bank-account/useUserBankTokenStore";

export const useUserBankAccountStore = defineStore(
  "useUserBankAccountStore",
  () => {
    const { getUserBankToken } = useUserBankTokenStore();
    const token = ref(getUserBankToken());
    const loading = ref(false);
    const getUserBankStatement = async () => {
      loading.value = true;
      try {
        const { data, status } = await BankCardService.bankStatement(
          token.value
        );
        if (status === 200) await notification("Success data", "Success");
        return data;
      } catch (e) {
        console.log(e);
        notification(`Error as <b>${e}</b>`);
      } finally {
        loading.value = false;
      }
    };

    const getUserBankAccountInfo = async () => {
      loading.value = true;
      try {
        const { data, status } = await BankCardService.userAccount(token.value);
        if (status === 200) await notification("Success data", "Success");
        return data;
      } catch (e) {
        notification(`Error as <b>${e}</b>`);
      } finally {
        loading.value = false;
      }
    };

    return {
      getUserBankStatement,
      getUserBankAccountInfo,
      loading,
    };
  }
);
