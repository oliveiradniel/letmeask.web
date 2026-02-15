import type { AxiosResponse } from "axios";

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export abstract class IHttpClient {
  abstract get<TResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>>;

  abstract post<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>>;

  abstract patch<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>>;

  abstract delete(
    path: string,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<void>>;
}
