import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Building2, Activity, ArrowRight, ShieldCheck, HeartPulse, KeyRound, Bike, Car, Pill, MapPin, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<'standard' | 'secret'>('standard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [secretId, setSecretId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/hospitals');
    } catch (err: any) {
      setError(err.message);
      toast.error('Access Denied', { description: 'Please verify your institutional credentials.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSecretLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: dbError } = await supabase
        .from('partners')
        .select('*')
        .eq('secret_id', secretId.trim().toUpperCase())
        .single();

      if (dbError || !data) {
        throw new Error('Invalid Secret ID or your partnership is not yet active.');
      }

      localStorage.setItem('ehms_partner_type', data.type);
      localStorage.setItem('ehms_partner_session', JSON.stringify(data));
      
      toast.success(`Access Granted: ${data.name}`);

      const type = data.type.toLowerCase();
      if (type.includes('hospital')) navigate('/hospitals');
      else if (type.includes('ambulance')) navigate('/ambulances');
      else if (type.includes('pharmacy')) navigate('/pharmacies');
      else if (type.includes('rider')) navigate('/riders');
      else navigate('/hospitals');

    } catch (err: any) {
      setError(err.message);
      toast.error('Invalid Protocol', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 flex items-center justify-center p-4 selection:bg-emerald-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-emerald-100/50"
      >
        {/* Left Side: Auth Form */}
        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
          <div className="mb-10 text-center md:text-left">
             <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
               <span className="font-black text-2xl tracking-tighter flex uppercase italic">
                  <span className="text-blue-600">E</span>
                  <span className="text-red-600">HM</span>
                  <span className="text-blue-600">S</span>
               </span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Partners</span>
             </div>
             <h2 className="text-2xl font-black text-slate-800 italic uppercase">Secure Gateway</h2>
          </div>

          <div className="mb-10 flex gap-1 p-1 bg-slate-100 rounded-2xl w-fit mx-auto md:mx-0">
             <button onClick={() => setAuthMode('standard')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition duration-300 ${authMode === 'standard' ? 'bg-white text-emerald-600 shadow-xl italic' : 'text-slate-400'}`}>Institutional</button>
             <button onClick={() => setAuthMode('secret')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition duration-300 ${authMode === 'secret' ? 'bg-white text-emerald-600 shadow-xl italic' : 'text-slate-400'}`}>Secret ID</button>
          </div>

          <AnimatePresence mode="wait">
             {authMode === 'standard' ? (
                <motion.form key="standard" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Administrator Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                      <input type="email" required placeholder="admin@facility.com" className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition font-medium text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Facility Key</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                      <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 pr-12 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition font-medium text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-300 hover:text-emerald-600 transition">
                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-emerald-600 border-b-4 border-emerald-800 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-emerald-500 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest text-xs italic">
                    {loading ? 'Authenticating...' : 'Access Command Center'}
                  </button>
                </motion.form>
             ) : (
                <motion.form key="secret" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} onSubmit={handleSecretLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem]">
                       <h4 className="text-blue-900 font-black italic uppercase tracking-tighter flex items-center gap-2 mb-1"><KeyRound size={18} className="text-blue-600" /> Automated Route</h4>
                       <p className="text-blue-700/60 text-[10px] font-black uppercase tracking-widest italic">Enter your system-generated approval ID.</p>
                    </div>
                    <div className="relative">
                       <MapPin className="absolute left-4 top-4 text-blue-300" size={18} />
                       <input type="text" required placeholder="HOSP-XXXXX" className="w-full bg-slate-50 border border-slate-200 p-5 pl-12 rounded-2xl font-black tracking-[0.3em] text-slate-700 uppercase outline-none focus:ring-4 focus:ring-blue-500/10 transition" value={secretId} onChange={(e) => setSecretId(e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-slate-900 border-b-4 border-black text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition active:border-b-0 active:translate-y-1 uppercase tracking-[0.2em] text-[10px] italic">
                    {loading ? 'Verifying Node...' : 'Connect to Infrastructure'}
                  </button>
                </motion.form>
             )}
          </AnimatePresence>
        </div>

        {/* Right Side: Branding/Identity */}
        <div className="md:w-1/2 bg-emerald-600 p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden order-1 md:order-2 italic">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <Activity className="absolute -right-20 -bottom-20 w-96 h-96 group-hover:scale-110 transition duration-1000" />
          </div>
          <div className="relative z-10">
            <div className="bg-white/10 border border-white/20 p-8 rounded-[3rem] backdrop-blur-xl mb-12 shadow-2xl">
               <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 shadow-xl mb-6">
                  <Building2 size={32} />
               </div>
               <h1 className="text-4xl lg:text-5xl font-black leading-[0.9] mb-6 italic uppercase tracking-tighter">Unified Logistics Command.</h1>
               <p className="text-emerald-100 text-lg font-bold opacity-90 max-w-sm">
                 Integrated operational nexus for hospitals, emergency fleets, and frontline partners.
               </p>
            </div>
          </div>
          <footer className="relative z-10 flex items-center justify-between">
             <div className="flex gap-4">
                <ShieldCheck size={24} className="text-emerald-400 opacity-50" />
                <HeartPulse size={24} className="text-emerald-400 opacity-50" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Protocol v4.0.2</p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
