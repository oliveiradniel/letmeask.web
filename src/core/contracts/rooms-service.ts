import type { Room } from "@/entities/room";

export abstract class IRoomsService {
  abstract list(): Promise<Room[]>;
}
