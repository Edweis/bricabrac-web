import { useEffect, useState, useCallback } from 'react';

export const useErrorHandler = (
  resetDeps?: React.DependencyList,
): [string | null, (error: any) => void] => {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error != null) setError(null);
  }, resetDeps || []);
  const catchError = useCallback(
    (err: any) => setError(err && err.message),
    [],
  );
  return [error, catchError];
};
