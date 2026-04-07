import z from "zod";

export const CreateQuestionSchema = z.object({
  question: z
    .string()
    .min(10, "A pergunta deve ter pelo menos 10 caracteres.")
    .max(500, "A pergunta deve ter menos de 500 caracteres."),
});

export type CreateQuestionForm = z.infer<typeof CreateQuestionSchema>;

export type CreateQuestionPayload = CreateQuestionForm & { roomId: string };
