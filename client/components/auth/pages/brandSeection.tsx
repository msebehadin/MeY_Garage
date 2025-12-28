import React from 'react';

export function BrandSection() {
  return (
    <div className="w-full md:w-5/12 lg:w-1/2 bg-[#1E3A8A] p-8 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
      <div className="relative z-10">
        <Logo />
        <HeroText />
      </div>
      <TechnicalGrid />
      <LiveStats />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3 mb-16 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="bg-[#F97316] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-950/40">
        مي
      </div>
      <span className="text-2xl font-black tracking-tighter">MeY-GARAGE</span>
    </div>
  );
}

function HeroText() {
  return (
    <div className="space-y-6 max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
        Workshop <br />
        <span className="text-[#F97316]">Intelligence.</span>
      </h1>
      <p className="text-blue-100/80 text-lg md:text-xl font-medium leading-relaxed">
        The industrial-strength OS for modern mechanics. Track every bolt, every hour, and every happy customer.
      </p>
    </div>
  );
}

function TechnicalGrid() {
  return (
    <div className="absolute inset-0 z-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function LiveStats() {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-blue-400/20 pt-12 animate-in fade-in duration-1000 delay-300">
      <StatItem value="99.8%" label="Uptime" />
      <StatItem value="40k+" label="Repairs Managed" />
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-blue-300 text-sm font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}