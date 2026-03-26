import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Mail, Lock, Activity, ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Check Dev Fallback (.env)
      const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'agyeimchjunior@gmail.com';
      const envPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Koola@admin2026';

      if (email.trim() === envEmail && password.trim() === envPass) {
        localStorage.setItem('ehms_dev_auth', email.trim());
        toast.success('Admin Protocol Initialized', { description: 'Dev Access Granted' });
        
        // Use a slight delay then redirect
        setTimeout(() => {
           window.location.href = '/'; // Full refresh ensures App.tsx handles the new localStorage
        }, 500);
        return;
      }

      // 2. Fallback to Supabase
      const { error: supabaseError } = await supabase.auth.signInWithPassword({ email, password });
      if (supabaseError) throw supabaseError;
      
      toast.success('Login Successful');
      navigate('/');
    } catch (err: any) {
      toast.error('Authentication Declined', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
           <div className="inline-block bg-slate-800 text-white p-6 rounded-[2rem] shadow-2xl mb-6 border border-slate-700">
              <Activity className="text-red-500" size={40} />
           </div>
           <h1 className="text-4xl font-black text-white tracking-widest italic uppercase">EHMS ADMIN</h1>
           <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] mt-4">Security Access Level: High</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-10 pb-4">
             <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 italic">
                <KeyRound size={24} className="text-blue-600" /> Secure Terminal
             </h2>
             <p className="text-slate-400 text-sm mt-1 font-medium">Initialize encrypted session to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 pt-4 space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Administrator ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                <input 
                  type="email" required autoFocus
                  placeholder="admin@ehms.gov.gh"
                  className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none transition font-medium text-sm"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Cryptographic Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 pr-12 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none transition font-medium text-sm"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-300 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-xl transition flex items-center justify-center gap-3 group disabled:opacity-50 mt-6 uppercase text-xs tracking-widest italic border-b-4 border-slate-950 active:border-b-0 active:translate-y-1"
            >
              {loading ? 'Decrypting...' : 'Initialize Session'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition" />}
            </button>
          </form>

          <footer className="p-8 bg-slate-50 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                Health Direct Global Security Protocol v4.0.2
             </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
