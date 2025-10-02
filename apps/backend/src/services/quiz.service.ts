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

const calculateScore = async (quizId: string, userId: string) => {
  // Get the quiz with all questions and their correct options
  const quiz = await client.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        include: {
          options: {
            where: {
              isCorrectAnswer: true,
            },
          },
        },
      },
    },
  });

  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }

  // Get the user's response for this quiz
  const userResponse = await client.response.findFirst({
    where: {
      quizId: quizId,
      userId: userId,
    },
    include: {
      answers: {
        include: {
          option: true,
        },
      },
    },
  });

  if (!userResponse) {
    throw new ApiError(httpStatus.NOT_FOUND, "Response not found");
  }

  // Calculate score
  let correctAnswers = 0;
  let totalQuestions = quiz.questions.length;

  // Create a map of correct option IDs for each question
  const correctOptionsMap = new Map();
  quiz.questions.forEach((question) => {
    question.options.forEach((option) => {
      correctOptionsMap.set(option.id, true);
    });
  });

  // Check each user answer against correct options
  userResponse.answers.forEach((answer) => {
    if (correctOptionsMap.has(answer.optionId)) {
      correctAnswers++;
    }
  });

  const score = {
    correctAnswers,
    totalQuestions,
  };

  return score;
};

// get Score
const getScore = async (quizId: string, userId: string) => {
  const responseObject = await client.response.findFirst({
    where: {
      quizId: quizId,
      userId: userId,
    },
  });
  if (!responseObject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Response not found");
  }
  return responseObject.score;
};

// get the leaderboard
const getLeaderboard = async (quizId: string) => {
  // Check if quiz exists
  const quiz = await client.quiz.findUnique({
    where: {
      id: quizId,
    },
  });

  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, "Quiz not found");
  }

  // Get all responses with user details for the quiz
  const responses = await client.response.findMany({
    where: {
      quizId: quizId,
      score: {
        not: null,
      } as any,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc", // Earlier submissions first for tie-breaking
    },
  });

  if (responses.length === 0) {
    return [];
  }

  // Process and rank the responses
  const leaderboardData = responses.map((response: any) => {
    const score = response.score as {
      correctAnswers: number;
      totalQuestions: number;
    };
    const percentage =
      score.totalQuestions > 0
        ? Math.round((score.correctAnswers / score.totalQuestions) * 100)
        : 0;

    return {
      userId: response.userId,
      userName: response.user?.name || "Anonymous",
      userImage: response.user?.image || null,
      correctAnswers: score.correctAnswers,
      totalQuestions: score.totalQuestions,
      percentage: percentage,
      submissionTime: response.createdAt,
    };
  });

  // Sort by percentage (descending), then by submission time (ascending for tie-breaking)
  leaderboardData.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage; // Higher percentage first
    }
    return (
      new Date(a.submissionTime).getTime() -
      new Date(b.submissionTime).getTime()
    ); // Earlier submission first
  });

  // Assign ranks (same rank for same percentage)
  let currentRank = 1;
  let previousPercentage = -1;

  const rankedLeaderboard = leaderboardData.map((entry, index) => {
    if (entry.percentage !== previousPercentage) {
      currentRank = index + 1;
      previousPercentage = entry.percentage;
    }

    return {
      ...entry,
      rank: currentRank,
    };
  });

  return rankedLeaderboard;
};

//  Get All Quiz MetaData
const getAllQuizMetaData = async () => {
  const quizzes = await client.quiz.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return quizzes;
};

export default {
  createQuiz,
  getQuiz,
  calculateScore,
  getScore,
  getLeaderboard,
  getAllQuizMetaData,
};
