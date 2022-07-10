import axios, { AxiosRequestHeaders } from 'axios';

type ApiRequestMethod = 'get' | 'post';
interface ApiRequestObject {
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

const apiRequest =
  (method: ApiRequestMethod) =>
  (pathname: string) =>
  (obj?: ApiRequestObject) => {
    const headers = obj?.token
      ? Object.assign(contentTypeHeaders, authHeaders(obj.token))
      : contentTypeHeaders;

    return axios({
      method,
      url: `${API_DOMAIN}${pathname}`,
      data: obj?.data,
      headers,
    });
  };
const apiGetRequest = apiRequest('get');
const apiPostRequest = apiRequest('post');

export const localLoginRequest = apiPostRequest('/api/local/login');
export const socialLoginRequest = apiPostRequest('/api/login');
export const joinRequest = apiPostRequest('/api/signup');
export const mypageRequest = apiGetRequest('/api/mypage');

export const getRoomListRequest = apiGetRequest('/api/rooms');
export const roomSearchRequest = apiGetRequest('/api/room/search');
export const createRoomRequest = apiPostRequest('/api/room/create');
