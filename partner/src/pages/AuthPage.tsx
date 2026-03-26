import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Building2, Activity, ShieldCheck, KeyRound, Bike, MapPin, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [secretId, setSecretId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Check if session already exists
  useState(() => {
    const sessionStr = localStorage.getItem('ehms_partner_session');
    if (sessionStr) {
      try {
        const data = JSON.parse(sessionStr);
        const prefix = data.secret_id.substring(0, 4).toUpperCase();
        let destination = '/hospitals';
        if (prefix === 'AMBU') destination = '/ambulances';
        else if (prefix === 'PHAR') destination = '/pharmacies';
        else if (prefix === 'RIDE') destination = '/riders';
        navigate(destination, { replace: true });
      } catch (e) {
        localStorage.removeItem('ehms_partner_session');
      }
    }
  });

  const handlePartnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🔄 INITIALIZING PARTNER AUTH PROTOCOL...');
    console.log('Credentials:', { email: email.trim(), secretId: secretId.trim().toUpperCase() });

    try {
      const { data, error: dbError } = await supabase
        .from('partners')
        .select('*')
        .ilike('email', email.trim())
        .eq('password', password.trim())
        .eq('secret_id', secretId.trim().toUpperCase())
        .maybeSingle();

      if (dbError) {
        console.error('❌ DB ERROR:', dbError.message);
        throw new Error(`Connection Error: ${dbError.message}`);
      }

      if (!data) {
        console.warn('⚠️ NO PARTNER RECORD FOUND matching these credentials.');
        throw new Error('Invalid credentials: No partner record matches this email, password, and Secret ID.');
      }

      console.log('✅ PARTNER RECORD FOUND:', data.name);

      if (!data.is_active) {
        console.warn('⛔ PARTNERSHIP INACTIVE for:', data.name);
        throw new Error('Your partnership has been suspended. Please contact EHMS support.');
      }

      console.log('💾 PERSISTING SESSION TO LOCAL STORAGE...');
      localStorage.setItem('ehms_partner_type', data.type);
      localStorage.setItem('ehms_partner_session', JSON.stringify(data));
      
      toast.success(`Access Granted: ${data.name}`);
      
      // Determine destination DASHBOARD based on Secret ID prefix
      let destination = '/hospitals';
      const prefix = data.secret_id.substring(0, 4).toUpperCase();
      
      if (prefix === 'HOSP') destination = '/hospitals';
      else if (prefix === 'AMBU') destination = '/ambulances';
      else if (prefix === 'PHAR') destination = '/pharmacies';
      else if (prefix === 'RIDE') destination = '/riders';

      console.log(`🚀 AUTH SUCCESS. REDIRECTING TO: ${destination}`);

      // Use navigate for smooth SPA transition instead of full page refresh
      setTimeout(() => {
        navigate(destination, { replace: true });
        // Force a small state refresh if needed
        window.dispatchEvent(new Event('storage'));
      }, 800);

    } catch (err: any) {
      console.error('🔓 AUTH ERROR:', err.message);
      toast.error('Invalid Protocol', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-2 sm:p-4 selection:bg-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200 min-h-[600px]"
      >
        {/* Left Side: Branding/Identity */}
        <div className="md:w-5/12 bg-blue-600 p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden order-2 md:order-1 italic uppercase tracking-tighter">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <Activity className="absolute -left-20 -bottom-20 w-96 h-96 group-hover:scale-110 transition duration-1000" />
          </div>
          <div className="relative z-10">
            <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-[2rem] backdrop-blur-xl mb-8 shadow-2xl">
              <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6">
                <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[0.9] mb-4">Emergency Infrastructure.</h1>
              <p className="text-blue-100 text-[10px] sm:text-xs font-bold opacity-90 max-w-sm not-italic normal-case tracking-normal">
                The mission-critical neural link for hospitals, fleets, and frontline partners.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: <Bike size={18} />, title: "Fleet Management", desc: "Real-time tracking of units." },
                { icon: <Building2 size={18} />, title: "Capacity Sync", desc: "Live updates of beds & ICU." },
                { icon: <MapPin size={18} />, title: "Live Dispatch", desc: "Direct Command Link." }
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition cursor-default">
                  <div className="text-white bg-white/10 p-2 rounded-xl">{act.icon}</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">{act.title}</p>
                    <p className="text-[9px] text-blue-100/60 font-bold not-italic normal-case tracking-normal">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <footer className="relative z-10 flex items-center justify-between mt-6">
            <div className="flex gap-3">
              <ShieldCheck size={18} className="text-white opacity-40" />
              <Activity size={18} className="text-white opacity-40" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Protocol v4.0.2</p>
          </footer>
        </div>

        {/* Right Side: Auth Form */}
        <div className="md:w-7/12 p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-1 md:order-2 bg-white relative">
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
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Enter your institutional credentials to connect.</p>
          </div>

          <form onSubmit={handlePartnerLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-left block">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                <input type="email" required placeholder="admin@facility.com" className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition font-medium text-xs italic" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-left block">Cryptographic Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 pr-12 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition font-medium text-xs italic" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-300 hover:text-blue-600 transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-left block">Secret ID Number</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-4 text-slate-300" size={18} />
                <input type="text" required placeholder="HOSP-XXXXX" className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition font-black uppercase tracking-widest text-xs italic" value={secretId} onChange={(e) => setSecretId(e.target.value)} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 border-b-4 border-blue-800 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-blue-500 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest text-xs italic mt-4">
              {loading ? 'Decrypting Node...' : 'Connect to Infrastructure'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
