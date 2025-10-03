import Container from "@/app/pages/dashboard/components/container";
import Header from "@/app/pages/dashboard/components/header";
import CardsQuiz from "@/app/pages/dashboard/components/cards-quiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your quiz dashboard and track your progress.",
};

const Dash = () => {
  return (
    <Container>
      <Header />
      <CardsQuiz />
    </Container>
  );
};

export default Dash;
