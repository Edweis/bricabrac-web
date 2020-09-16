import { createContext } from 'react';

type ContextProps = {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};
const defaultContext: ContextProps = {
  isAuthenticated: false,
  user: null,
  loading: false,
  login: () => {
    throw new Error('login not yet initialized.');
  },
  logout: () => {
    throw new Error('logout not yet initialized.');
  },
  signUp: () => {
    throw new Error('signUp not yet initialized.');
  },
};
export const AuthContext = createContext<ContextProps>(defaultContext);
