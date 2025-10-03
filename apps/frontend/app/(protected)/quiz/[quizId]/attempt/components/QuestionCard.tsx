import React from "react";
import { Question, Answer } from "../types";

interface QuestionCardProps {
  question: Question;
  currentAnswer?: Answer;
  onAnswerSelect: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerSelect,
}) => {
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
          {question.text}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = currentAnswer?.optionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 group ${
                isSelected
                  ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-600 group-hover:bg-indigo-200 group-hover:text-indigo-700"
                  }`}
                >
                  {optionLabels[index] || String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-800 font-medium text-sm">
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
