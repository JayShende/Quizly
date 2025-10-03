import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Take quizzes and test your knowledge.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
