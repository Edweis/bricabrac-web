import './configure';
import { Auth } from 'aws-amplify';
import Cookies, { CookieAttributes } from 'js-cookie';
import {
  TOKEN_STORAGE_KEY,
  TOKEN_EXPIRE_DAYS,
  OFFLINE_IDENTITY,
} from './constants';
import { setHeader } from '../api';

const COOKIE_PARAMS: CookieAttributes = {
  sameSite: 'strict',
  expires: TOKEN_EXPIRE_DAYS,
};

const saveToken = (token: string) => {
  Cookies.set(TOKEN_STORAGE_KEY, token, COOKIE_PARAMS);
  setHeader('Authorization', `Bearer ${token}`);
};

const saveLocalToken = () => {
  console.log('Logged in as local ');
  Cookies.set(TOKEN_STORAGE_KEY, OFFLINE_IDENTITY, COOKIE_PARAMS);
  setHeader('cognito-identity-id', OFFLINE_IDENTITY);
};

export const signIn = async (email: string, password: string) => {
  if (process.env.IS_DEV) saveLocalToken();
  else {
    const response = await Auth.signIn(email, password);
    console.debug('signIn', response);
    const token = response.signInUserSession.idToken.jwtToken;
    saveToken(token);
  }
};

export const signUp = async (email: string, password: string) => {
  if (process.env.IS_DEV) saveLocalToken();
  else await Auth.signUp({ username: email, password });
};

export const signOut = async () => {
  Cookies.remove(TOKEN_STORAGE_KEY);
  await Auth.signOut();
};

export const getConnectedUser = async () => {
  const token = Cookies.get(TOKEN_STORAGE_KEY);
  if (token == null) return null;
  saveToken(token);
  if (process.env.IS_DEV) return token;
  const { id } = await Auth.currentUserInfo();
  return id as string;
};
