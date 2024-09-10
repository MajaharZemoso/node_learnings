import { Request, Response, NextFunction } from "express";
import { contractService } from "../../service/contractService";
import { sendResponse } from "../../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  CONTRACT_MESSAGES,
} from "../../utils/stringConstants/constants";
import { contractController } from "../../controller/contractController";

jest.mock("../../service/contractService");
jest.mock("../../utils/helperFunctions/helper");

describe("Contract Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
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

  describe("createContract", () => {
    it("should create a contract and return success response", async () => {
      req.body = {
        name: "Test Contract",
        type: "service",
        status: "active",
        per_payment: 1000,
        term_length: 12,
        payment_amount: 12000,
      };
      const createdContract = { id: 1, ...req.body };
      (contractService.createContract as jest.Mock).mockResolvedValue(
        createdContract
      );

      await contractController.createContract(
        req as Request,
        res as Response,
        next
      );

      expect(contractService.createContract).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: CONTRACT_MESSAGES.SUCCESS_ADD,
        contract: createdContract,
      });
    });

    it("should handle errors when creating contract", async () => {
      const error = new Error("Service Error");
      req.body = {
        name: "Test Contract",
        type: "service",
        status: "active",
        per_payment: 1000,
        term_length: 12,
        payment_amount: 12000,
      };
      (contractService.createContract as jest.Mock).mockRejectedValue(error);

      await contractController.createContract(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("getAllContracts", () => {
    it("should return all contracts successfully", async () => {
      const contracts = [
        { id: 1, name: "Contract 1", status: "active", payment_amount: 1000 },
        { id: 2, name: "Contract 2", status: "inactive", payment_amount: 2000 },
      ];
      (contractService.getAllContracts as jest.Mock).mockResolvedValue(
        contracts
      );

      await contractController.getAllContracts(
        req as Request,
        res as Response,
        next
      );

      expect(contractService.getAllContracts).toHaveBeenCalled();
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        contracts,
        message: CONTRACT_MESSAGES.SUCCESS_FETCH,
      });
    });

    it("should handle errors when fetching contracts", async () => {
      const error = new Error("Service Error");
      (contractService.getAllContracts as jest.Mock).mockRejectedValue(error);

      await contractController.getAllContracts(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
