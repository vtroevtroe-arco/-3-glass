
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Plus, 
  AlertCircle,
  Clock,
  CheckCircle,
  ShieldCheck,
  Package,
  FileSearch
} from 'lucide-react';
import { ServiceOrder, OSStatus } from '../types';

interface OSListProps {
  onEditOS: (os: ServiceOrder) => void;
  onNewOS: () => void;
}

const OSList: React.FC<OSListProps> = ({ onEditOS, onNewOS }) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OSStatus | 'Todos'>('Todos');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('b3_glass_os') || '[]');
    setOrders(saved.sort((a: ServiceOrder, b: ServiceOrder) => b.createdAt - a.createdAt));
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta Ordem de Serviço?')) {
      const updated = orders.filter(os => os.id !== id);
      localStorage.setItem('b3_glass_os', JSON.stringify(updated));
      setOrders(updated);
    }
  };

  const filteredOrders = orders.filter(os => {
    const matchesSearch = 
      os.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.osNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || os.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: OSStatus) => {
    switch (status) {
      case 'Orçamento': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Aprovado': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Em produção': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Pronto': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Entregue': return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  const getStatusIcon = (status: OSStatus) => {
    switch (status) {
      case 'Orçamento': return <Clock className="w-4 h-4" />;
      case 'Aprovado': return <ShieldCheck className="w-4 h-4" />;
      case 'Em produção': return <Package className="w-4 h-4" />;
      case 'Pronto': return <CheckCircle className="w-4 h-4" />;
      case 'Entregue': return <CheckCircle className="w-4 h-4 opacity-50" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Ordens de Serviço</h2>
          <p className="text-gray-400 font-medium">Gerencie e acompanhe todos os pedidos de blindagem.</p>
        </div>
        <button 
          onClick={onNewOS}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.05] shadow-lg shadow-blue-900/40"
        >
          <Plus className="w-6 h-6" /> NOVA ORDEM
        </button>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Pesquisar por nome, OS, carro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border-2 border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full bg-gray-900 border-2 border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none focus:border-blue-500 transition-all appearance-none"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Orçamento">Orçamento</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Em produção">Em produção</option>
            <option value="Pronto">Pronto</option>
            <option value="Entregue">Entregue</option>
          </select>
        </div>
      </div>

      {/* OS Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((os) => (
            <div 
              key={os.id} 
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all group flex flex-col sm:flex-row gap-6"
            >
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{os.osNumber}</span>
                    <h3 className="text-xl font-black text-white leading-tight uppercase mt-1">{os.customerName}</h3>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase ${getStatusStyle(os.status)}`}>
                    {getStatusIcon(os.status)}
                    {os.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-gray-400">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Veículo</span>
                    <span className="text-gray-200">{os.carBrand} {os.carModel} ({os.carYear})</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Vidros</span>
                    <span className="text-gray-200 truncate">{os.glassType?.length} Peça(s)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Criado em: {new Date(os.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEditOS(os)}
                      className="p-3 bg-gray-800 text-white rounded-xl hover:bg-blue-600 transition-all"
                      title="Editar"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(os.id)}
                      className="p-3 bg-gray-800 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-gray-900/50 border-2 border-dashed border-gray-800 rounded-[3rem] flex flex-col items-center justify-center text-center">
            <FileSearch className="w-16 h-16 text-gray-700 mb-4" />
            <h3 className="text-2xl font-black text-gray-500 uppercase tracking-tight">Nenhuma OS encontrada</h3>
            <p className="text-gray-600 font-bold mt-2">Tente ajustar seus filtros ou crie uma nova ordem.</p>
            <button 
              onClick={onNewOS}
              className="mt-8 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-bold transition-all"
            >
              Criar primeira Ordem de Serviço
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OSList;
