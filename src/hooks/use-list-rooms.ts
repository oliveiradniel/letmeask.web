import { useQuery } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

export function useListRooms() {
  const roomsService = makeRoomsService();

  const { data, isFetching } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => roomsService.list(),
  });

  return {
    rooms: data ?? [],
    isFetchingRooms: isFetching,
  };
}
