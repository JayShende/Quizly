import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import questionService from "../services/question.service";
import ApiError from "../utils/api-error";

const addQuestion = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const question = await questionService.addQuestion(body);
    return response(
      res,
      HttpStatus.OK,
      "Question added successfully",
      question
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

const addBulkQuestions = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await questionService.addBulkQuestions(body);
    return response(
      res,
      HttpStatus.OK,
      "Bulk questions added successfully",
      result
    );
  } catch (error) {
    console.log(error);
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
  addQuestion,
  addBulkQuestions,
};
