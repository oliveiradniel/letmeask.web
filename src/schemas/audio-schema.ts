import z from "zod";

const MAX_MB = 5 * 1024 * 1024; // 5MB

export const AudioSchema = z
  .instanceof(Blob)
  .refine((audio) => audio.size > 0, "O áudio está vazio.")
  .refine((audio) => audio.size <= MAX_MB, "O áudio é maior que 5MB.")
  .refine((audio) => audio.type.includes("audio/webm"), "Formato inválido.");
