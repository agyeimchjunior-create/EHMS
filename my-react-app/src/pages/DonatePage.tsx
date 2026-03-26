import { Heart, Activity, HandCoins, Check, ShieldCheck, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const DonatePage = () => {
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
            className="lg:w-1/2 text-left z-10"
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
              <button className="bg-white text-slate-950 font-black px-10 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition shadow-2xl flex items-center gap-2 uppercase text-xs tracking-widest italic">
                Fund Emergency Care <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right 50% Slide-In Image - LOCAL PUBLIC IMAGE USED */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 w-full h-[400px] lg:h-[600px] relative overflow-hidden rounded-[3rem] shadow-2xl group border-4 border-slate-800"
          >
            <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply group-hover:bg-transparent transition duration-700"></div>
            <img
              src="/supportlife.jpg"
              alt="Medical Team Support"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000"
            />
            <div className="absolute bottom-8 left-8 ring-1 ring-white/20 bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition duration-500">
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Direct Impact</p>
              <p className="text-xs font-bold text-white italic">Emergency Training Facility, Accra</p>
            </div>
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

      {/* Contribution Tiers */}
      <section className="bg-slate-50 py-32 px-4 rounded-[4rem] mb-24 max-w-7xl mx-auto w-full border border-slate-200">
        <div className="text-center mb-20 italic">
          <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Contribution Tiers</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Choose a support tier that aligns with your capacity to give. Every tier directly improves lives.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { tier: 'Community Support', price: 'GHS 20 – 490', color: 'blue', items: ['Access to emergency support', 'Inclusion in health network', 'Emergency education'] },
            { tier: 'Silver', price: 'GHS 500', color: 'slate', items: ['Priority ambulance coordination', 'Tele-triage access', 'Discounted medicine delivery'] },
            { tier: 'Gold', price: 'GHS 2,000', color: 'yellow', popular: true, items: ['Family coverage (4 members)', 'Enhanced support services', 'Priority prioritization'] },
            { tier: 'Diamond', price: 'GHS 5,000', color: 'cyan', items: ['Extended coverage (10 individuals)', 'Dedicated emergency coordination'] }
          ].map((item, i) => (
            <div key={i} className={`bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 relative ${item.popular ? 'ring-4 ring-yellow-400 transform md:-translate-y-4 shadow-xl' : ''}`}>
              {item.popular && <div className="absolute top-0 right-10 bg-yellow-400 text-yellow-900 text-[10px] font-black px-6 py-2 rounded-b-2xl uppercase tracking-widest italic">Preferred</div>}
              <h3 className={`text-xl font-black uppercase tracking-widest mb-2 italic ${item.color === 'yellow' ? 'text-yellow-600' : 'text-slate-800'}`}>{item.tier}</h3>
              <div className="text-3xl font-black mb-8 italic tracking-tighter">{item.price}</div>
              <ul className="space-y-4 mb-10">
                {item.items.map((li, j) => (
                  <li key={j} className="flex items-start gap-3 text-slate-500 text-sm font-medium italic">
                    <Check className="text-emerald-500 flex-shrink-0" size={18} /> {li}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-slate-950 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition shadow-lg uppercase text-xs tracking-widest italic border-b-4 border-slate-900 active:border-b-0 active:translate-y-1">Select Tier</button>
            </div>
          ))}

          <div className="lg:col-span-2 bg-slate-950 p-12 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row items-center gap-12 text-white relative overflow-hidden border-4 border-slate-800">
            <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={120} /></div>
            <div className="flex-1 relative z-10">
              <h3 className="text-3xl font-black italic uppercase tracking-widest mb-4">Platinum Partnership</h3>
              <div className="text-5xl font-black text-red-500 mb-8 italic tracking-tighter">GHS 10,000+</div>
              <ul className="space-y-4 mb-0 font-medium italic text-slate-400 text-sm">
                <li className="flex items-start gap-3"><Check className="text-red-500 flex-shrink-0" /> Premium national emergency coverage</li>
                <li className="flex items-start gap-3"><Check className="text-red-500 flex-shrink-0" /> Strategic oversight and system participation</li>
              </ul>
            </div>
            <button className="bg-white text-slate-950 font-black px-12 py-5 rounded-[2rem] hover:bg-red-600 hover:text-white transition shadow-xl uppercase text-sm tracking-[0.2em] italic shrink-0 group">
              Partner Now <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* Custom Contributions */}
        <div className="mt-20 text-center bg-white p-12 rounded-[4rem] border border-slate-300 max-w-4xl mx-auto shadow-sm">
          <h3 className="font-black text-slate-900 text-2xl mb-4 italic uppercase tracking-tighter">Custom Contributions</h3>
          <p className="text-slate-500 mb-10 italic font-medium">You may contribute any amount from GHS 25 and above to support the Community Health Emergency Fund.</p>
          <div className="flex flex-col md:row items-center gap-2 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 italic">GHS</span>
              <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-300 pl-16 pr-6 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-xl text-slate-800 italic" />
            </div>
            <button className="w-full md:w-auto bg-slate-950 text-white font-black px-12 py-5 rounded-[2rem] hover:bg-emerald-600 transition shadow-xl uppercase text-sm tracking-widest italic border-b-4 border-slate-800 active:border-b-0 active:translate-y-1">Donate</button>
          </div>
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
