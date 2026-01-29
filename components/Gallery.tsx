
import React from 'react';
import { Play, Shield, Hammer, CheckCircle2, Video } from 'lucide-react';

const Gallery: React.FC = () => {
  const videos = [
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
      title: 'Teste de Impacto Balístico', 
      desc: 'Demonstração real da resistência do vidro Nível B3 contra disparos múltiplos.' 
    },
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 
      title: 'Processo de Blindagem BMW', 
      desc: 'Corte rápido da instalação dos vidros laterais com encaixe milimétrico.' 
    },
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 
      title: 'Acabamento Transparente', 
      desc: 'Visão interna após a blindagem: transparência original mantida.' 
    },
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 
      title: 'Laboratório de Testes', 
      desc: 'Como garantimos que cada lote de vidro atenda aos padrões B3 Glass.' 
    },
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', 
      title: 'Resistência de Porta-malas', 
      desc: 'Proteção completa incluindo o vigia traseiro e áreas fixas.' 
    },
    { 
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', 
      title: 'Tecnologia de Policarbonato', 
      desc: 'A camada interna que impede estilhaços de entrarem no veículo.' 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-3xl shadow-xl shadow-blue-900/40 mb-2">
          <Video className="w-14 h-14 text-white" />
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">CORTES B3 GLASS</h2>
        <p className="text-xl text-blue-400 font-bold max-w-2xl mx-auto uppercase tracking-wide">
          "Blindagem em movimento. Veja a proteção em ação."
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, i) => (
          <div 
            key={i} 
            className="group bg-gray-900 border border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-900/20"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <video 
                src={video.url} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                muted
                loop
                onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                onMouseOut={(e) => {
                  const v = e.target as HTMLVideoElement;
                  v.pause();
                  v.currentTime = 0;
                }}
                playsInline
              />
              {/* Overlay Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                <div className="bg-blue-600/80 p-4 rounded-full shadow-2xl">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest shadow-lg">VÍDEO REAL</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{video.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{video.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-gray-900 border-2 border-dashed border-gray-800 rounded-[3rem] p-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl font-black text-white uppercase">Tecnologia que Salva Vidas</h3>
          <p className="text-gray-400 text-lg font-medium">
            Nossos vídeos mostram apenas uma fração do rigor técnico aplicado em cada projeto. 
            Na B3 Glass, a transparência vai além do vidro; ela está no nosso processo.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="flex items-center gap-3">
              <Hammer className="w-6 h-6 text-blue-500" />
              <span className="text-white font-bold uppercase tracking-widest">Testes Balísticos</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="text-white font-bold uppercase tracking-widest">Nível B3 Real</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-500" />
              <span className="text-white font-bold uppercase tracking-widest">Instalação Master</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
