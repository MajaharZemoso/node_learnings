import { IPayment } from "../interface/interface";
import Payment from "../model/payment";
import { PAYMENT_MESSAGES } from "../utils/stringConstants/constants";

export const paymentService = {
  createPayment: async (payment: IPayment) => {
    try {
      const newPayment = await Payment.create({
        ...payment,
      });
      return newPayment;
    } catch (error) {
      throw new Error(PAYMENT_MESSAGES.ERROR_ADD + error);
    }
  },

  getPaymentsByUserId: async (user_id: number) => {
    try {
      const payments = await Payment.findAll({
        where: {
          user_id: user_id,
        },
      });
      return payments;
    } catch (error) {
      throw new Error(PAYMENT_MESSAGES.ERROR_FETCH + error);
    }
  },
};
