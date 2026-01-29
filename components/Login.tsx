
import React, { useState } from 'react';
import { Shield, Lock, Mail, ChevronRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@b3glass.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated auth delay
    setTimeout(() => {
      if (email === 'admin@b3glass.com' && password === '123456') {
        onLogin(email);
      } else {
        setError('Usuário ou senha incorretos.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        {/* Logo Section - Matching Image 3 style */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-blue-600/30 blur-2xl rounded-full"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-[2rem] shadow-2xl">
              <Shield className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-1">B3 GLASS</h1>
          <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em]">Gestão de Segurança</p>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield className="w-48 h-48 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">Acesso Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold text-lg"
                  placeholder="admin@b3glass.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">Senha de Segurança</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold text-lg"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-bold">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/50"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  ACESSAR SISTEMA
                  <ChevronRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              Sistema Exclusivo B3 Glass<br />Proteção que você vê, segurança que você sente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
