import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/helperFunctions/helper";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendResponse(res, 500, { message: error.message });
};
