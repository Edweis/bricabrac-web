import { useEffect, useState, useCallback, useContext } from 'react';
import { AuthContext } from '../components/AuthProvider/context';

export const useErrorHandler = (
  resetDeps?: React.DependencyList,
): [string | null, (error: any) => void] => {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error != null) {
      console.debug('Reseting errors...', error);
      setError(null);
    }
  }, resetDeps || []);
  const catchError = useCallback((err: any) => {
    console.debug('ERROR CAUGHT', err);
    setError(err && err.message);
  }, []);
  return [error, catchError];
};
export const useAuth = () => useContext(AuthContext);
