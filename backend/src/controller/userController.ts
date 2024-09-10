import { NextFunction, Request, Response } from "express";
import { userService } from "../service/userService";
import { sendResponse } from "../utils/helperFunctions/helper";
import {
  STATUS_CODES,
  USER_MESSAGES,
} from "../utils/stringConstants/constants";

export const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, credit_balance } = req.body;
      const user = await userService.createUser({
        name,
        email,
        password,
        credit_balance,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        message: USER_MESSAGES.SUCCESS_ADD,
        user: user,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.userId);
      const { password, credit_balance } = req.body;

      if (isNaN(userId)) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: USER_MESSAGES.INVALID_ID,
        });
      }

      const updatedUser = await userService.updateUser(userId, {
        password,
        credit_balance,
      });

      sendResponse(res, STATUS_CODES.SUCCESS, {
        user: updatedUser,
        message: USER_MESSAGES.SUCCESS_UPDATE,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.query.email as string;
      if (!email) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: USER_MESSAGES.INVALID_EMAIL,
        });
      }
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return sendResponse(res, STATUS_CODES.NOT_FOUND, {
          message: USER_MESSAGES.NOT_FOUND,
        });
      }
      sendResponse(res, STATUS_CODES.SUCCESS, {
        user,
        message: USER_MESSAGES.SUCCESS_FETCH,
      });
    } catch (error) {
      next(error);
    }
  },
};
