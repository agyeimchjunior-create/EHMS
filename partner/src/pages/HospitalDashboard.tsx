import { BedDouble, HeartPulse, Activity, AlertTriangle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const PartnerDashboard = () => {
  const [beds, setBeds] = useState(45);
  const [icu, setIcu] = useState(12);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Quick Capacity Controls */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="text-emerald-500" />
          Live Capacity Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <BedDouble className="text-blue-600" />
                <span className="font-bold text-blue-800 uppercase text-sm tracking-wider">Ward Beds</span>
              </div>
              <span className="text-4xl font-black text-blue-700">{beds}</span>
            </div>
            <div className="flex justify-between gap-4">
              <button 
                onClick={() => setBeds(b => Math.max(0, b - 1))}
                className="bg-white text-blue-600 font-bold py-2 w-full border border-blue-200 rounded-xl hover:bg-blue-100"
              >- 1</button>
              <button 
                onClick={() => setBeds(b => b + 1)}
                className="bg-blue-600 text-white font-bold py-2 w-full rounded-xl hover:bg-blue-700"
              >+ 1</button>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full flex items-center justify-center pointer-events-none">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2 mt-2"></span>
            </div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <HeartPulse className="text-red-600" />
                <span className="font-bold text-red-800 uppercase text-sm tracking-wider">ICU Beds</span>
              </div>
              <span className="text-4xl font-black text-red-700">{icu}</span>
            </div>
            <div className="flex justify-between gap-4 relative z-10">
              <button 
                onClick={() => setIcu(i => Math.max(0, i - 1))}
                className="bg-white text-red-600 font-bold py-2 w-full border border-red-200 rounded-xl hover:bg-red-100"
              >- 1</button>
              <button 
                onClick={() => setIcu(i => i + 1)}
                className="bg-red-600 text-white font-bold py-2 w-full rounded-xl hover:bg-red-700"
              >+ 1</button>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group hover:scale-[1.02] transition cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 opacity-20 group-hover:opacity-40 transition"></div>
            <AlertTriangle className="text-emerald-400 mb-2 mt-2" size={32} />
            <h4 className="text-xl font-bold tracking-tight z-10">Override Status</h4>
            <p className="text-slate-400 text-sm mt-1 z-10">Temporarily stop new dispatch</p>
          </div>
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Incoming Emergency Requests
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-black animate-pulse">2 Critical</span>
          </h3>
          <button className="text-emerald-600 font-bold text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {[
            { tag: 'Burn Trauma', from: 'Ambulance Unit 4x', eta: '3 mins', severity: 'Critical', bg: 'bg-red-50 text-red-800 border-red-200', btn: 'bg-red-600 hover:bg-red-700' },
            { tag: 'Cardiac Arrest', from: 'Ambulance Unit 1y', eta: '8 mins', severity: 'High', bg: 'bg-orange-50 text-orange-800 border-orange-200', btn: 'bg-orange-600 hover:bg-orange-700' },
          ].map((req, i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${req.bg}`}>
                    {req.severity} Priority
                  </span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {req.tag}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-lg font-bold text-slate-800">{req.from}</p>
                  <p className="text-slate-500 font-medium flex items-center gap-1">
                    ETA: <span className="text-slate-800 font-bold">{req.eta}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="px-6 py-3 font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition">
                  Reject (Redirect)
                </button>
                <button className={`px-8 py-3 font-bold text-white rounded-xl shadow-md transition ${req.btn}`}>
                  Prepare ER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;
