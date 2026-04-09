import type { UploadAudioData } from "../domain/upload-audio-data";

export abstract class IAudioService {
  abstract upload(data: UploadAudioData): Promise<void>;
}
