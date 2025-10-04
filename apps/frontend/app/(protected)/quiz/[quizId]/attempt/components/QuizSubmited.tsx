import React from "react";
import Container from "@/app/pages/dashboard/components/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaTrophy, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface QuizSubmitedProps {
  totalQuestions: number;
  answeredQuestions: number;
  score?: {
    correctAnswers: number;
    totalQuestions: number;
  };
  quizId: string;
  isSubmitting?: boolean;
}

const QuizSubmited: React.FC<QuizSubmitedProps> = ({
  totalQuestions,
  answeredQuestions,
  score,
  quizId,
  isSubmitting = false,
}) => {
  const router = useRouter();

  const percentage = score
    ? Math.round((score.correctAnswers / score.totalQuestions) * 100)
    : 0;
  return (
   <Container>
     <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl min-h-[90vh] flex flex-col py-0">
        <div className="w-full h-3 rounded-t-xl bg-gradient-to-r from-green-500 to-emerald-600" />
        <CardHeader className="text-center pb-4 flex-shrink-0">
          <div className="flex justify-center mb-3">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isSubmitting ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {isSubmitting ? (
                <FaSpinner className="text-3xl text-blue-600 animate-spin" />
              ) : (
                <FaCheckCircle className="text-3xl text-green-600" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            {isSubmitting ? "Fetching Score..." : "Quiz Already Submitted!"}
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {isSubmitting
              ? "Please wait while we fetch your score"
              : "You have already submitted the quiz"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="text-center w-full max-h-full flex flex-col justify-center">
            {isSubmitting ? (
              <div className="space-y-3">
                <p className="text-lg text-gray-700 font-medium">
                  Fetching your score...
                </p>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Please wait while we fetch your score. This may take a few
                  moments.
                </p>
                <div className="flex justify-center">
                  <div className="animate-pulse bg-blue-100 rounded-lg p-3">
                    <FaSpinner className="text-xl text-blue-600 animate-spin mx-auto" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-lg text-gray-700 font-medium">
                  Thank you for completing the quiz!
                </p>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your answers have been submitted successfully. You can now
                  close this window or navigate back to the dashboard.
                </p>
              </div>
            )}

            {!isSubmitting && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 mt-4">
                <h3 className="text-base font-semibold text-green-800 mb-3">
                  Quiz Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">
                      {totalQuestions}
                    </div>
                    <div className="text-green-700 text-xs">
                      Total Questions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">
                      {answeredQuestions}
                    </div>
                    <div className="text-green-700 text-xs">
                      Questions Answered
                    </div>
                  </div>
                </div>

                {score && (
                  <div className="bg-white rounded-lg p-3 border border-green-200 mb-3">
                    <h4 className="text-base font-semibold text-gray-800 mb-2 text-center">
                      Your Score
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {score.correctAnswers}
                        </div>
                        <div className="text-gray-600 text-xs">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {score.totalQuestions - score.correctAnswers}
                        </div>
                        <div className="text-gray-600 text-xs">Incorrect</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {percentage}%
                        </div>
                        <div className="text-gray-600 text-xs">Percentage</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    onClick={() => router.push(`/quiz/${quizId}/leaderboard`)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <FaTrophy className="text-sm" />
                    View Leaderboard
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    Back to Dashboard
                  </Button>
                  <Button
                    onClick={() => router.push(`/quiz/${quizId}/response`)}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    View Your Response
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
   </Container>
  );
};

export default QuizSubmited;
