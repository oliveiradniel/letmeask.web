import type { IAudioService } from "../contracts/audio-service";
import type { IHttpClient } from "../contracts/http-client";
import type { UploadAudioData } from "../domain/upload-audio-data";

export class AudioService implements IAudioService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async upload({ roomId, data }: UploadAudioData) {
    await this.httpClient.post<UploadAudioData["data"], void>(
      `audio/rooms/${roomId}`,
      data
    );
  }
}
