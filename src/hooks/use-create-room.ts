import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

import type { CreateRoomData } from "@/schemas/create-room-schema";

import { ROOMS_QUERY_KEY, type RoomQueryData } from "./use-list-rooms";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  const roomsService = makeRoomsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateRoomData) => roomsService.create(data),
    onMutate: async ({ name, description }) => {
      await queryClient.cancelQueries({ queryKey: ROOMS_QUERY_KEY });

      const previousRooms =
        queryClient.getQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY) ?? [];

      const newRoom: RoomQueryData = {
        id: crypto.randomUUID(),
        name,
        description,
        questionCount: 0,
        _isCreating: true,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, [
        newRoom,
        ...previousRooms,
      ]);

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
            };
          }

          return room;
        });
      });
    },
    onError: (_error, _variables, context) => {
      if (context?.previousRooms) {
        queryClient.setQueryData<RoomQueryData[]>(ROOMS_QUERY_KEY, [
          ...context.previousRooms,
        ]);
      }
    },
  });

  return {
    createRoom: mutateAsync,
    isCreatingRoom: isPending,
  };
}
