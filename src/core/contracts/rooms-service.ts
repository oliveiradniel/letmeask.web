import type { Question } from "@/entities/question";
import type { Room } from "@/entities/room";
import type { CreateRoomData } from "@/schemas/create-room-schema";

export abstract class IRoomsService {
  abstract list(): Promise<Room[]>;
  abstract listQuestions(roomId: string): Promise<Question[]>;
  abstract create(data: CreateRoomData): Promise<Room>;
}
