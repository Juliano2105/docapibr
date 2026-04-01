import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-text-muted bg-clip-text text-transparent mb-2">
          Configurações da Conta
        </h1>
        <p className="text-dark-text-muted">Gerencie suas informacoes e faturamento.</p>
      </div>

      <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg mb-6">
        <h3 className="text-lg font-bold border-b border-white/5 pb-4 mb-4">Seus Dados</h3>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-dark-text-muted mb-1 block">Nome</label>
              <input type="text" defaultValue={user?.name || "Visitante"} className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-accent" />
            </div>
            <div>
              <label className="text-sm font-medium text-dark-text-muted mb-1 block">Email</label>
              <input type="email" disabled defaultValue={user?.email || "email@exemplo.com"} className="w-full bg-dark-bg/50 border border-white/5 rounded-xl px-4 py-3 outline-none text-white/50 cursor-not-allowed" />
            </div>
          </div>
          
          <button type="button" className="bg-blue-accent hover:bg-blue-accent/80 text-white px-4 py-2 rounded-lg font-bold transition shadow-[0_0_15px_rgba(59,130,246,0.2)] mt-4">
            Salvar Alterações
          </button>
        </form>
      </div>

      <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold border-b border-white/5 pb-4 mb-4 text-red-400">Zona de Perigo</h3>
        <p className="text-dark-text-muted mb-4 text-sm">A exclusao da conta apagara todo o historico de buscas e revogará as chaves de API imediatamente.</p>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-bold transition">
          Excluir Conta
        </button>
      </div>
    </div>
  );
}
