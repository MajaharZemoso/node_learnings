import { NextFunction, Request, Response } from "express";
import { contractService } from "../service/contractService";
import { sendResponse } from "../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  CONTRACT_MESSAGES,
} from "../utils/stringConstants/constants";

export const contractController = {
  createContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, type, status, per_payment, term_length, payment_amount } =
        req.body;
      const newContract = await contractService.createContract({
        name,
        type,
        status,
        per_payment,
        term_length,
        payment_amount,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        message: CONTRACT_MESSAGES.SUCCESS_ADD,
        contract: newContract,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllContracts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contracts = await contractService.getAllContracts();
      sendResponse(res, STATUS_CODES.SUCCESS, {
        contracts,
        message: CONTRACT_MESSAGES.SUCCESS_FETCH,
      });
    } catch (error) {
      next(error);
    }
  },
};
