import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useListQuestions } from "@/hooks/use-list-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const navigate = useNavigate();

  const { questions, isLoadingQuestions, error } = useListQuestions(roomId);

  const getHeadingText = () => {
    if (isLoadingQuestions) {
      return "Carregando perguntas e respostas...";
    }
    if (questions.length <= 0) {
      return "Não há nenhuma pergunta presente nesta sala. Envie uma agora mesmo!";
    }
    return "Perguntas & Respostas";
  };

  useEffect(() => {
    if (error) {
      toast.error("Não foi possível encontrar a sala.");

      navigate("/", {
        state: { toastMessage: "Não foi possível encontrar a sala." },
      });
    }
  }, [error, navigate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          {getHeadingText()}
        </h2>
      </div>

      {isLoadingQuestions &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={`skeleton-questions-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <Unique key>
              index
            }`}
          >
            <div className="h-40 w-full" />
          </Skeleton>
        ))}

      {!isLoadingQuestions &&
        questions.map((question) => {
          return <QuestionItem key={question.id} question={question} />;
        })}
    </div>
  );
}
