import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollDown: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
          alt="Modern Architectural Interior"
          className="w-full h-full object-cover opacity-50 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Decorative Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge-like accent */}
        <div className="inline-block mb-10">
          <span className="px-5 py-2 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-white/80 backdrop-blur-sm">
            ARCHITECTURE · INTERIOR · REMODELING
          </span>
        </div>

        {/* Main Copy */}
        <h1 className="text-4xl sm:text-6xl md:text-[5rem] lg:text-[6.5rem] font-bold leading-[1.1] mb-12 tracking-tight text-white mix-blend-overlay opacity-90">
          일상모두<span className="font-light block sm:inline"> 디자인스튜디오</span><br />
          <span className="font-light text-white/70">STA종합건설</span>
        </h1>

        {/* Sub Copy */}
        <p className="text-sm md:text-lg font-light text-neutral-300 mb-16 max-w-2xl mx-auto leading-[1.8] tracking-wide">
          공간 그 이상의 가치,<br className="md:hidden" />
          당신의 일상을 아름답게 디자인합니다.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={onScrollDown}
            className="group relative px-10 py-4 bg-white text-black font-bold text-[10px] md:text-xs tracking-widest overflow-hidden rounded-full"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              VIEW PROJECT
            </span>
            <div className="absolute inset-0 bg-neutral-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('company');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold text-[10px] md:text-xs tracking-widest hover:bg-white/10 transition-all rounded-full"
          >
            ABOUT US
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={onScrollDown}
          className="flex flex-col items-center gap-4 text-white/30 hover:text-white transition-colors duration-500"
        >
          <span className="text-[10px] tracking-[0.2em] writing-vertical-rl rotate-180 uppercase hidden md:block">Scroll</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-dropdown" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;