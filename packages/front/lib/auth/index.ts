import './configure';
import { Auth } from 'aws-amplify';
import { TOKEN_STORAGE_KEY } from './constants';
import { setHeader } from '../api';

const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  setHeader('Authorizer', `Bearer ${token}`);
};
export const signIn = async (email: string, password: string) => {
  const response = await Auth.signIn(email, password);
  console.log('LOGGED IN!', response);
  const token = response.signInUserSession.idToken.jwtToken;
  console.debug({ token });
  saveToken(token);
};

export const signUp = async (email: string, password: string) => {
  await Auth.signUp({ username: email, password });
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  saveToken(token);
};
