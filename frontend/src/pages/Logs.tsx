import { useState } from 'react';
import DataTable from '../components/DataTable';
import { Search, Filter } from 'lucide-react';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Logs Data
  const logsData = [
    { endpoint: '/v1/cpf', doc: '000.***.***-00', status: 200, time: 45, cached: true, date: '2026-03-31 10:15' },
    { endpoint: '/v1/cnpj', doc: '43.715.***/0001-70', status: 200, time: 240, cached: false, date: '2026-03-31 09:30' },
    { endpoint: '/v1/cpf', doc: '111.***.***-11', status: 404, time: 10, cached: true, date: '2026-03-31 08:45' },
    { endpoint: '/v1/cpf', doc: '000.***.***-00', status: 200, time: 42, cached: true, date: '2026-03-31 08:00' },
  ];

  const columns = [
    { key: 'date', title: 'Data / Hora' },
    { 
      key: 'endpoint', 
      title: 'Endpoint',
      render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded text-blue-accent">{row.endpoint}</span>
    },
    { key: 'doc', title: 'Documento Oculto', render: (row: any) => <span className="text-dark-text-muted">{row.doc}</span> },
    { 
      key: 'status', 
      title: 'Status',
      render: (row: any) => (
        <span className={`font-bold ${row.status === 200 ? 'text-green-400' : 'text-red-400'}`}>
          {row.status}
        </span>
      )
    },
    { key: 'time', title: 'Tempo', render: (row: any) => <span>{row.time}ms</span> },
    { 
      key: 'cached', 
      title: 'Cache',
      render: (row: any) => row.cached ? <span className="text-purple-accent">HIT</span> : <span className="text-dark-text-muted">MISS</span>
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-text-muted bg-clip-text text-transparent mb-2">
            Histórico de Requisições
          </h1>
          <p className="text-dark-text-muted">Acompanhe as requisições em tempo real da sua conta.</p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-surface border border-white/10 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-accent"
            />
          </div>
          <button className="bg-dark-surface border border-white/10 p-2 rounded-lg hover:bg-white/5 transition">
            <Filter size={20} className="text-dark-text-muted"/>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={logsData} />
    </div>
  );
}
