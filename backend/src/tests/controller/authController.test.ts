import { Request, Response, NextFunction } from "express";
import { authService } from "../../service/authService";
import { authController } from "../../controller/authController";

jest.mock("../../service/authService");

describe("Auth Controller", () => {
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

  describe("login", () => {
    it("should return 200 and token on successful login", async () => {
      req.body = { email: "test@example.com", password: "password123" };
      const loginResult = { success: true, token: "mocked-token" };
      (authService.login as jest.Mock).mockResolvedValue(loginResult);

      await authController.login(req as Request, res as Response, next);

      expect(authService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: loginResult.token });
    });

    it("should return 401 and message on failed login", async () => {
      req.body = { email: "test@example.com", password: "wrongpassword" };
      const loginResult = { success: false, message: "Invalid credentials" };
      (authService.login as jest.Mock).mockResolvedValue(loginResult);

      await authController.login(req as Request, res as Response, next);

      expect(authService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: loginResult.message });
    });

    it("should handle errors and call next with error", async () => {
      const error = new Error("Service Error");
      req.body = { email: "test@example.com", password: "password123" };
      (authService.login as jest.Mock).mockRejectedValue(error);

      await authController.login(req as Request, res as Response, next);

      expect(authService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
