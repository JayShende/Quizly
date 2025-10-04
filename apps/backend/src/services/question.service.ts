import { client } from "@repo/prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/api-error";

interface option {
  text: string;
  isCorrectAnswer?: boolean;
}

interface AddQuestionProps {
  text: string;
  quizId: string;
  required?: boolean;
  order: number;
  options: option[];
}

interface AddBulkQuestionsProps {
  quizId: string;
  questions: Array<{
    text: string;
    options: option[];
  }>;
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

const addBulkQuestions = async (data: AddBulkQuestionsProps) => {
  // check if the quiz exists
  const quiz = await client.quiz.findUnique({
    where: {
      id: data.quizId,
    },
  });
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }

  // Update the quiz's lastQuestionOrder
  const updatedQuiz = await client.quiz.update({
    where: {
      id: data.quizId,
    },
    data: {
      lastQuestionOrder: quiz.lastQuestionOrder + data.questions.length,
    },
    select: {
      lastQuestionOrder: true,
    },
  });

  // Create all questions with their options
  const createdQuestions = [];
  let currentOrder = quiz.lastQuestionOrder + 1;

  for (const questionData of data.questions) {
    const question = await client.question.create({
      data: {
        text: questionData.text,
        quizId: data.quizId,
        order: currentOrder,
        options: {
          create: questionData.options,
        },
      },
      include: {
        options: true,
      },
    });
    createdQuestions.push(question);
    currentOrder++;
  }

  return {
    questions: createdQuestions,
    updatedQuiz,
  };
};

export default {
  addQuestion,
  addBulkQuestions,
};
