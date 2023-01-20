import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserBankTokenStore = defineStore(
  "useUserBankTokenStore",
  () => {
    const userBankToken = ref("");
    const getUserBankToken = () => {
      return userBankToken.value;
    };

    const setUserBankToken = (newToken) => {
      userBankToken.value = newToken;
    };

    return { getUserBankToken, setUserBankToken, userBankToken };
  }
);
