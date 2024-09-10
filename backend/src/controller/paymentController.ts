import { NextFunction, Request, Response } from "express";
import { paymentService } from "../service/paymentService";
import { sendResponse } from "../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  PAYMENT_MESSAGES,
  USER_MESSAGES,
} from "../utils/stringConstants/constants";

export const paymentController = {
  creatPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { due_date, status, expected_amount, outstanding, user_id } =
        req.body;
      const payment = await paymentService.createPayment({
        due_date,
        status,
        expected_amount,
        outstanding,
        user_id,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        message: PAYMENT_MESSAGES.SUCCESS_ADD,
        payment: payment,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllPayments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.userId);

      if (isNaN(userId)) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: USER_MESSAGES.INVALID_ID,
        });
      }

      const payments = await paymentService.getPaymentsByUserId(userId);

      sendResponse(res, STATUS_CODES.SUCCESS, {
        payments,
        message: PAYMENT_MESSAGES.SUCCESS_FETCH,
      });
    } catch (error) {
      next(error);
    }
  },
};
