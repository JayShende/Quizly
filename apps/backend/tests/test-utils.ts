// Test utilities and mock data helpers
import { client } from "@repo/prisma/client";

// Mock quiz data with correct options for scoring
export const mockQuizWithCorrectOptions = {
  id: "quiz-1",
  title: "Test Quiz",
  description: "A test quiz",
  duration: 180,
  questions: [
    {
      id: "q1",
      text: "What is 2 + 2?",
      order: 1,
      options: [{ id: "opt2", text: "4", isCorrectAnswer: true }],
    },
    {
      id: "q2",
      text: "What is the capital of France?",
      order: 2,
      options: [{ id: "opt5", text: "Paris", isCorrectAnswer: true }],
    },
    {
      id: "q3",
      text: "What color is the sky?",
      order: 3,
      options: [{ id: "opt8", text: "Blue", isCorrectAnswer: true }],
    },
  ],
};

// Mock quiz data for display (without correct answers)
export const mockQuiz = {
  id: "quiz-1",
  title: "Test Quiz",
  description: "A test quiz",
  duration: 180,
  questions: [
    {
      id: "q1",
      text: "What is 2 + 2?",
      order: 1,
      options: [
        { id: "opt1", text: "3", questionId: "q1" },
        { id: "opt2", text: "4", questionId: "q1" },
        { id: "opt3", text: "5", questionId: "q1" },
      ],
    },
    {
      id: "q2",
      text: "What is the capital of France?",
      order: 2,
      options: [
        { id: "opt4", text: "London", questionId: "q2" },
        { id: "opt5", text: "Paris", questionId: "q2" },
        { id: "opt6", text: "Berlin", questionId: "q2" },
      ],
    },
    {
      id: "q3",
      text: "What color is the sky?",
      order: 3,
      options: [
        { id: "opt7", text: "Red", questionId: "q3" },
        { id: "opt8", text: "Blue", questionId: "q3" },
        { id: "opt9", text: "Green", questionId: "q3" },
      ],
    },
  ],
};

// Mock user response data
export const mockUserResponse = {
  id: "response-1",
  quizId: "quiz-1",
  userId: "user-1",
  score: null,
  answers: [
    {
      id: "answer-1",
      questionId: "q1",
      optionId: "opt2", // Correct answer
      option: { id: "opt2", text: "4", isCorrectAnswer: true },
    },
    {
      id: "answer-2",
      questionId: "q2",
      optionId: "opt5", // Correct answer
      option: { id: "opt5", text: "Paris", isCorrectAnswer: true },
    },
    {
      id: "answer-3",
      questionId: "q3",
      optionId: "opt7", // Wrong answer
      option: { id: "opt7", text: "Red", isCorrectAnswer: false },
    },
  ],
  createdAt: new Date(),
};

// Helper function to reset all mocks
export const resetMocks = () => {
  jest.clearAllMocks();
  Object.values(client).forEach((model) => {
    Object.values(model).forEach((method) => {
      if (typeof method === "function" && "mockReset" in method) {
        (method as jest.Mock).mockReset();
      }
    });
  });
};

// Helper function to create mock quiz data
export const createMockQuiz = (overrides = {}) => ({
  ...mockQuiz,
  ...overrides,
});

// Helper function to create mock user response
export const createMockUserResponse = (overrides = {}) => ({
  ...mockUserResponse,
  ...overrides,
});

// Helper function to create mock quiz with correct options
export const createMockQuizWithCorrectOptions = (overrides = {}) => ({
  ...mockQuizWithCorrectOptions,
  ...overrides,
});
