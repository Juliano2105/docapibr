import { Activity, BarChart3, DatabaseZap, Clock } from 'lucide-react';
import StatsCard from '../components/StatsCard';

export default function Usage() {
  const usageStats = [
    { title: "Consumo Total do Plano", value: "34.5k / 50k", icon: <BarChart3 /> },
    { title: "Consultas CPF", value: "12,300", icon: <Activity /> },
    { title: "Consultas CNPJ", value: "22,200", icon: <Activity /> },
    { title: "Economia com Cache", value: "89%", colorClass: "text-green-400", icon: <DatabaseZap /> },
  ];

  return (
    <div>
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-text-muted bg-clip-text text-transparent mb-2">
          Uso e Estatísticas
        </h1>
        <p className="text-dark-text-muted">Acompanhe seu consumo detalhado de API.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {usageStats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-blue-accent" size={20}/> Distribuição de Requests (30 dias)
          </h2>
          {/* Simulated Chart */}
          <div className="flex gap-4 items-end h-[200px] mt-4 border-b border-white/5 pb-2">
            {[45, 60, 50, 75, 40, 80, 55, 65, 45, 85, 30, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end relative group">
                <div 
                  className="w-full bg-blue-accent/30 hover:bg-blue-accent/60 transition-colors rounded-t-md cursor-pointer" 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black py-1 px-2 text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {h * 150} req
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock className="text-purple-accent" size={20}/> Latência Média de Resposta
            </h2>
            <div className="flex justify-around items-center h-32 mb-4">
              <div className="text-center">
                <p className="text-4xl font-black text-green-400">12ms</p>
                <p className="text-sm text-dark-text-muted uppercase tracking-wider font-bold mt-2">Cache Hit</p>
              </div>
              <div className="h-16 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-4xl font-black text-yellow-400">145ms</p>
                <p className="text-sm text-dark-text-muted uppercase tracking-wider font-bold mt-2">Cache Miss</p>
              </div>
            </div>
            
            <p className="text-sm text-dark-text-muted text-center mt-6">
              O cache acelera pesquisas em documentos repetidos, poupando a cota de provedores externos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
