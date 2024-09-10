import { Response } from "express";
import User from "../../model/user";
import { USER_MESSAGES } from "../stringConstants/constants";
import bcrypt from "bcrypt";

export const sendResponse = (res: Response, status: number, json: any) => {
  return res.status(status).json(json);
};

export const validateAndUpdatePassword = async (
  existingUser: User,
  newPassword: string
) => {
  const isPasswordValid = await bcrypt.compare(
    newPassword,
    existingUser.password
  );
  if (isPasswordValid) {
    throw new Error(USER_MESSAGES.INVALID_OLD_PASSWORD);
  }
};
