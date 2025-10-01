import { client } from "@repo/prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/api-error";

interface CreateQuizProps {
  title: string;
  description: string;
}

const createQuiz = async (data: CreateQuizProps) => {
  const quiz = await client.quiz.create({
    data: {
      ...data,
    },
  });
  return quiz;
};

const getQuiz = async (id: string) => {
  // check if the quiz exists
  const checkQuiz = await client.quiz.findUnique({
    where: {
      id: id,
    },
  });
  if (!checkQuiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }
  // fetch the quiz with the questions and Options
  const quiz = await client.quiz.findUnique({
    where: {
      id: id,
    },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          order: true,
          options: {
            select: {
              id: true,
              text: true,
              questionId: true,
            },
          },
        },
      },
    },
  });
  return quiz;
};



export default {
  createQuiz,
  getQuiz,
};
