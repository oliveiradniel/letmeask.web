import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, RefreshCw, XIcon } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useCreateRoom } from "@/hooks/use-create-room";
import {
  ROOMS_QUERY_KEY,
  type RoomQueryData,
  useListRooms,
} from "@/hooks/use-list-rooms";
import { cn } from "@/lib/utils";
import { formatTimeToNow } from "@/utils/format-relative-date";
import internalServerErrorImage from "../../../assets/images/internal-server-error.svg";

export function RoomList() {
  const queryClient = useQueryClient();

  const { rooms, refetchRoomsList, isLoadingRooms, error } = useListRooms();
  const { createRoom, isCreatingRoom } = useCreateRoom();

  function handleWithRoomCreationReversal(roomId: string) {
    queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, (old) => {
      if (!old) {
        return old;
      }

      return old.filter((room) => room.id !== roomId);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>

        <CardDescription>
          Acesso rápido para salas criadas recentemente
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoadingRooms &&
          !error &&
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

        {!isLoadingRooms &&
          rooms.map((room) => {
            return (
              <Link
                className={cn(
                  "flex flex-col gap-4 rounded-lg border p-3",
                  room._isCreating &&
                    "pointer-events-none animate-pulse opacity-70",
                  !(room._isCreating || room._hasError) && "hover:bg-accent/50",
                  room._hasError && "cursor-default border-destructive/60"
                )}
                key={room.id}
                state={{}}
                to={
                  room._isCreating || room._hasError ? "#" : `/room/${room.id}`
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{room.name}</h3>

                      {room._isCreating && <Spinner className="size-3" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="text-xs" variant="secondary">
                        {formatTimeToNow(room.createdAt)}
                      </Badge>

                      {!room._hasError && (
                        <Badge className="text-xs" variant="secondary">
                          {room.questionCount ?? 0} pergunta(s)
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm",
                      room._hasError && "opacity-40"
                    )}
                  >
                    <span>Entrar</span>
                    <ArrowRight className="size-3" />
                  </div>
                </div>

                {room._hasError && (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => handleWithRoomCreationReversal(room.id)}
                        size="icon-sm"
                        title="Cancelar"
                        variant="outline"
                      >
                        <XIcon />
                      </Button>
                      <Button
                        className="hover:bg-destructive/50!"
                        disabled={isCreatingRoom}
                        onClick={() =>
                          createRoom({
                            data: {
                              name: room.name,
                              description: room.description,
                            },
                            tempId: room.id,
                          })
                        }
                        size="icon-sm"
                        title="Tentar novamente"
                        variant="destructive"
                      >
                        <RefreshCw />
                      </Button>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}

        {!isLoadingRooms && error && (
          <div className="flex flex-col items-center gap-4">
            {/** biome-ignore assist/source/useSortedAttributes: <Decorative image> */}
            <img
              alt=""
              aria-hidden="true"
              width={240}
              height={240}
              className="size-60"
              src={internalServerErrorImage}
            />

            <p className="text-center text-gray-600 text-sm">
              Não foi possível buscar as salas. Tente novamente mais tarde
            </p>

            <Button
              className="w-full"
              onClick={() => refetchRoomsList()}
              variant="destructive"
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
