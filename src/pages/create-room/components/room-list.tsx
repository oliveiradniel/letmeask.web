import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListRooms } from "@/hooks/use-list-rooms";
import { formatTimeToNow } from "@/utils/format-relative-date";

export function RoomList() {
  const { rooms, isFetchingRooms } = useListRooms();

  return (
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
  );
}
