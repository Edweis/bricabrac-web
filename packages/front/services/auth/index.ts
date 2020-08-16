import './configure';
import { Auth } from 'aws-amplify';
import Cookies, { CookieAttributes } from 'js-cookie';
import { TOKEN_STORAGE_KEY, TOKEN_EXPIRE_DAYS } from './constants';
import api, { setHeader } from '../api';

const COOKIE_PARAMS: CookieAttributes = {
  sameSite: 'strict',
  expires: TOKEN_EXPIRE_DAYS,
};

const saveToken = (token: string) => {
  Cookies.set(TOKEN_STORAGE_KEY, token, COOKIE_PARAMS);
  setHeader('Authorization', `Bearer ${token}`);
  console.debug('Token saved', token);
};

export const signIn = async (email: string, password: string) => {
  const response = await Auth.signIn(email, password);
  const token = response.signInUserSession.idToken.jwtToken;
  saveToken(token);
};

export const signUp = async (email: string, password: string) => {
  await Auth.signUp({ username: email, password });
};

export const signOut = async () => {
  Cookies.remove(TOKEN_STORAGE_KEY);
  await Auth.signOut();
};

export const getConnectedUser = async () => {
  const token = Cookies.get(TOKEN_STORAGE_KEY);
  if (token == null) return null;
  saveToken(token);
  return api
    .get('/me')
    .then((response) => response.data)
    .catch(() => null);
};
