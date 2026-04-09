import type { IAudioService } from "../contracts/audio-service";
import { AudioService } from "../services/audio-service";

import { makeHttpClient } from "./make-http-client";

export function makeAudioService(): IAudioService {
  return new AudioService(makeHttpClient());
}
