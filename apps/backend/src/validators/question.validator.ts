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

export default {
  addQuestion,
};