import { Truck, Map, User, CheckCircle2, AlertCircle } from 'lucide-react';

const mockFleet = [
  { id: 'A-42', plate: 'GH-420-22', type: 'Advanced Life Support', crew: 'Paramedic Kofi, Dr. Ama', location: 'Osu (Accra)', status: 'Active (Mission)', fuel: '82%', distance: '1.2km from incident' },
  { id: 'A-18', plate: 'GH-181-22', type: 'Basic Life Support', crew: 'Paramedic Seth, Dr. Mary', location: 'Legon Express', status: 'Active (Transit)', fuel: '65%', distance: '3.4km from incident' },
  { id: 'A-07', plate: 'GH-070-22', type: 'Advanced Life Support', crew: 'Paramedic Joe, Dr. Rose', location: 'East Legon (Base)', status: 'Available', fuel: '95%', distance: 'N/A' },
  { id: 'A-11', plate: 'GH-110-22', type: 'Basic Life Support', crew: 'Paramedic Ben, Dr. Sarah', location: 'Dansoman (Base)', status: 'Maintenance', fuel: '40%', distance: 'N/A' },
];

const DispatchPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dispatch & Fleet Management</h2>
          <p className="text-slate-500 mt-1">Real-time ambulance logistics and coordination.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition flex items-center gap-2">
            <Truck size={20} /> Deploy New Squad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Fleet', value: '124', icon: <Truck />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Mission', value: '42', icon: <AlertCircle />, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Available Standby', value: '68', icon: <CheckCircle2 />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Out of Service', value: '14', icon: <AlertCircle />, color: 'text-slate-400', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Map size={20} className="text-blue-600" /> Nearby Hubs
             </h3>
             <div className="space-y-3">
               {[
                 { name: 'Accra North Hub', active: 12, standby: 5 },
                 { name: 'Tema Central Hub', active: 8, standby: 2 },
                 { name: 'Kumasi Regional', active: 22, standby: 4 }
               ].map((hub, i) => (
                 <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center hover:border-blue-200 transition">
                   <span className="font-bold text-sm text-slate-700">{hub.name}</span>
                   <div className="flex gap-2 text-[10px] font-black uppercase">
                     <span className="text-red-600">Active: {hub.active}</span>
                     <span className="text-emerald-600">Standby: {hub.standby}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 tracking-tight">Active Unit Monitoring</h3>
            <div className="flex gap-2">
               <button className="p-1 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50">Refresh</button>
            </div>
          </div>
          <div className="divide-y divide-slate-50 overflow-auto max-h-[500px]">
            {mockFleet.map((unit) => (
              <div key={unit.id} className="p-6 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className={`p-3 rounded-xl ${
                      unit.status.includes('Active') ? 'bg-red-50 text-red-600' : 
                      unit.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-slate-800 leading-tight">Unit {unit.id} <span className="text-sm font-normal text-slate-400 ml-2">{unit.plate}</span></h4>
                      <p className="text-sm text-blue-600 font-bold">{unit.type}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                      unit.status.includes('Active') ? 'bg-red-100 text-red-700' : 
                      unit.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                    {unit.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Crew</span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1"><User size={12} /> {unit.crew}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Location</span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1"><Map size={12} /> {unit.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fuel Level</span>
                    <span className="text-xs font-bold text-slate-800">{unit.fuel}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mission Target</span>
                    <span className="text-xs font-bold text-red-600">{unit.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchPage;
