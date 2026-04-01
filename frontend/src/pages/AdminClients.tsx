import { useState } from 'react';
import DataTable from '../components/DataTable';
import { Search, Ban, CheckCircle, UserPlus, X, Copy, Check } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AdminClients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success'|'error', msg: string } | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const clients = [
    { id: '1', name: 'Techcorp LTDA', email: 'contato@techcorp.com', plan: 'Pro', status: 'active', usage: '85%' },
    { id: '2', name: 'StartApp Brasil', email: 'dev@startapp.br', plan: 'Basic', status: 'active', usage: '30%' },
    { id: '3', name: 'João Dev', email: 'joao@dev.com', plan: 'Free', status: 'blocked', usage: '100%' },
  ];

  const columns = [
    { key: 'name', title: 'Cliente / Empresa', render: (row: any) => <div><p className="font-bold">{row.name}</p><p className="text-xs text-dark-text-muted">{row.email}</p></div> },
    { key: 'plan', title: 'Plano', render: (row: any) => <span className="font-mono bg-dark-bg px-2 py-1 rounded border border-white/5 text-purple-accent">{row.plan}</span> },
    { key: 'usage', title: 'Uso Mensal' },
    { key: 'status', title: 'Status', render: (row: any) => (<span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${row.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400 uppercase'}`}>{row.status === 'active' ? 'ATIVO' : 'BLOQUEADO'}</span>) },
    { key: 'actions', title: '', render: (row: any) => (<button className={`p-2 rounded-lg transition-colors ${row.status === 'active' ? 'text-red-400 hover:bg-red-500/10' : 'text-green-500 hover:bg-green-500/10'}`}>{row.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}</button>) },
  ];

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`${API_URL}/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Erro ao cadastrar');
      const link = `${window.location.origin}/login`;
      setInviteLink(link);
      setFeedback({ type: 'success', msg: `Lojista ${form.name} cadastrado com sucesso!` });
      setForm({ name: '', email: '', password: '' });
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback(null);
    setInviteLink(null);
    setCopied(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">Gestão de Clientes</h1>
        </div>
        <div className="flex gap-3 items-center">
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
          <button
            onClick={() => { setShowModal(true); setFeedback(null); setInviteLink(null); }}
            className="flex items-center gap-2 bg-purple-accent hover:bg-purple-accent/80 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <UserPlus size={18} />
            Cadastrar Lojista
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={clients} />

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Cadastrar Lojista</h2>
              <button onClick={handleCloseModal} className="text-dark-text-muted hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {inviteLink ? (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-green-400 font-bold mb-1">✓ {feedback?.msg}</p>
                  <p className="text-green-300 text-sm">Envie o link abaixo para o lojista acessar a plataforma:</p>
                </div>
                <div className="bg-dark-bg rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <span className="text-white font-mono text-sm flex-1 break-all">{inviteLink}</span>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 bg-purple-accent hover:bg-purple-accent/80 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-dark-bg hover:bg-white/5 text-white py-2 rounded-xl font-medium transition border border-white/10"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleCadastrar} className="space-y-4">
                <div>
                  <label className="block text-sm text-dark-text-muted mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome da empresa ou pessoa"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-dark-bg border border-white/10 rounded-lg py-2 px-4 outline-none focus:border-purple-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-text-muted mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="email@empresa.com"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-dark-bg border border-white/10 rounded-lg py-2 px-4 outline-none focus:border-purple-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-text-muted mb-1">Senha</label>
                  <input
                    type="password"
                    required
                    placeholder="Senha de acesso"
                    value={form.password}
                    onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full bg-dark-bg border border-white/10 rounded-lg py-2 px-4 outline-none focus:border-purple-accent transition"
                  />
                </div>
                {feedback && (
                  <div className={`text-sm px-4 py-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {feedback.msg}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-accent hover:bg-purple-accent/80 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar Lojista'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
