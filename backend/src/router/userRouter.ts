import { Router } from "express";
import { userController } from "../controller/userController";
import {
  createUserRequestSchema,
  updateUserRequestSchema,
} from "../utils/validations/user";
import { validate } from "../middleware/zodValidate";
import {
  SIGNUP_ROUTE,
  EMAIL_ROUTE,
  USER_ID_ROUTE,
} from "../utils/RouteConstants/routePaths";

const router = Router();

router
  .route(SIGNUP_ROUTE)
  .post(validate(createUserRequestSchema), userController.createUser);

router.route(EMAIL_ROUTE).get(userController.getUserByEmail);

router
  .route(USER_ID_ROUTE)
  .patch(validate(updateUserRequestSchema), userController.updateUser);

export default router;
