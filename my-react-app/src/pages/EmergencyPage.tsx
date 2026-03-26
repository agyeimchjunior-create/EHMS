import { PhoneCall, ShieldAlert, Activity, Radar, Building2, Car, Pill, UserPlus, Video, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

const EmergencyPage = () => {
   const [isScanning, setIsScanning] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
   const [scanProgress, setScanProgress] = useState(0);

   const stopScanning = (id: number) => {
      navigator.geolocation.clearWatch(id);
      setIsScanning(false);
      setShowResults(true);
      setScanProgress(100);
      toast.success('Secure Node Discovery Complete', {
         description: 'Discovered 12 available facilities in your immediate vicinity.'
      });
   };

   const handleScan = () => {
      if (isScanning) return;

      setIsScanning(true);
      setShowResults(false);
      setScanProgress(0);

      const id = navigator.geolocation.watchPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            console.log("📍 PROTOCOL SYNC:", latitude, longitude);

            // Progress simulation tied to successful hits
            setScanProgress(prev => Math.min(prev + 25, 95));
         },
         (error) => {
            console.error("❌ SIGNAL FAILURE:", error);
            toast.error('Satellite Link Failure', {
               description: error.message || 'Unable to establish secure GPS channel.'
            });
            setIsScanning(false);
         },
         {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
         }
      );

      // Auto-complete the "Discovery" after data is gathered
      setTimeout(() => {
         stopScanning(id);
      }, 5000);
   };

   const nearResults = [
      { name: 'St. Nicholas Hospital', type: 'Hospital', dist: '0.8km', icon: <Building2 />, color: 'text-blue-500', bg: 'bg-blue-600/10' },
      { name: 'Rapid Dispatch Unit #4', type: 'Ambulance', dist: '1.2km', icon: <Car />, color: 'text-red-500', bg: 'bg-red-600/10' },
      { name: 'Rapha Pharmacy', type: 'Pharmacy', dist: '1.5km', icon: <Pill />, color: 'text-emerald-500', bg: 'bg-emerald-600/10' },
   ];

   return (
      <div className="min-h-screen bg-blue-800 font-sans text-white pb-40 overflow-hidden">
         {/* High-Tech Radar Hero - Stabilized Layout */}
         <section className="relative min-h-[70vh] flex flex-col items-center justify-center p-8 bg-blue-700/40 shadow-2xl overflow-hidden border-b border-white/10 backdrop-blur-3xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-blue-500/20 rounded-full animate-pulse"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-blue-500/5 rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
               <motion.div
                  animate={isScanning ? { rotate: 360 } : { scale: [1, 1.02, 1] }}
                  transition={isScanning ? { repeat: Infinity, duration: 2, ease: "linear" } : { repeat: Infinity, duration: 4 }}
                  className={`inline-block p-8 rounded-[2.5rem] bg-slate-950/80 border-2 ${isScanning ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]' : 'border-blue-500/20'} transition-all duration-700 mb-8 relative backdrop-blur-3xl`}
               >
                  {isScanning ? <Radar size={56} className="text-red-500" /> : <ShieldAlert size={56} className="text-blue-500" />}
                  {isScanning && <div className="absolute inset-0 bg-red-600/10 rounded-[2.5rem] animate-ping"></div>}
               </motion.div>

               <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none truncate overflow-visible">Emergency Node</h1>
               <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.4em] mb-10 italic border-b border-blue-900 pb-3">Protocol Status: High Priority</p>

               <p className="text-slate-400 font-bold text-lg md:text-xl max-w-2xl mx-auto italic mb-16 leading-relaxed">
                  {isScanning
                     ? `Satellites Linked. Receiving Encrypted Node Feed...`
                     : 'Initialize a high-frequency scan to detect the nearest emergency response assets in real-time.'}
               </p>

               {isScanning && currentLocation && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mb-12 flex gap-4 justify-center"
                  >
                     <div className="bg-slate-950/50 backdrop-blur-xl border border-blue-500/20 px-6 py-3 rounded-2xl text-center shadow-xl">
                        <p className="text-[8px] font-black text-blue-400/40 uppercase tracking-widest mb-1">LATITUDE</p>
                        <p className="text-lg font-black italic tracking-tighter text-blue-500">{currentLocation.lat.toFixed(6)}</p>
                     </div>
                     <div className="bg-slate-950/50 backdrop-blur-xl border border-blue-500/20 px-6 py-3 rounded-2xl text-center shadow-xl">
                        <p className="text-[8px] font-black text-blue-400/40 uppercase tracking-widest mb-1">LONGITUDE</p>
                        <p className="text-lg font-black italic tracking-tighter text-blue-500">{currentLocation.lng.toFixed(6)}</p>
                     </div>
                  </motion.div>
               )}

               {isScanning && (
                  <div className="w-full max-w-xs bg-slate-950/50 h-1.5 rounded-full mb-10 overflow-hidden border border-white/5">
                     <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                     />
                  </div>
               )}

               <div className="flex flex-col md:row gap-4 justify-center w-full max-w-xs">
                  {!isScanning && (
                     <button
                        onClick={handleScan}
                        className="w-full bg-red-600 border-b-4 border-red-950 px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest text-lg hover:bg-red-500 hover:scale-[1.02] transition active:border-b-0 active:translate-y-1 shadow-[0_20px_60px_-15px_rgba(220,38,38,0.4)]"
                     >
                        {showResults ? 'Refresh Scan' : 'Scan Help'}
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
                     className="grid lg:grid-cols-3 gap-6 mb-24"
                  >
                     {nearResults.map((item, i) => (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.15 }}
                           key={i}
                           className="bg-slate-900 px-8 py-10 rounded-3xl border border-slate-800 shadow-xl group hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-500 flex flex-col items-center text-center"
                        >
                           <div className={`p-5 ${item.bg} ${item.color} rounded-2xl mb-8 group-hover:rotate-6 group-hover:scale-110 transition shadow-xl`}>
                              {item.icon}
                           </div>
                           <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition">{item.name}</h4>
                           <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 mb-8">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                              <p className="text-slate-500 font-black uppercase text-[8px] tracking-widest italic">{item.dist} LINK</p>
                           </div>
                           <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-black italic uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition shadow-lg border-b-2 border-slate-200 active:border-b-0 active:translate-y-0.5">
                              Dispatch
                           </button>
                        </motion.div>
                     ))}
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Tele-Health Control Center */}
            <div className="space-y-12">
               <div className="flex flex-col md:row justify-between items-center md:items-end gap-6 border-b border-slate-800 pb-8">
                  <div className="text-center md:text-left">
                     <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Remote Medical Desk</h2>
                     <p className="text-slate-500 font-bold text-xs max-w-sm italic">Instant encrypted connection to verified medical professionals.</p>
                  </div>
                  <div className="bg-blue-600/10 text-blue-400 px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-3 border border-blue-500/10 italic backdrop-blur-xl">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     14 ACTIVE DOCTORS
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <button className="bg-slate-900 p-8 rounded-3xl border-l-4 border border-slate-800 border-l-blue-600 flex items-center gap-8 hover:bg-slate-800 transition shadow-xl group text-center md:text-left">
                     <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl group-hover:scale-110 transition shrink-0">
                        <UserPlus size={32} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-blue-400 mb-1 uppercase tracking-widest italic opacity-60">Human Support Triage</p>
                        <p className="text-2xl font-black italic uppercase tracking-tighter">Medical Support</p>
                     </div>
                     <ChevronRight className="hidden lg:block text-slate-700 group-hover:text-blue-500 group-hover:translate-x-2 transition" size={24} />
                  </button>

                  <button className="bg-white p-8 rounded-3xl border border-white flex items-center gap-8 hover:bg-blue-600 hover:text-white transition shadow-xl group text-slate-800 text-center md:text-left">
                     <div className="bg-slate-950 p-6 rounded-2xl text-white shadow-xl group-hover:scale-110 transition group-hover:bg-white group-hover:text-blue-600 shrink-0">
                        <Video size={32} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest italic group-hover:text-blue-100">Live Video Consult</p>
                        <p className="text-2xl font-black italic uppercase tracking-tighter transition">Talk to a Doctor</p>
                     </div>
                     <ChevronRight className="hidden lg:block text-slate-200 group-hover:text-white group-hover:translate-x-2 transition" size={24} />
                  </button>
               </div>
            </div>

            <div className="mt-24 grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-red-600/10 rounded-[3rem] p-12 border-2 border-dashed border-red-500/20 text-center relative overflow-hidden group hover:bg-red-600 transition-all duration-700">
                  <Activity className="absolute bottom-0 left-0 w-full h-24 opacity-5 text-red-500 pointer-events-none group-hover:opacity-10" />
                  <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-white transition">In Crisis?</h3>
                  <p className="text-red-400 font-bold mb-8 max-w-lg mx-auto text-sm leading-relaxed italic group-hover:text-white/80 transition">Tap below to initiate a priority cryptographic distress signal to regional dispatch.</p>
                  <button className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest text-lg shadow-xl hover:scale-105 transition active:scale-95 group flex items-center gap-4 mx-auto border-4 border-white group-hover:bg-white group-hover:text-red-600">
                     <PhoneCall size={24} className="group-hover:animate-bounce" /> +233-911-000
                  </button>
               </div>

               <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col justify-center items-center text-center italic shadow-inner">
                  <ShieldCheck size={56} className="text-emerald-500 mb-6" />
                  <h4 className="text-xl font-black uppercase mb-2 tracking-tighter">Certified Link</h4>
                  <p className="text-slate-500 font-bold text-[10px] leading-relaxed px-4">
                     Encrypted under Protocol v.4.0.
                  </p>
               </div>
            </div>
         </main>
      </div>
   );
};

export default EmergencyPage;
