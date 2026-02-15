import type { IHttpClient } from "../contracts/http-client";

import { HttpClient } from "../infra/http-client";

export function makeHttpClient(): IHttpClient {
  return new HttpClient();
}
