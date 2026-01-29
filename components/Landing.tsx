
import React from 'react';
import { Shield, MessageSquare, ChevronRight, Phone, CheckCircle2, Star, ShieldAlert, Zap, Award } from 'lucide-react';

interface LandingProps {
  onStartChat: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStartChat }) => {
  return (
    <div className="animate-in fade-in duration-1000 space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center p-6 rounded-[3rem] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000')`,
            filter: 'brightness(0.2)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/60 to-gray-950 z-0"></div>

        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="inline-flex items-center gap-4 bg-blue-600/20 backdrop-blur-xl px-8 py-3 rounded-full border border-blue-500/30 mb-4 animate-bounce">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Líder em Blindagem B3</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Proteção que <span className="text-blue-500">você vê,</span><br />
            segurança que <span className="text-blue-500 font-outline-2 text-transparent" style={{ WebkitTextStroke: '1px #3b82f6' }}>você sente.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Especializada em vidros blindados automotivos de alta performance. 
            Tecnologia balística avançada para quem não abre mão da segurança.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onStartChat}
              className="w-full sm:w-auto bg-white text-gray-950 px-14 py-7 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all transform hover:scale-105 hover:bg-blue-50 shadow-2xl"
            >
              <MessageSquare className="w-6 h-6" /> CONSULTAR IA
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5511960733650', '_blank')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-14 py-7 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all transform hover:scale-105 shadow-2xl shadow-emerald-900/40"
            >
              <Phone className="w-6 h-6" /> ORÇAMENTO
            </button>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <BenefitCard 
          icon={<ShieldAlert className="w-10 h-10 text-red-500" />}
          title="Resistência Extrema"
          desc="Nossos vidros são submetidos a testes de impacto balístico real nível III-A / B3."
        />
        <BenefitCard 
          icon={<Zap className="w-10 h-10 text-amber-500" />}
          title="Leveza e Clareza"
          desc="Tecnologia de policarbonato que reduz o peso sem perder a transparência original."
        />
        <BenefitCard 
          icon={<Award className="w-10 h-10 text-blue-500" />}
          title="Garantia Premium"
          desc="Suporte total e garantia contra delaminação em toda a nossa linha de produtos."
        />
      </section>

      {/* How it Works Section */}
      <section className="bg-gray-900 border border-gray-800 rounded-[4rem] p-12 md:p-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">O Processo B3 Glass</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Do orçamento à entrega do seu veículo seguro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Steps */}
            <Step number="01" title="Análise Técnica" desc="Avaliamos o modelo do veículo e as medidas exatas para cada peça." />
            <Step number="02" title="Blindagem B3" desc="Processo industrial de sobreposição de camadas de vidro e proteção." />
            <Step number="03" title="Instalação Master" desc="Nossos técnicos realizam o encaixe com acabamento de fábrica." />
          </div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <div className="h-px w-12 bg-blue-500"></div>
             <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs">Sobre a B3 Glass</span>
          </div>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
            ESPECIALISTA EM <br /><span className="text-blue-500">SEGURANÇA</span> MÁXIMA
          </h2>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Somos apaixonados por proteção. Nosso compromisso é garantir que cada cliente da B3 Glass 
            possa circular com a certeza de estar amparado pela melhor tecnologia balística do mercado brasileiro.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
              <div className="text-4xl font-black text-white mb-2">10+</div>
              <div className="text-xs font-black text-blue-500 uppercase tracking-widest">Anos de Experiência</div>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
              <div className="text-4xl font-black text-white mb-2">5k+</div>
              <div className="text-xs font-black text-blue-500 uppercase tracking-widest">Carros Protegidos</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-700 p-16 rounded-[4rem] text-center space-y-10 shadow-3xl">
            <div className="inline-flex items-center justify-center w-40 h-40 bg-gray-900 rounded-[2.5rem] border border-gray-700 shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <Shield className="w-20 h-20 text-blue-500 transform group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">B3 GLASS</h3>
              <p className="text-blue-400 font-black text-sm uppercase tracking-[0.4em] mt-3">Selo de Qualidade</p>
            </div>
            <div className="flex justify-center gap-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-current" />)}
            </div>
            <p className="text-gray-500 font-bold italic text-lg leading-relaxed">
              "Excelência técnica e compromisso inegociável com a vida do condutor."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Shield className="w-64 h-64 text-white" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter relative z-10">
          Proteja o que realmente <br />importa agora.
        </h2>
        <p className="text-emerald-100 text-xl font-bold max-w-2xl mx-auto relative z-10">
          Atendimento personalizado via WhatsApp ou através da nossa inteligência artificial para orçamentos instantâneos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 relative z-10">
          <button 
            onClick={() => window.open('https://wa.me/5511960733650', '_blank')}
            className="bg-white text-emerald-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-2xl"
          >
            FALAR COM VENDEDOR
          </button>
        </div>
      </section>

      <footer className="text-center py-20 border-t border-gray-800">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-900 p-4 rounded-2xl">
            <Shield className="w-12 h-12 text-gray-700" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-xs">
              B3 GLASS - BLINDAGEM AUTOMOTIVA DE ALTA PERFORMANCE
            </p>
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              © 2024 Todos os direitos reservados. Segurança em primeiro lugar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-gray-900/50 border border-gray-800 p-10 rounded-[3rem] space-y-6 hover:border-gray-700 transition-all group hover:-translate-y-2">
    <div className="bg-gray-900 w-20 h-20 rounded-3xl flex items-center justify-center border border-gray-800 group-hover:bg-gray-800 transition-colors">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h3>
      <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Step: React.FC<{ number: string, title: string, desc: string }> = ({ number, title, desc }) => (
  <div className="space-y-4 relative z-10">
    <div className="text-6xl font-black text-blue-600/20 mb-2">{number}</div>
    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h4>
    <p className="text-gray-500 font-medium">{desc}</p>
  </div>
);

export default Landing;
