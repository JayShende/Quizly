export interface Option {
  id: string;
  text: string;
  questionId: string;
}

export interface Question {
  id: string;
  text: string;
  order: number;
  options: Option[];
}

export interface QuizData {
  questions: Question[];
}

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface QuizState {
  showPreQuizForm: boolean;
  currentQuestionIndex: number;
  answers: Answer[];
  timeLeft: number;
  isQuizCompleted: boolean;
  isSubmitting: boolean;
  isQuizStarted: boolean;
}
