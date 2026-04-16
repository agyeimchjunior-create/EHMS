import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

const PartnerPage = () => {
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

      if (formData.type === 'individual' || formData.type === 'ngo') {
        toast.success('Thank You!', {
          description: 'Your partnership application has been received. Our team will reach out to you soon without generating system credentials.'
        });
      } else {
        toast.success('Application Submitted!', {
          description: 'Our team will review your details and send your Secret ID once approved.'
        });
      }
      
      setFormData({ email: '', phone: '', name: '', type: '' });
    } catch (err: any) {
      console.error('Detailed Submission Error:', err);
      const errorMessage = err.message || 'Unknown protocol error';
      const errorCode = err.code || 'NO_CODE';
      
      toast.error('Connection Diverted', {
        description: `Error: ${errorMessage} (${errorCode}).`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <section className="bg-slate-900 py-24 px-4 min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic uppercase">
              Ready to <span className="text-blue-500">Join the Network?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed font-bold italic">
              We are expanding our ecosystem across the continent. Whether you represent a healthcare facility, NGO, logistics provider, or you are a dedicated individual, let's collaborate to save more lives.
            </p>
            
            <div className="space-y-6">
              {[
                { title: 'Instant Connectivity', desc: 'Sync your facility live with our national dispatch center.' },
                { title: 'Global Standards', desc: 'Receive training and resources to meet international protocols.' },
                { title: 'Community Impact', desc: 'Contribute meaningfully as an individual or NGO without complex integrations.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
                   <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 font-black italic">{i+1}</div>
                   <div>
                      <h4 className="text-white font-black italic tracking-tight">{benefit.title}</h4>
                      <p className="text-slate-400 text-sm mt-1 font-medium italic">{benefit.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-blue-900/20 border border-slate-200"
          >
            <h3 className="text-3xl font-black text-slate-800 mb-8 italic uppercase tracking-tighter">Partnership Application</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                  <input 
                    type="email" required placeholder="admin@hospital.com" 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-600/10 outline-none transition font-bold italic" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <input 
                    type="tel" required placeholder="+233..." 
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-600/10 outline-none transition font-bold italic" 
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facility / Entity Name</label>
                <input 
                  type="text" required placeholder="Organization or Full Name" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-600/10 outline-none transition font-bold italic" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Category</label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-600/10 outline-none transition font-black text-slate-700 italic cursor-pointer"
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="">Select your facility type</option>
                  <option value="hospital">Hospital / Medical Center</option>
                  <option value="pharmacy">Pharmacy / Medical Supply</option>
                  <option value="ambulance">Ambulance Service</option>
                  <option value="rider">Emergency Rider (Logistics)</option>
                  <option value="ngo">Non-Governmental Organization (NGO)</option>
                  <option value="individual">Individual Contributor</option>
                </select>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-blue-600 border-b-4 border-blue-800 text-white font-black py-5 uppercase tracking-widest text-sm rounded-[2rem] shadow-xl hover:bg-blue-500 transition active:border-b-0 active:translate-y-1 disabled:opacity-50 italic"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
