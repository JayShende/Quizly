"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub, FaGoogle, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { interFont } from "@/app/fonts/fonts";
import Container from "@/app/pages/dashboard/components/container";

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: "github" | "google") => {
    setIsLoading(provider);
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Container className="px-0 sm:px-4">
      <div className=" flex items-center justify-center p-4 ">
        <Card className="w-full max-w-md py-0">
          {/* Gradient Header */}
          <div className="w-full h-3 rounded-t-xl bg-gradient-to-r from-blue-500 to-purple-600" />

          <CardHeader className="text-center pb-6 ">
            {/* Logo/Brand */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span
                  className={cn(
                    "text-2xl font-bold text-white",
                    interFont.className
                  )}
                >
                  Q
                </span>
              </div>
            </div>

            <CardTitle
              className={cn(
                "text-2xl font-bold text-gray-900 mb-2",
                interFont.className
              )}
            >
              Welcome to Quizly
            </CardTitle>
            <CardDescription
              className={cn("text-base text-gray-600", interFont.className)}
            >
              Sign in to continue your learning journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-8">
            {/* GitHub Login Button */}
            <Button
              className={cn(
                "w-full h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.02]",
                "bg-gray-900 hover:bg-gray-800 text-white border-0",
                "flex items-center justify-center gap-3",
                interFont.className
              )}
              onClick={() => handleLogin("github")}
              disabled={isLoading !== null}
            >
              {isLoading === "github" ? (
                <FaSpinner className="text-lg animate-spin" />
              ) : (
                <FaGithub className="text-lg" />
              )}
              <span>
                {isLoading === "github"
                  ? "Signing in..."
                  : "Continue with GitHub"}
              </span>
            </Button>

            {/* Google Login Button */}
            <Button
              className={cn(
                "w-full h-12 text-base font-semibold transition-all duration-200 hover:scale-[1.02]",
                "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300",
                "flex items-center justify-center gap-3",
                interFont.className
              )}
              onClick={() => handleLogin("google")}
              disabled={isLoading !== null}
            >
              {isLoading === "google" ? (
                <FaSpinner className="text-lg animate-spin" />
              ) : (
                <FaGoogle className="text-lg text-red-500" />
              )}
              <span>
                {isLoading === "google"
                  ? "Signing in..."
                  : "Continue with Google"}
              </span>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={cn(
                    "px-4 bg-white text-gray-500",
                    interFont.className
                  )}
                >
                  Secure authentication
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className={cn(interFont.className)}>
                  Create and take quizzes
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className={cn(interFont.className)}>
                  Track your progress
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className={cn(interFont.className)}>
                  Compete with others
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default LoginComponent;
