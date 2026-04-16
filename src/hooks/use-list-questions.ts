import { useQuery } from "@tanstack/react-query";

import { makeQuestionsService } from "@/core/factories/make-questions-service";

import type { Question } from "@/entities/question";

export const QUESTIONS_QUERY_KEY = (roomId: string) => {
  return ["question", "list", roomId];
};

export type QuestionQueryData = Question & {
  _isGeneratingAnswer?: boolean;
  _hasError?: boolean;
};

export function useListQuestions(roomId: string) {
  const questionsService = makeQuestionsService();

  const { data, isPending, error } = useQuery({
    queryKey: QUESTIONS_QUERY_KEY(roomId),
    queryFn: async () => {
      const questions = await questionsService.list(roomId);

      return questions as QuestionQueryData[];
    },
  });

  return {
    questions: data ?? [],
    isLoadingQuestions: isPending,
    error,
  };
}
