import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}

export interface Response<T = any> extends AxiosResponse<T> {}

export function get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
  return axios.get<T, Response<T>>(url, config);
}

export function isRequestError(error: AxiosError): boolean {
  return !!(error.response && error.response.status);
}
