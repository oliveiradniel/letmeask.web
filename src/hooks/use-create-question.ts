import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

import type { CreateQuestionPayload } from "@/schemas/create-question-schema";
import {
  QUESTIONS_QUERY_KEY,
  type QuestionQueryData,
} from "./use-list-questions";

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  const roomsService = makeRoomsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateQuestionPayload) =>
      roomsService.createQuestion(data),
    onMutate: async ({ roomId, question }) => {
      const queryKey = QUESTIONS_QUERY_KEY(roomId);

      await queryClient.cancelQueries({ queryKey });

      const previousQuestions =
        queryClient.getQueryData<QuestionQueryData[]>(queryKey) ?? [];

      const newQuestion: QuestionQueryData = {
        id: crypto.randomUUID(),
        roomId,
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        _isGeneratingAnswer: true,
      };

      queryClient.setQueryData<QuestionQueryData[]>(
        ["questions", roomId],
        [newQuestion, ...previousQuestions]
      );

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
            };
          }

          return question;
        });
      });
    },
    onError: (_error, _data, context) => {
      if (context?.previousQuestions) {
        queryClient.setQueryData<QuestionQueryData[]>(
          context.queryKey,
          context.previousQuestions
        );
      }
    },
  });

  return {
    createQuestion: mutateAsync,
    isCreatingQuestion: isPending,
  };
}
