import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import questionController from "../controller/question.controller";
import questionValidator from "../validators/question.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
  "/add",
  authMiddleware,
  validate(questionValidator.addQuestion),
  questionController.addQuestion
);

router.post(
  "/add-bulk",
  authMiddleware,
  validate(questionValidator.addBulkQuestions),
  questionController.addBulkQuestions
);

export default router;
