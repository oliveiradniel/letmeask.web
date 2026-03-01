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

  abstract post<TBody, TResponseType>(
    path: string,
    body?: TBody,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>>;

  abstract patch<TBody, TResponseType>(
    path: string,
    body?: TBody,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<TResponseType>>;

  abstract delete(
    path: string,
    config?: HttpRequestConfig
  ): Promise<AxiosResponse<void>>;
}
