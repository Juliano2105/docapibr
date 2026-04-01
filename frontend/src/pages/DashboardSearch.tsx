import { useState, useEffect } from 'react';
import CPFInput from '../components/CPFInput';
import CNPJInput from '../components/CNPJInput';
import { AlertCircle, Building2, User } from 'lucide-react';

// Helpers to format IDs purely for display in the Result Card
const formatCpf = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
const formatCnpj = (cnpj: string) => cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
const formatCep = (cep: string) => cep.length === 8 ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : cep;

export default function DashboardSearch() {
  const [docType, setDocType] = useState<'cpf' | 'cnpj'>('cpf');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  // Auto-search logic
  useEffect(() => {
    const rawCpf = cpf.replace(/\D/g, '');
    if (docType === 'cpf' && rawCpf.length === 11) {
      handleSearch(rawCpf, 'cpf');
    }
    
    const rawCnpj = cnpj.replace(/\D/g, '');
    if (docType === 'cnpj' && rawCnpj.length === 14) {
      handleSearch(rawCnpj, 'cnpj');
    }
  }, [cpf, cnpj, docType]);

  const handleSearch = async (doc: string, type: 'cpf' | 'cnpj') => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/v1/${type}/${doc}`);
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || 'Erro ao buscar documento');
      }
      
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao comunicar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrent = () => {
    setResult(null);
    setError(null);
    if (docType === 'cpf') setCpf('');
    else setCnpj('');
  }

  // Sub-component for rendering the result card
  const renderResultCard = () => {
    if (!result) return null;

    const isActive = result.situacao_cadastral === 'ATIVA' || result.situacao_cadastral === 'REGULAR';
    const statusBadgeClass = isActive 
      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
      : 'bg-red-500/20 text-red-400 border border-red-500/30';

    return (
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-5 border-b border-gray-700/50 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            {docType === 'cpf' ? <User className="text-blue-400" size={24}/> : <Building2 className="text-purple-400" size={24}/>}
            <h3 className="text-lg font-bold text-white">
              Resultado: {docType === 'cpf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
            </h3>
          </div>
          {result.situacao_cadastral && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${statusBadgeClass}`}>
              {result.situacao_cadastral}
            </span>
          )}
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          {docType === 'cpf' ? (
            <>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">CPF</p>
                <p className="text-white font-medium text-lg">{result.CPF ? formatCpf(result.CPF.toString()) : '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Nome Completo</p>
                <p className="text-white font-medium break-words leading-tight">{result.NOME || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Data Nascimento</p>
                <p className="text-white font-medium">{result.NASC || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Gênero</p>
                <p className="text-white font-medium">{result.SEXO || '---'}</p>
              </div>
              <div className="sm:col-span-2 border-t border-gray-700/50 pt-4 mt-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Nome da Mãe</p>
                <p className="text-white font-medium break-words leading-tight">{result.NOME_MAE || '---'}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">CNPJ</p>
                <p className="text-white font-medium text-lg">{result.cnpj ? formatCnpj(result.cnpj.toString()) : '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Razão Social</p>
                <p className="text-white font-medium text-sm leading-tight">{result.razao_social || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Nome Fantasia</p>
                <p className="text-white font-medium text-sm leading-tight">{result.nome_fantasia || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">CNAE Fiscal</p>
                <p className="text-white font-medium">{result.cnae_fiscal || '---'}</p>
              </div>
              <div className="sm:col-span-2 border-t border-gray-700/50 pt-4 mt-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Endereço Completo</p>
                <p className="text-white font-medium">
                  {result.logradouro ? `${result.logradouro}, ${result.numero || 'SN'}` : '---'}
                  {result.complemento ? ` - ${result.complemento}` : ''}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Bairro</p>
                <p className="text-white font-medium">{result.bairro || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Cidade / UF</p>
                <p className="text-white font-medium">
                  {(result.municipio && result.uf) ? `${result.municipio} - ${result.uf}` : '---'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">CEP</p>
                <p className="text-white font-medium">{result.cep ? formatCep(result.cep.toString()) : '---'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-semibold">Telefone</p>
                <p className="text-white font-medium">{result.telefone || '---'}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Consulta de Documentos</h1>
        <p className="text-gray-400">Consulte informações completas de CPF ou CNPJ em tempo real.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => { setDocType('cpf'); clearCurrent(); }}
          className={`flex-1 py-4 font-semibold rounded-xl border-2 transition-all ${docType === 'cpf' ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-gray-800 bg-gray-900 text-gray-500 hover:border-gray-700 hover:text-gray-300'}`}
        >
          CPF (Pessoa Física)
        </button>
        <button 
          onClick={() => { setDocType('cnpj'); clearCurrent(); }}
          className={`flex-1 py-4 font-semibold rounded-xl border-2 transition-all ${docType === 'cnpj' ? 'border-purple-500 bg-purple-500/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-gray-800 bg-gray-900 text-gray-500 hover:border-gray-700 hover:text-gray-300'}`}
        >
          CNPJ (Pessoa Jurídica)
        </button>
      </div>

      <div className="relative">
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-4">
            Digite o Número ({docType === 'cpf' ? '11' : '14'} dígitos)
          </label>
          
          <div className={isLoading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
            {docType === 'cpf' ? (
              <CPFInput value={cpf} onChange={setCpf} isLoading={isLoading} />
            ) : (
              <CNPJInput value={cnpj} onChange={setCnpj} isLoading={isLoading} />
            )}
          </div>

          {isLoading && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center pointer-events-none z-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
              <p className="text-xs text-blue-400 font-bold mt-2 animate-pulse uppercase tracking-widest drop-shadow-md">Buscando...</p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl mt-6 flex items-start gap-3 animate-in fade-in duration-300">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <p className="flex-1">{error}</p>
          </div>
        )}

        {renderResultCard()}
      </div>
    </div>
  );
}
