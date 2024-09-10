import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  INVALID_TOKEN,
  JWT_SECRET_KEY,
  UNAUTHORIZED_USER,
} from "../utils/stringConstants/constants";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: UNAUTHORIZED_USER });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: INVALID_TOKEN });
    }
    next();
  });
};
