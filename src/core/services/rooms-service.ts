import type { Room } from "@/entities/room";

import type { IHttpClient } from "../contracts/http-client";
import type { IRoomsService } from "../contracts/rooms-service";

export class RoomsService implements IRoomsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async list(): Promise<Room[]> {
    const { data } = await this.httpClient.get<Room[]>("/rooms");

    return data;
  }
}
