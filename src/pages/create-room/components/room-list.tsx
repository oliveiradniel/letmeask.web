import { ArrowRight } from "lucide-react";
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
import { useListRooms } from "@/hooks/use-list-rooms";
import { cn } from "@/lib/utils";
import { formatTimeToNow } from "@/utils/format-relative-date";
import internalServerErrorImage from "../../../assets/images/internal-server-error.svg";

export function RoomList() {
  const { rooms, refetchRoomsList, isLoadingRooms, error } = useListRooms();

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
                  "flex items-center justify-between rounded-lg border p-3",
                  room._isCreating &&
                    "pointer-events-none animate-pulse opacity-70",
                  !room._isCreating && "hover:bg-accent/50"
                )}
                key={room.id}
                state={{}}
                to={room._isCreating ? "#" : `/room/${room.id}`}
              >
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{room.name}</h3>

                    {room._isCreating && <Spinner className="size-3" />}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="text-xs" variant="secondary">
                      {formatTimeToNow(room.createdAt)}
                    </Badge>

                    <Badge className="text-xs" variant="secondary">
                      {room.questionCount ?? 0} pergunta(s)
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
