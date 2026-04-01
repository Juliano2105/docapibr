import { Package, ShieldAlert } from 'lucide-react';

export default function AdminPlans() {
  const plans = [
    { name: 'Free', rpm: 10, limit: 100, price: 'R$ 0,00' },
    { name: 'Basic', rpm: 30, limit: 1000, price: 'R$ 49,90' },
    { name: 'Pro', rpm: 100, limit: 10000, price: 'R$ 149,90' },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Gestão de Planos
          </h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
           <div key={plan.name} className="bg-dark-surface border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition duration-500">
               <Package size={140} />
             </div>
             <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
             <p className="text-dark-text-muted text-sm border-b border-white/5 pb-4 mb-4">Parametros do Plano</p>
             
             <ul className="space-y-3 mb-8 font-medium">
               <li className="flex justify-between"><span className="text-dark-text-muted">Requests / Minuto</span> <span>{plan.rpm} RPM</span></li>
               <li className="flex justify-between"><span className="text-dark-text-muted">Requests / Mês</span> <span>{plan.limit} req</span></li>
               <li className="flex justify-between text-blue-accent mt-4 border-t border-white/5 pt-4"><span className="text-dark-text-muted">Mensalidade</span> <span className="font-bold text-lg">{plan.price}</span></li>
             </ul>
             <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-dark-text-muted hover:text-white">
               Editar Limites
             </button>
           </div>
        ))}
      </div>
    </div>
  );
}
