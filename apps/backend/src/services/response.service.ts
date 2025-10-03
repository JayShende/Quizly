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

// get user response to a quiz in a well-structured manner
const getUserResponse = async (quizId: string, userId: string) => {
  // check if the quiz exists
  const quiz = await client.quiz.findUnique({
    where: {
      id: quizId,
    },
  });
  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }

  // First get the response to get the responseId
  const response = await client.response.findFirst({
    where: {
      quizId: quizId,
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!response) {
    throw new ApiError(httpStatus.NOT_FOUND, "Response not found");
  }

  // get user response with quiz details
  const userResponse = await client.response.findFirst({
    where: {
      quizId: quizId,
      userId: userId,
    },
    select: {
      id: true,
      quizId: true,
      userId: true,
      score: true,
      createdAt: true,
      quiz: {
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          questions: {
            orderBy: {
              order: "asc",
            },
            select: {
              id: true,
              text: true,
              order: true,
              options: {
                select: {
                  id: true,
                  text: true,
                  isCorrectAnswer: true,
                },
              },
              answers: {
                where: {
                  responseId: response.id,
                },
                select: {
                  id: true,
                  questionId: true,
                  optionId: true,
                  option: {
                    select: {
                      id: true,
                      text: true,
                      isCorrectAnswer: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userResponse) {
    throw new ApiError(httpStatus.NOT_FOUND, "Response not found");
  }

  // Structure the response with question analysis
  const questions = userResponse.quiz.questions.map((question) => {
    const userAnswer = question.answers[0];
    const correctOption = question.options.find(
      (option) => option.isCorrectAnswer
    );

    return {
      questionId: question.id,
      questionText: question.text,
      questionOrder: question.order,
      userAnswer: userAnswer
        ? {
            optionId: userAnswer.optionId,
            optionText: userAnswer.option.text,
            isCorrect: userAnswer.option.isCorrectAnswer,
          }
        : null,
      correctAnswer: correctOption
        ? {
            optionId: correctOption.id,
            optionText: correctOption.text,
          }
        : null,
      allOptions: question.options.map((option) => ({
        id: option.id,
        text: option.text,
        isCorrect: option.isCorrectAnswer,
      })),
    };
  });

  // Calculate score
  const score = (userResponse.score as {
    correctAnswers: number;
    totalQuestions: number;
  }) || {
    correctAnswers: 0,
    totalQuestions: 0,
  };

  const percentage =
    score.totalQuestions > 0
      ? Math.round((score.correctAnswers / score.totalQuestions) * 100)
      : 0;

  return {
    responseId: userResponse.id,
    quizId: userResponse.quizId,
    userId: userResponse.userId,
    submittedAt: userResponse.createdAt,
    quiz: {
      id: userResponse.quiz.id,
      title: userResponse.quiz.title,
      description: userResponse.quiz.description,
      duration: userResponse.quiz.duration,
    },
    score: {
      correctAnswers: score.correctAnswers,
      totalQuestions: score.totalQuestions,
      percentage,
    },
    questions,
  };
};

export default {
  addResponse,
  getUserResponse,
};
