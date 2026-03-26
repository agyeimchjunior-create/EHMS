import { Car, Activity, User, Fuel, AlertCircle, CheckCircle2 } from 'lucide-react';

const AmbulanceDashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Fleet Overview */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Car className="text-red-500" />
          Active Fleet Monitoring
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
             <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-black text-red-800 uppercase tracking-widest">Unit A-42</span>
                <span className="bg-red-200 text-red-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">On Mission</span>
             </div>
             <p className="text-3xl font-black text-red-900 mb-1">Trauma Response</p>
             <p className="text-sm text-red-700 font-medium">ETA: 4 mins - St. Nicholas</p>
             <div className="mt-6 flex items-center gap-4 text-xs font-bold text-red-800">
                <div className="flex items-center gap-1"><User size={14} /> Crew: 3</div>
                <div className="flex items-center gap-1"><Fuel size={14} /> 62%</div>
             </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
             <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-black text-blue-800 uppercase tracking-widest">Unit A-11</span>
                <span className="bg-blue-200 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase">In Transit</span>
             </div>
             <p className="text-3xl font-black text-blue-900 mb-1">Osu Central</p>
             <p className="text-sm text-blue-700 font-medium">Status: Returning to base</p>
             <div className="mt-6 flex items-center gap-4 text-xs font-bold text-blue-800">
                <div className="flex items-center gap-1"><User size={14} /> Crew: 2</div>
                <div className="flex items-center gap-1"><Fuel size={14} /> 89%</div>
             </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-center items-center text-center">
             <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
             <h4 className="text-xl font-black text-emerald-900">3 Units Standby</h4>
             <p className="text-sm text-emerald-700">Available for immediate dispatch</p>
          </div>
        </div>
      </div>

      {/* Dispatch Feed */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-500" />
              Live Central Dispatch Requests
           </h3>
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">System Online</span>
        </div>
        <div className="divide-y divide-slate-100">
           {[
             { target: 'Legon Bypass', type: 'MVA (Multi-Vehicle)', priority: 'Critical', time: 'Just now' },
             { target: 'East Legon Hub', type: 'Maternity Case', priority: 'High', time: '12 mins ago' }
           ].map((req, i) => (
             <div key={i} className="p-6 flex justify-between items-center hover:bg-slate-50 transition">
                <div className="flex gap-4 items-center">
                   <div className="p-3 bg-red-100 text-red-600 rounded-xl"><Activity size={24} /></div>
                   <div>
                      <p className="font-black text-slate-800">{req.target}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase">{req.type}</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <span className="text-[10px] font-black uppercase bg-orange-100 text-orange-700 px-2 py-1 rounded">Priority: {req.priority}</span>
                   <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">Accept Mission</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;
