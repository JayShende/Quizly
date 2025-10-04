"use client";

import Container from "@/app/pages/dashboard/components/container";
import React from "react";
import { useParams } from "next/navigation";
import { useGetResponseByQuizIdAndUserId } from "@/app/services/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { interFont } from "@/app/fonts/fonts";

interface Question {
  questionId: string;
  questionText: string;
  questionOrder: number;
  userAnswer: {
    optionId: string;
    optionText: string;
    isCorrect: boolean;
  } | null;
  correctAnswer: {
    optionId: string;
    optionText: string;
  } | null;
  allOptions: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

interface ResponseData {
  responseId: string;
  quizId: string;
  userId: string;
  submittedAt: string;
  quiz: {
    id: string;
    title: string;
    description: string;
    duration: number;
  };
  score: {
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
  };
  questions: Question[];
}

const QuizResponse = () => {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const reponseQuery = useGetResponseByQuizIdAndUserId(quizId);

  if (reponseQuery.isLoading) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <FaSpinner className="text-4xl text-blue-600 animate-spin mx-auto mb-4" />
                <p className={cn("text-lg text-gray-700", interFont.className)}>
                  Loading your response...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  if (reponseQuery.error || !reponseQuery.data) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <FaTimesCircle className="text-4xl text-red-600 mx-auto mb-4" />
                <p
                  className={cn(
                    "text-lg text-gray-700 mb-2",
                    interFont.className
                  )}
                >
                  Error loading response
                </p>
                <p className={cn("text-sm text-gray-500", interFont.className)}>
                  Please try again later
                </p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="mt-4"
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const data = reponseQuery.data.data as ResponseData;

  return (
    <Container>
      <div className="min-h-screen p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => router.push(`/dashboard`)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </Button>
          <h1
            className={cn(
              "text-2xl font-bold text-gray-900",
              interFont.className
            )}
          >
            Quiz Response
          </h1>
        </div>

        {/* Quiz Summary */}
        <Card className="w-full py-0 pb-6">
          <div className="w-full h-2 rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardHeader>
            <CardTitle className={cn("text-xl", interFont.className)}>
              {data.quiz.title}
            </CardTitle>
            <CardDescription className={cn(interFont.className)}>
              {data.quiz.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div
                  className={cn(
                    "text-2xl font-bold text-blue-600",
                    interFont.className
                  )}
                >
                  {data.score.correctAnswers}
                </div>
                <div
                  className={cn("text-sm text-blue-700", interFont.className)}
                >
                  Correct Answers
                </div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div
                  className={cn(
                    "text-2xl font-bold text-red-600",
                    interFont.className
                  )}
                >
                  {data.score.totalQuestions - data.score.correctAnswers}
                </div>
                <div
                  className={cn("text-sm text-red-700", interFont.className)}
                >
                  Incorrect Answers
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div
                  className={cn(
                    "text-2xl font-bold text-green-600",
                    interFont.className
                  )}
                >
                  {data.score.percentage}%
                </div>
                <div
                  className={cn("text-sm text-green-700", interFont.className)}
                >
                  Score
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div
                  className={cn(
                    "text-2xl font-bold text-gray-600",
                    interFont.className
                  )}
                >
                  {data.score.totalQuestions}
                </div>
                <div
                  className={cn("text-sm text-gray-700", interFont.className)}
                >
                  Total Questions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Analysis */}
        <div className="space-y-4">
          <h2
            className={cn(
              "text-xl font-semibold text-gray-900 px-3",
              interFont.className
            )}
          >
            Question Analysis
          </h2>
          {data.questions.map((question, index) => (
            <Card key={question.questionId} className="w-full">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      question.userAnswer?.isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle
                      className={cn("text-lg break-words", interFont.className)}
                    >
                      {question.questionText}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {question.userAnswer?.isCorrect ? (
                      <FaCheckCircle className="text-green-600 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-600 text-xl" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* All Options */}
                <div className="space-y-2">
                  <h4
                    className={cn(
                      "font-medium text-gray-700",
                      interFont.className
                    )}
                  >
                    Options:
                  </h4>
                  <div className="grid gap-2">
                    {question.allOptions.map((option) => {
                      const isUserAnswer =
                        question.userAnswer?.optionId === option.id;
                      const isCorrectAnswer = option.isCorrect;

                      return (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg border-2 transition-all overflow-hidden ${
                            isUserAnswer && isCorrectAnswer
                              ? "border-green-500 bg-green-50 text-green-800"
                              : isUserAnswer && !isCorrectAnswer
                                ? "border-red-500 bg-red-50 text-red-800"
                                : isCorrectAnswer && !isUserAnswer
                                  ? "border-green-300 bg-green-25 text-green-700"
                                  : "border-gray-200 bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                                isUserAnswer && isCorrectAnswer
                                  ? "bg-green-600 text-white"
                                  : isUserAnswer && !isCorrectAnswer
                                    ? "bg-red-600 text-white"
                                    : isCorrectAnswer && !isUserAnswer
                                      ? "bg-green-400 text-white"
                                      : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {String.fromCharCode(
                                65 + question.allOptions.indexOf(option)
                              )}
                            </div>
                            <span
                              className={cn(
                                "flex-1 break-words min-w-0",
                                interFont.className
                              )}
                            >
                              {option.text}
                            </span>
                            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                              {isUserAnswer && !isCorrectAnswer && (
                                <span
                                  className={cn(
                                    "text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700",
                                    interFont.className
                                  )}
                                >
                                  Your Answer
                                </span>
                              )}
                              {isCorrectAnswer && (
                                <span
                                  className={cn(
                                    "text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700",
                                    interFont.className
                                  )}
                                >
                                  {isUserAnswer ? "Correct" : "Correct Answer"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Answer Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5
                        className={cn(
                          "font-medium text-gray-700 mb-2",
                          interFont.className
                        )}
                      >
                        Your Answer:
                      </h5>
                      <p
                        className={cn(
                          `p-2 rounded ${
                            question.userAnswer?.isCorrect
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`,
                          interFont.className
                        )}
                      >
                        {question.userAnswer?.optionText || "Not answered"}
                      </p>
                    </div>
                    <div>
                      <h5
                        className={cn(
                          "font-medium text-gray-700 mb-2",
                          interFont.className
                        )}
                      >
                        Correct Answer:
                      </h5>
                      <p
                        className={cn(
                          "p-2 rounded bg-green-100 text-green-800",
                          interFont.className
                        )}
                      >
                        {question.correctAnswer?.optionText || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-6 ">
          <Button
            onClick={() => router.push(`/quiz/${quizId}/leaderboard`)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <FaTrophy className="text-sm" />
            View Leaderboard
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default QuizResponse;
