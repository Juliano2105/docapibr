import DataTable from '../components/DataTable';
import { ShieldAlert } from 'lucide-react';

export default function AdminAudit() {
  const auditLogs = [
    { target: 'System', action: 'BOOT', actor: 'Root', time: '10 mins ago', ip: '192.168.1.1' },
    { target: 'Client_1', action: 'SUSPENDED', actor: 'Admin (joao)', time: '2 hrs ago', ip: '201.23.4.55' },
    { target: 'Plan_Free', action: 'UPDATED', actor: 'Admin (joao)', time: '3 days ago', ip: '201.23.4.55' }
  ];

  const columns = [
    { key: 'target', title: 'Target ID', render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded text-purple-accent">{row.target}</span> },
    { key: 'action', title: 'Action', render: (row: any) => <span className="font-bold tracking-wider">{row.action}</span> },
    { key: 'actor', title: 'Ator', render: (row: any) => <span className="text-dark-text-muted">{row.actor}</span> },
    { key: 'ip', title: 'Endereço IP', render: (row: any) => <span className="text-dark-text-muted/50">{row.ip}</span> },
    { key: 'time', title: 'Horário', render: (row: any) => <span>{row.time}</span> }
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Audit Trail
          </h1>
          <p className="text-dark-text-muted flex items-center gap-2"><ShieldAlert size={16}/> Logs de alteração estrutural no banco de dados</p>
        </div>
      </div>
      <DataTable columns={columns} data={auditLogs} />
    </div>
  );
}
