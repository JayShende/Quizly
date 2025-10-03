import { Request, Response } from "express";
import HttpStatus from "http-status";
import { response } from "../utils/responses";
import ApiError from "../utils/api-error";
import responseService from "../services/response.service";

const addResponse = async (req: Request, res: Response) => {
  try {
    const { quizId, answers } = req.body;
    const data = {
      quizId,
      answers,
    };
    const result = await responseService.addResponse(data, req.user?.userId!);
    return response(res, HttpStatus.OK, "Response added successfully", result);
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    console.log(error);
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

const getUserResponse = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const userId = req.user?.userId!;
    if(!quizId ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Quiz ID is required");
    }
    const result = await responseService.getUserResponse(quizId, userId);
    return response(
      res,
      HttpStatus.OK,
      "User response retrieved successfully",
      result
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return response(res, error.statusCode, error.message, null);
    }
    console.log(error);
    return response(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      null
    );
  }
};

export default {
  addResponse,
  getUserResponse,
};
