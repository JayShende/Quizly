import express, { Router } from "express";
import responseController from "../controller/response.controller";
import { validate } from "../middlewares/validate";
import responseValidator from "../validators/reposne.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
  "/add",
  authMiddleware,
  validate(responseValidator.response),
  responseController.addResponse
);

export default router;
