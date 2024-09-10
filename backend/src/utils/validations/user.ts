import { z } from "zod";
import * as validationConstants from "../stringConstants/validationConstants";

const createUserRequestSchema = z.object({
  name: z.string().trim().min(6, validationConstants.ERROR_NAME_REQUIRED),

  email: z.string().trim().email(validationConstants.ERROR_INVALID_EMAIL),

  password: z
    .string()
    .trim()
    .refine((password) => validationConstants.PASSWORD_REGEX.test(password), {
      message: validationConstants.ERROR_PASSWORD_REQUIREMENTS,
    }),

  credit_balance: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_CASH_KICK_AMOUNT),
});

const updateUserRequestSchema = z.object({
  password: z
    .string()
    .trim()
    .optional()
    .refine(
      (password) =>
        !password || validationConstants.PASSWORD_REGEX.test(password),
      {
        message: validationConstants.ERROR_PASSWORD_REQUIREMENTS,
      }
    ),

  credit_balance: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_CASH_KICK_AMOUNT),
});

export { createUserRequestSchema, updateUserRequestSchema };
