import express, { Router } from "express";
import responseController from "../controller/response.controller";
import { validate } from "../middlewares/validate";
import responseValidator from "../validators/reposne.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

// Add a response to a quiz
router.post(
  "/add",
  authMiddleware,
  validate(responseValidator.response),
  responseController.addResponse
);

// Get user response to a quiz in a well-structured manner
router.get("/:quizId", authMiddleware, responseController.getUserResponse);

export default router;
