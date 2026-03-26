import { Pill, Search, MapPin, Truck, Phone, Star, ShieldCheck, HeartPulse, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PharmacyPage = () => {
  const pharmacies = [
    { name: 'Rapha Pharmacies', location: 'Osu Oxford Street', type: 'Community & Specialty', rating: 4.8, status: 'Open 24/7', specialty: 'Rare Biologics' },
    { name: 'Global Health Meds', location: 'Airport Residential', type: 'Specialist Supply', rating: 4.6, status: 'Closed in 40m', specialty: 'Diabetes Hub' },
    { name: 'CareFirst Pharmacy', location: 'Cantonments', type: 'Clinical Pharmacy', rating: 5.0, status: 'Open 24/7', specialty: 'Emergency Meds' },
    { name: 'Vibrant Wellness', location: 'Dansoman Mall', type: 'Retail & Wellness', rating: 4.2, status: 'Open Now', specialty: 'Vitamins & Health' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <header className="bg-emerald-600 pt-20 pb-32 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <Pill size={600} className="absolute -left-20 -top-20 -rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Pharmacy Network</h1>
          <p className="text-emerald-100 font-bold mb-10 text-lg">Instant Access to Essential Medicines Across the Region.</p>
          
          <div className="max-w-2xl mx-auto relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition" size={24} />
             <input 
               type="text" 
               placeholder="Search medicine or nearest pharmacy..." 
               className="w-full bg-white p-6 pl-16 rounded-[2rem] shadow-2xl text-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/20 transition font-medium italic"
             />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 -mt-20 relative z-20">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pharmacies.map((p, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={i} 
                 className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 overflow-hidden group hover:shadow-2xl transition duration-500 flex flex-col h-full"
               >
                  <div className="h-40 bg-emerald-50 relative overflow-hidden flex items-center justify-center">
                     <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-12 transition duration-500">
                        <Pill size={48} />
                     </div>
                     <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 shadow-md italic">
                        {p.status}
                     </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <h4 className="font-black text-xl text-slate-800 italic uppercase tracking-tighter group-hover:text-emerald-600 transition">{p.name}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                              <MapPin size={10} className="text-emerald-500" /> {p.location}
                           </p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 italic text-xs">
                           <Star size={12} fill="currentColor" /> {p.rating}
                        </div>
                     </div>

                     <div className="space-y-4 mb- auto pt-2 border-t border-slate-50 mt-auto">
                        <div className="flex items-center gap-3">
                           <div className="bg-emerald-600 text-white p-2 rounded-xl scale-75 shadow-lg"><HeartPulse size={16} /></div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialization</p>
                              <p className="text-xs font-black text-slate-700 italic uppercase tracking-tight">{p.specialty}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="bg-slate-900 text-white p-2 rounded-xl scale-75 shadow-lg"><Truck size={16} /></div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Home Delivery</p>
                              <p className="text-xs font-black text-slate-700 italic uppercase tracking-tight">Active (9:00 - 18:00)</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 space-y-3">
                        <button className="w-full bg-emerald-600 border-b-4 border-emerald-800 text-white font-black py-3 rounded-2xl hover:bg-emerald-500 transition active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-xs italic">
                           <Phone size={14} /> Call Pharmacy
                        </button>
                        <button className="w-full bg-slate-900 text-white font-black py-3 rounded-2xl hover:bg-black transition flex items-center justify-center gap-2 uppercase tracking-widest text-xs italic">
                           <ExternalLink size={14} /> View Stock
                        </button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Protocol Disclaimer */}
         <div className="mt-24 p-12 bg-white rounded-[3.5rem] shadow-sm border border-slate-200 flex flex-col md:row items-center gap-12 font-sans italic border-l-8 border-l-emerald-600">
            <div className="p-8 bg-emerald-50 text-emerald-600 rounded-3xl shadow-inner shrink-0 rotate-12 scale-110">
               <ShieldCheck size={64} strokeWidth={1.5} />
            </div>
            <div>
               <h3 className="text-3xl font-black italic uppercase italic tracking-tighter text-slate-800 mb-4">Stock Governance</h3>
               <p className="text-slate-500 font-medium leading-relaxed italic">
                  Every partner pharmacy is integrated with our high-priority supply chain monitoring. We ensure critical medicines are always stocked and verified for authenticity via satellite tracking.
               </p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default PharmacyPage;
