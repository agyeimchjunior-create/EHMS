import { Map, Zap, CircleDot, Truck } from 'lucide-react';
import { useState } from 'react';

const AmbulancesPage = () => {
  const [requested, setRequested] = useState(false);

  return (
    <div className="bg-blue-800 min-h-screen w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-1">Ambulance Service</h2>
            <p className="text-blue-200 font-bold text-lg italic uppercase tracking-widest text-xs opacity-80">Live tracking of nearest emergency response vehicles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] h-[500px] overflow-hidden relative shadow-2xl border border-white/5">
            {/* Mock Map View */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-blue-900/40 backdrop-blur-xl z-20 rounded-[2.5rem]">
              <div className="p-10 bg-blue-600 rounded-full mb-8 shadow-[0_0_50px_rgba(37,99,235,0.4)] animate-pulse">
                 <Map size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">Live Dispatch Grid</h3>
              <p className="text-blue-200 text-center max-w-sm mt-3 font-medium italic">
                Detecting GPS coordinates for immediate emergency asset allocation.
              </p>
            </div>
            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 z-10 opacity-20 bg-blue-500 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col justify-between h-[500px] border border-white">
            <div>
              <div className="bg-blue-600 text-white rounded-2xl p-4 inline-block mb-6 shadow-xl shadow-blue-600/20">
                <Truck size={32} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">Initialize</h3>
              <p className="text-slate-500 text-xs font-bold italic tracking-tight mb-8">Tap dispatch to alert nearby paramedics.</p>
 
              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 border border-slate-100 shadow-sm">
                  <CircleDot className="text-emerald-500 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Target Location</p>
                    <p className="text-slate-900 font-black italic tracking-tight">14 Medical Way, VI</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 border border-slate-100 shadow-sm">
                  <CircleDot className="text-red-500 mt-1" size={18} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Facility</p>
                    <p className="text-slate-900 font-black italic tracking-tight">N-Point Allocation</p>
                  </div>
                </div>
              </div>
 
              <div className="bg-blue-600 p-5 rounded-2xl flex items-center justify-between shadow-xl">
                 <div>
                   <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest opacity-60">Status</p>
                   <p className="text-lg font-black text-white italic tracking-tight">3 Ready</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest opacity-60">ETA</p>
                   <p className="text-3xl font-black text-white italic tracking-tighter">6:00</p>
                 </div>
              </div>
            </div>
 
            <button
              onClick={() => setRequested(true)}
              className={`w-full py-5 rounded-2xl font-black text-lg italic uppercase tracking-widest transition duration-500 flex items-center justify-center gap-3 border-4 border-white ${
                requested 
                  ? 'bg-slate-900 text-white border-slate-700' 
                  : 'bg-blue-600 text-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-[1.03]'
              }`}
            >
              {requested ? 'En Route' : <><Zap size={22} className="fill-current" /> Auto-Dispatch</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmbulancesPage;
