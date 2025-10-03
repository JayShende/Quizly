import { useState, useCallback } from "react";
import { Answer, Question } from "../types";

export const useQuizAnswers = (questions: Question[]) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswerSelect = useCallback(
    (questionId: string, optionId: string) => {
      const newAnswer: Answer = {
        questionId,
        optionId,
      };

      setAnswers((prev) => {
        const existingAnswerIndex = prev.findIndex(
          (answer) => answer.questionId === questionId
        );

        if (existingAnswerIndex >= 0) {
          // Update existing answer
          const updatedAnswers = [...prev];
          updatedAnswers[existingAnswerIndex] = newAnswer;
          return updatedAnswers;
        } else {
          // Add new answer
          return [...prev, newAnswer];
        }
      });
    },
    []
  );

  const isQuestionAnswered = useCallback(
    (questionId: string) => {
      return answers.some((answer) => answer.questionId === questionId);
    },
    [answers]
  );

  const getAnswerForQuestion = useCallback(
    (questionId: string) => {
      return answers.find((answer) => answer.questionId === questionId);
    },
    [answers]
  );

  const areAllQuestionsAnswered = useCallback(() => {
    return answers.length === questions.length;
  }, [answers.length, questions.length]);

  const resetAnswers = useCallback(() => {
    setAnswers([]);
  }, []);

  return {
    answers,
    handleAnswerSelect,
    isQuestionAnswered,
    getAnswerForQuestion,
    areAllQuestionsAnswered,
    resetAnswers,
  };
};
