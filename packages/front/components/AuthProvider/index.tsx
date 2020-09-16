import React, { useState, useEffect, FunctionComponent } from 'react';
import Cookies from 'js-cookie';
import * as auth from '../../services/auth';
import { AuthContext } from './context';

const AuthProvider: FunctionComponent = (props) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  console.debug({ user, loading });
  useEffect(() => {
    const loadUser = async () => {
      const connectedUser = await auth.getConnectedUser();
      setUser(connectedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await auth.signIn(email, password);
      const connectedUser = await auth.getConnectedUser();
      setUser(connectedUser);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    await auth.signOut();
    Cookies.remove('token');
    setUser(null);
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await auth.signUp(email, password);
      await login(email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    loading,
    logout,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>{props?.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
