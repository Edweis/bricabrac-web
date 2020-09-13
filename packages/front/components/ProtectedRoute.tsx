import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/hooks';

export default function ProtectRouteHOC<P>(Component: React.ComponentType<P>) {
  return function ProtectRoute(props: P) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!isAuthenticated && !loading) router.push('/account/login');
    }, [loading, isAuthenticated]);

    if (loading) return <p>Loading user...</p>;
    if (!isAuthenticated && !loading)
      return <p>Redirecting to the login page...</p>;
    // eslint-disable-next-line
    return <Component {...props} />;
  };
}
