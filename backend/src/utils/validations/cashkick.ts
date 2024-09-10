import { z } from "zod";
import * as validationConstants from "../stringConstants/validationConstants";
import { CashkicksStatus } from "../enums";

const createCashkickRequestSchema = z.object({
  name: z.string().trim().min(1, validationConstants.ERROR_NAME_REQUIRED),

  status: z.enum([CashkicksStatus.APPROVED, CashkicksStatus.PENDING]),

  maturity: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: validationConstants.ERROR_INVALID_MATURITY,
  }),

  total_received: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_INVALID_AMOUNT),

  total_financed: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_INVALID_AMOUNT),

  user_id: z.number().int().positive(),
});

export default createCashkickRequestSchema;
