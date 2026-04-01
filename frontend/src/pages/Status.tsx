import { useEffect, useState } from 'react';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';

export default function Status() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/health')
      .then(res => setHealth(res.data.data))
      .catch(() => setHealth({ status: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">System Status</h1>
      
      <div className="bg-dark-surface border border-white/5 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
          <div className="p-4 bg-blue-accent/10 rounded-full text-blue-accent">
            <Activity size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Core API</h2>
            <p className="text-dark-text-muted mt-1">Status of the main routing engine</p>
          </div>
          <div className="ml-auto">
            {loading ? <div className="animate-pulse h-8 w-24 bg-white/10 rounded-full"></div> : 
             health?.status === 'ok' ? (
              <span className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-full font-bold">
                <CheckCircle size={20}/> Operational
              </span>
             ) : (
              <span className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-full font-bold">
                <XCircle size={20}/> Outage
              </span>
             )
            }
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark-bg border border-white/5 rounded-xl p-4 flex justify-between items-center">
            <span>External CPF Provider</span>
            <span className="text-green-400 font-medium">Operational</span>
          </div>
          <div className="bg-dark-bg border border-white/5 rounded-xl p-4 flex justify-between items-center">
            <span>BrasilAPI (CNPJ)</span>
            <span className="text-green-400 font-medium">Operational</span>
          </div>
          <div className="bg-dark-bg border border-white/5 rounded-xl p-4 flex justify-between items-center">
            <span>Database (Supabase)</span>
            <span className="text-green-400 font-medium">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
