import { useState, useEffect } from 'react';
import { Users, Server, AlertTriangle, Key, Ban, CheckCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import api from '../services/api';

export default function AdminOverview() {
  const [allKeys, setAllKeys] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminKeys();
  }, []);

  const fetchAdminKeys = async () => {
    try {
      // Authenticated users get 'mock' role admin by default in backend
      const { data } = await api.get('/v1/admin/api-keys');
      setAllKeys(data.data || []);
    } catch (err) {
      console.error('Falha ao listar chaves do sistema:', err);
    }
  };

  const handleToggleKey = async (id: string) => {
    try {
      await api.patch(`/v1/admin/api-keys/${id}/toggle`);
      fetchAdminKeys(); // reload
    } catch (err) {
      console.error('Falha ao alterar status da chave:', err);
    }
  };

  const stats = [
    { title: "Total Clientes", value: "1,450", colorClass: "text-blue-accent", icon: <Users /> },
    { title: "Requests Hoje", value: "3.2M", colorClass: "text-purple-accent", icon: <Server /> },
    { title: "Erros (5xx)", value: "12", colorClass: "text-red-400", icon: <AlertTriangle /> },
    { title: "Chaves Ativas", value: allKeys.filter(k => k.active).length.toString(), colorClass: "text-green-400", icon: <Key /> },
  ];

  const columns = [
    { key: 'clientId', title: 'Dono (Client ID)', render: (row: any) => <span className="text-dark-text-muted">{row.clientId}</span> },
    { key: 'name', title: 'Nome da Chave', render: (row: any) => <span className="font-bold text-white">{row.name}</span> },
    { key: 'keyIdentifier', title: 'ID Único', render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded border border-white/5">{row.id}</span> },
    { 
      key: 'status', 
      title: 'Status',
      render: (row: any) => (
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${row.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {row.active ? 'Ativa' : 'Desativada'}
        </span>
      )
    },
    { key: 'createdAt', title: 'Criada Em', render: (row: any) => <span className="text-dark-text-muted">{new Date(row.createdAt).toLocaleDateString()}</span> },
    { 
      key: 'actions', 
      title: 'Ação Rápida', 
      render: (row: any) => (
        <button 
          onClick={() => handleToggleKey(row.id)} 
          title={row.active ? 'Desativar Chave' : 'Ativar Chave'} 
          className={`p-2 rounded-lg transition-colors border ${row.active ? 'text-red-400 border-red-500/20 hover:bg-red-500/10' : 'text-green-400 border-green-500/20 hover:bg-green-500/10'}`}
        >
          {row.active ? <Ban size={18} /> : <CheckCircle size={18} />}
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Admin: Visão Global
          </h1>
          <p className="text-dark-text-muted">Monitoramento geral do sistema e tráfego DocAPIBR.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>
      
      <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 mb-8 border-l-4 border-l-orange-400">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Key className="text-orange-400" />
          Central de API Keys do Sistema
        </h2>
        <p className="text-sm text-dark-text-muted mb-6">
          Neste painel você tem privilégios totais para suspender ou ativar temporariamente o serviço de qualquer API vinculada aos clientes. Efeitos de revogação/suspensão são imediatos no core-router de acesso nativo.
        </p>
        
        <DataTable columns={columns} data={allKeys} />
      </div>
    </div>
  );
}
