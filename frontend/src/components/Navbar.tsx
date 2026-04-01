import { Link } from 'react-router-dom';
import { ShieldCheck, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b border-dark-surface bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <ShieldCheck className="h-8 w-8 text-blue-accent group-hover:text-purple-accent transition-colors" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-accent to-purple-accent bg-clip-text text-transparent">
              DocAPIBR
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/docs" className="text-dark-text-muted hover:text-white transition">Documentação</Link>
            <Link to="/status" className="text-dark-text-muted hover:text-white transition">Status</Link>
            
            <div className="flex space-x-4 pl-4 border-l border-dark-surface items-center">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-white hover:text-blue-accent transition px-3 py-2">
                    Entrar
                  </Link>
                  <Link to="/dashboard/search" className="bg-blue-accent hover:bg-blue-accent/80 text-white px-4 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
                    Testar Busca
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-orange-400 font-bold hover:text-orange-300 transition flex items-center gap-1">
                      <Settings size={16} /> Admin
                    </Link>
                  )}
                  
                  <Link to="/dashboard" className="text-white hover:text-blue-accent transition flex items-center gap-2 px-3 py-2">
                    <User size={18} />
                    <span className="font-semibold text-sm">{user?.name || 'Dashboard'}</span>
                  </Link>
                  
                  <button 
                    onClick={logout}
                    className="text-dark-text-muted hover:text-red-400 transition ml-2 py-2"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
  
                  <Link to="/dashboard/search" className="bg-blue-accent hover:bg-blue-accent/80 text-white px-4 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all ml-2">
                    Busca Online
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
