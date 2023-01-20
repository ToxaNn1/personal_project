import { Api } from "@/services/api/index.js";
import dayjs from "dayjs";

export class BankCardService extends Api {
  async bankStatement(token = import.meta.env.VITE_BANK_TOKEN) {
    const startDate = dayjs().subtract(1, "month").unix();
    const endDate = dayjs().unix();
    const config = {
      headers: {
        "X-Token": token,
      },
    };
    const response = await this.get(
      `https://api.monobank.ua/personal/statement/0/${startDate}/${endDate}`,
      config
    );
    return response;
  }

  async userAccount(token = import.meta.env.VITE_BANK_TOKEN) {
    const config = {
      headers: {
        "X-Token": token,
      },
    };
    const response = await this.get(
      "https://api.monobank.ua/personal/client-info",
      config
    );
    return response;
  }
}

export default new BankCardService();
