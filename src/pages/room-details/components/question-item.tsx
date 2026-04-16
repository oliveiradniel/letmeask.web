import { useQueryClient } from "@tanstack/react-query";
import { Bot, MessageSquare, RefreshCw, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCreateQuestion } from "@/hooks/use-create-question";
import {
  QUESTIONS_QUERY_KEY,
  type QuestionQueryData,
} from "@/hooks/use-list-questions";
import { cn } from "@/lib/utils";
import { formatTimeToNow } from "@/utils/format-relative-date";

export function QuestionItem({ question }: { question: QuestionQueryData }) {
  const queryClient = useQueryClient();

  const { createQuestion, isCreatingQuestion } = useCreateQuestion();

  function handleWithQuestionCreationReversal(questionId: string) {
    queryClient.setQueryData<QuestionQueryData[]>(
      QUESTIONS_QUERY_KEY(question.roomId),
      (old) => {
        if (!old) {
          return old;
        }

        return old.filter((question) => question.id !== questionId);
      }
    );
  }

  return (
    <Card className={cn(question._hasError && "border-destructive/60")}>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="shrink-0">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full bg-primary/10",
                  !question._hasError && "bg-primary/10",
                  question._hasError && "bg-destructive/60"
                )}
              >
                <Bot className="size-4 text-secondary-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">
                {question._hasError
                  ? "Não foi possível gerar uma resposta"
                  : "Resposta da IA"}
              </p>

              {!question._hasError && (
                <div className="text-muted-foreground">
                  {question._isGeneratingAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Spinner />
                      <span className="text-primary text-sm italic">
                        Gerando resposta...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer ??
                        "Não há resposta para esta pergunta no momento."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {question._hasError && (
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center gap-1">
                <Button
                  onClick={() =>
                    handleWithQuestionCreationReversal(question.id)
                  }
                  size="icon-sm"
                  title="Cancelar"
                  variant="outline"
                >
                  <XIcon />
                </Button>
                <Button
                  className="hover:bg-destructive/50!"
                  disabled={isCreatingQuestion}
                  onClick={() =>
                    createQuestion({
                      data: {
                        roomId: question.roomId,
                        question: question.question,
                      },
                      tempId: question.id,
                    })
                  }
                  size="icon-sm"
                  title="Tentar novamente"
                  variant="destructive"
                >
                  <RefreshCw />
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {formatTimeToNow(question.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
