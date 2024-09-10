import { NextFunction, Request, Response } from "express";
import { cashkickService } from "../service/cashkickService";
import { sendResponse } from "../utils/helperFunctions/helper";
import {
  CASHKICK_MESSAGES,
  CONTRACT_ID_REQUIRED,
  STATUS_CODES,
} from "../utils/stringConstants/constants";

export const cashkickController = {
  createCashkick: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        status,
        maturity,
        total_received,
        total_financed,
        user_id,
        contract_Ids,
      } = req.body;

      if (!Array.isArray(contract_Ids) || contract_Ids.length === 0) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: CONTRACT_ID_REQUIRED,
        });
      }

      const newCashkick = await cashkickService.createCashkick(
        {
          name,
          status,
          maturity,
          total_received,
          total_financed,
          user_id,
        },
        contract_Ids
      );

      sendResponse(res, STATUS_CODES.CREATED, {
        message: CASHKICK_MESSAGES.SUCCESS_ADD,
        cashkick: newCashkick,
      });
    } catch (error) {
      next(error);
    }
  },

  getCashkicksByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: CASHKICK_MESSAGES.INVALID_ID,
        });
      }
      const cashkicks = await cashkickService.getCashkicksByUserId(userId);
      if (!cashkicks.length) {
        return sendResponse(res, STATUS_CODES.NOT_FOUND, {
          message: CASHKICK_MESSAGES.NOT_FOUND,
        });
      }
      sendResponse(res, STATUS_CODES.SUCCESS, {
        cashkicks: cashkicks,
        message: CASHKICK_MESSAGES.SUCCESS_FETCH,
      });
    } catch (error) {
      next(error);
    }
  },
};
