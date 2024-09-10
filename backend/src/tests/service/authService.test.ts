import { authService } from "../../service/authService";
import User from "../../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

jest.mock("../../model/user");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("Auth Service", () => {
  const email = "john@example.com";
  const password = "password123";
  const user = {
    dataValues: {
      id: 1,
      email: email,
      password: "$2b$10$hashedPassword",
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return success and a token if login is successful", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockedToken");

      const result = await authService.login(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: user.dataValues.id, email: user.dataValues.email },
        expect.any(String),
        { expiresIn: "5m" }
      );
      expect(result).toEqual({ success: true, token: "mockedToken" });
    });

    it("should return an error message if email is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await authService.login(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual({
        success: false,
        message: "Invalid email or password",
      });
    });

    it("should return an error message if password is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authService.login(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual({
        success: false,
        message: "Invalid email or password",
      });
    });

    it("should throw an error if login process fails", async () => {
      const error = new Error("Database error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await expect(authService.login(email, password)).rejects.toThrow(
        "Error while logging in"
      );
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    });
  });
});
