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
    <div className="min-h-screen bg-slate-950 font-sans pb-32 overflow-hidden">
      {/* Dynamic Map Background Hero - Adjusted Height */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 border-b border-slate-800 bg-slate-900 shadow-inner">
        <div className="absolute inset-0 bg-slate-950 opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center py-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-8 italic mx-auto w-fit"
          >
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
             Direct Satellite Connection Active
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.9]">Emergency Fleet</h1>
          <p className="text-slate-400 font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic mb-12">
            Integrated dispatch system connecting 2,500+ private and public ambulances across the nation.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <button className="w-full md:w-auto bg-red-600 border-b-4 border-red-950 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-red-500 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest italic text-lg flex items-center gap-4 group justify-center">
                <Car size={24} className="group-hover:rotate-12 transition" /> Request Now
             </button>
             <button className="w-full md:w-auto bg-slate-800 border-b-4 border-slate-950 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-slate-700 transition active:border-b-0 active:translate-y-1 uppercase tracking-widest italic text-sm tracking-[0.2em] flex items-center gap-4 justify-center">
                <Search size={20} className="text-blue-500" /> Tracking Portal
             </button>
          </div>
        </div>
      </section>

      {/* Fleet Dashboard - Removed Overlap */}
      <main className="max-w-7xl mx-auto p-8 py-24">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div>
               <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter italic">Live Fleet Status</h2>
               <div className="w-24 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
               <p className="text-slate-500 font-medium mt-6 italic">Nearest emergency units based on your current satellite location.</p>
            </div>
            <div className="flex flex-wrap gap-6 w-full md:w-auto">
               <div className="flex-1 min-w-[150px] bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Total Active</p>
                  <p className="text-3xl font-black text-blue-500 italic">1,492</p>
               </div>
               <div className="flex-1 min-w-[150px] bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Response Time</p>
                  <p className="text-3xl font-black text-emerald-500 italic">4.2 min</p>
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-10">
            {fleets.map((fleet, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={fleet.id} 
                 className="bg-slate-900 border border-slate-800/50 p-10 rounded-[3rem] hover:bg-slate-800 hover:border-blue-500/30 transition duration-500 group relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-10 opacity-5 text-blue-500 group-hover:scale-125 transition duration-1000 rotate-12 pointer-events-none">
                     <Truck size={140} />
                  </div>
                  <div className="flex justify-between items-start mb-10 relative z-10">
                     <div className="p-5 bg-blue-600/10 text-blue-500 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition shadow-xl">
                        <HeartPulse size={32} />
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic mb-1">{fleet.status}</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter">{fleet.eta}</p>
                     </div>
                  </div>

                  <div className="space-y-6 mb-10 relative z-10">
                     <div>
                        <h4 className="text-2xl font-black text-white italic uppercase tracking-tight">{fleet.type}</h4>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mt-2 italic shadow-sm">
                           <MapPin size={12} className="text-red-500" /> {fleet.zone}
                        </p>
                     </div>
                     <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-black text-slate-500 text-xs italic">EH</div>
                        <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase italic">Fleet Provider</p>
                           <p className="text-sm font-black text-slate-300 uppercase italic tracking-tighter">{fleet.provider}</p>
                        </div>
                     </div>
                  </div>

                  <button className="w-full bg-white text-slate-900 font-black py-5 rounded-[2rem] hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-3 uppercase tracking-widest text-xs italic group/btn shadow-2xl relative z-10 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1">
                     Initialize Dispatch <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition" />
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
