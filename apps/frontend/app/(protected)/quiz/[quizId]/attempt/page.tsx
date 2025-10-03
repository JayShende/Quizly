"use client";
import { useParams } from "next/navigation";
import React, { useState, useCallback } from "react";
import {
  useCheckIfQuizIsSubmitted,
  useGetQuiz,
  useSubmitQuiz,
  useGetQuizScore,
} from "@/app/services/queries";
import SkeletonLoading from "@/app/pages/quiz/components/skeleton-loading";
import { QuizData } from "./types";
import {
  useQuizTimer,
  useQuizAnswers,
  useQuizNavigation,
  useQuizPrevention,
  useFullscreen,
} from "./hooks";
import {
  PreQuizForm,
  QuizInterface,
  QuizCompleted,
  QuizSubmited,
} from "./components";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const params = useParams();
  const quizId = params.quizId?.toString();
  const router = useRouter();
  // State management
  const [showPreQuizForm, setShowPreQuizForm] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState<{
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  // Check if quiz is submitted
  const checkIfQuizIsSubmittedQuery = useCheckIfQuizIsSubmitted(quizId || "");
  // Query hooks
  const getQuizQuery = useGetQuiz(quizId || "", { enabled: !!quizId });
  const submitQuizMutation = useSubmitQuiz();
  const getQuizScoreQuery = useGetQuizScore(quizId || "", {
    enabled: !!quizId && checkIfQuizIsSubmittedQuery.data?.data === true,
  });

  // Get quiz data
  const quizData: QuizData = getQuizQuery.data?.data;
  const questions = quizData?.questions || [];

  // Custom hooks
  const { enterFullscreen, exitFullscreen } = useFullscreen({
    isQuizStarted,
    isQuizCompleted,
  });

  const {
    answers,
    handleAnswerSelect,
    isQuestionAnswered,
    getAnswerForQuestion,
    areAllQuestionsAnswered,
    resetAnswers,
  } = useQuizAnswers(questions);

  const {
    currentQuestionIndex,
    goToNextQuestion,
    goToPreviousQuestion,
    resetNavigation,
  } = useQuizNavigation(questions.length);

  // Submit quiz function
  const handleSubmitQuiz = useCallback(async () => {
    if (isSubmitting || !quizId) return;

    setIsSubmitting(true);
    setIsQuizCompleted(true);
    setIsQuizStarted(false);

    try {
      const mutationResult = await submitQuizMutation.mutateAsync({
        quizId,
        answers,
      });
      const score: { correctAnswers: number; totalQuestions: number } =
        mutationResult.data.score;
      setQuizScore(score);
      toast.success("Quiz submitted successfully!");
      // Only exit fullscreen after successful submission and score received
      exitFullscreen();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Error submitting quiz. Please try again.");
      setIsQuizCompleted(false);
      // Exit fullscreen even on error to allow user to retry
      exitFullscreen();
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, isSubmitting, quizId, submitQuizMutation, exitFullscreen]);

  const { timeLeft, resetTimer } = useQuizTimer({
    isQuizStarted,
    isQuizCompleted,
    showPreQuizForm,
    duration: getQuizQuery.data?.data.duration || 180,
    onTimeUp: handleSubmitQuiz,
  });

  // Prevention hooks 
  useQuizPrevention({ isQuizStarted, isQuizCompleted });

  // Start quiz function
  const handleStartQuiz = useCallback(() => {
    setShowPreQuizForm(false);
    setIsQuizStarted(true);
    resetTimer();
    enterFullscreen();
  }, [resetTimer, enterFullscreen]);

  // Handle answer selection for current question
  const handleAnswerSelectForCurrentQuestion = useCallback(
    (optionId: string) => {
      if (questions[currentQuestionIndex]) {
        handleAnswerSelect(questions[currentQuestionIndex].id, optionId);
      }
    },
    [questions, currentQuestionIndex, handleAnswerSelect]
  );

  // Handle manual submit
  const handleManualSubmit = useCallback(() => {
    if (areAllQuestionsAnswered()) {
      handleSubmitQuiz();
    } else {
      alert("Please answer all questions before submitting.");
    }
  }, [areAllQuestionsAnswered, handleSubmitQuiz]);

  // Error handling
  if (!quizId) {
    return <div>Quiz ID is required</div>;
  }

  if (checkIfQuizIsSubmittedQuery.isLoading) {
    return <SkeletonLoading />;
  }
  if (checkIfQuizIsSubmittedQuery.isError) {
    return <div>Error loading quiz</div>;
  }
  if (checkIfQuizIsSubmittedQuery.data?.data) {
    // Quiz is already submitted, show QuizCompleted component
    const submittedScore = getQuizScoreQuery.data?.data;
    const isScoreLoading = getQuizScoreQuery.isLoading;
    const scoreError = getQuizScoreQuery.isError;

    return (
      <QuizSubmited
        totalQuestions={questions.length}
        answeredQuestions={questions.length} // All questions are answered if quiz is submitted
        score={submittedScore || undefined}
        quizId={quizId || ""}
        isSubmitting={isScoreLoading}
      />
    );
  }
  if (getQuizQuery.isLoading) {
    return <SkeletonLoading />;
  }

  if (getQuizQuery.isError) {
    return <div>Error loading quiz</div>;
  }

  // Render different states
  if (showPreQuizForm) {
    return (
      <PreQuizForm
        totalQuestions={questions.length}
        duration={getQuizQuery.data?.data.duration || 180}
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  if (isQuizCompleted) {
    return (
      <QuizCompleted
        totalQuestions={questions.length}
        answeredQuestions={answers.length}
        score={quizScore || undefined}
        quizId={quizId || ""}
        isSubmitting={isSubmitting}
      />
    );
  }

  return (
    <QuizInterface
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      timeLeft={timeLeft}
      answeredCount={answers.length}
      isSubmitting={isSubmitting}
      areAllQuestionsAnswered={areAllQuestionsAnswered()}
      currentAnswer={
        questions[currentQuestionIndex]
          ? getAnswerForQuestion(questions[currentQuestionIndex].id)
          : undefined
      }
      onAnswerSelect={handleAnswerSelectForCurrentQuestion}
      onPrevious={goToPreviousQuestion}
      onNext={goToNextQuestion}
      onSubmit={handleManualSubmit}
    />
  );
};

export default QuizPage;
