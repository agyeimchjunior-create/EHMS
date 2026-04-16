import { Heart, Activity, ShieldCheck, HandCoins, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';

const DonatePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center text-center gap-8 py-20 z-10">
          <div className="bg-red-600/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] mb-4 italic">
            <Heart size={16} className="animate-pulse" /> Direct Impact
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter italic uppercase">
            Fund Critical <span className="text-red-600">Lifelines</span>
          </h1>
          <p className="text-xl text-slate-400 font-bold leading-relaxed italic max-w-2xl mx-auto mt-4">
            Support patients in immediate critical condition, fund urgent hospital equipment, and ensure emergency medical infrastructure thrives.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, i) => {
             const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
             
             return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={campaign.id}
              >
                <Link 
                  to={`/donate/${campaign.id}`}
                  className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:-translate-y-2 transition duration-500 flex flex-col h-full"
                >
                  <div className="h-60 relative overflow-hidden">
                    <img 
                      src={campaign.images[0]} 
                      alt={campaign.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg italic">
                      {campaign.type}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter leading-tight mb-3 group-hover:text-red-600 transition">
                      {campaign.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-1">
                      {campaign.shortDesc}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                       <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-red-500 h-2.5 rounded-full transition-all duration-1000" 
                            style={{ width: `${progress}%` }}
                          ></div>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="font-black italic text-slate-800">
                             GHS {campaign.raised.toLocaleString()} <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Raised</span>
                          </span>
                          <span className="font-black italic text-slate-400">
                             GHS {campaign.goal.toLocaleString()}
                          </span>
                       </div>
                       <div className="w-full bg-red-50 text-red-600 font-black uppercase tracking-widest text-xs py-3 rounded-xl flex justify-center items-center gap-2 group-hover:bg-red-600 group-hover:text-white transition duration-300 italic">
                         Support Now <ArrowRight size={14} />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
             )
          })}
        </div>
      </section>

      {/* Why Your Support Matters */}
      <section className="max-w-7xl mx-auto px-6 py-32 mt-12">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black text-slate-900 mb-6 italic uppercase tracking-tighter">Accountable Philanthropy</h2>
           <div className="w-16 h-2 bg-red-600 mx-auto rounded-full mb-8"></div>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto italic font-medium">100% of emergency funds directly offset medical costs, equipment logistics, or surgical interventions. We deploy an audited routing system.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Direct Disbursement', desc: 'Funds are paid directly to hospitals and verified pharmacies, never individuals.', icon: <Activity className="text-blue-600" size={32} /> },
            { title: 'Vetted Cases', desc: 'Each patient profile and equipment request is medically verified by partner doctors.', icon: <ShieldCheck className="text-emerald-600" size={32} /> },
            { title: 'Transparent Updates', desc: 'Receive medical status updates and equipment rollout imagery post-funding.', icon: <HandCoins className="text-purple-600" size={32} /> }
          ].map((item, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center hover:-translate-y-2 transition duration-500">
               <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                 {item.icon}
               </div>
               <h3 className="font-black text-slate-800 mb-4 italic uppercase tracking-tight">{item.title}</h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
