import { Link } from 'react-router-dom';
import { Database, Zap, Lock, Code } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full px-4 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Autocomplete e Validacao de <br/>
          <span className="bg-gradient-to-r from-blue-accent to-purple-accent bg-clip-text text-transparent">CPF &amp; CNPJ</span> API
        </h1>
        <p className="text-xl md:text-2xl text-dark-text-muted max-w-3xl">
          Descubra dados precisos de Pessoas Fisicas e Empresas no Brasil com uma unica chamada de API. Estavel, escalavel e segura.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Link to="/register" className="bg-blue-accent hover:bg-blue-accent/80 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
            Comece Gratuitamente
          </Link>
          <Link to="/docs" className="bg-dark-surface hover:bg-dark-surface/80 text-white px-8 py-4 rounded-xl font-bold border border-dark-surface transition-all flex items-center justify-center gap-2">
            <Code className="w-5 h-5"/> Ver Documentacao
          </Link>
        </div>
      </section>

      <section className="w-full bg-dark-surface border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-dark-bg/50 border border-white/5 hover:border-blue-accent/30 transition-colors">
            <div className="bg-blue-accent/10 w-14 h-14 flex items-center justify-center rounded-xl mb-6">
              <Zap className="text-blue-accent w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Ultrarrapido</h3>
            <p className="text-dark-text-muted leading-relaxed">Cache inteligente distribuido que garante tempos de resposta abaixo de 50ms para documentos ja consultados.</p>
          </div>
          <div className="p-6 rounded-2xl bg-dark-bg/50 border border-white/5 hover:border-purple-accent/30 transition-colors">
            <div className="bg-purple-accent/10 w-14 h-14 flex items-center justify-center rounded-xl mb-6">
              <Database className="text-purple-accent w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Dados Completos</h3>
            <p className="text-dark-text-muted leading-relaxed">Nome, Mae, Nascimento, CAE, CNAE, Endereco completo. Tudo de fontes oficiais e validadas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-dark-bg/50 border border-white/5 hover:border-blue-accent/30 transition-colors">
            <div className="bg-blue-accent/10 w-14 h-14 flex items-center justify-center rounded-xl mb-6">
              <Lock className="text-blue-accent w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Seguro e Anonimo</h3>
            <p className="text-dark-text-muted leading-relaxed">Nao guardamos IPs associados as pequisas. Suas chaves de API sao encriptadas e renovaveis a qualquer momento.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
