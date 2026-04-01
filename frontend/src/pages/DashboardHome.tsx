import { Activity, DatabaseZap, Globe2, ShieldCheck } from 'lucide-react';
import StatsCard from '../components/StatsCard';

export default function DashboardHome() {
  // Mock data for UI demonstration
  const stats = [
    { title: "Consultas Hoje", value: "1,204", trend: "+12%", icon: <Activity /> },
    { title: "Consultas no Mês", value: "34,500", trend: "+5%", icon: <Globe2 /> },
    { title: "Cache Hits", value: "89%", colorClass: "text-purple-accent", icon: <DatabaseZap /> },
    { title: "Tempo Médio", value: "45ms", colorClass: "text-green-400", icon: <ShieldCheck /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-dark-text-muted bg-clip-text text-transparent mb-8">
        Visão Geral
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-6">Uso nos últimos 7 dias</h2>
          {/* Mock Chart using CSS grid */}
          <div className="h-64 flex items-end justify-between gap-2 pt-4 border-t border-white/5">
            {[30, 50, 45, 70, 60, 90, 85].map((height, i) => (
              <div key={i} className="flex-1 bg-blue-accent/20 hover:bg-blue-accent/40 transition-colors rounded-t-lg relative group" style={{ height: `${height}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                  {height * 10} req
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-dark-text-muted mt-2 px-2">
            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
          </div>
        </div>

        <div className="col-span-1 bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Informações do Plano</h2>
          <div className="space-y-4">
            <div className="bg-dark-bg p-4 rounded-xl">
              <span className="text-yellow-400 text-sm font-bold tracking-wider uppercase">Plano Atual</span>
              <p className="text-2xl font-bold mt-1">Basic</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dark-text-muted">Limite Mensal</span>
                <span className="font-medium">34,500 / 50,000</span>
              </div>
              <div className="h-2 w-full bg-dark-bg rounded-full overflow-hidden">
                <div className="h-full bg-blue-accent w-[69%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
