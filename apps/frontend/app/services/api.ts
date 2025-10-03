// get all quiz meta data
import axios from "axios";

export const baseUrl = "api/proxy/v1";

export const getQuizMetaData = async () => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/quiz/get-all-quiz-meta-data`,
  });
  return response.data;
};

export const getQuiz = async (quizId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/quiz/get/${quizId}`,
  });
  return response.data;
};

export interface SubmitQuizProps {
  quizId: string;
  answers: Array<{ questionId: string; optionId: string }>;
}

export const submitQuiz = async (data: SubmitQuizProps) => {
  const response = await axios({
    method: "post",
    url: `/${baseUrl}/response/add`,
    data: data,
  });
  return response.data;
};

export const getLeaderboard = async (quizId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/quiz/leaderboard/${quizId}`,
  });
  return response.data;
};

// check if the quiz is already submitted
export const checkIfQuizIsSubmitted = async (quizId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/quiz/check-if-quiz-is-submitted/${quizId}`,
  });
  return response.data;
};

// get quiz score
export const getQuizScore = async (quizId: string) => {
  const response = await axios({
    method: "get",
    url: `/${baseUrl}/quiz/get-score/${quizId}`,
  });
  return response.data;
};
