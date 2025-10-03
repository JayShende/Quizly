import { useState, useEffect, useCallback } from "react";

interface UseQuizTimerProps {
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  showPreQuizForm: boolean;
  duration: number;
  onTimeUp: () => void;
}

export const useQuizTimer = ({
  isQuizStarted,
  isQuizCompleted,
  showPreQuizForm,
  duration,
  onTimeUp,
}: UseQuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Duration in seconds

  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Update timeLeft when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

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

// this hook is used to manage the timer for the quiz
