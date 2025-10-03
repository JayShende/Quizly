import { useEffect } from "react";

interface UseFullscreenProps {
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
}

export const useFullscreen = ({
  isQuizStarted,
  isQuizCompleted,
}: UseFullscreenProps) => {
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Fullscreen not supported or denied:", err);
      });
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.log("Error exiting fullscreen:", err);
      });
    }
  };

  useEffect(() => {
    if (isQuizCompleted && document.fullscreenElement) {
      exitFullscreen();
    }
  }, [isQuizCompleted]);

  return { enterFullscreen, exitFullscreen };
};
