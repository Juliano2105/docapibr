import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const { logout } = useAuth();
  
  const navItems = [
    { to: "/admin", icon: <LayoutDashboard size={20}/>, label: "Visão Global" },
    { to: "/admin/clients", icon: <Users size={20}/>, label: "Clientes" },
    { to: "/admin/plans", icon: <Package size={20}/>, label: "Planos de API" },
    { to: "/admin/audit", icon: <Shield size={20}/>, label: "Auditoria" },
  ];

  return (
    <aside className="w-64 bg-dark-surface border-r border-white/5 flex flex-col">
      <div className="p-6">
        <h2 className="text-xs uppercase tracking-wider text-red-400 font-black mb-4 flex items-center gap-2">ADMINISTRATION</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
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
          Sair do Admin
        </button>
      </div>
    </aside>
  );
}
