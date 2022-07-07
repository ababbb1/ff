import { AxiosRequestHeaders } from 'axios';

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || '';
export const contentTypeHeaders: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
};
export const authHeaders = (token: string): AxiosRequestHeaders => ({
  Authorization: `Bearer ${token}`,
});
