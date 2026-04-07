import { useListQuestions } from "@/hooks/use-list-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { questions } = useListQuestions(roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {questions?.map((question) => {
        return <QuestionItem key={question.id} question={question} />;
      })}

      <QuestionItem
        question={{
          id: "1",
          roomId: "1",
          answer: null,
          question: "Pergunta 3",
          createdAt: new Date().toISOString(),
          _isGeneratingAnswer: true,
        }}
      />
    </div>
  );
}
