import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

interface QuizFooterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
  areAllQuestionsAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuizFooter: React.FC<QuizFooterProps> = ({
  currentQuestionIndex,
  totalQuestions,
  isSubmitting,
  areAllQuestionsAnswered,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between pt-4 flex-shrink-0">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        size="lg"
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
      >
        <FaArrowLeftLong className="text-sm" />
        Previous
      </Button>

      <div className="flex gap-3">
        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            disabled={!areAllQuestionsAnswered || isSubmitting}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              "Submit Quiz"
            )}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
          >
            Next
            <FaArrowRightLong className="text-sm" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizFooter;
