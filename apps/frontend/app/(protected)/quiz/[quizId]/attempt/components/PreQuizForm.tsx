import React from "react";
import Container from "@/app/pages/dashboard/components/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { interFont } from "@/app/fonts/fonts";

interface PreQuizFormProps {
  totalQuestions: number;
  duration: number;
  onStartQuiz: () => void;
}

const PreQuizForm: React.FC<PreQuizFormProps> = ({
  totalQuestions,
  duration,
  onStartQuiz,
}) => {
  return (
    <Container className="py-10">
      <Card className="mx-auto max-w-4xl h-[90vh] pt-0 overflow-y-auto">
        <div className="w-full h-4 rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600" />
        <CardHeader className="text-center pb-6">
          <CardTitle
            className={cn(
              "text-3xl font-bold text-gray-900 mb-4",
              interFont.className
            )}
          >
            Quiz Instructions
          </CardTitle>
          <CardDescription
            className={cn("text-lg text-gray-600", interFont.className)}
          >
            Please read the following instructions carefully before starting the
            quiz
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1 overflow-y-auto">
          {/* Quiz Details */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
            <h3
              className={cn(
                "text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2",
                interFont.className
              )}
            >
              <FaInfoCircle className="text-blue-600" />
              Quiz Details
            </h3>
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-3",
                interFont.className
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">
                  <strong>Total Questions:</strong> {totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">
                  <strong>Time Limit:</strong> {duration/60} minutes
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">
                  <strong>Question Type:</strong> Multiple Choice
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">
                  <strong>Navigation:</strong> Previous/Next allowed
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3
              className={cn(
                "text-xl font-semibold text-gray-900 flex items-center gap-2",
                interFont.className
              )}
            >
              <FaCheckCircle className="text-green-600" />
              Instructions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                  1
                </div>
                <div className={interFont.className}>
                  <p className="text-gray-700 font-medium text-sm">
                    Read each question carefully
                  </p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    Take your time to understand what is being asked before
                    selecting your answer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                  2
                </div>
                <div className={interFont.className}>
                  <p className="text-gray-700 font-medium text-sm">
                    Select your answer
                  </p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    Click on the option you believe is correct. You can change
                    your answer before submitting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                  3
                </div>
                <div className={interFont.className}>
                  <p className="text-gray-700 font-medium text-sm">
                    Navigate between questions
                  </p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    Use the Previous and Next buttons to move between questions.
                    You can review and change answers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                  4
                </div>
                <div className={interFont.className}>
                  <p className="text-gray-700 font-medium text-sm">
                    Submit when ready
                  </p>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    Click "Submit Quiz" when you've answered all questions. The
                    quiz will auto-submit when time runs out.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3
              className={cn(
                "text-lg font-semibold text-amber-800 flex items-center gap-2 mb-4",
                interFont.className
              )}
            >
              <FaExclamationTriangle className="text-amber-600" />
              Important Notes
            </h3>
            <ul className={cn("space-y-3 text-amber-700", interFont.className)}>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">
                  The quiz will automatically enter fullscreen mode when started
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">
                  The timer will start as soon as you begin the quiz
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">
                  Make sure you have a stable internet connection
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">
                  Do not refresh the page during the quiz
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">
                  Answer all questions before submitting
                </span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-4 flex-shrink-0">
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3"
          >
            <FaPlay className="text-lg" />
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default PreQuizForm;
