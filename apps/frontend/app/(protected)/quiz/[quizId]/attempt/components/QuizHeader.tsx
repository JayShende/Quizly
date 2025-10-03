import React from "react";
import { FaClock } from "react-icons/fa6";

interface QuizHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  answeredCount: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  answeredCount,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="pb-4 flex-shrink-0">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-900">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h2>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
          <FaClock className="text-red-600 text-sm" />
          <span className="font-mono text-lg font-bold text-red-600">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>
            {answeredCount}/{totalQuestions} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
