
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Shield, AlertCircle, Phone, Sparkles, User, BrainCircuit } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o Assistente B3 Glass. Posso tirar dúvidas sobre blindagens Nível B3, prazos, garantias e orçamentos. Como posso ajudar seu carro hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await getGeminiResponse([...messages, userMessage]);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  const quickQuestions = [
    "Qual o prazo de entrega?",
    "O que é blindagem B3?",
    "Tem garantia?",
    "Fazer orçamento agora"
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            Inteligência B3
          </h2>
          <p className="text-gray-400 font-medium">Assistente técnico especializado em vidros blindados.</p>
        </div>
      </header>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

        {/* Chat Header */}
        <div className="p-5 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-white font-black uppercase text-sm tracking-tight">Núcleo de Suporte IA</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Sincronizado</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
             <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[85%] animate-pulse"></div>
             </div>
             <span className="text-[10px] font-black text-gray-500 uppercase">Signal: High</span>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth z-10"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                msg.role === 'user' 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                : 'bg-gray-800 border-gray-700 text-blue-500'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
              </div>

              <div className={`
                max-w-[85%] md:max-w-[75%] p-6 rounded-[2rem] font-medium text-lg leading-relaxed shadow-xl
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-800/80 backdrop-blur-md text-gray-100 rounded-tl-none border border-gray-700'}
              `}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.role === 'model' && msg.text.includes('WhatsApp') && (
                   <button 
                    onClick={() => window.open('https://wa.me/5511960733650', '_blank')}
                    className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-emerald-900/40"
                   >
                     <Phone className="w-6 h-6" /> FALAR NO WHATSAPP
                   </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-4 flex-row animate-in fade-in duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-500">
                <Shield className="w-5 h-5" />
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-[2rem] rounded-tl-none border border-gray-700 flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800 z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-xs font-black text-gray-400 hover:text-white transition-all uppercase tracking-widest"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida técnica aqui..."
              className="flex-1 bg-gray-800/50 border-2 border-gray-800 rounded-3xl py-5 px-8 text-white font-bold text-xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="bg-blue-600 hover:bg-blue-500 text-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-8 h-8" />
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Powered by Gemini
            </p>
            <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
              B3 Glass Technical Engine v2.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
