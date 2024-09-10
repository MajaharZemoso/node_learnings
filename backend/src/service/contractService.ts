import { IContract } from "../interface/interface";
import Contract from "../model/contract";
import { CONTRACT_MESSAGES } from "../utils/stringConstants/constants";

export const contractService = {
  getAllContracts: async () => {
    try {
      const contracts = await Contract.findAll();
      return contracts;
    } catch (error) {
      throw new Error(CONTRACT_MESSAGES.ERROR_FETCH + error);
    }
  },

  createContract: async (contract: IContract) => {
    try {
      const newContract = await Contract.create({
        ...contract,
      });
      return newContract;
    } catch (error) {
      console.error(error);
      throw new Error(CONTRACT_MESSAGES.ERROR_ADD + error);
    }
  },
};
