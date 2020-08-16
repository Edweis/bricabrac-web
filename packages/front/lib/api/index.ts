import axios from 'axios';
import { BASE_URL } from './constants';

const api = axios.create({ baseURL: BASE_URL });
export const setHeader = (key: string, value: string) => {
  api.defaults.headers[key] = value;
};

export default api;
