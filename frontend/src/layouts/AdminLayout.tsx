import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />; // Admin protection

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto bg-dark-bg p-8">
        <Outlet />
      </div>
    </div>
  );
}
