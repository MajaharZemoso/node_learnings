import { Request, Response, NextFunction } from "express";
import { paymentService } from "../../service/paymentService";
import { sendResponse } from "../../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  PAYMENT_MESSAGES,
  USER_MESSAGES,
} from "../../utils/stringConstants/constants";
import { paymentController } from "../../controller/paymentController";

jest.mock("../../service/paymentService");
jest.mock("../../utils/helperFunctions/helper");

describe("Payment Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPayment", () => {
    it("should create a payment and return success response", async () => {
      req.body = {
        due_date: "2024-09-01",
        status: "pending",
        expected_amount: 100,
        outstanding: 50,
        user_id: 1,
      };
      const createdPayment = { id: 1, ...req.body };
      (paymentService.createPayment as jest.Mock).mockResolvedValue(
        createdPayment
      );

      await paymentController.creatPayment(
        req as Request,
        res as Response,
        next
      );

      expect(paymentService.createPayment).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: PAYMENT_MESSAGES.SUCCESS_ADD,
        payment: createdPayment,
      });
    });

    it("should handle errors when creating payment", async () => {
      const error = new Error("Service Error");
      req.body = {
        due_date: "2024-09-01",
        status: "pending",
        expected_amount: 100,
        outstanding: 50,
        user_id: 1,
      };
      (paymentService.createPayment as jest.Mock).mockRejectedValue(error);

      await paymentController.creatPayment(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("getAllPayments", () => {
    it("should return all payments for a valid userId", async () => {
      req.params = { userId: "1" };
      const payments = [
        {
          id: 1,
          due_date: "2024-09-01",
          status: "pending",
          expected_amount: 100,
        },
        {
          id: 2,
          due_date: "2024-09-05",
          status: "completed",
          expected_amount: 200,
        },
      ];
      (paymentService.getPaymentsByUserId as jest.Mock).mockResolvedValue(
        payments
      );

      await paymentController.getAllPayments(
        req as Request,
        res as Response,
        next
      );

      expect(paymentService.getPaymentsByUserId).toHaveBeenCalledWith(1);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        payments,
        message: PAYMENT_MESSAGES.SUCCESS_FETCH,
      });
    });

    it("should return 400 for an invalid userId", async () => {
      req.params = { userId: "invalid" };

      await paymentController.getAllPayments(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: USER_MESSAGES.INVALID_ID,
      });
      expect(paymentService.getPaymentsByUserId).not.toHaveBeenCalled();
    });

    it("should handle errors when fetching payments", async () => {
      const error = new Error("Service Error");
      req.params = { userId: "1" };
      (paymentService.getPaymentsByUserId as jest.Mock).mockRejectedValue(
        error
      );

      await paymentController.getAllPayments(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
