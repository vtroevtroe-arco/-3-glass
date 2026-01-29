
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Printer, 
  Send, 
  X, 
  Calendar, 
  User, 
  Car, 
  Ruler, 
  ClipboardList,
  ChevronDown
} from 'lucide-react';
import { ServiceOrder, GlassType, OSStatus } from '../types';

interface OSFormProps {
  editingOS: ServiceOrder | null;
  onSave: () => void;
  onCancel: () => void;
}

const GLASS_TYPES: GlassType[] = [
  'Para-brisa', 'Vigia traseiro', 'Porta dianteira esquerda', 
  'Porta dianteira direita', 'Porta traseira esquerda', 'Porta traseira direita', 'Fixo'
];

const STATUS_OPTIONS: OSStatus[] = ['Orçamento', 'Aprovado', 'Em produção', 'Pronto', 'Entregue'];

const OSForm: React.FC<OSFormProps> = ({ editingOS, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<ServiceOrder>>({
    osNumber: '',
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    cpfCnpj: '',
    phone: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    glassType: [],
    blindLevel: 'B3',
    height: '',
    width: '',
    thickness: '',
    notes: '',
    status: 'Orçamento'
  });

  useEffect(() => {
    if (editingOS) {
      setFormData(editingOS);
    } else {
      // Generate OS Number: OS-ANO-MES-DIA-RAND
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const rand = Math.floor(1000 + Math.random() * 9000);
      setFormData(prev => ({ 
        ...prev, 
        osNumber: `OS-${year}-${month}-${day}-${rand}` 
      }));
    }
  }, [editingOS]);

  const toggleGlassType = (type: GlassType) => {
    const current = formData.glassType || [];
    if (current.includes(type)) {
      setFormData({ ...formData, glassType: current.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, glassType: [...current, type] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedOS: ServiceOrder = {
      ...formData as ServiceOrder,
      id: editingOS?.id || Date.now().toString(),
      createdAt: editingOS?.createdAt || Date.now()
    };

    const existing = JSON.parse(localStorage.getItem('b3_glass_os') || '[]');
    let updated;
    if (editingOS) {
      updated = existing.map((os: ServiceOrder) => os.id === editingOS.id ? savedOS : os);
    } else {
      updated = [...existing, savedOS];
    }
    
    localStorage.setItem('b3_glass_os', JSON.stringify(updated));
    onSave();
  };

  const handleWhatsApp = () => {
    const message = `*B3 GLASS - ORDEM DE SERVIÇO*\n\n` +
      `📌 *OS:* ${formData.osNumber}\n` +
      `👤 *Cliente:* ${formData.customerName}\n` +
      `🚗 *Veículo:* ${formData.carBrand} ${formData.carModel} (${formData.carYear})\n` +
      `💎 *Vidro:* ${formData.glassType?.join(', ')}\n` +
      `🛡️ *Nível:* B3\n` +
      `📏 *Medidas:* ${formData.height}x${formData.width}x${formData.thickness}mm\n` +
      `📊 *Status:* ${formData.status}\n\n` +
      `Aguardamos aprovação do orçamento.`;
    
    const url = `https://wa.me/5511960733650?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6 no-print">
        <div>
          <h2 className="text-3xl font-black text-white">{editingOS ? 'Editar' : 'Criar Nova'} OS</h2>
          <p className="text-gray-400 font-medium">Preencha todos os dados técnicos com atenção.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition-all flex items-center gap-2"
          >
            <X className="w-5 h-5" /> Cancelar
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Identificação */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-xl no-print">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600/20 p-3 rounded-2xl">
              <ClipboardList className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Identificação da OS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField 
              label="Número da OS" 
              value={formData.osNumber || ''} 
              readOnly 
              className="bg-gray-950/50 border-blue-900/40 text-blue-400 font-black"
            />
            <InputField 
              label="Data" 
              type="date" 
              value={formData.date || ''} 
              onChange={(v) => setFormData({ ...formData, date: v })} 
              required
            />
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Status Atual</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value as OSStatus })}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-2xl py-4 px-4 text-white font-bold text-lg focus:outline-none focus:border-blue-500 appearance-none"
              >
                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Cliente */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-xl no-print">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600/20 p-3 rounded-2xl">
              <User className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Dados do Cliente</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Nome do Cliente" 
              value={formData.customerName || ''} 
              onChange={(v) => setFormData({ ...formData, customerName: v })} 
              required
              placeholder="Ex: João Silva"
            />
            <InputField 
              label="Telefone / WhatsApp" 
              value={formData.phone || ''} 
              onChange={(v) => setFormData({ ...formData, phone: v })} 
              placeholder="(11) 99999-9999"
            />
            <InputField 
              label="CPF ou CNPJ" 
              value={formData.cpfCnpj || ''} 
              onChange={(v) => setFormData({ ...formData, cpfCnpj: v })} 
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        {/* Section 3: Veículo */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-xl no-print">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-600/20 p-3 rounded-2xl">
              <Car className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Dados do Veículo</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField 
              label="Marca" 
              value={formData.carBrand || ''} 
              onChange={(v) => setFormData({ ...formData, carBrand: v })} 
              required
              placeholder="Ex: BMW"
            />
            <InputField 
              label="Modelo" 
              value={formData.carModel || ''} 
              onChange={(v) => setFormData({ ...formData, carModel: v })} 
              required
              placeholder="Ex: X5"
            />
            <InputField 
              label="Ano" 
              value={formData.carYear || ''} 
              onChange={(v) => setFormData({ ...formData, carYear: v })} 
              required
              placeholder="Ex: 2024"
            />
          </div>
        </div>

        {/* Section 4: Especificações Técnicas */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-xl no-print">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-600/20 p-3 rounded-2xl">
              <Ruler className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Especificações Técnicas</h3>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Tipo de Vidro</label>
            <div className="flex flex-wrap gap-3">
              {GLASS_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleGlassType(type)}
                  className={`
                    px-6 py-4 rounded-2xl font-bold transition-all border-2
                    ${formData.glassType?.includes(type) 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' 
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InputField label="Nível Blindagem" value="B3" readOnly className="bg-gray-950 font-black text-amber-500 border-amber-900/30" />
            <InputField label="Altura (mm)" type="number" value={formData.height || ''} onChange={(v) => setFormData({ ...formData, height: v })} required />
            <InputField label="Largura (mm)" type="number" value={formData.width || ''} onChange={(v) => setFormData({ ...formData, width: v })} required />
            <InputField label="Espessura (mm)" type="number" value={formData.thickness || ''} onChange={(v) => setFormData({ ...formData, thickness: v })} required />
          </div>

          <div className="mt-8">
            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Observações Adicionais</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium h-32"
              placeholder="Ex: Trincas pré-existentes, marcas de uso, etc..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 no-print">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black text-xl py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-900/40"
          >
            <Save className="w-8 h-8" /> SALVAR ORDEM
          </button>
          
          <button
            type="button"
            onClick={handlePrint}
            className="md:w-64 bg-gray-800 hover:bg-gray-700 text-white font-black text-xl py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all"
          >
            <Printer className="w-8 h-8" /> IMPRIMIR
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="md:w-64 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-emerald-900/40"
          >
            <Send className="w-8 h-8" /> ENVIAR WHATS
          </button>
        </div>
      </form>

      {/* Print Only Layout */}
      <div className="print-only p-8 text-black bg-white">
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-8">
          <div>
            <h1 className="text-3xl font-black">B3 GLASS</h1>
            <p className="font-bold">Vidros Blindados Automotivo</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black">{formData.osNumber}</p>
            <p className="font-bold">Data: {formData.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-black border-b border-black mb-2 uppercase">Cliente</h2>
            <p><strong>Nome:</strong> {formData.customerName}</p>
            <p><strong>Tel:</strong> {formData.phone}</p>
            <p><strong>CPF/CNPJ:</strong> {formData.cpfCnpj}</p>
          </div>
          <div>
            <h2 className="font-black border-b border-black mb-2 uppercase">Veículo</h2>
            <p><strong>Marca/Modelo:</strong> {formData.carBrand} {formData.carModel}</p>
            <p><strong>Ano:</strong> {formData.carYear}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-black border-b border-black mb-2 uppercase">Dados Técnicos</h2>
          <p><strong>Vidros:</strong> {formData.glassType?.join(', ')}</p>
          <p><strong>Blindagem:</strong> {formData.blindLevel}</p>
          <p><strong>Medidas:</strong> {formData.height} x {formData.width} x {formData.thickness} mm</p>
          <p><strong>Status:</strong> {formData.status}</p>
        </div>

        <div className="mb-12">
          <h2 className="font-black border-b border-black mb-2 uppercase">Observações</h2>
          <p className="min-h-[100px] border border-gray-300 p-4 rounded">{formData.notes || 'Sem observações.'}</p>
        </div>

        <div className="grid grid-cols-2 gap-12 text-center mt-20">
          <div className="border-t border-black pt-2">
            <p className="font-bold">Assinatura B3 Glass</p>
          </div>
          <div className="border-t border-black pt-2">
            <p className="font-bold">Assinatura Cliente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{ 
  label: string, 
  value: string, 
  type?: string, 
  onChange?: (v: string) => void, 
  required?: boolean, 
  readOnly?: boolean,
  placeholder?: string,
  className?: string
}> = ({ label, value, type = 'text', onChange, required, readOnly, placeholder, className }) => (
  <div>
    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`
        w-full bg-gray-800 border-2 border-gray-700 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold text-lg
        ${readOnly ? 'cursor-not-allowed opacity-80' : ''}
        ${className || ''}
      `}
    />
  </div>
);

export default OSForm;
