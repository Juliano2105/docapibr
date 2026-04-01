import { Code2, Terminal, CheckCircle2 } from 'lucide-react';

export default function Docs() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Documentação da API</h1>
      <p className="text-dark-text-muted text-lg mb-12">Integre validacoes e autocompletos em minutos no seu ERP ou App.</p>
      
      <div className="bg-dark-surface border border-white/5 rounded-2xl overflow-hidden mb-12">
        <div className="p-4 border-b border-white/5 bg-dark-bg/50">
          <h2 className="font-semibold text-lg flex items-center gap-2"><CheckCircle2 className="text-green-400" size={20} /> Autenticação Pública</h2>
        </div>
        <div className="p-6 text-dark-text-muted prose prose-invert max-w-none">
          <p>Para se comunicar com nossos blocos de API remotamente, envie sua API Key gerada via Header da requisição:</p>
          <pre className="bg-dark-bg border border-white/10 rounded-xl p-4 mt-4 overflow-x-auto text-sm text-green-300">
            X-API-Key: SUA_API_KEY
          </pre>
          <div className="mt-8 border-t border-white/5 pt-6">
            <h3 className="text-white font-bold mb-4">Campos Retornados</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-blue-400 font-bold mb-3 border-b border-white/10 pb-2">Retorno de CPF</h4>
                <pre className="bg-dark-bg rounded-lg p-3 text-xs text-blue-200">
{`{
  "success": true,
  "data": {
    "CPF": "12345678909",
    "NOME": "Nome Completo",
    "SEXO": "Masculino/Feminino",
    "NASC": "DD/MM/YYYY",
    "NOME_MAE": "Nome da Mae"
  },
  "meta": {
    "cached": false,
    "response_time_ms": 12
  }
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-bold mb-3 border-b border-white/10 pb-2">Retorno de CNPJ</h4>
                <pre className="bg-dark-bg rounded-lg p-3 text-xs text-purple-200">
{`{
  "success": true,
  "data": {
    "cnpj": "12345678000199",
    "razao_social": "Razão Social Ltda",
    "nome_fantasia": "Nome Fantasia",
    "logradouro": "Rua Exemplo",
    ...
  },
  "meta": {
    "cached": true,
    "response_time_ms": 2
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-blue-accent flex items-center gap-2"><Terminal size={20}/> cURL</h3>
          <pre className="text-sm bg-dark-bg rounded-xl p-4 overflow-x-auto text-blue-300 border border-white/5">
            curl -X GET "https://seusite.com/api/v1/cpf/00000000000" \<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-H "X-API-Key: SUA_CHAVE"
          </pre>
        </div>
        
        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-[#f7df1e] flex items-center gap-2"><Code2 size={20}/> JavaScript / TS</h3>
          <pre className="text-sm bg-dark-bg rounded-xl p-4 overflow-x-auto text-yellow-300 border border-white/5">
            const response = await fetch('https://seusite.com/api/v1/cnpj/00000000000000', {'{'} <br/>
            &nbsp;&nbsp;headers: {'{'} 'X-API-Key': 'SUA_CHAVE' {'}'} <br/>
            {'}'});<br/>
            const data = await response.json();
          </pre>
        </div>

        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-[#3776ab] flex items-center gap-2"><Terminal size={20}/> Python</h3>
          <pre className="text-sm bg-dark-bg rounded-xl p-4 overflow-x-auto text-blue-300 border border-white/5">
            import requests<br/><br/>
            url = "https://seusite.com/api/v1/cpf/00000000000"<br/>
            headers = {"{"}"X-API-Key": "SUA_CHAVE"{"}"}<br/>
            response = requests.get(url, headers=headers)<br/>
            print(response.json())
          </pre>
        </div>

        <div className="bg-dark-surface border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-[#777bb3] flex items-center gap-2"><Code2 size={20}/> PHP</h3>
          <pre className="text-sm bg-dark-bg rounded-xl p-4 overflow-x-auto text-purple-300 border border-white/5">
            $ch = curl_init();<br/>
            curl_setopt($ch, CURLOPT_URL, "https://seusite.com/api/v1/cnpj/00000000000000");<br/>
            curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-API-Key: SUA_CHAVE"]);<br/>
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);<br/>
            $response = curl_exec($ch);<br/>
            curl_close($ch);
          </pre>
        </div>
      </div>
    </div>
  );
}
