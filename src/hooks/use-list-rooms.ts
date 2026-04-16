import { useQuery } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";
import type { Room } from "@/entities/room";

export const ROOMS_QUERY_KEY = ["room", "list"];

export type RoomQueryData = Room & {
  _isCreating?: boolean;
  _hasError?: boolean;
};

export function useListRooms() {
  const roomsService = makeRoomsService();

  const { data, refetch, isLoading, isPending, error } = useQuery({
    queryKey: ROOMS_QUERY_KEY,
    queryFn: async () => {
      const rooms = await roomsService.list();

      return rooms as RoomQueryData[];
    },
    retry: false,
  });

  return {
    rooms: data ?? [],
    refetchRoomsList: refetch,
    isLoadingRooms: isLoading,
    isPendingRooms: isPending,
    error,
  };
}
