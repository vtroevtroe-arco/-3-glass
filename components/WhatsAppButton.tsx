
import React from 'react';
import { Phone } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const message = "Olá, quero fazer um orçamento de vidro blindado B3. Meu nome é _____. Meu carro é _____. Preciso do vidro: _____.";
    const url = `https://wa.me/5511960733650?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-full shadow-2xl shadow-emerald-900/50 flex items-center gap-3 transition-all transform hover:scale-110 active:scale-95 group no-print"
    >
      <div className="relative">
        <Phone className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className="font-black uppercase tracking-tighter text-base whitespace-nowrap">
        Falar com a B3 Glass
      </span>
    </button>
  );
};

export default WhatsAppButton;
