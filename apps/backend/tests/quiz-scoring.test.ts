// Unit tests for quiz scoring logic
import { client } from "@repo/prisma/client";
import quizService from "../src/services/quiz.service";
import ApiError from "../src/utils/api-error";
import httpStatus from "http-status";
import {
  mockQuizWithCorrectOptions,
  mockUserResponse,
  resetMocks,
  createMockQuizWithCorrectOptions,
  createMockUserResponse,
} from "./test-utils";

// Mock the Prisma client
jest.mock("@repo/prisma/client", () => ({
  client: {
    quiz: {
      findUnique: jest.fn(),
    },
    response: {
      findFirst: jest.fn(),
    },
  },
}));

describe("Quiz Scoring Logic", () => {
  beforeEach(() => {
    resetMocks();
  });

  describe("calculateScore - Basic Scoring", () => {
    test("should return perfect score for all correct answers", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt2", // Correct
            option: { id: "opt2", text: "4", isCorrectAnswer: true },
          },
          {
            id: "answer-2",
            questionId: "q2",
            optionId: "opt5", // Correct
            option: { id: "opt5", text: "Paris", isCorrectAnswer: true },
          },
          {
            id: "answer-3",
            questionId: "q3",
            optionId: "opt8", // Correct
            option: { id: "opt8", text: "Blue", isCorrectAnswer: true },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 3,
        totalQuestions: 3,
      });
    });

    test("should return partial score for mixed answers", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt2", // Correct
            option: { id: "opt2", text: "4", isCorrectAnswer: true },
          },
          {
            id: "answer-2",
            questionId: "q2",
            optionId: "opt4", // Wrong
            option: { id: "opt4", text: "London", isCorrectAnswer: false },
          },
          {
            id: "answer-3",
            questionId: "q3",
            optionId: "opt8", // Correct
            option: { id: "opt8", text: "Blue", isCorrectAnswer: true },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 2,
        totalQuestions: 3,
      });
    });

    test("should return zero score for all wrong answers", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt1", // Wrong
            option: { id: "opt1", text: "3", isCorrectAnswer: false },
          },
          {
            id: "answer-2",
            questionId: "q2",
            optionId: "opt4", // Wrong
            option: { id: "opt4", text: "London", isCorrectAnswer: false },
          },
          {
            id: "answer-3",
            questionId: "q3",
            optionId: "opt7", // Wrong
            option: { id: "opt7", text: "Red", isCorrectAnswer: false },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 0,
        totalQuestions: 3,
      });
    });

    test("should return zero score for empty answers", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();
      const mockResponse = createMockUserResponse({
        answers: [], // No answers
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 0,
        totalQuestions: 3,
      });
    });
  });

  describe("calculateScore - Edge Cases", () => {
    test("should handle quiz with no questions", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions({
        questions: [], // No questions
      });
      const mockResponse = createMockUserResponse({
        answers: [],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 0,
        totalQuestions: 0,
      });
    });

    test("should handle user answering more questions than exist", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions({
        questions: [
          {
            id: "q1",
            text: "What is 2 + 2?",
            order: 1,
            options: [{ id: "opt2", text: "4", isCorrectAnswer: true }],
          },
        ], // Only 1 question
      });
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt2", // Correct
            option: { id: "opt2", text: "4", isCorrectAnswer: true },
          },
          {
            id: "answer-2",
            questionId: "q2", // Non-existent question
            optionId: "opt5",
            option: { id: "opt5", text: "Paris", isCorrectAnswer: true },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 1,
        totalQuestions: 1,
      });
    });

    test("should handle user answering fewer questions than exist", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions(); // 3 questions
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt2", // Correct
            option: { id: "opt2", text: "4", isCorrectAnswer: true },
          },
          // Only answered 1 out of 3 questions
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 1,
        totalQuestions: 3,
      });
    });
  });

  describe("calculateScore - Error Handling", () => {
    test("should throw error when quiz not found", async () => {
      // Arrange
      const quizId = "non-existent-quiz";
      const userId = "user-1";

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(quizService.calculateScore(quizId, userId)).rejects.toThrow(
        new ApiError(httpStatus.NOT_FOUND, "Quiz not found")
      );
    });

    test("should throw error when user response not found", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(quizService.calculateScore(quizId, userId)).rejects.toThrow(
        new ApiError(httpStatus.NOT_FOUND, "Response not found")
      );
    });
  });

  describe("calculateScore - Complex Scenarios", () => {
    test("should handle multiple correct options for same question", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions({
        questions: [
          {
            id: "q1",
            text: "Which are even numbers?",
            order: 1,
            options: [
              { id: "opt1", text: "2", isCorrectAnswer: true },
              { id: "opt2", text: "4", isCorrectAnswer: true },
              { id: "opt3", text: "3", isCorrectAnswer: false },
            ],
          },
        ],
      });
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt1", // Correct
            option: { id: "opt1", text: "2", isCorrectAnswer: true },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 1,
        totalQuestions: 1,
      });
    });

    test("should handle duplicate answers for same question", async () => {
      // Arrange
      const quizId = "quiz-1";
      const userId = "user-1";

      const mockQuiz = createMockQuizWithCorrectOptions();
      const mockResponse = createMockUserResponse({
        answers: [
          {
            id: "answer-1",
            questionId: "q1",
            optionId: "opt2", // Correct
            option: { id: "opt2", text: "4", isCorrectAnswer: true },
          },
          {
            id: "answer-2",
            questionId: "q1", // Same question again
            optionId: "opt1", // Wrong
            option: { id: "opt1", text: "3", isCorrectAnswer: false },
          },
        ],
      });

      (client.quiz.findUnique as jest.Mock).mockResolvedValue(mockQuiz);
      (client.response.findFirst as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await quizService.calculateScore(quizId, userId);

      // Assert
      expect(result).toEqual({
        correctAnswers: 1, // Only count the correct one
        totalQuestions: 3,
      });
    });
  });
});
