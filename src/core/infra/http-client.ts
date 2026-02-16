import axios, { type AxiosResponse } from "axios";

import { env } from "@/config/env";

import type { HttpRequestConfig, IHttpClient } from "../contracts/http-client";

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

export class HttpClient implements IHttpClient {
  get<TResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>> {
    return httpClient.get<TResponseType>(path, config);
  }

  post<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>> {
    return httpClient.post<TResponseType>(path, body, {
      ...config,
    });
  }

  patch<TResponseType>(
    path: string,
    body: unknown,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>> {
    return httpClient.patch<TResponseType>(path, body, {
      ...config,
    });
  }

  delete(
    path: string,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<void>> {
    return httpClient.delete<void>(path, {
      ...config,
    });
  }
}
