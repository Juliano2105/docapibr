import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from '../components/ErrorAlert';
import { KeyRound, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Manual Bypass for the requested demo Admin
      if (email === 'megafeiraodasloucas@gmail.com' && password === '11223344') {
        const fakeToken = "mock_admin_token_" + Date.now();
        const fakeUser = { id: 'admin-1', name: 'Admin Master', email, role: 'admin' as 'admin' };
        login(fakeToken, fakeUser);
        navigate('/admin');
        return;
      }

      const res = await api.post('/auth/login', { email, password });
      login(res.data.data.token, res.data.data.user);
      
      if (res.data.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-dark-surface p-8 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Bem-vindo de volta</h2>
          <p className="mt-2 text-dark-text-muted">Acesse seu painel DocAPIBR</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorAlert message={error} />}
          
          <div className="space-y-4">
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
                  placeholder="seu@email.com"
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
            className="w-full bg-blue-accent text-white py-3 rounded-xl font-bold hover:bg-blue-accent/80 transition shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-dark-text-muted text-sm mt-6">
          Nao tem conta? <Link to="/register" className="text-blue-accent hover:underline">Registre-se agora</Link>
        </p>
      </div>
    </div>
  );
}
