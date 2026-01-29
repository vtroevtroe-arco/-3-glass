
import React from 'react';
import { 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  Phone, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Hammer,
  Shield,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface DashboardProps {
  onCreateOS: () => void;
  onViewOS: () => void;
  onViewChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateOS, onViewOS, onViewChat }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Painel de Gestão</h2>
          <p className="text-gray-400 font-medium">B3 Glass - Monitoramento de Ordens e Atendimento.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-black bg-blue-600/10 text-blue-400 border border-blue-600/20 px-6 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
            NÚCLEO ATIVO
          </div>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Hammer className="w-6 h-6 text-amber-500" />} 
          label="Em Produção" 
          value="12" 
          trend="+3 novos"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />} 
          label="Prontos" 
          value="08" 
          trend="Entrega hoje"
        />
        <StatCard 
          icon={<Clock className="w-6 h-6 text-blue-500" />} 
          label="Aguardando" 
          value="24" 
          trend="Orçamentos"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />} 
          label="Volume Mensal" 
          value="45" 
          trend="Projetos"
        />
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ActionButton 
          icon={<PlusCircle className="w-12 h-12" />} 
          title="Nova Ordem" 
          description="Inicie um novo processo de blindagem ou orçamento técnico."
          onClick={onCreateOS}
          color="bg-blue-600"
          tag="Prioritário"
        />
        <ActionButton 
          icon={<FileText className="w-12 h-12" />} 
          title="Histórico Completo" 
          description="Acesse o banco de dados de todas as ordens de serviço salvas."
          onClick={onViewOS}
          color="bg-gray-800"
          tag="Gerenciamento"
        />
        <ActionButton 
          icon={<MessageSquare className="w-12 h-12" />} 
          title="Consultar Assistente" 
          description="Use a IA para sanar dúvidas técnicas sobre vidros e blindagens."
          onClick={onViewChat}
          color="bg-indigo-600"
          tag="Suporte IA"
        />
        <ActionButton 
          icon={<Phone className="w-12 h-12" />} 
          title="Equipe Comercial" 
          description="Canal direto via WhatsApp com nossos especialistas em vendas."
          onClick={() => window.open('https://wa.me/5511960733650', '_blank')}
          color="bg-emerald-600"
          tag="Vendas"
        />
      </div>

      {/* Internal News / Announcement */}
      <div className="bg-gray-900 border border-gray-800 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="bg-blue-600/20 p-8 rounded-[2rem] flex-shrink-0">
          <Zap className="w-16 h-16 text-blue-500" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
             <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Update</span>
             <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nova Tecnologia B3-X</h3>
          </div>
          <p className="text-gray-400 font-medium max-w-2xl text-lg">
            Acabamos de atualizar nossos padrões de policarbonato para a linha 2024. 
            Menos 15% de peso mantendo a mesma resistência balística Nível B3.
          </p>
          <button className="text-blue-500 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:text-blue-400 transition-colors">
            Ver especificações técnicas <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, trend: string }> = ({ icon, label, value, trend }) => (
  <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2rem] relative group hover:border-blue-500/30 transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className="p-3 bg-gray-800 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{trend}</span>
    </div>
    <div className="space-y-1">
      <div className="text-3xl font-black text-white">{value}</div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

const ActionButton: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  onClick: () => void, 
  color: string,
  tag: string
}> = ({ icon, title, description, onClick, color, tag }) => (
  <button 
    onClick={onClick}
    className={`${color} p-10 rounded-[3rem] text-left transition-all transform hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] shadow-lg flex flex-col gap-6 border border-white/5 h-full relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-500">
      {icon}
    </div>
    <div className="flex items-center justify-between z-10">
      <div className="bg-white/10 p-5 rounded-2xl">
        {icon}
      </div>
      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{tag}</span>
    </div>
    <div className="z-10 space-y-3">
      <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{title}</h4>
      <p className="text-white/70 font-medium text-lg leading-tight">{description}</p>
    </div>
    <div className="pt-4 mt-auto z-10">
       <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
          <ArrowUpRight className="w-6 h-6 text-white" />
       </div>
    </div>
  </button>
);

export default Dashboard;
