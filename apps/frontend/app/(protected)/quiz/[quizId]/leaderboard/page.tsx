"use client";
import { useParams } from "next/navigation";
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
import { FaTrophy, FaMedal, FaAward, FaArrowLeft } from "react-icons/fa";
import { useGetLeaderboard, useGetQuiz } from "@/app/services/queries";
import SkeletonLoading from "@/app/pages/quiz/components/skeleton-loading";
import { useRouter } from "next/navigation";

interface LeaderboardEntry {
  userId: string;
  userName: string;
  userImage: string | null;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  submissionTime: string;
  rank: number;
}

const LeaderboardPage = () => {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId?.toString();

  // Query hooks
  const getQuizQuery = useGetQuiz(quizId || "", { enabled: !!quizId });
  const getLeaderboardQuery = useGetLeaderboard(quizId || "", {
    enabled: !!quizId,
  });

  const quizData = getQuizQuery.data?.data;
  const leaderboardData: LeaderboardEntry[] =
    getLeaderboardQuery.data?.data || [];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaTrophy className="text-yellow-500 text-2xl" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaAward className="text-amber-600 text-2xl" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
    if (rank === 3)
      return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
    return "bg-white border-gray-200";
  };

  // Error handling
  if (!quizId) {
    return <div>Quiz ID is required</div>;
  }

  if (getQuizQuery.isLoading || getLeaderboardQuery.isLoading) {
    return <SkeletonLoading />;
  }

  if (getQuizQuery.isError || getLeaderboardQuery.isError) {
    return <div>Error loading leaderboard</div>;
  }

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 ">
          <Button
            onClick={() => router.push(`/dashboard`)}
            variant="outline"
            className="mb-4 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-lg text-gray-600">
            {quizData?.title} - See how you rank against other participants
          </p>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Rankings based on percentage score. Users with the same score
              share the same rank.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <FaTrophy className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No submissions yet</p>
                <p className="text-gray-400">
                  Be the first to complete this quiz!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div
                    key={`${entry.userId}-${entry.submissionTime}-${index}`}
                    className={`p-4 rounded-lg border-2 ${getRankColor(entry.rank)} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getRankIcon(entry.rank)}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {entry.userImage ? (
                              <img
                                src={entry.userImage}
                                alt={entry.userName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-semibold text-gray-600">
                                {entry.userName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {entry.userName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                entry.submissionTime
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {entry.percentage}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.correctAnswers}/{entry.totalQuestions} correct
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Summary */}
        {leaderboardData.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quiz Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {leaderboardData.length}
                  </div>
                  <div className="text-blue-700">Total Participants</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      leaderboardData.reduce(
                        (sum, entry) => sum + entry.percentage,
                        0
                      ) / leaderboardData.length
                    )}
                    %
                  </div>
                  <div className="text-green-700">Average Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {leaderboardData[0]?.percentage}%
                  </div>
                  <div className="text-purple-700">Highest Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default LeaderboardPage;
