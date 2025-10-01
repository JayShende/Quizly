import { client } from "@repo/prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/api-error";

interface option {
  text: string;
}

interface AddQuestionProps {
  text: string;
  quizId: string;
  required?: boolean;
  order: number;
  options: option[];
}

const addQuestion = async (data: AddQuestionProps) => {
  // check if the quiz exists
  const quiz = await client.quiz.findUnique({
    where: {
      id: data.quizId,
    },
  });
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }
  // update the last question order
  const quizUpdate = await client.quiz.update({
    where: {
      id: data.quizId,
    },
    data: {
      lastQuestionOrder: quiz.lastQuestionOrder + 1,
    },
    select: {
      lastQuestionOrder: true,
    },
  });

  // create the question
  const question = await client.question.create({
    data: {
      text: data.text,
      quizId: data.quizId,
      order: quizUpdate.lastQuestionOrder,
      options: {
        create: data.options,
      },
    },
  });
  return question;
};

export default {
  addQuestion,
};
