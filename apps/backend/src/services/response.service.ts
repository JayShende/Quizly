import { client } from "@repo/prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/api-error";

interface answerProps {
  questionId: string;
  optionId: string;
}

interface AddResponseProps {
  quizId: string;
  answers: answerProps[];
}

const addResponse = async (data: AddResponseProps, userId: string) => {
  // check if the quiz exists
  console.log(data);
  const quiz = await client.quiz.findUnique({
    where: {
      id: data.quizId,
    },
  });
  console.log(quiz);
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }
  // process the adding the response
  const quizResponse = await client.response.create({
    data: {
      quizId: data.quizId,
      userId: userId,
      answers: {
        create: data.answers.map((answer) => ({
          questionId: answer.questionId,
          optionId: answer.optionId,
        })),
      },
    },
  });
  return quizResponse;
};

export default {
  addResponse,
};
