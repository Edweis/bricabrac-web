import React from 'react';
import ProtectRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../lib/hooks';

function Me() {
  const auth = useAuth();
  const email = auth.user?.email;
  return (
    <div>
      <h1>Welcome {email}</h1>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => auth.logout()}
      >
        Log out
      </button>
    </div>
  );
}

export default ProtectRoute(Me);
