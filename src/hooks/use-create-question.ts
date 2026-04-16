import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeQuestionsService } from "@/core/factories/make-questions-service";

import type { CreateQuestionPayload } from "@/schemas/create-question-schema";
import {
  QUESTIONS_QUERY_KEY,
  type QuestionQueryData,
} from "./use-list-questions";

interface CreateQuestionParams {
  data: CreateQuestionPayload;
  tempId?: string;
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  const questionsService = makeQuestionsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data }: CreateQuestionParams) =>
      questionsService.create(data),
    onMutate: async ({ data, tempId }) => {
      const queryKey = QUESTIONS_QUERY_KEY(data.roomId);

      await queryClient.cancelQueries({ queryKey });

      const previousQuestions =
        queryClient.getQueryData<QuestionQueryData[]>(queryKey) ?? [];

      const id = tempId ?? crypto.randomUUID();

      const existing = previousQuestions.find((q) => q.id === id);

      const newQuestion: QuestionQueryData = {
        id,
        roomId: data.roomId,
        question: data.question,
        answer: null,
        createdAt: new Date().toISOString(),
        _isGeneratingAnswer: true,
        _hasError: false,
      };

      if (existing) {
        queryClient.setQueryData<QuestionQueryData[]>(
          queryKey,
          previousQuestions.map((question) =>
            question.id === id ? newQuestion : question
          )
        );
      } else {
        queryClient.setQueryData<QuestionQueryData[]>(queryKey, [
          newQuestion,
          ...previousQuestions,
        ]);
      }

      return { newQuestion, previousQuestions, queryKey };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<QuestionQueryData[]>(context.queryKey, (old) => {
        if (!old) {
          return old;
        }

        if (!context.newQuestion) {
          return old;
        }

        return old.map((question) => {
          if (question.id === context.newQuestion.id) {
            return {
              ...context.newQuestion,
              id: data.id,
              roomId: data.roomId,
              answer: data.answer,
              _isGeneratingAnswer: false,
              _hasError: false,
            };
          }

          return question;
        });
      });
    },
    onError: (_error, _data, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData<QuestionQueryData[]>(
        context?.queryKey,
        (old) => {
          if (!old) {
            return old;
          }

          return old.map((room) => {
            if (room.id === context?.newQuestion.id) {
              return {
                ...context.newQuestion,
                _isCreating: false,
                _hasError: true,
              };
            }

            return room;
          });
        }
      );

      // if (context?.previousQuestions) {
      //   queryClient.setQueryData<QuestionQueryData[]>(
      //     context.queryKey,
      //     context.previousQuestions
      //   );
      // }
    },
  });

  return {
    createQuestion: mutateAsync,
    isCreatingQuestion: isPending,
  };
}
