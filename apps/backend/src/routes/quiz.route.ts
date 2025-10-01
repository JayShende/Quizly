import express, { Router } from "express";
import quizController from "../controller/quiz.controller";
import { validate } from "../middlewares/validate";
import createQuizValidator from "../validators/createQuiz.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validate(createQuizValidator.createQuiz),
  quizController.createQuiz
);

router.get("/get/:id", authMiddleware, quizController.getQuiz);

router.get("/get-score/:quizId", authMiddleware, quizController.getScore);

router.get(
  "/leaderboard/:quizId",
  authMiddleware,
  quizController.getLeaderboard
);

export default router;
