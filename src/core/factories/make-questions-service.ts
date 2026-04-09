import type { IQuestionsService } from "../contracts/questions-service";
import { QuestionsService } from "../services/questions-service";

import { makeHttpClient } from "./make-http-client";

export function makeQuestionsService(): IQuestionsService {
  return new QuestionsService(makeHttpClient());
}
