import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import quizService from "../services/quiz.service";
import ApiError from "../utils/api-error";

const createQuiz = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const quiz = await quizService.createQuiz(body);
    return response(res, HttpStatus.OK, "Quiz created successfully", quiz);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

const getQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Quiz ID is required");
    }
    const quiz = await quizService.getQuiz(id);
    return response(res, HttpStatus.OK, "Quiz fetched successfully", quiz);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

// get Score
const getScore = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Quiz ID is required");
    }
    const score = await quizService.getScore(quizId, req.user?.userId!);
    return response(res, HttpStatus.OK, "Score fetched successfully", score);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

// get Leaderboard
const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Quiz ID is required");
    }
    const leaderboard = await quizService.getLeaderboard(quizId);
    return response(
      res,
      HttpStatus.OK,
      "Leaderboard fetched successfully",
      leaderboard
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

// get All Quiz MetaData
const getAllQuizMetaData = async (req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizMetaData();
    return response(
      res,
      HttpStatus.OK,
      "Quiz MetaData fetched successfully",
      quizzes
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

// check if the quiz is already submitted
const checkIfQuizIsSubmitted = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Quiz ID is required");
    }
    const isSubmitted = await quizService.checkIfQuizIsSubmitted(
      quizId,
      req.user?.userId!
    );
    return response(res, HttpStatus.OK, "Quiz is submitted", isSubmitted);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

export default {
  createQuiz,
  getQuiz,
  getScore,
  getLeaderboard,
  getAllQuizMetaData,
  checkIfQuizIsSubmitted,
};
