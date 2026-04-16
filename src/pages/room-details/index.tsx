import { ArrowLeft, Radio } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuestionForm } from "./components/question-form";
import { QuestionList } from "./components/question-list";

export default function RoomDetails() {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.error(location.state.toastMessage);
    }
  }, [location.state]);

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to={`/room/${params.id}/audio`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={params.id} />
        </div>

        <QuestionList roomId={params.id} />
      </div>
    </div>
  );
}
