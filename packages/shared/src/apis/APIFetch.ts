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

class APIFetch implements APIFetchType {
  private baseURL: URL;
  private header?: Headers;

  constructor(baseURL: string, header?: Headers) {
    this.baseURL = new URL(baseURL);
    this.header = new Headers(header);
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
      headers: this.header,
      credentials,
    };
  }

  private async request<T>(props: RequestProps | HandleRequestProps): Promise<T> {
    const isRequestProps = 'path' in props; // 타입 가드
    const requestProps = isRequestProps
      ? this.createRequestProps(props as RequestProps)
      : (props as HandleRequestProps);

    try {
      const response = await fetch(requestProps.url, {
        method: requestProps.method,
        headers: requestProps.headers,
        body: JSON.stringify(requestProps.body),
        credentials: requestProps.credentials,
      });

      if (!response.ok) {
        await this.handleError(response, requestProps);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }
      throw new HTTPError(404, '인터넷 연결을 확인해주세요!');
    }
  }

  private async handleError(response: Response, handleRequestProps: HandleRequestProps): Promise<void> {
    if (response.status === 401) {
      return this.handleUnauthorizedError(response, handleRequestProps);
    }

    const apiError = new HTTPError(response.status, response.statusText);
    //  sentry관련 captureException(apiError);
    throw apiError;
  }

  private async handleUnauthorizedError(response: Response, handleRequestProps: HandleRequestProps): Promise<void> {
    if (reissueAccessToken) {
      throw new HTTPError(401, response.statusText);
    }

    reissueAccessToken = true;
    try {
      // 추후에 재발급 api 개발 완료 시 수정 필요
      // const accessTokenReissueResponse = (await postReissueAccessToken()) as Response;
      const accessTokenReissueResponse = { status: 200 };

      if (accessTokenReissueResponse.status === 200) {
        reissueAccessToken = false;
        return await this.request(handleRequestProps);
      }
    } catch (error) {
      // await deleteAccessToken()
      console.log(error);
      window.location.href = '/';
    }
    //  await this.reissueAccessToken();
  }

  async get<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.get, queryParams });
  }

  async post<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.post, body });
  }

  async put<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.put, body });
  }

  async delete<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.delete, body });
  }

  async patch<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>({ path, method: HTTP_METHOD.patch, body });
  }
}

export default APIFetch;
