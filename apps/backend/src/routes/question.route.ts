import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import questionController from "../controller/question.controller";
import questionValidator from "../validators/question.validator";

const router: Router = express.Router();

router.post(
  "/add",
  validate(questionValidator.addQuestion),
  questionController.addQuestion
);

export default router;
