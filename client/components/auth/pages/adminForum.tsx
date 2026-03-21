'use client'
import  React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export function ManagerLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <form className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500" onSubmit={handleSubmit}>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
      <SubmitButton loading={loading} />
    </form>
  );
}

function EmailInput({ email, setEmail }: { email: string; setEmail: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
        Work Email
      </label>
      <div className="group relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-[#1E3A8A] outline-none transition-all font-medium"
          placeholder="name@meygarage.com"
        />
      </div>
    </div>
  );
}

function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: {
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between ml-1">
        <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Password</label>
        <button type="button" className="text-xs font-black text-[#F97316] hover:underline">
          Forgot Access?
        </button>
      </div>
      <div className="group relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-[#1E3A8A] outline-none transition-all font-medium"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      disabled={loading}
      className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-100 hover:bg-[#162C6B] hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? 'Signing In...' : 'Enter Dashboard'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
