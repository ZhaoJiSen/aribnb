import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const requestConfig = {
  timeout: 5000,
};

class Request {
  private static request = axios.create(requestConfig);

  constructor() {
    this.requestInterceptorsRequest();
    this.requestInterceptorsResponse();
  }

  private requestInterceptorsRequest() {
    Request.request.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在这里可以修改请求配置，比如添加headers
        return config;
      },
      (error) => {
        // 处理请求错误
        return Promise.reject(error);
      }
    );
  }

  private requestInterceptorsResponse() {
    Request.request.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  public requestGet<T>(url: string, param: AxiosRequestConfig): Promise<T> {
    return Request.request
      .get(url, param)
      .then((res) => res.data)
      .catch();
  }

  public requestPost<T>(url: string, param: AxiosResponse): Promise<T> {
    return Request.request
      .post(url, param)
      .then((res) => res.data)
      .catch();
  }
}

export const reqeust = new Request();
