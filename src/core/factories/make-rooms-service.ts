import type { IRoomsService } from "../contracts/rooms-service";

import { RoomsService } from "../services/rooms-service";
import { makeHttpClient } from "./make-http-client";

export function makeRoomsService(): IRoomsService {
  return new RoomsService(makeHttpClient());
}
