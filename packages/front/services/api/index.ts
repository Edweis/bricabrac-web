import axios from 'axios';
import { BASE_URL, CORS_HEADERS } from './constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: CORS_HEADERS,
});
export const setHeader = (key: string, value: string) => {
  api.defaults.headers[key] = value;
};

export default api;
