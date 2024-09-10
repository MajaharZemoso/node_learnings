import { z } from "zod";
import * as validationConstants from "../stringConstants/validationConstants";
import { contractType, contractStatus } from "../enums";

const createContractRequestSchema = z.object({
  name: z.string().trim().min(4, validationConstants.ERROR_NAME_REQUIRED),

  type: z.enum([
    contractType.MONTHLY,
    contractType.QUERTERLY,
    contractType.YEARLY,
  ]),

  status: z.enum([contractStatus.AVAILABLE, contractStatus.SIGNED]),
  per_payment: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_PER_PAYMENT_NUMBER),

  term_length: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_TERM_LENGTH_NUMBER),

  payment_amount: z
    .number()
    .int()
    .min(0, validationConstants.ERROR_PAYMENT_AMOUNT_NUMBER),
});

export default createContractRequestSchema;
