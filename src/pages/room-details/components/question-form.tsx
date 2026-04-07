import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/hooks/use-create-question";
import {
  type CreateQuestionForm,
  CreateQuestionSchema,
} from "@/schemas/create-question-schema";

export function QuestionForm({ roomId }: { roomId: string }) {
  const { createQuestion, isCreatingQuestion } = useCreateQuestion();

  const form = useForm<CreateQuestionForm>({
    resolver: zodResolver(CreateQuestionSchema),
  });

  async function handleCreateQuestion(data: CreateQuestionForm) {
    await createQuestion({ ...data, roomId });

    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleCreateQuestion)}
        >
          <Field>
            <FieldLabel>Sua pergunta</FieldLabel>

            <Textarea
              className="min-h-25"
              disabled={isCreatingQuestion}
              placeholder="O que você gostaria de saber?"
              {...form.register("question")}
            />

            <FieldError>{form.formState.errors.question?.message}</FieldError>
          </Field>

          <Button disabled={isCreatingQuestion} type="submit">
            Enviar pergunta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
