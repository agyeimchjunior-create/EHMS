import { Heart, Activity, HandCoins, Check, ShieldCheck, ArrowRight, Shield, User, Mail, Phone, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: ''
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

  const handleTierSelect = (val: number) => {
    setSelectedTier(val.toString());
    setFormData({ ...formData, amount: val.toString() });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'amount') setSelectedTier(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
      toast.error('Required Fields Missing', { description: 'Please complete all sections of the contribution form.' });
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
          tier: selectedTier ? `GHS ${selectedTier}` : 'Custom'
        }]);

      if (error) throw error;

      setSubmitted(true);
      toast.success('Contribution Submitted!', { description: 'Thank you for your support. Our team will reach out shortly.' });
      setFormData({ name: '', email: '', phone: '', amount: '' });
      setSelectedTier(null);
    } catch (err: any) {
      console.error(err);
      toast.error('Submission Failed', { description: err.message || 'Could not connect to the database.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section - 50/50 Layout */}
      <section className="bg-slate-950 text-white min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center gap-12 py-20">

          {/* Left 50% Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 text-left z-10"
          >
            <div className="bg-red-600/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 italic">
              <Heart size={14} className="animate-pulse" /> Strategic Impact
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase">
              Support a <span className="text-red-600">Life-Saving</span> Initiative
            </h1>
            <p className="text-xl text-slate-400 font-bold leading-relaxed italic max-w-xl">
              Your contribution is more than a donation—it is an investment in saving lives and strengthening healthcare systems across the continent.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <a href="#contribution-form" className="bg-white text-slate-950 font-black px-10 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition shadow-2xl flex items-center gap-2 uppercase text-xs tracking-widest italic">
                Fund Emergency Care <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right Section - Small floating card or image */}
          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block lg:w-1/3 p-8 border-4 border-slate-800 rounded-[3rem] bg-slate-900 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
             <Activity size={120} className="text-red-600 opacity-20 absolute -top-10 -right-10" />
             <div className="relative z-10">
                <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-4">Quick Grant</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed italic mb-8">Direct funding for regional diagnostic centers and ambulance fuel reserves.</p>
                <HandCoins size={48} className="text-blue-500 mb-4" />
                <div className="text-4xl font-black text-white italic tracking-tighter">GHS 250,000+</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">Quarterly Operational Target</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Main Contribution Form Section */}
      <section id="contribution-form" className="py-32 px-6 flex items-center justify-center bg-slate-50 overflow-hidden">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
              Become a <span className="text-blue-600">Strategic</span> Contributor
            </h2>
            <p className="text-slate-500 text-lg font-medium italic leading-relaxed">
              We are building a robust emergency response network. Your data and contribution help us track regional health support and optimize facility deployment.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Project Transparency', icon: <ShieldCheck className="text-emerald-500" /> },
                { title: 'Immediate Resource Allocation', icon: <Activity className="text-blue-500" /> },
                { title: 'Community Feedback Loop', icon: <Mail className="text-purple-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  {item.icon}
                  <span className="font-black text-slate-700 italic uppercase text-xs tracking-widest">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3.5rem] shadow-2xl p-10 border border-slate-200 relative overflow-hidden"
          >
             <AnimatePresence>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                   <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                      <Check size={40} />
                   </div>
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">Thank You!</h3>
                   <p className="text-slate-500 font-medium italic mb-10">Your contribution record has been securely linked to the EHMS command center.</p>
                   <button 
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 font-black uppercase text-xs tracking-widest italic border-b-2 border-blue-600 pb-1"
                   >
                    Submit Another Entry
                   </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-slate-50 border border-slate-200 p-4 pl-14 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                       <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="tel" 
                            placeholder="+233 24 000 0000" 
                            className="w-full bg-slate-50 border border-slate-200 p-4 pl-14 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email" 
                          placeholder="john@example.com" 
                          className="w-full bg-slate-50 border border-slate-200 p-4 pl-14 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold italic transition"
                        />
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4 italic">Select Contribution Amount</h4>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {tiers.map((t) => (
                           <button
                             key={t.value}
                             type="button"
                             onClick={() => handleTierSelect(t.value)}
                             className={`py-3 px-4 rounded-xl font-black text-[10px] tracking-tight transition uppercase italic border-2 ${
                               formData.amount === t.value.toString()
                                 ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                                 : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                             }`}
                           >
                              {t.label}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Or Enter Custom Amount (GHS)</label>
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 italic">GHS</span>
                        <input 
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          type="number" 
                          placeholder="0.00" 
                          className="w-full bg-slate-50 border border-slate-200 pl-16 pr-6 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-xl text-slate-800 italic transition" 
                        />
                     </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-slate-950 text-white font-black py-5 rounded-[2rem] hover:bg-red-600 transition shadow-xl uppercase text-sm tracking-[0.2em] italic border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin" size={20} /> Processing...</>
                    ) : (
                      'Initialize Contribution'
                    )}
                  </button>

                  <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-[0.3em] italic">
                     Secure Point-to-Point Encryption Active
                  </p>
                </form>
              )}
             </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Your Support Matters */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6 italic uppercase tracking-tighter">Why Your Support Matters</h2>
          <div className="w-24 h-2 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto italic font-medium">Every contribution helps us build a more resilient healthcare ecosystem across the continent.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Expand Infrastructure', desc: 'Expand emergency response infrastructure in underserved areas.', icon: <Activity className="text-blue-600" size={32} /> },
            { title: 'Improve Coordination', desc: 'Enhance ambulance coordination systems for faster dispatch.', icon: <HandCoins className="text-emerald-600" size={32} /> },
            { title: 'Strengthen Networks', desc: 'Strengthen medicine distribution networks for immediate access.', icon: <ShieldCheck className="text-purple-600" size={32} /> },
            { title: 'Support Communities', desc: 'Support vulnerable communities during critical medical emergencies.', icon: <Heart className="text-red-600" size={32} /> }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl hover:border-blue-100 transition duration-500 group">
              <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="font-black text-slate-800 mb-4 italic uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <Shield size={64} className="mx-auto text-emerald-500 mb-8" />
        <h2 className="text-4xl font-black text-slate-900 mb-10 italic uppercase tracking-tighter">Transparency & Accountability</h2>
        <div className="bg-emerald-50/50 border border-emerald-100 p-10 rounded-[3rem] flex flex-col md:flex-row justify-center gap-10 text-emerald-900 font-bold italic shadow-inner">
          <div className="flex items-center gap-3"><Check className="text-emerald-500" /> Fund Management Audit</div>
          <div className="flex items-center gap-3"><Check className="text-emerald-500" /> Bi-Annual Reporting</div>
          <div className="flex items-center gap-3"><Check className="text-emerald-500" /> Independent Governance</div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
