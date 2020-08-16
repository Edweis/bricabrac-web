import React, {
  createContext,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import Cookies from 'js-cookie';
import * as auth from '../services/auth';

export const AuthContext = createContext({});

type User = unknown | null;
const AuthProvider: FunctionComponent = (props) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const connectedUser = await auth.getConnectedUser();
      console.debug({ connectedUser });
      setUser(connectedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    await auth.signIn(email, password);
    const connectedUser = await auth.getConnectedUser();
    setUser(connectedUser);
  };

  const logout = async () => {
    await auth.signOut();
    Cookies.remove('token');
    setUser(null);
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
