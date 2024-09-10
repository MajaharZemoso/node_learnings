import { Request, Response, NextFunction } from "express";
import { userService } from "../../service/userService";
import { sendResponse } from "../../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  USER_MESSAGES,
} from "../../utils/stringConstants/constants";
import { userController } from "../../controller/userController";

jest.mock("../../service/userService");
jest.mock("../../utils/helperFunctions/helper");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
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

  describe("createUser", () => {
    it("should create a user and return success response", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        credit_balance: 100,
      };
      const createdUser = { id: 1, ...req.body };
      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);

      await userController.createUser(req as Request, res as Response, next);

      expect(userService.createUser).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: USER_MESSAGES.SUCCESS_ADD,
        user: createdUser,
      });
    });

    it("should handle errors when creating user", async () => {
      const error = new Error("Service Error");
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        credit_balance: 100,
      };
      (userService.createUser as jest.Mock).mockRejectedValue(error);

      await userController.createUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("updateUser", () => {
    it("should update the user and return success response", async () => {
      req.params = { userId: "1" };
      req.body = { password: "newPassword123", credit_balance: 150 };
      const updatedUser = { id: 1, ...req.body };
      (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await userController.updateUser(req as Request, res as Response, next);

      expect(userService.updateUser).toHaveBeenCalledWith(1, req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        user: updatedUser,
        message: USER_MESSAGES.SUCCESS_UPDATE,
      });
    });

    it("should return 400 for invalid userId", async () => {
      req.params = { userId: "invalid" };
      req.body = { password: "newPassword123", credit_balance: 150 };

      await userController.updateUser(req as Request, res as Response, next);

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: USER_MESSAGES.INVALID_ID,
      });
      expect(userService.updateUser).not.toHaveBeenCalled();
    });

    it("should handle errors when updating user", async () => {
      const error = new Error("Service Error");
      req.params = { userId: "1" };
      req.body = { password: "newPassword123", credit_balance: 150 };
      (userService.updateUser as jest.Mock).mockRejectedValue(error);

      await userController.updateUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("getUserByEmail", () => {
    it("should return user if email is provided", async () => {
      req.query = { email: "john@example.com" };
      const user = { id: 1, email: "john@example.com" };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(user);

      await userController.getUserByEmail(
        req as Request,
        res as Response,
        next
      );

      expect(userService.getUserByEmail).toHaveBeenCalledWith(
        "john@example.com"
      );
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        user,
        message: USER_MESSAGES.SUCCESS_FETCH,
      });
    });

    it("should return 400 if email is not provided", async () => {
      req.query = {};

      await userController.getUserByEmail(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: USER_MESSAGES.INVALID_EMAIL,
      });
      expect(userService.getUserByEmail).not.toHaveBeenCalled();
    });

    it("should return 404 if user is not found", async () => {
      req.query = { email: "john@example.com" };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await userController.getUserByEmail(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.NOT_FOUND, {
        message: USER_MESSAGES.NOT_FOUND,
      });
    });

    it("should handle errors when fetching user", async () => {
      const error = new Error("Service Error");
      req.query = { email: "john@example.com" };
      (userService.getUserByEmail as jest.Mock).mockRejectedValue(error);

      await userController.getUserByEmail(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
