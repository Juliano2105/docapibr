import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Key, Activity, Clock, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout, user } = useAuth();
  
  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20}/>, label: "Visao Geral" },
    { to: "/dashboard/search", icon: <Search size={20}/>, label: "Console" },
    { to: "/dashboard/api-keys", icon: <Key size={20}/>, label: "Chaves de API" },
    { to: "/dashboard/usage", icon: <Activity size={20}/>, label: "Uso e Quota" },
    { to: "/dashboard/logs", icon: <Clock size={20}/>, label: "Histórico" },
    { to: "/dashboard/profile", icon: <UserIcon size={20}/>, label: "Configurações" },
  ];

  return (
    <aside className="w-64 bg-dark-surface border-r border-white/5 flex flex-col">
      <div className="p-6">
        <h2 className="text-xs uppercase tracking-wider text-dark-text-muted font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-blue-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'text-dark-text-muted hover:bg-dark-bg hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <button 
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
