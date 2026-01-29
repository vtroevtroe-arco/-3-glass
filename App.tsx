
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  Phone, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  User,
  Lock,
  Home
} from 'lucide-react';
import { AuthState, ServiceOrder } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OSForm from './components/OSForm';
import OSList from './components/OSList';
import Chat from './components/Chat';
import Landing from './components/Landing';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, user: null });
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'create-os' | 'list-os' | 'chat' | 'login'>('home');
  const [editingOS, setEditingOS] = useState<ServiceOrder | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('b3_glass_auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  const handleLogin = (user: string) => {
    const newAuth = { isLoggedIn: true, user };
    setAuth(newAuth);
    localStorage.setItem('b3_glass_auth', JSON.stringify(newAuth));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('b3_glass_auth');
    setCurrentView('home');
  };

  const navigate = (view: typeof currentView) => {
    if ((view === 'dashboard' || view === 'create-os' || view === 'list-os') && !auth.isLoggedIn) {
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
    setMobileMenuOpen(false);
    setEditingOS(null);
  };

  const handleEditOS = (os: ServiceOrder) => {
    setEditingOS(os);
    setCurrentView('create-os');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row font-sans text-gray-100">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-800 transition-transform duration-300 transform md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-4 border-b border-gray-800 cursor-pointer group" onClick={() => navigate('home')}>
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white">B3 GLASS</h1>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">Premium Armor</p>
            </div>
          </div>

          <nav className="flex-1 p-6 space-y-3 mt-4">
            <NavItem icon={<Home className="w-5 h-5" />} label="Página Inicial" active={currentView === 'home'} onClick={() => navigate('home')} />
            {auth.isLoggedIn && (
              <>
                <div className="pt-6 pb-2 px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">Administração</div>
                <NavItem icon={<Shield className="w-5 h-5" />} label="Painel Geral" active={currentView === 'dashboard'} onClick={() => navigate('dashboard')} />
                <NavItem icon={<PlusCircle className="w-5 h-5" />} label="Lançar Nova OS" active={currentView === 'create-os'} onClick={() => navigate('create-os')} />
                <NavItem icon={<FileText className="w-5 h-5" />} label="Histórico de OS" active={currentView === 'list-os'} onClick={() => navigate('list-os')} />
              </>
            )}
            <div className="pt-6 pb-2 px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">Atendimento</div>
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Assistente Digital IA" active={currentView === 'chat'} onClick={() => navigate('chat')} />
          </nav>

          <div className="p-6 border-t border-gray-800 bg-gray-900/50">
            {auth.isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                  <div className="bg-blue-600 rounded-full p-2 text-white shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-500 uppercase">Acesso Ativo</p>
                    <p className="text-xs font-bold text-gray-200 truncate">{auth.user}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-200 font-black text-sm uppercase tracking-widest">
                  <LogOut className="w-5 h-5" /> Encerrar Sessão
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('login')} className="flex items-center w-full gap-4 px-6 py-5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest border border-gray-700/50">
                <Lock className="w-5 h-5 text-blue-500" /> Acesso Restrito
              </button>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="md:hidden flex items-center justify-between p-5 bg-gray-900 border-b border-gray-800 sticky top-0 z-40 shadow-xl">
          <div className="flex items-center gap-3" onClick={() => navigate('home')}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg text-white tracking-tighter">B3 GLASS</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2.5 bg-gray-800 rounded-xl text-white active:scale-95 transition-transform">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <section className="flex-1 overflow-y-auto bg-gray-950">
          <div className="max-w-7xl mx-auto p-4 md:p-10 pb-32">
            {currentView === 'home' && <Landing onStartChat={() => navigate('chat')} />}
            {currentView === 'login' && <Login onLogin={handleLogin} />}
            {currentView === 'dashboard' && auth.isLoggedIn && <Dashboard onCreateOS={() => navigate('create-os')} onViewOS={() => navigate('list-os')} onViewChat={() => navigate('chat')} />}
            {currentView === 'create-os' && auth.isLoggedIn && <OSForm editingOS={editingOS} onSave={() => navigate('list-os')} onCancel={() => navigate('dashboard')} />}
            {currentView === 'list-os' && auth.isLoggedIn && <OSList onEditOS={handleEditOS} onNewOS={() => navigate('create-os')} />}
            {currentView === 'chat' && <Chat />}
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all duration-300 font-black text-xs uppercase tracking-widest ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/40 translate-x-1' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'}`}>
    <div className="flex items-center gap-4">
      <div className={`${active ? 'text-white' : 'text-blue-500'} transition-colors`}>{icon}</div>
      <span>{label}</span>
    </div>
    {active && <ChevronRight className="w-4 h-4 opacity-50" />}
  </button>
);

export default App;
