import { z } from "zod";

const addQuestion = z.object({
  body: z.object({
    text: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    quizId: z.string({ message: "quizId must be a valid UUID" }),
    required: z.boolean().optional(),
    options: z
      .array(
        z.object({
          text: z
            .string()
            .min(1, { message: "Option text is required" })
            .max(50, { message: "Option must not exceed 50 characters" }),
        })
      )
      .min(1, { message: "At least one option is required" }),
  }),
});

const addBulkQuestions = z.object({
  body: z.object({
    quizId: z.string({ message: "quizId must be a valid UUID" }),
    questions: z
      .array(
        z.object({
          text: z
            .string()
            .min(3, {
              message: "Question text must be at least 3 characters long",
            })
            .max(500, {
              message: "Question text must not exceed 500 characters",
            }),
          options: z
            .array(
              z.object({
                text: z
                  .string()
                  .min(1, { message: "Option text is required" })
                  .max(200, {
                    message: "Option must not exceed 200 characters",
                  }),
                isCorrectAnswer: z.boolean().optional(),
              })
            )
            .min(2, { message: "At least 2 options are required" })
            .max(10, { message: "Maximum 10 options allowed" }),
        })
      )
      .min(1, { message: "At least one question is required" })
      .max(50, { message: "Maximum 50 questions allowed" }),
  }),
});

export default {
  addQuestion,
  addBulkQuestions,
};
