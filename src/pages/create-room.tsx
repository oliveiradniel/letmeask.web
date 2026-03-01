import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Room } from "@/entities/room";
import { useCreateRoom } from "@/hooks/use-create-room";
import { useListRooms } from "@/hooks/use-list-rooms";
import {
  type CreateRoomData,
  CreateRoomSchema,
} from "@/schemas/create-room-schema";
import { formatTimeToNow } from "@/utils/format-relative-date";

export function CreateRoom() {
  const queryClient = useQueryClient();

  const { rooms, isFetchingRooms } = useListRooms();
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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Criar sala</CardTitle>

              <CardDescription>
                Crie uma nova sala para começar a fazer perguntas e receber
                repostas da IA!
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

          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>

              <CardDescription>
                Acesso rápido para salas criadas recentemente
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              {isFetchingRooms &&
                Array.from({ length: 5 }).map(() => (
                  <div
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                    key={crypto.randomUUID()}
                  >
                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="font-medium">Carregando...</h3>

                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4.5 w-16 rounded-full" />

                        <Skeleton className="h-4.5 w-16 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm opacity-50">
                      <span>Entrar</span>
                      <ArrowRight className="size-3" />
                    </div>
                  </div>
                ))}

              {!isFetchingRooms &&
                rooms.map((room) => {
                  return (
                    <Link
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                      key={room.id}
                      to={`/rooms/${room.id}`}
                    >
                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="font-medium">{room.name}</h3>

                        <div className="flex items-center gap-2">
                          <Badge className="text-xs" variant="secondary">
                            {formatTimeToNow(room.createdAt)}
                          </Badge>

                          <Badge className="text-xs" variant="secondary">
                            {room.questionCount} pergunta(s)
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <span>Entrar</span>
                        <ArrowRight className="size-3" />
                      </div>
                    </Link>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
