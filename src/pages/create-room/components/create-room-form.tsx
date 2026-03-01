import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Room } from "@/entities/room";
import { useCreateRoom } from "@/hooks/use-create-room";
import {
  type CreateRoomData,
  CreateRoomSchema,
} from "@/schemas/create-room-schema";

export function CreateRoomForm() {
  const queryClient = useQueryClient();

  const { createRoom, isCreatingRoom } = useCreateRoom();

  const [errorName, setErrorName] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateRoomSchema),
  });

  const errorNameMessage = form.formState.errors.name?.message || errorName;
  const formDisabled = !form.formState.isValid || isCreatingRoom;

  const handleSubmit = form.handleSubmit(async (data: CreateRoomData) => {
    try {
      const createdRoom = await createRoom(data);

      queryClient.setQueryData<Room[]>(["rooms"], (old) => [
        createdRoom,
        ...(old ?? []),
      ]);

      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;

        if (errorMessage === "This name already in use.") {
          setErrorName("Este nome já está em uso.");
        }

        return;
      }

      console.log(`Error: ${error}`);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>

        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber repostas
          da IA!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel
              className="after:text-destructive after:content-['*']"
              htmlFor="name"
            >
              Nome da sala
            </FieldLabel>

            <Input
              aria-invalid={!!form.formState.errors.name}
              id="name"
              placeholder="Digite o nome da sala"
              {...form.register("name", {
                onChange: () => setErrorName(null),
              })}
            />

            <FieldError>{errorNameMessage}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Descrição</FieldLabel>

            <Textarea
              aria-invalid={!!form.formState.errors.description}
              id="description"
              {...form.register("description")}
            />

            <FieldError>
              {form.formState.errors.description?.message}
            </FieldError>
          </Field>

          <Button disabled={formDisabled} type="submit">
            {isCreatingRoom ? (
              <span className="flex items-center gap-1">
                <Spinner /> Criando sala...
              </span>
            ) : (
              "Criar sala"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
