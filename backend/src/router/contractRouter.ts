import { Router } from "express";
import { contractController } from "../controller/contractController";
import { CREATE, LIST } from "../utils/RouteConstants/routePaths";
import { authenticateToken } from "../middleware/auth";
import createContractRequestSchema from "../utils/validations/contract";
import { validate } from "../middleware/zodValidate";

const router = Router();

router.use(authenticateToken);

router.route(LIST).get(contractController.getAllContracts);
router
  .route(CREATE)
  .post(
    validate(createContractRequestSchema),
    contractController.createContract
  );

export default router;
