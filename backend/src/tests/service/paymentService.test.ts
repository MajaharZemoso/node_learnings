import { paymentService } from "../../service/paymentService";
import Payment from "../../model/payment";
import { PAYMENT_MESSAGES } from "../../utils/stringConstants/constants";
import { IPayment } from "../../interface/interface";

jest.mock("../../model/payment");

describe("Payment Service", () => {
  let payment: IPayment = {
    due_date: new Date("2024-09-15"),
    status: "completed",
    expected_amount: 1000,
    outstanding: 500,
    user_id: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPayment", () => {
    it("should create a new payment successfully", async () => {
      (Payment.create as jest.Mock).mockResolvedValue(payment);

      const result = await paymentService.createPayment(payment);

      expect(Payment.create).toHaveBeenCalledWith(payment);
      expect(result).toEqual(payment);
    });

    it("should throw an error when payment creation fails", async () => {
      const error = new Error("Database error");
      (Payment.create as jest.Mock).mockRejectedValue(error);

      await expect(paymentService.createPayment(payment)).rejects.toThrow(
        PAYMENT_MESSAGES.ERROR_ADD + error
      );
      expect(Payment.create).toHaveBeenCalledWith(payment);
    });
  });

  describe("getPaymentsByUserId", () => {
    it("should return a list of payments for the user", async () => {
      const payments = [payment];
      (Payment.findAll as jest.Mock).mockResolvedValue(payments);

      const result = await paymentService.getPaymentsByUserId(1);

      expect(Payment.findAll).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(payments);
    });

    it("should throw an error if fetching payments fails", async () => {
      const error = new Error("Database error");
      (Payment.findAll as jest.Mock).mockRejectedValue(error);

      await expect(paymentService.getPaymentsByUserId(1)).rejects.toThrow(
        PAYMENT_MESSAGES.ERROR_FETCH + error
      );
      expect(Payment.findAll).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
    });
  });
});
