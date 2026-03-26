import { Pill, AlertCircle, Search, Filter, ShoppingBag, Clock, MapPin, ShieldCheck, Activity, User, Phone } from 'lucide-react';

const PharmacyDashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 p-4 md:p-8">
      
      {/* Inventory & Stock Header */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600 opacity-10 pointer-events-none">
           <Activity className="absolute -right-10 -bottom-10 w-64 h-64" />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black italic tracking-tighter mb-1">Regional Inventory Node</h3>
          <p className="text-emerald-400 font-bold uppercase text-xs tracking-[0.3em] flex items-center gap-2">
             <ShieldCheck size={16} /> Global Supply Chain Active
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button className="bg-emerald-600 border-b-4 border-emerald-800 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition active:border-b-0 active:translate-y-1">
             Sync Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incoming Drug Requests (NEW) */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-black text-slate-800 uppercase italic tracking-tight flex items-center gap-3">
                    <Clock className="text-blue-500" /> Incoming Medicine Requests
                 </h3>
                 <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase animate-pulse">3 New</span>
              </div>
              
              <div className="divide-y divide-slate-100">
                 {[
                   { requester: 'General Hospital ICU', item: 'Adrenaline (0.5mg)', qty: 50, urgency: 'CRITICAL', status: 'Pending Review' },
                   { requester: 'Ambulance Unit A-2', item: 'Metoprolol (Target)', qty: 10, urgency: 'HIGH', status: 'En Route' },
                   { requester: 'St. Nicholas ER', item: 'Morphine Sulfate', qty: 25, urgency: 'HIGH', status: 'Ready for Pickup' }
                 ].map((req, i) => (
                   <div key={i} className="p-8 hover:bg-slate-50 transition cursor-pointer group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex gap-4 items-center">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                               <ShoppingBag size={24} />
                            </div>
                            <div>
                               <p className="font-black text-slate-800">{req.requester}</p>
                               <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{req.item} (x{req.qty})</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded text-[10px] font-black uppercase italic ${
                               req.urgency === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                            }`}>{req.urgency}</span>
                            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase italic hover:bg-black transition">Process</button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Inventory Management Table / List */}
           <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-black text-slate-800 uppercase italic tracking-tight">Drug Inventory Control</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 italic" />
                 </div>
              </div>
              
              <div className="divide-y divide-slate-50">
                 {[
                   { name: 'Paracetamol (500mg)', brand: 'P-Tab', stock: 4200, status: 'High' },
                   { name: 'Amoxicillin (250mg)', brand: 'Amox-G', stock: 1120, status: 'Moderate' },
                   { name: 'Hydrochlorothiazide', brand: 'HCTZ-12', stock: 890, status: 'Moderate' },
                   { name: 'Metformin', brand: 'GlucoBane', stock: 4500, status: 'High' }
                 ].map((item, i) => (
                   <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer group">
                      <div className="flex gap-4 items-center">
                         <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition"><Pill size={24} /></div>
                         <div>
                            <p className="font-black text-slate-800 tracking-tight">{item.name}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.brand}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-8 text-right">
                         <div>
                            <p className="text-2xl font-black text-slate-800 tracking-tighter">{item.stock}</p>
                            <p className="text-[10px] font-black uppercase text-emerald-600">Stock OK</p>
                         </div>
                         <button className="text-slate-400 p-2 hover:bg-slate-200 rounded-xl transition"><Filter size={20} /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Side Controls: Settings & Stats (NEW) */}
        <div className="lg:col-span-1 space-y-8">
           {/* Facility Settings */}
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-black text-slate-800 uppercase italic tracking-tight mb-6 flex items-center gap-3">
                 <ShieldCheck className="text-emerald-500" /> Facility Settings
              </h3>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Service Status</label>
                    <div className="flex gap-2">
                       <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase italic">Online</button>
                       <button className="flex-1 py-3 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase italic">Offline</button>
                    </div>
                 </div>

                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                       <MapPin size={18} className="text-blue-500" />
                       <span className="text-xs font-black text-slate-700 uppercase italic">Facility Location</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium italic mb-2">Accra Regional Hub, Plot 22, Independence Ave.</p>
                    <button className="text-blue-600 font-black text-[10px] uppercase hover:underline">Update GPS Coordinates</button>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                       <span className="font-bold text-slate-600 italic flex items-center gap-2"><Phone size={14} /> Hotline Status</span>
                       <span className="text-emerald-500 font-black uppercase">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                       <span className="font-bold text-slate-600 italic flex items-center gap-2"><User size={14} /> Duty Pharmacist</span>
                       <span className="text-slate-800 font-black uppercase tracking-tight">Dr. Amaka O.</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Critical Stock Alert */}
           <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
              <div className="flex items-center gap-2 mb-6">
                 <AlertCircle className="text-red-600" size={24} />
                 <h4 className="text-lg font-black text-red-800 uppercase tracking-tight italic">Low Stock Alert</h4>
              </div>
              <p className="text-red-700 font-bold text-xs mb-6 italic">Immediate restock required for critical life-saving medications.</p>
              
              <div className="space-y-3">
                 {[
                   { name: 'Insulin (Rapid Acting)', stock: 4 },
                   { name: 'Aspirin (300mg)', stock: 2 }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-white/80 rounded-2xl border border-red-100 shadow-sm">
                      <span className="font-black text-xs text-red-900 italic">{item.name}</span>
                      <span className="text-[10px] font-black bg-red-600 text-white px-3 py-1 rounded-full uppercase italic">Critical ({item.stock})</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
