import { z } from "zod";

const response = z.object({
  body: z.object({
    quizId: z.string({ message: "quizId must be a valid String" }),
    answers: z.array(
      z.object({
        questionId: z.string({ message: "questionId must be a valid String" }),
        optionId: z.string({ message: "optionId must be a valid String" }),
      })
    ),
  }),
});

export default { response };
