import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import api from '../services/api';
import { Plus, Trash2, Key, Copy, Check } from 'lucide-react';

export default function ApiKeys() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [keys, setKeys] = useState<any[]>([]);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const { data } = await api.get('/v1/api-keys');
      setKeys(data.data || []);
    } catch (err) {
      console.error('Erro ao buscar chaves', err);
    }
  };

  const handleGenerate = async () => {
    try {
      if (!newKeyName.trim()) return;
      
      const { data } = await api.post('/v1/api-keys', { name: newKeyName });
      
      setNewlyGeneratedKey(data.data.key);
      setNewKeyName('');
      setIsCreateOpen(false);
      fetchKeys();
    } catch (err) {
      console.error('Erro ao criar chave', err);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Tem certeza que deseja revogar esta chave? Funcionalidades dependentes pararão de funcionar imediatamente.')) return;
    try {
      await api.delete(`/v1/api-keys/${id}`);
      fetchKeys();
    } catch (err) {
      console.error('Erro ao revogar', err);
    }
  };

  const copyToClipboard = () => {
    if (newlyGeneratedKey) {
      navigator.clipboard.writeText(newlyGeneratedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const columns = [
    { key: 'name', title: 'Nome da Chave', render: (row: any) => <span className="font-bold">{row.name}</span> },
    { key: 'prefix', title: 'Identificador', render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded border border-white/5">{row.id}</span> },
    { 
      key: 'status', 
      title: 'Status',
      render: (row: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${row.active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {row.active ? 'Ativa' : 'Inativa'}
        </span>
      )
    },
    { key: 'createdAt', title: 'Criada Em', render: (row: any) => <span className="text-dark-text-muted">{new Date(row.createdAt).toLocaleDateString()}</span> },
    { 
      key: 'actions', 
      title: '', 
      render: (row: any) => (
        <button onClick={() => handleRevoke(row.id)} title="Revogar Chave" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors">
          <Trash2 size={18} />
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-text-muted bg-clip-text text-transparent mb-2">
            Chaves de API
          </h1>
          <p className="text-dark-text-muted">Gerencie as chaves usadas para autenticar nas APIs publicas</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-accent hover:bg-blue-accent/80 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus size={20} /> Nova Chave
        </button>
      </div>

      {newlyGeneratedKey && (
        <div className="bg-green-900/30 border border-green-500/50 p-6 rounded-2xl mb-8 animate-in slide-in-from-top-4">
          <h3 className="text-green-400 font-bold flex items-center gap-2 text-lg mb-2">Sua Chave Foi Gerada!</h3>
          <p className="text-green-300 text-sm mb-4">Por segurança, guarde esta chave agora. Ela <strong>nunca mais</strong> será exibida novamente.</p>
          <div className="flex bg-black rounded-xl p-4 items-center gap-4 justify-between border border-green-500/20">
            <code className="text-white text-lg font-mono break-all">{newlyGeneratedKey}</code>
            <button onClick={copyToClipboard} className="bg-green-500 text-black px-4 py-2 font-bold rounded-lg flex gap-2 items-center hover:bg-green-400 shrink-0 transition-colors">
              {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <div className="bg-blue-accent/10 p-3 rounded-full text-blue-accent shrink-0">
          <Key size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Mantenha suas chaves seguras</h3>
          <p className="text-dark-text-muted text-sm mt-1">
            Recomendamos rotacionar as chaves regularmente. Nunca as exponha publicamente em código client-side. Seu token de origem não é revelado quando essas chaves fazem queries.
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={keys} />

      <Modal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)}
        title="Criar Nova Chave de API"
        actions={
          <>
            <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 font-medium text-dark-text-muted hover:text-white transition">Cancelar</button>
            <button onClick={handleGenerate} disabled={!newKeyName.trim()} className="px-4 py-2 bg-blue-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white hover:bg-blue-accent/80 transition">Gerar Chave</button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-dark-text-muted">Dê um nome para identificar o local onde a chave será usada.</p>
          <input 
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Ex: ERP de Produção"
            className="w-full bg-dark-bg text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-accent focus:ring-1 focus:ring-blue-accent transition-all"
          />
        </div>
      </Modal>
    </div>
  );
}
