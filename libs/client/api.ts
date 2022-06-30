import { AxiosRequestHeaders } from 'axios';

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;
export const contentTypeHeaders: AxiosRequestHeaders = {
  'Content-Type': 'application/json',
};
