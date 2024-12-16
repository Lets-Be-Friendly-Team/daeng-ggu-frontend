/* eslint-disable @typescript-eslint/no-explicit-any */

import { HTTP_METHOD } from '../constants/api';
import buildURL from '../utils/buildURL';

import HTTPError from './HTTPError';

interface RequestProps {
  path: string;
  method: string;
  body?: Record<string, any>;
  queryParams?: Record<string, string>;
  credentials?: 'include' | 'omit' | 'same-origin';
}

interface HandleRequestProps {
  url: URL;
  method: string;
  body?: Record<string, any>;
  headers?: Headers;
  credentials?: 'include' | 'omit' | 'same-origin';
}

interface APIFetchType {
  get<T>(_path: string, _queryParams?: Record<string, string>): Promise<T>;
  post<T>(_path: string, _body?: Record<string, any>): Promise<T>;
  patch<T>(_path: string, _body?: Record<string, any>): Promise<T>;
  delete<T>(_path: string, _body?: Record<string, any>): Promise<T>;
  put<T>(_path: string, _body?: Record<string, any>): Promise<T>;
}

let reissueAccessToken = false;

// 커스텀 fetchbody에 대한 RequestInit['body'] 사용 유무 처리, 커스텀은 안쓸거임
type FetchBody = FormData | string | Blob | ArrayBuffer | URLSearchParams | ReadableStream<Uint8Array> | null;

class APIFetch implements APIFetchType {
  private baseURL: URL;
  private defaultHeaders?: Headers;

  constructor(baseURL: string, defaultHeaders?: Headers) {
    this.baseURL = new URL(baseURL);
    this.defaultHeaders = new Headers(defaultHeaders);
  }

  private createRequestProps({
    path,
    method,
    body,
    queryParams,
    credentials = 'include',
  }: RequestProps): HandleRequestProps {
    const url = buildURL({ baseURL: this.baseURL, path, queryParams });

    return {
      url,
      method,
      body,
      headers: this.defaultHeaders,
      credentials,
    };
  }

  private async request<T>(
    props: RequestProps | HandleRequestProps,
    customHeaders?: Record<string, string>,
  ): Promise<T> {
    const isRequestProps = 'path' in props;
    const requestProps = isRequestProps
      ? this.createRequestProps(props as RequestProps)
      : (props as HandleRequestProps);

    const headers = new Headers(requestProps.headers);

    // Merge custom headers with default headers
    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => headers.set(key, value));
    }

    // Define body with the custom FetchBody type
    let body: FetchBody = null;

    if (requestProps.body instanceof FormData) {
      body = requestProps.body;
      headers.delete('Content-Type'); // Let `fetch` handle it automatically
    } else if (requestProps.body && typeof requestProps.body === 'object') {
      body = JSON.stringify(requestProps.body);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }

    try {
      const response = await fetch(requestProps.url.toString(), {
        method: requestProps.method,
        headers,
        body,
        credentials: requestProps.credentials,
      });

      if (!response.ok) {
        await this.handleError(response, requestProps);
      }

      // Assuming the response is JSON. Adjust if needed.
      return await response.json();
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }
      throw new HTTPError(404, 'Check your internet connection!');
    }
  }

  private async handleError(response: Response, handleRequestProps: HandleRequestProps): Promise<void> {
    if (response.status === 401) {
      return this.handleUnauthorizedError(response, handleRequestProps);
    }

    const apiError = new HTTPError(response.status, response.statusText);
    throw apiError;
  }

  private async handleUnauthorizedError(response: Response, handleRequestProps: HandleRequestProps): Promise<void> {
    if (reissueAccessToken) {
      throw new HTTPError(401, response.statusText);
    }

    reissueAccessToken = true;
    try {
      const accessTokenReissueResponse = { status: 200 };

      if (accessTokenReissueResponse.status === 200) {
        reissueAccessToken = false;
        return await this.request(handleRequestProps);
      }
    } catch (error) {
      console.error(error);
      window.location.href = '/';
    }
  }

  async get<T>(path: string, queryParams?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.get, queryParams }, headers);
  }

  async post<T>(path: string, body?: Record<string, any> | FormData, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.post, body }, headers);
  }

  async put<T>(path: string, body?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.put, body }, headers);
  }

  async delete<T>(
    path: string,
    queryParams?: Record<string, string>,
    body?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.delete, body, queryParams }, headers);
  }

  async patch<T>(path: string, body?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.patch, body }, headers);
  }
}

export default APIFetch;
