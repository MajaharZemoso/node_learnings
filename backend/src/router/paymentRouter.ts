import { Router } from "express";
import { paymentController } from "../controller/paymentController";
import { CREATE, USER_ID_ROUTE } from "../utils/RouteConstants/routePaths";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/zodValidate";
import PaymentSchema from "../utils/validations/payment";
const router = Router();

router.use(authenticateToken);

router.route(USER_ID_ROUTE).get(paymentController.getAllPayments);
router
  .route(CREATE)
  .post(validate(PaymentSchema), paymentController.creatPayment);

export default router;
