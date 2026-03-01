import { useMutation } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

import type { CreateRoomData } from "@/schemas/create-room-schema";

export function useCreateRoom() {
  const roomsService = makeRoomsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateRoomData) => roomsService.create(data),
  });

  return {
    createRoom: mutateAsync,
    isCreatingRoom: isPending,
  };
}
