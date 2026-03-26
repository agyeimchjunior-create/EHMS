import { PhoneCall, MapPin, ShieldAlert, Heart, Clock, Activity, Loader2, Radar, Building2, Car, Pill, UserPlus, MessageCircle, Video, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

const EmergencyPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setShowResults(false);
    
    // Simulate high-tech scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      toast.success('Scan Complete', {
        description: 'Discovered 12 available facilities in your immediate vicinity.'
      });
    }, 4000);
  };

  const nearResults = [
    { name: 'St. Nicholas Hospital', type: 'Hospital', dist: '0.8km', icon: <Building2 />, color: 'text-blue-500', bg: 'bg-blue-600/10' },
    { name: 'Rapid Dispatch Unit #4', type: 'Ambulance', dist: '1.2km', icon: <Car />, color: 'text-red-500', bg: 'bg-red-600/10' },
    { name: 'Rapha Pharmacy', type: 'Pharmacy', dist: '1.5km', icon: <Pill />, color: 'text-emerald-500', bg: 'bg-emerald-600/10' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white pb-40 overflow-hidden">
      {/* High-Tech Radar Hero - Stabilized Layout */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center p-8 bg-slate-900 shadow-2xl overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-blue-500/5 rounded-full"></div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <motion.div 
              animate={isScanning ? { rotate: 360 } : { scale: [1, 1.05, 1] }}
              transition={isScanning ? { repeat: Infinity, duration: 2, ease: "linear" } : { repeat: Infinity, duration: 4 }}
              className={`inline-block p-12 rounded-[3.5rem] bg-slate-950/80 border-2 ${isScanning ? 'border-red-500 shadow-[0_0_80px_rgba(239,68,68,0.5)]' : 'border-blue-500/30'} transition-all duration-700 mb-10 relative backdrop-blur-3xl`}
            >
               {isScanning ? <Radar size={80} className="text-red-500 shadow-2xl" /> : <ShieldAlert size={80} className="text-blue-500" />}
               {isScanning && <div className="absolute inset-0 bg-red-600/20 rounded-[3.5rem] animate-ping"></div>}
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 leading-none tracking-tight">Emergency Node</h1>
            <p className="text-blue-400 font-black uppercase text-xs tracking-[0.4em] mb-12 italic border-b border-blue-900 pb-4">Protocol Status: High Priority Discovery</p>
            
            <p className="text-slate-400 font-bold text-lg md:text-xl max-w-2xl mx-auto italic mb-16 leading-relaxed">
               {isScanning ? 'Syncing with nationwide facility masters via deep-space satellite telemetry...' : 'Initialize a high-frequency scan to detect the nearest emergency response assets in real-time.'}
            </p>

            <div className="flex flex-col md:row gap-6 justify-center w-full max-w-md">
               {!isScanning && (
                   <button 
                    onClick={handleScan}
                    className="w-full bg-red-600 border-b-6 border-red-950 px-12 py-6 rounded-[3rem] font-black italic uppercase tracking-widest text-2xl hover:bg-red-500 hover:scale-[1.05] transition active:border-b-0 active:translate-y-2 shadow-[0_30px_100px_-15px_rgba(220,38,38,0.6)]"
                   >
                      {showResults ? 'Re-Scan Area' : 'Scan for Help'}
                   </button>
               )}
            </div>
         </div>
      </section>

      {/* Discovery Results Hub - Refined Margins */}
      <main className="max-w-7xl mx-auto px-8 relative z-20 py-24">
         <AnimatePresence>
            {showResults && (
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="grid lg:grid-cols-3 gap-10 mb-32"
               >
                  {nearResults.map((item, i) => (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        key={i} 
                        className="bg-slate-900 p-10 rounded-[3.5rem] border border-slate-800 shadow-3xl group hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-700 flex flex-col items-center text-center"
                     >
                        <div className={`p-6 ${item.bg} ${item.color} rounded-[2rem] mb-10 group-hover:rotate-12 group-hover:scale-110 transition shadow-2xl`}>
                           {item.icon}
                        </div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition">{item.name}</h4>
                        <div className="flex items-center gap-3 bg-white/5 px-4 py-1 rounded-full border border-white/5 mb-10">
                           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                           <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest italic">{item.dist} SECURE LINK</p>
                        </div>
                        <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black italic uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition shadow-xl border-b-4 border-slate-200 active:border-b-0 active:translate-y-1">
                           Initiate Dispatch
                        </button>
                     </motion.div>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>

         {/* Tele-Health Control Center */}
         <div className="space-y-16">
            <div className="flex flex-col md:row justify-between items-center md:items-end gap-10 border-b border-slate-800 pb-12">
               <div className="text-center md:text-left">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Remote Medical Desk</h2>
                  <p className="text-slate-500 font-bold max-w-lg italic">Instant encrypted connection to verified medical professionals and regional dispatchers.</p>
               </div>
               <div className="bg-blue-600/10 text-blue-400 px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 border border-blue-500/20 italic shadow-2xl backdrop-blur-xl">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  14 ACTIVE DOCTORS ON LINK
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <button className="bg-slate-900 p-12 rounded-[4rem] border-l-8 border border-slate-800 border-l-blue-600 flex flex-col md:row items-center gap-10 hover:bg-slate-800 transition shadow-2xl group text-center md:text-left">
                   <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-12 transition">
                      <UserPlus size={44} />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-black text-blue-400 mb-2 uppercase tracking-widest italic opacity-60">Human Support Triage</p>
                      <p className="text-3xl font-black italic uppercase tracking-tighter">Contact Medical Support</p>
                   </div>
                   <ChevronRight className="hidden lg:block text-slate-700 group-hover:text-blue-500 group-hover:translate-x-2 transition" size={32} />
                </button>

                <button className="bg-white p-12 rounded-[4rem] border border-white flex flex-col md:row items-center gap-10 hover:bg-blue-600 hover:text-white transition shadow-2xl group transition-all duration-700 text-slate-800 text-center md:text-left">
                   <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition group-hover:bg-white group-hover:text-blue-600">
                      <Video size={44} />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest italic group-hover:text-blue-100">Live Video Consult</p>
                      <p className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-white transition">Talk to a Doctor</p>
                   </div>
                   <ChevronRight className="hidden lg:block text-slate-200 group-hover:text-white group-hover:translate-x-2 transition" size={32} />
                </button>
            </div>
         </div>

         {/* Protocol Disclaimer & High Dispatch */}
         <div className="mt-40 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-red-600/10 rounded-[5rem] p-20 border-4 border-dashed border-red-500/30 text-center relative overflow-hidden group hover:bg-red-600 transition-all duration-1000">
               <Activity className="absolute bottom-0 left-0 w-full h-40 opacity-5 text-red-500 pointer-events-none group-hover:opacity-10 group-hover:animate-pulse" />
               <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 group-hover:text-white transition">In Crisis?</h3>
               <p className="text-red-400 font-bold mb-12 max-w-xl mx-auto text-lg leading-relaxed italic group-hover:text-white/80 transition">Our AI dispatcher is standing by 24/7. Tapping below initiates a highest-priority cryptographic distress signal.</p>
               <button className="bg-red-600 text-white px-16 py-7 rounded-[3rem] font-black italic uppercase tracking-[0.2em] text-2xl shadow-3xl hover:scale-110 transition active:scale-95 group flex items-center gap-6 mx-auto border-4 border-white group-hover:bg-white group-hover:text-red-600">
                  <PhoneCall size={32} className="group-hover:animate-bounce" /> +233-911-000
               </button>
            </div>

            <div className="bg-slate-900 p-12 rounded-[5rem] border border-slate-800 flex flex-col justify-center items-center text-center italic shadow-inner">
               <ShieldCheck size={80} className="text-emerald-500 mb-8" />
               <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter">Certified Link</h4>
               <p className="text-slate-500 font-bold text-sm leading-relaxed px-4">
                  All EHMS node discovery connections are end-to-end encrypted under National Health Security Protocol v.4.0.
               </p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default EmergencyPage;
