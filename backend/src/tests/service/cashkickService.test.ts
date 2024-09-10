import { cashkickService } from "../../service/cashkickService";
import Cashkick from "../../model/cashkick";
import CashkickHasContract from "../../model/cashkickHasContracts";
import { CASHKICK_MESSAGES } from "../../utils/stringConstants/constants";
import { ICashkick } from "../../interface/interface";

jest.mock("../../model/cashkick");
jest.mock("../../model/cashkickHasContracts");

describe("Cashkick Service", () => {
  let cashkick: ICashkick = {
    name: "Cashkick A",
    status: "active",
    maturity: new Date(),
    total_received: 10000,
    total_financed: 12000,
    user_id: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCashkick", () => {
    const contractIds = [1, 2, 3];

    it("should create a new cashkick and associate contracts", async () => {
      const newCashkick = { ...cashkick, id: 1 };
      (Cashkick.create as jest.Mock).mockResolvedValue(newCashkick);
      (CashkickHasContract.create as jest.Mock).mockResolvedValue({});

      const result = await cashkickService.createCashkick(
        cashkick,
        contractIds
      );

      expect(Cashkick.create).toHaveBeenCalledWith(cashkick);
      expect(CashkickHasContract.create).toHaveBeenCalledTimes(
        contractIds.length
      );
      expect(CashkickHasContract.create).toHaveBeenCalledWith({
        contract_id: contractIds[0],
        cashkick_id: newCashkick.id,
      });
      expect(result).toEqual(newCashkick);
    });

    it("should throw an error if cashkick creation or contract association fails", async () => {
      const error = new Error("Database error");
      (Cashkick.create as jest.Mock).mockRejectedValue(error);

      await expect(
        cashkickService.createCashkick(cashkick, contractIds)
      ).rejects.toThrow(CASHKICK_MESSAGES.ERROR_ADD + error);
      expect(Cashkick.create).toHaveBeenCalledWith(cashkick);
    });
  });

  describe("getCashkicksByUserId", () => {
    it("should return a list of cashkicks for a given user", async () => {
      const cashkicks = [cashkick];
      (Cashkick.findAll as jest.Mock).mockResolvedValue(cashkicks);

      const result = await cashkickService.getCashkicksByUserId(1);

      expect(Cashkick.findAll).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(result).toEqual(cashkicks);
    });

    it("should throw an error if fetching cashkicks fails", async () => {
      const error = new Error("Database error");
      (Cashkick.findAll as jest.Mock).mockRejectedValue(error);

      await expect(cashkickService.getCashkicksByUserId(1)).rejects.toThrow(
        CASHKICK_MESSAGES.ERROR_FETCH + error
      );
      expect(Cashkick.findAll).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
    });
  });
});
