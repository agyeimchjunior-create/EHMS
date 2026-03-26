import { Target, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    type: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || formData.type === 'Select your facility type') {
      toast.error('Please select a service category');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('partner_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type,
          status: 'Pending'
        }]);

      if (error) throw error;

      toast.success('Application Submitted!', {
        description: 'Our team will review your details and send your Secret ID once approved.'
      });
      setFormData({ email: '', phone: '', name: '', type: '' });
    } catch (err: any) {
      console.error('Detailed Submission Error:', err);
      const errorMessage = err.message || 'Unknown protocol error';
      const errorCode = err.code || 'NO_CODE';
      
      toast.error('Connection Diverted', {
        description: `Error: ${errorMessage} (${errorCode}). Ensure your 'partner_applications' table is in the public schema.`
      });
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

      {/* Partner with Us Form */}
      <section className="bg-slate-900 py-24 px-4 overflow-hidden relative font-sans">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-tight italic">
              Ready to <span className="text-blue-500">Join the Network?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              We are expanding our ecosystem across the continent. If you represent a healthcare facility, emergency service, or logistics provider, let's collaborate to save more lives.
            </p>
            
            <div className="space-y-6">
              {[
                { title: 'Instant Connectivity', desc: 'Sync your facility live with our national dispatch center.' },
                { title: 'Global Standards', desc: 'Receive training and resources to meet international protocols.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 font-bold">{i+1}</div>
                   <div>
                      <h4 className="text-white font-bold">{benefit.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{benefit.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/10"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-8 italic">Partnership Application</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Work Email</label>
                  <input 
                    type="email" required placeholder="admin@hospital.com" 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Contact Number</label>
                  <input 
                    type="tel" required placeholder="+233..." 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" 
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">Facility / Unit Name</label>
                <input 
                  type="text" required placeholder="St. Nicholas Hospital, Accra" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">Service Category</label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-black text-slate-700"
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Select your facility type</option>
                  <option value="hospital">Hospital / Medical Center</option>
                  <option value="pharmacy">Pharmacy / Medical Supply</option>
                  <option value="ambulance">Ambulance Service</option>
                  <option value="rider">Emergency Rider (Logistics)</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-blue-900 border-b-4 border-blue-950 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-blue-800 transition active:border-b-0 active:translate-y-1 disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
