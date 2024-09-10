import { z } from "zod";
import { PaymentStatus } from "../enums";
import { ERROR_INVALID_DUE_DATE } from "../stringConstants/validationConstants";

const PaymentSchema = z.object({
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: ERROR_INVALID_DUE_DATE,
  }),
  status: z.enum([
    PaymentStatus.COMPLETED,
    PaymentStatus.PENDING,
    PaymentStatus.UPCOMING,
  ]),
  expected_amount: z.number().int().min(0),
  outstanding: z.number().int().min(0),
  user_id: z.number().int().positive(),
});

export default PaymentSchema;
