import { Car, MapPin, Truck, Phone, ChevronRight, Activity, ShieldCheck, HeartPulse, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AmbulancePage = () => {
  const fleets = [
    { id: 'fleet-001', type: 'Advanced Life Support (ALS)', status: 'Available', eta: '4 min', zone: 'East Legon Dispatch', provider: 'EHMS Central' },
    { id: 'fleet-002', type: 'Basic Life Support (BLS)', status: 'Available', eta: '6 min', zone: 'Accra Mall Hub', provider: 'EHMS City' },
    { id: 'fleet-003', type: 'Flight Rescue (HEMS)', status: 'Standby', eta: '12 min', zone: 'Kotoka Airbase', provider: 'Heli-Medics' },
    { id: 'fleet-004', type: 'Motorcycle Responder (RIDER)', status: 'Available', eta: '3 min', zone: 'Oxford Street', provider: 'SwiftResponse' },
  ];

  return (
    <div className="min-h-screen bg-blue-800 font-sans pb-32 overflow-hidden">
      {/* Dynamic Map Background Hero - Adjusted Height */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center p-8 border-b border-white/5 bg-blue-900/40 shadow-inner backdrop-blur-3xl">
        <div className="absolute inset-0 bg-blue-950 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center py-12">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 bg-blue-500/20 text-white px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] mb-6 italic mx-auto w-fit"
          >
             <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
             Direct Satellite Connection Active
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4 leading-[0.9]">Emergency Fleet</h1>
          <p className="text-blue-100 font-bold text-sm md:text-lg max-w-xl mx-auto leading-relaxed italic mb-8 opacity-80 uppercase tracking-widest">
            Integrated dispatch system connecting 2,500+ private and public ambulances.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
             <button className="w-full md:w-auto bg-red-600 border-b-4 border-red-950 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:bg-red-500 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest italic text-lg flex items-center gap-3 group justify-center">
                <Car size={20} className="group-hover:rotate-12 transition" /> Request Now
             </button>
             <button className="w-full md:w-auto bg-white/10 border-b-4 border-white/20 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:bg-white/20 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest italic text-[10px] tracking-[0.2em] flex items-center gap-3 justify-center">
                <Search size={18} className="text-blue-200" /> Tracking Portal
             </button>
          </div>
        </div>
      </section>

      {/* Fleet Dashboard - Removed Overlap */}
      <main className="max-w-7xl mx-auto p-8 py-16">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
               <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Live Fleet Status</h2>
               <div className="w-16 h-1 bg-white/20 mt-2 rounded-full"></div>
               <p className="text-blue-100 font-bold mt-4 italic uppercase text-[10px] tracking-widest opacity-60">Nearest emergency response units.</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
               <div className="flex-1 min-w-[140px] bg-blue-900/40 p-5 rounded-2xl border border-white/5 shadow-xl backdrop-blur-xl">
                  <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest mb-1 italic">Total Active</p>
                  <p className="text-2xl font-black text-white italic">1,492</p>
               </div>
               <div className="flex-1 min-w-[140px] bg-blue-900/40 p-5 rounded-2xl border border-white/5 shadow-xl backdrop-blur-xl">
                  <p className="text-[9px] font-black text-blue-200 uppercase tracking-widest mb-1 italic">Avg Time</p>
                  <p className="text-2xl font-black text-emerald-400 italic">4.2m</p>
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            {fleets.map((fleet, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={fleet.id} 
                 className="bg-white p-8 rounded-3xl hover:bg-blue-50 transition duration-500 group relative overflow-hidden shadow-2xl border border-white"
               >
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-600 group-hover:scale-125 transition duration-1000 rotate-12 pointer-events-none">
                     <Truck size={100} />
                  </div>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                     <div className="p-4 bg-blue-600 text-white rounded-xl shadow-lg">
                        <HeartPulse size={28} />
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest italic mb-1">{fleet.status}</p>
                        <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{fleet.eta}</p>
                     </div>
                  </div>

                  <div className="space-y-4 mb-8 relative z-10">
                     <div>
                        <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tight">{fleet.type}</h4>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1 italic">
                           <MapPin size={10} className="text-red-500" /> {fleet.zone}
                        </p>
                     </div>
                     <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-500 text-[8px] italic">EH</div>
                        <div>
                           <p className="text-[8px] font-black text-slate-400 uppercase italic">Fleet Provider</p>
                           <p className="text-xs font-black text-slate-600 uppercase italic tracking-tighter">{fleet.provider}</p>
                        </div>
                     </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-slate-900 transition flex items-center justify-center gap-2 uppercase tracking-widest text-[9px] italic group/btn shadow-xl border-b-4 border-blue-900 active:border-b-0 active:translate-y-1">
                     Dispatch Unit <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition" />
                  </button>
               </motion.div>
            ))}
         </div>

         {/* Protocol Assurance */}
         <div className="mt-24 p-12 bg-white rounded-[4rem] border-4 border-slate-800 shadow-2xl flex flex-col md:row items-center gap-12 font-sans relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="p-8 bg-slate-950 text-blue-500 rounded-[2.5rem] shadow-2xl border-b-4 border-slate-800 shrink-0 relative z-10 group-hover:scale-110 transition duration-500">
               <ShieldCheck size={56} />
            </div>
            <div className="relative z-10">
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">Protocol Assurance</h3>
               <p className="text-slate-500 font-bold leading-relaxed italic text-lg max-w-2xl">
                  All EHMS fleets are equipped with satellite telemetry and real-time biometric reporting. Your dispatcher will have your clinical history ready before the ambulance arrives.
               </p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default AmbulancePage;
