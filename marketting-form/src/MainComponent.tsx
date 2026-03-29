import { Activity, Check, ShieldCheck, Mail, Phone, Loader2, User, Shield, Heart, CreditCard, Smartphone, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from './supabaseClient';
import { Toaster, toast } from 'sonner';

export default function MainComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: ''
  });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const tiers = [
    { label: 'GHS 25', value: 25 },
    { label: 'GHS 100', value: 100 },
    { label: 'GHS 500', value: 500 },
    { label: 'GHS 1,000', value: 1000 },
    { label: 'GHS 5,000', value: 5000 },
  ];

  const paymentMethods = [
    { id: 'momo', label: 'MoMo', icon: <Smartphone size={20} /> },
    { id: 'card', label: 'Card', icon: <CreditCard size={20} /> },
    { id: 'bank', label: 'Bank', icon: <Landmark size={20} /> },
  ];

  const handleTierSelect = (val: number) => {
    setSelectedTier(val.toString());
    setFormData({ ...formData, amount: val.toString() });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'amount') setSelectedTier(null);
  };

  const selectPaymentMethod = (id: string) => {
    setFormData({ ...formData, paymentMethod: id });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.amount || !formData.paymentMethod) {
      toast.error('Details Incomplete', { description: 'Please complete all sections of the protocol before transmission.' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('contributions')
        .insert([{
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: parseFloat(formData.amount),
          payment_method: formData.paymentMethod,
          tier: selectedTier ? `GHS ${selectedTier}` : 'Custom'
        }]);

      if (error) throw error;

      setSubmitted(true);
      toast.success('Transmission Logged!', { description: 'Secure contribution protocol completed.' });
      setFormData({ name: '', email: '', phone: '', amount: '', paymentMethod: '' });
      setSelectedTier(null);
    } catch (err: any) {
      console.error(err);
      toast.error('Network Error', { description: err.message || 'Check your regional data connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      <Toaster position="top-right" richColors />
      
      {/* Strategic Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
         <div className="absolute top-[-10%] left-[-15%] w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-blue-600 rounded-full blur-[100px] md:blur-[200px]"></div>
         <div className="absolute bottom-[-15%] right-[-10%] w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-red-600 rounded-full blur-[150px] md:blur-[250px] opacity-40"></div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full h-20 md:h-24 bg-slate-950/50 backdrop-blur-3xl z-50 px-6 md:px-8 flex items-center justify-between border-b border-white/5">
         <div className="flex items-center gap-2 md:gap-3">
            <Activity className="text-red-500 w-6 h-6 md:w-7 md:h-7" />
            <span className="font-black text-lg md:text-2xl tracking-tighter italic uppercase text-white">EHMS <span className="text-blue-500">HealthFund</span></span>
         </div>
         <div className="hidden md:flex items-center gap-2 text-emerald-500 font-black uppercase text-[8px] tracking-[0.3em] italic">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Regional Node Connected
         </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center py-32 md:py-40 px-6 md:px-12 relative z-10 w-full max-w-7xl mx-auto overflow-y-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center w-full">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10 md:space-y-12 text-center lg:text-left"
          >
             <div className="space-y-6 md:space-y-8">
                <div className="bg-red-600/10 text-red-500 border border-red-500/20 px-4 py-1.5 md:py-2 rounded-full inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] italic">
                   <Heart size={14} className="animate-pulse" /> Strategic Impact Protocol
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                   Power the <br /> <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">Resilient</span> <br className="hidden lg:block" /> Health Grid
                </h1>
                <p className="text-base md:text-xl text-slate-400 font-bold italic leading-relaxed max-w-xl mx-auto lg:mx-0 lg:pl-6 lg:border-l-4 lg:border-blue-600/30">
                  Your commitment fuels Africa’s most advanced emergency coordination network. Join 2,400+ citizens currently sustaining the EHMS ecosystem.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex flex-col items-center group hover:bg-white/10 transition duration-500 border-dashed text-white">
                   <ShieldCheck size={32} className="text-blue-500 mb-2 opacity-60 group-hover:opacity-100 transition" />
                   <h4 className="text-2xl md:text-3xl font-black italic tracking-tighter">98.4%</h4>
                   <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mt-1 italic">Direct Funding</p>
                </div>
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex flex-col items-center group hover:bg-white/10 transition duration-500 border-dashed text-white">
                   <Activity size={32} className="text-emerald-500 mb-2 opacity-60 group-hover:opacity-100 transition" />
                   <h4 className="text-2xl md:text-3xl font-black italic tracking-tighter">Live</h4>
                   <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mt-1 italic">Audit Pipeline</p>
                </div>
             </div>

             <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-30 grayscale group text-white">
                <Shield size={32} className="hover:opacity-100 transition" />
                <Landmark size={32} className="hover:opacity-100 transition" />
                <Activity size={32} className="hover:opacity-100 transition" />
             </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[3.5rem] md:rounded-[4.5rem] p-8 md:p-14 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] relative z-10 border border-slate-800/20 w-full"
          >
             <AnimatePresence mode="wait">
                {submitted ? (
                   <motion.div 
                     initial={{ opacity: 0, y: 40 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     key="success"
                     className="py-16 text-center text-slate-900"
                   >
                     <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
                        <Check size={48} />
                     </div>
                     <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-slate-950">Transmission Logged</h3>
                     <p className="text-slate-500 font-medium italic mb-10 max-w-xs mx-auto text-lg leading-relaxed">Thank you. Your strategic contribution record is now encrypted in the Master Ledger.</p>
                     <button 
                       onClick={() => setSubmitted(false)}
                       className="bg-slate-950 text-white font-black px-12 py-5 rounded-[2rem] hover:bg-blue-600 transition shadow-xl uppercase text-[10px] tracking-widest italic"
                     >
                       Post New Contributor Protocol
                     </button>
                   </motion.div>
                ) : (
                   <form key="form" onSubmit={handleSubmit} className="space-y-10 md:space-y-12 text-slate-900">
                      
                      <div className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Donor Name</label>
                               <div className="relative group">
                                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={18} />
                                  <input 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="Enter Name" 
                                    className="w-full bg-slate-50 border border-slate-100 p-5 pl-16 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition text-sm"
                                  />
                               </div>
                            </div>
                            <div className="space-y-3">
                               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Data Feed (Email)</label>
                               <div className="relative group">
                                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={18} />
                                  <input 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email" 
                                    placeholder="donor@network.sync" 
                                    className="w-full bg-slate-50 border border-slate-100 p-5 pl-16 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition text-sm"
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="space-y-3">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic text-center md:text-left block">Authorized Relay (Phone Number)</label>
                            <div className="relative group">
                               <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={18} />
                               <input 
                                 name="phone"
                                 required
                                 value={formData.phone}
                                 onChange={handleInputChange}
                                 type="tel" 
                                 placeholder="+233 ..." 
                                 className="w-full bg-slate-50 border border-slate-100 p-5 pl-16 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition text-sm"
                               />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4 pt-4">
                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic block text-center">Authorized Gateway Selection</label>
                         <div className="grid grid-cols-3 gap-3">
                            {paymentMethods.map((m) => (
                               <button
                                 key={m.id}
                                 type="button"
                                 onClick={() => selectPaymentMethod(m.id)}
                                 className={`p-3 md:p-4 rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-3 transition-all duration-500 border-2 ${
                                   formData.paymentMethod === m.id
                                     ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/30' 
                                     : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600'
                                 }`}
                               >
                                  <div className={`p-2 rounded-xl ${formData.paymentMethod === m.id ? 'bg-white/20' : 'bg-slate-50'}`}>
                                     {m.icon}
                                  </div>
                                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-center">{m.label}</span>
                               </button>
                            ))}
                         </div>
                      </div>

                      <div className="pt-10 border-t-2 border-slate-50 border-dashed">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-6 block italic text-center">Select Impact Load (GHS)</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                           {tiers.map((t) => (
                             <button
                               key={t.value}
                               type="button"
                               onClick={() => handleTierSelect(t.value)}
                               className={`py-4 rounded-xl font-black text-[9px] uppercase italic transition-all border-2 ${
                                 formData.amount === t.value.toString()
                                   ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/30' 
                                   : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-600'
                               }`}
                             >
                               {t.value}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic text-center block mb-2">Override Link Amount (GHS)</label>
                        <div className="relative max-w-[280px] mx-auto group">
                           <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-slate-300 italic text-2xl group-focus-within:text-red-500 transition">₵</span>
                           <input 
                              name="amount"
                              required
                              value={formData.amount}
                              onChange={handleInputChange}
                              type="number" 
                              placeholder="0.00" 
                              className="w-full bg-slate-50 border border-slate-100 pl-16 pr-8 py-7 rounded-[2.5rem] outline-none focus:ring-4 focus:ring-red-500/10 font-black text-[2rem] text-slate-950 italic transition text-center tracking-tighter"
                           />
                        </div>
                      </div>

                      <button 
                        disabled={loading}
                        className="w-full bg-slate-950 text-white font-black py-8 rounded-[3rem] hover:bg-blue-600 transition duration-700 shadow-2xl uppercase text-[10px] tracking-[0.4em] italic border-b-8 border-slate-900 active:border-b-0 active:translate-y-2 flex items-center justify-center gap-4 group disabled:opacity-50"
                      >
                         {loading ? <Loader2 className="animate-spin" size={24} /> : <ShieldCheck size={24} />} 
                         Initialize Transmission Protocol
                      </button>

                   </form>
                )}
             </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <footer className="py-16 px-8 text-center bg-transparent relative z-10">
         <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 items-center">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-4 ring-blue-600/20"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-red-600 ring-4 ring-red-600/20"></div>
            </div>
            <p className="font-black text-[9px] text-slate-500 uppercase tracking-[0.5em] italic">
               EHMS / REGIONAL SYSTEM SYNC / GH-NG-CI
            </p>
         </div>
      </footer>
    </div>
  );
}
