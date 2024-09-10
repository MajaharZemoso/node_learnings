import { Request, Response, NextFunction } from "express";
import { cashkickService } from "../../service/cashkickService";
import { sendResponse } from "../../utils/helperFunctions/helper";
import {
  CASHKICK_MESSAGES,
  CONTRACT_ID_REQUIRED,
  STATUS_CODES,
} from "../../utils/stringConstants/constants";
import { cashkickController } from "../../controller/cashkickController";

jest.mock("../../service/cashkickService");
jest.mock("../../utils/helperFunctions/helper");

describe("Cashkick Controller", () => {
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

  describe("createCashkick", () => {
    it("should return 400 if contract_Ids is not provided", async () => {
      req.body = {
        name: "Test Cashkick",
        status: "active",
        maturity: "2024-09-09",
        total_received: 5000,
        total_financed: 10000,
        user_id: 1,
        contract_Ids: [],
      };

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: CONTRACT_ID_REQUIRED,
      });
      expect(cashkickService.createCashkick).not.toHaveBeenCalled();
    });

    it("should create cashkick and return success response", async () => {
      req.body = {
        name: "Test Cashkick",
        status: "active",
        maturity: "2024-09-09",
        total_received: 5000,
        total_financed: 10000,
        user_id: 1,
        contract_Ids: [1, 2],
      };
      const newCashkick = { id: 1, ...req.body };
      (cashkickService.createCashkick as jest.Mock).mockResolvedValue(
        newCashkick
      );

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(cashkickService.createCashkick).toHaveBeenCalledWith(
        {
          name: req.body.name,
          status: req.body.status,
          maturity: req.body.maturity,
          total_received: req.body.total_received,
          total_financed: req.body.total_financed,
          user_id: req.body.user_id,
        },
        req.body.contract_Ids
      );
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: CASHKICK_MESSAGES.SUCCESS_ADD,
        cashkick: newCashkick,
      });
    });

    it("should handle errors when creating cashkick", async () => {
      const error = new Error("Service Error");
      req.body = {
        name: "Test Cashkick",
        status: "active",
        maturity: "2024-09-09",
        total_received: 5000,
        total_financed: 10000,
        user_id: 1,
        contract_Ids: [1, 2],
      };
      (cashkickService.createCashkick as jest.Mock).mockRejectedValue(error);

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("getCashkicksByUserId", () => {
    it("should return 400 if userId is invalid", async () => {
      req.params = { userId: "invalid" };
      await cashkickController.getCashkicksByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: CASHKICK_MESSAGES.INVALID_ID,
      });
      expect(cashkickService.getCashkicksByUserId).not.toHaveBeenCalled();
    });

    it("should return 404 if no cashkicks are found", async () => {
      req.params = { userId: "1" };
      (cashkickService.getCashkicksByUserId as jest.Mock).mockResolvedValue([]);

      await cashkickController.getCashkicksByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.NOT_FOUND, {
        message: CASHKICK_MESSAGES.NOT_FOUND,
      });
    });

    it("should return all cashkicks for a valid user", async () => {
      req.params = { userId: "1" };
      const cashkicks = [
        { id: 1, name: "Cashkick 1", status: "active" },
        { id: 2, name: "Cashkick 2", status: "inactive" },
      ];
      (cashkickService.getCashkicksByUserId as jest.Mock).mockResolvedValue(
        cashkicks
      );

      await cashkickController.getCashkicksByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(cashkickService.getCashkicksByUserId).toHaveBeenCalledWith(1);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        cashkicks: cashkicks,
        message: CASHKICK_MESSAGES.SUCCESS_FETCH,
      });
    });

    it("should handle errors when fetching cashkicks", async () => {
      const error = new Error("Service Error");
      req.params = { userId: "1" };
      (cashkickService.getCashkicksByUserId as jest.Mock).mockRejectedValue(
        error
      );

      await cashkickController.getCashkicksByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
