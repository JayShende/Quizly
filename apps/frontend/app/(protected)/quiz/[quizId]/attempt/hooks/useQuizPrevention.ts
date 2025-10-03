import { useEffect } from "react";

interface UseQuizPreventionProps {
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
}

export const useQuizPrevention = ({
  isQuizStarted,
  isQuizCompleted,
}: UseQuizPreventionProps) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizStarted && !isQuizCompleted) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your quiz progress will be lost.";
        return "Are you sure you want to leave? Your quiz progress will be lost.";
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isQuizStarted && !isQuizCompleted) {
        // Prevent F5, Ctrl+R, Ctrl+Shift+R
        if (
          e.key === "F5" ||
          (e.ctrlKey && e.key === "r") ||
          (e.ctrlKey && e.shiftKey && e.key === "R")
        ) {
          e.preventDefault();
          alert("Please do not refresh the page during the quiz!");
        }
        // Prevent Ctrl+W (close tab)
        if (e.ctrlKey && e.key === "w") {
          e.preventDefault();
          alert("Please do not close the tab during the quiz!");
        }
      }
    };

    if (isQuizStarted && !isQuizCompleted) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQuizStarted, isQuizCompleted]);
};
