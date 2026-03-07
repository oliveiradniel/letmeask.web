import z from "zod";

export const CreateQuestionSchema = z.object({
  roomId: z.uuid(),
  question: z
    .string()
    .min(1, "A pergunta é obrigatória")
    .min(10, "A pergunta deve ter pelo menos 10 caracteres")
    .max(500, "A pergunta deve ter menos de 500 caracteres"),
});

export type CreateQuestionData = z.infer<typeof CreateQuestionSchema>;
