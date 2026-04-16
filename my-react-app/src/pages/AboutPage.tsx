import { Target, Handshake, ShieldCheck, Activity, Mail, User, Phone, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

const AboutPage = () => {
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
    <div className="flex flex-col min-h-screen">
      
      {/* Header Section */}
      <section className="bg-blue-900 text-white min-h-[60vh] flex items-center pt-24 pb-20 sm:pt-32 sm:pb-24 shadow-2xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left 50% Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 text-center lg:text-left z-10 flex flex-col items-center lg:items-start w-full"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight drop-shadow-md italic uppercase">
                Who We Are
              </h1>
              <p className="max-w-xl text-xl sm:text-2xl text-blue-100 font-bold leading-relaxed drop-shadow-md">
                Health Direct Global is a forward-thinking healthcare innovation organization committed to strengthening healthcare delivery systems.
              </p>
              
              <div className="mt-8 w-24 h-1 bg-blue-500 rounded-full"></div>
            </motion.div>

            {/* Right 50% Slide-In Image */}
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              className="lg:w-1/2 w-full h-[350px] lg:h-[500px] relative overflow-hidden rounded-3xl shadow-2xl bg-slate-800"
            >
              <img 
                src="/aboutHero.jpg" 
                alt="About EHMS" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
       <section className="bg-slate-50 py-20 px-4 rounded-3xl mb-20 max-w-7xl mx-auto w-full border border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto italic font-black">
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition border border-slate-100">
            <h3 className="text-2xl text-slate-800 mb-6 flex items-center gap-3">
              <Target className="text-red-500" size={28} /> Our Vision
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-black tracking-tight">
              To build Africa’s leading integrated emergency healthcare and financial inclusion ecosystem.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition border border-slate-100">
            <h3 className="text-2xl text-slate-800 mb-6 flex items-center gap-3">
              <Handshake className="text-emerald-500" size={28} /> Our Mission
            </h3>
            <ul className="space-y-4">
              {[
                'Improving emergency response coordination',
                'Expanding access to essential medicines',
                'Enabling affordable healthcare financing'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
                    className="w-full bg-slate-950 text-white font-black py-5 rounded-[2rem] hover:bg-blue-600 transition shadow-xl uppercase text-sm tracking-[0.2em] italic border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-3"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
