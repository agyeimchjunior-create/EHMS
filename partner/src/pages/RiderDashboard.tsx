import { Bike, Navigation, Clock, User, ShieldCheck } from 'lucide-react';

const RiderDashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Rider Status Header */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 pointer-events-none">
           <Navigation className="absolute -right-10 -bottom-10 w-64 h-64" />
        </div>
        <div className="relative z-10 flex gap-6 items-center">
           <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-600/30">
              <Bike size={40} />
           </div>
           <div>
              <h3 className="text-3xl font-black italic tracking-tighter">Ghana Express Response</h3>
              <p className="text-blue-400 font-bold uppercase text-xs tracking-widest mt-1 flex items-center gap-2">
                 <ShieldCheck size={16} /> Verified Logistics Partner
              </p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center px-8">
              <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Active Deliveries</p>
              <p className="text-2xl font-black">12</p>
           </div>
           <div className="bg-emerald-600 p-4 rounded-2xl text-center px-8 font-black uppercase text-xs">
              Go Online
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Delivery Queue */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" /> Critical Transit Log
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-700 font-black px-2 py-1 rounded">Real-time Feed</span>
           </div>
           <div className="divide-y divide-slate-50">
              {[
                { rider: 'Kojo A.', item: 'Oxygen Resupply', destination: 'Korle-Bu', eta: '5 mins', status: 'En Route' },
                { rider: 'Seth M.', item: 'Trauma Kit', destination: 'Labadi Hub', eta: '12 mins', status: 'Assigned' }
              ].map((delivery, i) => (
                <div key={i} className="p-8 hover:bg-slate-50 transition cursor-pointer flex justify-between items-center group">
                   <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                         <User size={24} />
                      </div>
                      <div>
                         <p className="font-black text-slate-800">{delivery.rider}</p>
                         <p className="text-xs font-bold text-blue-600 uppercase mt-1">{delivery.item}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-slate-800 tracking-tight">{delivery.destination}</p>
                      <p className={`text-[10px] font-black uppercase mt-1 ${delivery.status === 'En Route' ? 'text-emerald-500' : 'text-blue-500'}`}>{delivery.status} · {delivery.eta}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Map View Concept */}
        <div className="bg-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center text-slate-400 border border-slate-300 relative shadow-inner overflow-hidden min-h-[400px]">
           <Navigation size={64} className="mb-4 opacity-50" />
           <p className="font-black text-xl italic text-slate-500">Live Logistics Grid</p>
           <p className="text-sm max-w-sm mt-2">Visualizing all bike riders and emergency vans across the Accra Metropolitan Area.</p>
           
           {/* Animated Radar Effect */}
           <div className="absolute inset-0 border-[40px] border-slate-200/50 rounded-full animate-ping pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
