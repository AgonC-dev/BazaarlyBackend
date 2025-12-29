import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation()

  // Handle the "Checking Auth" state so it doesn't redirect accidentally
  if (loading) return <div>Loading Bazaarly...</div>;

  // If no user is logged in, redirect to whatever page you chose (default is Home)
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // If user exists, show the protected content
  return children;
}