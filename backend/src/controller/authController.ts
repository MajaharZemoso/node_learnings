import { Request, Response, NextFunction } from "express";
import { authService } from "../service/authService";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        return res.status(200).json({ token: result.token });
      } else {
        return res.status(401).json({ message: result.message });
      }
    } catch (error) {
      next(error);
    }
  },
};
