'use client'
import { ShieldCheck, Grid3X3 } from 'lucide-react';
interface ModeType {
  mode: string;
  onChange: (mode: string) => void;
  onClearPin: () => void;
}
interface ModeButtonType {
    isActive:boolean
    onClick:()=>void;
    icon:React.ElementType;
    label:string;
    activeIconColor:string;

}

export function ModeSwitcher({ mode, onChange, onClearPin }:ModeType) {
  const handleModeChange = (newMode:string) => {
    onChange(newMode);
    onClearPin();
  };

  return (
    <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl w-full border border-slate-200">
      <ModeButton
        isActive={mode === 'manager'}
        onClick={() => handleModeChange('manager')}
        icon={ShieldCheck}
        label="Manager"
        activeIconColor="text-blue-600"
      />
      <ModeButton
        isActive={mode === 'mechanic'}
        onClick={() => handleModeChange('mechanic')}
        icon={Grid3X3}
        label="Mechanic"
        activeIconColor="text-blue-600"
      />
    </div>
  );
}

function ModeButton({ isActive, onClick, icon: Icon, label, activeIconColor }:ModeButtonType) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all duration-300 ${
        isActive
          ? 'bg-white text-[#1E3A8A] shadow-xl shadow-slate-200/50 scale-[1.02]'
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? activeIconColor : 'text-slate-400'}`} />
      {label}
    </button>
  );
}