import './configure';
import { Auth } from 'aws-amplify';

export const signIn = async (email: string, password: string) => {
  const response = await Auth.signIn(email, password);
  console.log('LOGGED IN!', response);
};

export const signUp = async (email: string, password: string) => {
  const response = await Auth.signUp({ username: email, password });
  console.log('SIGNED UP!', response);
};
