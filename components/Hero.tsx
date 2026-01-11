
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-black flex items-center">
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://picsum.photos/seed/fashionhero/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 w-full text-white">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Nueva Colección 2024</span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-6">
            ELEVA TU <br /> ESTILO URBANO
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Descubre las últimas tendencias en zapatillas y ropa streetwear con calidad premium y diseño exclusivo.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-xl shadow-white/5">
              Comprar Ahora
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors">
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
