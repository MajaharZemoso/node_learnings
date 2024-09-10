import { Router } from "express";
import { cashkickController } from "../controller/cashkickController";
import { BY_USER_ID, CREATE, LIST } from "../utils/RouteConstants/routePaths";
import { authenticateToken } from "../middleware/auth";
import createCashkickRequestSchema from "../utils/validations/cashkick";
import { validate } from "../middleware/zodValidate";

const router = Router();

router.use(authenticateToken);

router
  .route(CREATE)
  .post(
    validate(createCashkickRequestSchema),
    cashkickController.createCashkick
  );

router.route(BY_USER_ID).get(cashkickController.getCashkicksByUserId);

export default router;
