import { useState } from 'react';
import DataTable from '../components/DataTable';
import { Search, Ban, CheckCircle } from 'lucide-react';

export default function AdminClients() {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    { id: '1', name: 'Techcorp LTDA', email: 'contato@techcorp.com', plan: 'Pro', status: 'active', usage: '85%' },
    { id: '2', name: 'StartApp Brasil', email: 'dev@startapp.br', plan: 'Basic', status: 'active', usage: '30%' },
    { id: '3', name: 'João Dev', email: 'joao@dev.com', plan: 'Free', status: 'blocked', usage: '100%' },
  ];

  const columns = [
    { key: 'name', title: 'Cliente / Empresa', render: (row: any) => <div><p className="font-bold">{row.name}</p><p className="text-xs text-dark-text-muted">{row.email}</p></div>},
    { key: 'plan', title: 'Plano', render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded border border-white/5 text-purple-accent">{row.plan}</span> },
    { key: 'usage', title: 'Uso Mensal' },
    { 
      key: 'status', 
      title: 'Status',
      render: (row: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${row.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400 uppercase'}`}>
          {row.status === 'active' ? 'ATIVO' : 'BLOQUEADO'}
        </span>
      )
    },
    { 
      key: 'actions', 
      title: '', 
      render: (row: any) => (
        <button className={`p-2 rounded-lg transition-colors ${row.status === 'active' ? 'text-red-400 hover:bg-red-500/10' : 'text-green-400 hover:bg-green-500/10'}`}>
          {row.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Gestão de Clientes
          </h1>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-surface border border-white/10 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-red-400 transition"
          />
        </div>
      </div>

      <DataTable columns={columns} data={clients} />
    </div>
  );
}
