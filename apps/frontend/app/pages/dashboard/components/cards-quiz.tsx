"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuAlarmClock } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { interFont, openSansFont } from "@/app/fonts/fonts";
import { useGetQuizMetaData } from "@/app/services/queries";
import  { useRouter } from "next/navigation";

interface quizMetaDataProps {
  id: string;
  title: string;
  description: string;
}

const CardsQuiz = () => {
  const router = useRouter()
  const getQuizMetaDataQuery = useGetQuizMetaData();
  if (getQuizMetaDataQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (getQuizMetaDataQuery.isError) {
    return <div>Error</div>;
  }
  const quizMetaData = getQuizMetaDataQuery.data.data;
  if (quizMetaData.length === 0) {
    return <div>No quiz meta data found</div>;
  }
  return (
    <div className="px-2 py-10 grid grid-cols-3 gap-4">
      {quizMetaData.map((quiz: quizMetaDataProps) => {
        return <Card className="pt-0" key={quiz.id}>
          <Image
            className="h-44 w-full rounded-t-lg"
            src="/images/quiz_card.jpg"
            width={40}
            height={10}
            alt="card_image"
          />
          <CardHeader>
            <CardTitle
              className={cn("text-lg text-indigo-600", interFont.className)}
            >
              {quiz.title}
            </CardTitle>
            <CardDescription
              className={cn("text-gray-500 text-sm", openSansFont.className)}
            >
              {quiz.description}
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2 ">
              <LuAlarmClock className="text-indigo-600" />
              <span
                className={cn(
                  "text-gray-600 text-sm font-medium",
                  openSansFont.className
                )}
              >
                Duration - 10 Minutes
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full flex items-center gap-x-2 rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-600 transition duration-300 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
              variant="outline"
              onClick={() => {
                router.push(`/quiz/${quiz.id}`);
              }}
            >
              Attempt Now
            </Button>
          </CardFooter>
        </Card>;
      })}
    </div>
  );
};

export default CardsQuiz;
