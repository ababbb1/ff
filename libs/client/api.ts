import axios, { AxiosRequestHeaders } from 'axios';

type ApiRequestMethod = 'get' | 'post';
interface ApiRequestObject {
  params?: { [k: string]: any };
  data?: { [k: string]: any };
  token?: string;
}

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || '';
export const contentTypeHeaders: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
};
export const authHeaders = (token: string): AxiosRequestHeaders => ({
  Authorization: `Bearer ${token}`,
});

const API = axios.create({
  baseURL: `${API_DOMAIN}/api/`,
  headers: contentTypeHeaders,
});

export default API;

const apiRequest =
  (method: ApiRequestMethod) =>
  (pathname: string) =>
  (obj?: ApiRequestObject) => {
    const headers =
      method === 'post'
        ? obj?.token
          ? Object.assign(contentTypeHeaders, authHeaders(obj.token))
          : contentTypeHeaders
        : obj?.token
        ? authHeaders(obj.token)
        : {};

    return axios({
      method,
      url: `${API_DOMAIN}${pathname}`,
      params: obj?.params,
      data: obj?.data,
      headers,
    });
  };
const apiGetRequest = apiRequest('get');
const apiPostRequest = apiRequest('post');

export const roomSearchRequest = apiGetRequest('/api/room/search');
