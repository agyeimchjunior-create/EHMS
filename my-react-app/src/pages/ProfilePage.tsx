import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, ShieldCheck, LogOut, HeartPulse, Activity } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      setProfile(session.user.user_metadata);
      setLoading(false);
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Activity className="text-blue-600 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-100"
        >
          {/* Header/Cover Section */}
          <div className="h-48 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 relative">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Activity className="absolute -right-10 -top-10 w-64 h-64 text-white" />
             </div>
             <div className="absolute -bottom-16 left-10">
                <div className="w-32 h-32 rounded-[2rem] bg-white p-1.5 shadow-xl border border-slate-100 overflow-hidden">
                   <div className="w-full h-full rounded-[1.75rem] bg-blue-100 flex items-center justify-center text-blue-900 text-4xl font-black">
                      {user.email?.charAt(0).toUpperCase()}
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-20 px-10 pb-10">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <h1 className="text-3xl font-black text-slate-800 tracking-tight">{profile?.full_name || 'Citizen User'}</h1>
                   <p className="text-blue-600 font-bold flex items-center gap-2 mt-1">
                      <ShieldCheck size={18} /> Verified EHMS Account Member
                   </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-red-100 transition shadow-sm border border-red-100 group"
                >
                   <LogOut size={20} className="group-hover:-translate-x-1 transition" /> Sign Out
                </button>
             </div>

             <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Account Details */}
                <div className="space-y-6">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Personal Record</h3>
                   
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400"><Mail size={20} /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Primary Email Address</p>
                            <p className="font-bold text-slate-700">{user.email}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400"><Phone size={20} /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Emergency Contact</p>
                            <p className="font-bold text-slate-700">{profile?.phone || 'Not linked'}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400"><Calendar size={20} /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase">Member Since</p>
                            <p className="font-bold text-slate-700">{new Date(user.created_at).toLocaleDateString()}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Medical Fast-Pass Card (Static Concept for now) */}
                <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                   <div className="absolute top-0 right-0 p-8 opacity-20"><HeartPulse size={80} /></div>
                   <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                      <div>
                         <p className="text-blue-300 font-bold uppercase text-[10px] tracking-widest mb-1">EHMS Fast-Pass 001</p>
                         <h4 className="text-2xl font-black italic tracking-tighter">Citizen Emergency ID</h4>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex-1 border border-white/10">
                            <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Blood Type</p>
                            <p className="text-xl font-black">O+</p>
                         </div>
                         <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl flex-1 border border-white/10">
                            <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Coverage</p>
                            <p className="text-xl font-black">Platinum</p>
                         </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                         <div>
                            <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Holder</p>
                            <p className="font-bold tracking-tight">{profile?.full_name}</p>
                         </div>
                         <div className="w-10 h-10 bg-white rounded-lg p-1">
                            <div className="w-full h-full bg-slate-900 rounded-sm"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
