import LoginComponent from "@/components/login_component_1";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Quizly account.",
};

const LoginPage = () => {
  return <LoginComponent />;
};

export default LoginPage;
