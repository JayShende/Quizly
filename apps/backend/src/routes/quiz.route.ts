import express, { Router } from "express";
import quizController from "../controller/quiz.controller";
import { validate } from "../middlewares/validate";
import createQuizValidator from "../validators/createQuiz.validator";

const router: Router = express.Router();

router.post(
  "/create",
  validate(createQuizValidator.createQuiz),
  quizController.createQuiz
);

router.get(
  "/get/:id",
  quizController.getQuiz
);

export default router;