import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import ErrorAlert from '../components/ErrorAlert';
import { User, Mail, KeyRound } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/v1/auth/register', { name, email, password });
      // Redirect to login after successful register
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-dark-surface p-8 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Criar Conta</h2>
          <p className="mt-2 text-dark-text-muted">Inicie com o plano Free de graca.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorAlert message={error} />}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-dark-text-muted mb-1 block">Nome da Empresa / Pessoal</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:border-blue-accent focus:ring-1 focus:ring-blue-accent outline-none transition-all"
                  placeholder="Softcom LTDA"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-dark-text-muted mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:border-blue-accent focus:ring-1 focus:ring-blue-accent outline-none transition-all"
                  placeholder="contato@empresa.com"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-dark-text-muted mb-1 block">Senha</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-muted" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:border-blue-accent focus:ring-1 focus:ring-blue-accent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-accent text-white py-3 rounded-xl font-bold hover:bg-purple-accent/80 transition shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar minha conta'}
          </button>
        </form>

        <p className="text-center text-dark-text-muted text-sm mt-6">
          Ja possui conta? <Link to="/login" className="text-purple-accent hover:underline">Faca Login</Link>
        </p>
      </div>
    </div>
  );
}
