import React from "react";
import Container from "@/app/pages/dashboard/components/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Question } from "../types";
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import QuizFooter from "./QuizFooter";

interface QuizInterfaceProps {
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  answeredCount: number;
  isSubmitting: boolean;
  areAllQuestionsAnswered: boolean;
  currentAnswer?: { questionId: string; optionId: string };
  onAnswerSelect: (optionId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({
  questions,
  currentQuestionIndex,
  timeLeft,
  answeredCount,
  isSubmitting,
  areAllQuestionsAnswered,
  currentAnswer,
  onAnswerSelect,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="py-10">
      <Card className="mx-auto max-w-4xl h-[90vh] pt-0 flex flex-col">
        <div className="w-full h-4 rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600" />

        <CardHeader>
          <QuizHeader
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            answeredCount={answeredCount}
          />
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswerSelect={onAnswerSelect}
            />
          )}
        </CardContent>

        <div className="px-6 pb-6">
          <QuizFooter
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            isSubmitting={isSubmitting}
            areAllQuestionsAnswered={areAllQuestionsAnswered}
            onPrevious={onPrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        </div>
      </Card>
    </Container>
  );
};

export default QuizInterface;
