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
