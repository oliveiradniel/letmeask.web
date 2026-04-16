import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

import type { CreateRoomData } from "@/schemas/create-room-schema";
import { ROOMS_QUERY_KEY, type RoomQueryData } from "./use-list-rooms";

interface CreateRoomParams {
  data: CreateRoomData;
  tempId?: string;
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  const roomsService = makeRoomsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ data }: CreateRoomParams) => {
      await new Promise((r) => setTimeout(r, 2000));

      return roomsService.create(data);
    },
    onMutate: async ({ data, tempId }) => {
      await queryClient.cancelQueries({ queryKey: ROOMS_QUERY_KEY });

      const previousRooms =
        queryClient.getQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY) ?? [];

      const id = tempId ?? crypto.randomUUID();

      const existing = previousRooms.find((r) => r.id === id);

      const newRoom: RoomQueryData = {
        id,
        name: data.name,
        description: data.description,
        questionCount: 0,
        _isCreating: true,
        _hasError: false,
        createdAt: new Date().toISOString(),
      };

      if (existing) {
        queryClient.setQueryData<RoomQueryData[]>(
          ROOMS_QUERY_KEY,
          previousRooms.map((room) => (room.id === id ? newRoom : room))
        );
      } else {
        queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, [
          newRoom,
          ...previousRooms,
        ]);
      }

      return { newRoom, previousRooms };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, (old) => {
        if (!old) {
          return old;
        }

        if (!context.newRoom) {
          return old;
        }

        return old.map((room) => {
          if (room.id === context.newRoom.id) {
            return {
              ...context.newRoom,
              ...data,
              _isCreating: false,
              _hasError: false,
            };
          }

          return room;
        });
      });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, (old) => {
        if (!old) {
          return old;
        }

        return old.map((room) => {
          if (room.id === context?.newRoom.id) {
            return {
              ...context.newRoom,
              _isCreating: false,
              _hasError: true,
            };
          }

          return room;
        });
      });

      // if (context?.previousRooms) {
      //   queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, [
      //     ...context.previousRooms,
      //   ]);
      // }
    },
  });

  return {
    createRoom: mutateAsync,
    isCreatingRoom: isPending,
  };
}
