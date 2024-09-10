import { ICashkick } from "../interface/interface";
import Cashkick from "../model/cashkick";
import CashkickHasContract from "../model/cashkickHasContracts";
import { CASHKICK_MESSAGES } from "../utils/stringConstants/constants";

export const cashkickService = {
  createCashkick: async (cashkick: ICashkick, contractIds: number[]) => {
    try {
      const newCashkick = await Cashkick.create({
        ...cashkick,
      });
      const contractCashkickPromises = contractIds.map((contractId) =>
        CashkickHasContract.create({
          contract_id: contractId,
          cashkick_id: newCashkick.id,
        })
      );
      await Promise.all(contractCashkickPromises);

      return newCashkick;
    } catch (error) {
      console.error(error);
      throw new Error(CASHKICK_MESSAGES.ERROR_ADD + error);
    }
  },

  getCashkicksByUserId: async (userId: number) => {
    try {
      const cashkicks = await Cashkick.findAll({
        where: { user_id: userId },
      });
      return cashkicks;
    } catch (error) {
      throw new Error(CASHKICK_MESSAGES.ERROR_FETCH + error);
    }
  },
};
