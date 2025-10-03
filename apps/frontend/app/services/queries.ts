import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getQuiz,
  getQuizMetaData,
  submitQuiz,
  SubmitQuizProps,
  getLeaderboard,
  checkIfQuizIsSubmitted,
  getQuizScore,
  getResponseByQuizIdAndUserId,
} from "./api";

export function useGetQuizMetaData() {
  return useQuery({
    queryKey: ["quiz-meta-data"],
    queryFn: getQuizMetaData,
    refetchOnWindowFocus: false,
  });
}

export function useGetQuiz(quizId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz(quizId),
    refetchOnWindowFocus: false,
    enabled: options?.enabled !== false && !!quizId,
  });
}

export function useCheckIfQuizIsSubmitted(quizId: string) {
  return useQuery({
    queryKey: ["check-if-quiz-is-submitted", quizId],
    queryFn: () => checkIfQuizIsSubmitted(quizId),
    refetchOnWindowFocus: false,
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: (data: SubmitQuizProps) => submitQuiz(data),
  });
}

export function useGetLeaderboard(
  quizId: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["leaderboard", quizId],
    queryFn: () => getLeaderboard(quizId),
    refetchOnWindowFocus: false,
    enabled: options?.enabled !== false && !!quizId,
  });
}

export function useGetQuizScore(
  quizId: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["quiz-score", quizId],
    queryFn: () => getQuizScore(quizId),
    refetchOnWindowFocus: false,
    enabled: options?.enabled !== false && !!quizId,
  });
}


// get response by quizid and userid
export function useGetResponseByQuizIdAndUserId(quizId: string) {
  return useQuery({
    queryKey: ["response-by-quizid-and-userid", quizId],
    queryFn: () => getResponseByQuizIdAndUserId(quizId),
    refetchOnWindowFocus: false,
  });
}