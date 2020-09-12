import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.bbw.kapochamo.com/'
    : 'http://localhost:2727/stage/';
console.debug({ API_BASE_URL });
export default axios.create({ baseURL: API_BASE_URL });
