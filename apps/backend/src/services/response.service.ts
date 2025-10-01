import { client } from "@repo/prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/api-error";
import quizService from "./quiz.service";

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

  // check if the user has already responded to the quiz
  const userResponse = await client.response.findFirst({
    where: {
      quizId: data.quizId,
      userId: userId,
    },
  });
  if (userResponse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User has already responded to the quiz"
    );
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

  // post addition of Response Calculate the score
  const score = await quizService.calculateScore(data.quizId, userId);
  console.log(score);
  // update the response with the score
  await client.response.update({
    where: {
      id: quizResponse.id,
    },
    data: { score: score },
  });
  return {
    response: quizResponse,
    score: score,
  };
};

export default {
  addResponse,
};
