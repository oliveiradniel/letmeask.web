import { useQuery } from "@tanstack/react-query";

import { makeRoomsService } from "@/core/factories/make-rooms-service";

import type { Question } from "@/entities/question";

export const QUESTIONS_QUERY_KEY = (roomId: string) => {
  return ["questions", roomId];
};

export type QuestionQueryData = Question & { _isGeneratingAnswer?: boolean };

export function useListQuestions(roomId: string) {
  const roomsService = makeRoomsService();

  const { data, isPending } = useQuery({
    queryKey: QUESTIONS_QUERY_KEY(roomId),
    queryFn: async () => {
      const questions = await roomsService.listQuestions(roomId);

      return questions as QuestionQueryData[];
    },
  });

  return {
    questions: data ?? [],
    isLoadingQuestions: isPending,
  };
}
