import express from "express";
import { authController } from "../controller/authController";
import { LOGIN } from "../utils/RouteConstants/routePaths";

const router = express.Router();

router.route(LOGIN).post(authController.login);

export default router;
