import type { Question } from "@/entities/question";
import type { CreateQuestionForm } from "@/schemas/create-question-schema";

export abstract class IQuestionsService {
  abstract list(roomId: string): Promise<Question[]>;
  abstract create(data: CreateQuestionForm): Promise<Question>;
}
