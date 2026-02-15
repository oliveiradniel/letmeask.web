import axios from "axios";

import { env } from "@/config/env";

import type { HttpRequestConfig, IHttpClient } from "../contracts/http-client";

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

export class HttpClient implements IHttpClient {
  async get<TResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<TResponseType> {
    const response = await httpClient.get<TResponseType>(path, config);

    return response.data;
  }

  async post<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<TResponseType> {
    const response = await httpClient.post<TResponseType>(path, body, {
      ...config,
    });

    return response.data;
  }

  async patch<TResponseType>(
    path: string,
    body: unknown,
    config?: HttpRequestConfig
  ): Promise<TResponseType> {
    const response = await httpClient.patch<TResponseType>(path, body, {
      ...config,
    });

    return response.data;
  }

  async delete(path: string, config?: HttpRequestConfig): Promise<void> {
    await httpClient.delete<void>(path, {
      ...config,
    });
  }
}
