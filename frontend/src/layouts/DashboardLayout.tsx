import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-dark-bg p-8">
        <Outlet />
      </div>
    </div>
  );
}
