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
      <div className="min-h-screen bg-slate-950 font-sans text-white pb-32 overflow-hidden relative">
         <div className="fixed inset-0 bg-[url('/heroimg2.jpg')] bg-cover bg-center opacity-40 pointer-events-none mix-blend-screen" />

         {/* High-Tech Radar Hero - Stabilized Layout */}
         <section className="relative min-h-[50vh] xl:min-h-[60vh] flex flex-col items-center justify-center p-6 bg-slate-950/40 shadow-2xl overflow-hidden border-b border-white/10 backdrop-blur-sm">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-blue-500/20 rounded-full animate-pulse"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-blue-500/5 rounded-full"></div>
            </div>

            <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center mt-12">
               <motion.div
                  animate={isScanning ? { rotate: 360 } : { scale: [1, 1.02, 1] }}
                  transition={isScanning ? { repeat: Infinity, duration: 2, ease: "linear" } : { repeat: Infinity, duration: 4 }}
                  className={`inline-flex items-center justify-center p-5 rounded-2xl bg-slate-900/90 border-2 ${isScanning ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-blue-500/20'} transition-all duration-700 mb-6 relative backdrop-blur-3xl`}
               >
                  {isScanning ? <Radar size={36} className="text-red-500" /> : <ShieldAlert size={36} className="text-blue-500" />}
                  {isScanning && <div className="absolute inset-0 bg-red-600/10 rounded-2xl animate-ping"></div>}
               </motion.div>

               <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-3 leading-none truncate overflow-visible drop-shadow-md">Emergency Node</h1>
               <p className="text-blue-400/80 font-black uppercase text-[9px] tracking-[0.3em] mb-8 italic border-b border-blue-900/50 pb-2">Protocol Status: High Priority</p>

               <p className="text-slate-300 font-medium text-sm md:text-base max-w-xl mx-auto italic mb-10 leading-relaxed">
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

               <div className="flex flex-col md:row gap-4 justify-center w-full max-w-xs pb-10">
                  {!isScanning && (
                     <button
                        onClick={handleScan}
                        className="w-full bg-red-600 border border-red-500 px-8 py-3.5 rounded-xl font-black italic uppercase tracking-widest text-sm hover:bg-red-500 hover:scale-[1.02] transition shadow-lg shadow-red-900/20"
                     >
                        {showResults ? 'Refresh Scan' : 'Scan Help'}
                     </button>
                  )}
               </div>
            </div>
         </section>

         {/* Discovery Results Hub - Refined Margins */}
         <main className="max-w-6xl mx-auto px-6 relative z-20 py-16">
            <AnimatePresence>
               {showResults && (
                     <motion.div
                       initial={{ opacity: 0, y: 50 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="grid lg:grid-cols-3 gap-5 mb-20"
                     >
                     {nearResults.map((item, i) => (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.15 }}
                           key={i}
                           className="bg-slate-900/80 backdrop-blur-md px-6 py-6 rounded-2xl border border-slate-700/50 shadow-xl group hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300 flex items-center justify-between"
                        >
                           <div className="flex items-center gap-4">
                              <div className={`p-3 ${item.bg} ${item.color} rounded-xl group-hover:rotate-6 group-hover:scale-110 transition shadow-md`}>
                                 {item.icon}
                              </div>
                              <div className="text-left">
                                 <h4 className="text-sm font-black italic uppercase tracking-tighter group-hover:text-blue-400 transition">{item.name}</h4>
                                 <p className="text-slate-400 font-medium uppercase text-[9px] tracking-widest italic">{item.dist} Link</p>
                              </div>
                           </div>
                           <button className="bg-white/10 text-white px-4 py-2 rounded-lg font-black italic uppercase text-[9px] tracking-widest hover:bg-blue-600 hover:text-white transition shadow-sm">
                              Call
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

               <div className="grid md:grid-cols-2 gap-5 mt-6">
                  <button className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border-l-2 border border-slate-700/50 border-l-blue-500 flex items-center gap-5 hover:bg-slate-800 transition shadow-md group text-left">
                     <div className="bg-blue-600/20 p-3.5 rounded-xl text-blue-400 shadow-inner group-hover:scale-105 transition shrink-0">
                        <UserPlus size={24} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-blue-400/80 mb-0.5 uppercase tracking-widest italic">Human Triage</p>
                        <p className="text-lg font-black italic uppercase tracking-tighter text-slate-100">Medical Support</p>
                     </div>
                     <ChevronRight className="hidden lg:block text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition" size={20} />
                  </button>

                  <button className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 flex items-center gap-5 hover:bg-blue-600 hover:border-blue-500 transition shadow-md group text-left">
                     <div className="bg-slate-800 p-3.5 rounded-xl text-white shadow-inner group-hover:scale-105 transition group-hover:bg-blue-700 shrink-0">
                        <Video size={24} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black text-slate-400 mb-0.5 uppercase tracking-widest italic group-hover:text-blue-200">Video Consult</p>
                        <p className="text-lg font-black italic uppercase tracking-tighter text-slate-100 group-hover:text-white transition">Talk to a Doctor</p>
                     </div>
                     <ChevronRight className="hidden lg:block text-slate-600 group-hover:text-white group-hover:translate-x-1 transition" size={20} />
                  </button>
               </div>
            </div>

            <div className="mt-16 grid lg:grid-cols-3 gap-5">
               <div className="lg:col-span-2 bg-gradient-to-br from-red-600/20 to-red-950/40 backdrop-blur-md rounded-3xl p-8 border border-red-500/20 text-center relative overflow-hidden group hover:bg-red-900/40 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                  <Activity className="absolute -bottom-6 -left-6 w-32 h-32 opacity-5 text-red-500 pointer-events-none group-hover:opacity-10 transition-opacity" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-2 text-white">In Crisis?</h3>
                    <p className="text-red-300 font-medium max-w-sm text-xs leading-relaxed italic">Initiate a priority distress signal to regional dispatch teams.</p>
                  </div>
                  <button className="bg-red-600 text-white px-8 py-3.5 rounded-xl font-black italic uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition active:scale-95 flex items-center gap-3 border border-red-400/50 group-hover:bg-red-500 whitespace-nowrap z-10 shrink-0">
                     <PhoneCall size={18} className="group-hover:animate-bounce" /> 911-000
                  </button>
               </div>

               <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 flex flex-col justify-center items-center text-center italic shadow-lg">
                  <ShieldCheck size={36} className="text-emerald-500 mb-4" />
                  <h4 className="text-sm font-black uppercase mb-1 tracking-tighter text-slate-200">Certified Link</h4>
                  <p className="text-slate-500 font-medium text-[9px] leading-relaxed">
                     Protocol v.4.0 Encrypted.
                  </p>
               </div>
            </div>
         </main>
      </div>
   );
};

export default EmergencyPage;
