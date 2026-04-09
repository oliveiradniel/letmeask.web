import { useMutation } from "@tanstack/react-query";

import type { UploadAudioData } from "@/core/domain/upload-audio-data";

import { makeAudioService } from "@/core/factories/make-audio-service";

export function useUploadAudio() {
  const audioService = makeAudioService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UploadAudioData) => audioService.upload(data),
  });

  return {
    uploadAudio: mutateAsync,
    isUploadingAudio: isPending,
  };
}
