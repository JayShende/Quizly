import { useState, useEffect, useCallback } from "react";

interface UseQuizTimerProps {
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  showPreQuizForm: boolean;
  onTimeUp: () => void;
}

export const useQuizTimer = ({
  isQuizStarted,
  isQuizCompleted,
  showPreQuizForm,
  onTimeUp,
}: UseQuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const resetTimer = useCallback(() => {
    setTimeLeft(300);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizCompleted && !showPreQuizForm) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isQuizCompleted && !showPreQuizForm) {
      onTimeUp();
    }
  }, [timeLeft, isQuizCompleted, showPreQuizForm, onTimeUp]);

  return { timeLeft, resetTimer };
};
