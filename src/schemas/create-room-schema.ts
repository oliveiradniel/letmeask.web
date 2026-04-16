import z from "zod";

export const CreateRoomSchema = z.object({
  name: z.string().min(3, "Inclua no mínimo 3 caracteres."),
  description: z.string().nullable(),
});

export type CreateRoomData = z.infer<typeof CreateRoomSchema>;
