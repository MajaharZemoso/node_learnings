import { userService } from "../../service/userService";
import User from "../../model/user";
import { UserAlreadyExist } from "../../exceptions/userAlreadyExist";
import bcrypt from "bcrypt";
import { validateAndUpdatePassword } from "../../utils/helperFunctions/helper";
import { USER_MESSAGES } from "../../utils/stringConstants/constants";

jest.mock("../../model/user");
jest.mock("../../model/cashkick");
jest.mock("../../model/payment");
jest.mock("../../exceptions/userAlreadyExist");
jest.mock("bcrypt");
jest.mock("../../utils/helperFunctions/helper");

describe("User Service", () => {
  let user = {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "pwd123",
    credit_balance: 100,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user when email does not exist", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(user);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

      const result = await userService.createUser(user);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        password: "hashedPassword",
        credit_balance: user.credit_balance,
      });
      expect(result).toEqual(user);
    });

    it("should throw UserAlreadyExist if email exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(user);

      try {
        await userService.createUser(user);
      } catch (error: any) {
        expect(error).toBeInstanceOf(UserAlreadyExist);
      }

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });

    it("should throw an error if another error occurs", async () => {
      const error = new Error("Database error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await expect(userService.createUser(user)).rejects.toThrow(
        USER_MESSAGES.ERROR_ADD + error
      );
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user with associated Cashkick and Payment data", async () => {
      const cashkickData = {
        id: 1,
        name: "Cashkick1",
        status: "active",
        maturity: new Date(),
        total_received: 1000,
        total_financed: 2000,
      };
      const paymentData = {
        id: 1,
        due_date: new Date(),
        status: "pending",
        expected_amount: 300,
        outstanding: 150,
      };
      const userWithAssociations = {
        ...user,
        Cashkicks: [cashkickData],
        Payments: [paymentData],
      };

      (User.findOne as jest.Mock).mockResolvedValue(userWithAssociations);

      const result = await userService.getUserByEmail(user.email);

      expect(result).toEqual(userWithAssociations);
    });

    it("should throw an error if fetching user fails", async () => {
      const error = new Error("Database error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await expect(userService.getUserByEmail(user.email)).rejects.toThrow(
        USER_MESSAGES.ERROR_FETCH + error
      );
    });
  });

  describe("updateUser", () => {
    const updatedUser = { ...user, credit_balance: 200 };

    it("should update the user's credit balance and password", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...user,
        update: jest.fn().mockResolvedValue(updatedUser),
      });
      (validateAndUpdatePassword as jest.Mock).mockResolvedValue(undefined);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedNewPassword");

      const updates = { password: "newPassword", credit_balance: 200 };
      const result = await userService.updateUser(1, updates);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(updatedUser);
    });

    it("should throw an error if user does not exist", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.updateUser(1, { credit_balance: 200 })
      ).rejects.toThrow(USER_MESSAGES.NOT_FOUND);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });

    it("should throw an error if update fails", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...user,
        update: jest.fn().mockRejectedValue(new Error("Update error")),
      });

      await expect(
        userService.updateUser(1, { credit_balance: 200 })
      ).rejects.toThrow(USER_MESSAGES.ERROR_UPDATE + new Error("Update error"));
    });
  });
});
