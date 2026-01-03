import { Navigate } from 'react-router-dom';

import useAnonymousAuth from '../hooks/AnonymousAuth';

export default function GuestRoute({ children }) {
  const { user, loading } = useAnonymousAuth();

  if (loading) return <div>Loading Bazaarly...</div>;

  // If the user IS logged in, kick them to the Home page

  if (user && !user.isAnonymous) {
    return <Navigate to="/" replace />;
  }
  // If they are NOT logged in, show them the Login/Register page
  return children;
}