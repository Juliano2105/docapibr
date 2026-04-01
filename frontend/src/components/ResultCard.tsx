import { Building, UserCircle, MapPin, Phone } from 'lucide-react';

interface ResultCardProps {
  data: any;
  type: 'cpf' | 'cnpj';
}

export default function ResultCard({ data, type }: ResultCardProps) {
  if (!data) return null;

  if (type === 'cpf') {
    return (
      <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 mt-6 shadow-xl animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
          <div className="bg-blue-accent/20 p-3 rounded-full text-blue-accent"><UserCircle size={28}/></div>
          <div>
            <h2 className="text-2xl font-bold">{data.nome_completo}</h2>
            <p className="text-dark-text-muted font-mono">{data.cpf}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <span className="block text-dark-text-muted mb-1 text-xs uppercase tracking-wider">Nome da Mae</span>
            <span className="font-medium text-lg">{data.nome_mae}</span>
          </div>
          <div>
            <span className="block text-dark-text-muted mb-1 text-xs uppercase tracking-wider">Data de Nascimento</span>
            <span className="font-medium text-lg">{data.data_nascimento}</span>
          </div>
          <div>
            <span className="block text-dark-text-muted mb-1 text-xs uppercase tracking-wider">Sexo</span>
            <span className="font-medium text-lg capitalize">{data.sexo}</span>
          </div>
        </div>
      </div>
    );
  }

  // CNPJ
  return (
    <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 mt-6 shadow-xl animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
        <div className="bg-purple-accent/20 p-3 rounded-full text-purple-accent"><Building size={28}/></div>
        <div>
          <h2 className="text-2xl font-bold">{data.razao_social}</h2>
          <p className="text-dark-text-muted">{data.nome_fantasia || 'Sem Nome Fantasia'}</p>
        </div>
        <div className="ml-auto text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${data.situacao_cadastral === 'ATIVA' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {data.situacao_cadastral}
          </span>
          <p className="text-dark-text-muted font-mono text-sm mt-2">{data.cnpj}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm mt-4">
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex items-start gap-2">
          <MapPin size={18} className="text-dark-text-muted mt-1 shrink-0" />
          <span>
            {data.logradouro}, {data.numero} - {data.complemento && `${data.complemento} - `}{data.bairro} <br/>
            {data.municipio} - {data.uf}, CEP {data.cep}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-dark-text-muted shrink-0" />
          <span className="font-medium">{data.telefone || "Nao informado"}</span>
        </div>
        <div>
          <span className="text-dark-text-muted mr-2 text-xs uppercase tracking-wider">CNAE Fiscal</span>
          <span className="font-mono">{data.cnae_fiscal}</span>
        </div>
      </div>
    </div>
  );
}
