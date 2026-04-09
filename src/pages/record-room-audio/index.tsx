import { ArrowLeft, CirclePlayIcon, CircleStopIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useUploadAudio } from "@/hooks/use-upload-audio";
import { AudioSchema } from "@/schemas/audio-schema";
import { Spinner } from "@/components/ui/spinner";

export function RecordRoomAudio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { uploadAudio, isUploadingAudio } = useUploadAudio();

  const [isRecording, setIsRecording] = useState(false);

  const recorder = useRef<MediaRecorder | null>(null);

  const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function";

  if (!id) {
    return <Navigate replace to="/" />;
  }

  function handleUploadAudio(audio: Blob) {
    const result = AudioSchema.safeParse(audio);

    if (!result.success) {
      console.log(result.error);
    }

    const formData = new FormData();

    formData.append("audio", audio, "audio.webm");

    // biome-ignore lint/style/noNonNullAssertion: <The ID exists, there is validation above>
    uploadAudio({ roomId: id!, data: formData });
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      console.log("O seu navegador não suporte navegação.");

      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        handleUploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada");
    };

    recorder.current.start();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      {isRecording ? (
        <div className="flex items-center gap-2"><div className="size-2 bg-green-600 rounded-full animate-pulse" /><span>Gravando...</span></div>
      ) : (
        <span>Inicie uma gravação para esta sala.</span>
      )}

      <div className="flex items-center gap-2">
        <Button variant='outline' onClick={() => navigate(-1)}><ArrowLeft /> Voltar para a sala</Button>

        {isRecording ? (
          <Button onClick={stopRecording}>
            <CircleStopIcon className="text-destructive" /> Parar gravação
          </Button>
        ) : (
          <Button
            disabled={isUploadingAudio}
            onClick={startRecording}>
              {isUploadingAudio ? (
                <>
                  <Spinner />
                  Enviando gravação
                </>
              ) : (
                <>
                <CirclePlayIcon className="text-green-600" />
                Iniciar gravação
                </>
              )
            }
          </Button>
        )}
      </div>

    </div>
  );
}
