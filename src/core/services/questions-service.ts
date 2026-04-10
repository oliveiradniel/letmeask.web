import type { Question } from "@/entities/question";
import type { CreateQuestionPayload } from "@/schemas/create-question-schema";
import type { IHttpClient } from "../contracts/http-client";
import type { IQuestionsService } from "../contracts/questions-service";

export class QuestionsService implements IQuestionsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async list(roomId: string): Promise<Question[]> {
    const { data } = await this.httpClient.get<Question[]>(
      `/rooms/${roomId}/questions`
    );

    return data;
  }

  async create({ roomId, question }: CreateQuestionPayload): Promise<Question> {
    const { data: createdQuestion } = await this.httpClient.post<
      Omit<CreateQuestionPayload, "roomId">,
      Question
    >(`questions/rooms/${roomId}`, {
      question,
    });

    return createdQuestion;
  }
}
