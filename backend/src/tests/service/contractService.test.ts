import { contractService } from "../../service/contractService";
import Contract from "../../model/contract";
import { CONTRACT_MESSAGES } from "../../utils/stringConstants/constants";
import { IContract } from "../../interface/interface";

jest.mock("../../model/contract");

describe("Contract Service", () => {
  let contract: IContract = {
    name: "Contract A",
    type: "fixed",
    status: "active",
    per_payment: 1000,
    term_length: 12,
    payment_amount: 12000,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllContracts", () => {
    it("should return a list of all contracts", async () => {
      const contracts = [contract];
      (Contract.findAll as jest.Mock).mockResolvedValue(contracts);

      const result = await contractService.getAllContracts();

      expect(Contract.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(contracts);
    });

    it("should throw an error if fetching contracts fails", async () => {
      const error = new Error("Database error");
      (Contract.findAll as jest.Mock).mockRejectedValue(error);

      await expect(contractService.getAllContracts()).rejects.toThrow(
        CONTRACT_MESSAGES.ERROR_FETCH + error
      );
      expect(Contract.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("createContract", () => {
    it("should create a new contract successfully", async () => {
      (Contract.create as jest.Mock).mockResolvedValue(contract);

      const result = await contractService.createContract(contract);

      expect(Contract.create).toHaveBeenCalledWith(contract);
      expect(result).toEqual(contract);
    });

    it("should throw an error if contract creation fails", async () => {
      const error = new Error("Database error");
      (Contract.create as jest.Mock).mockRejectedValue(error);

      await expect(contractService.createContract(contract)).rejects.toThrow(
        CONTRACT_MESSAGES.ERROR_ADD + error
      );
      expect(Contract.create).toHaveBeenCalledWith(contract);
    });
  });
});
