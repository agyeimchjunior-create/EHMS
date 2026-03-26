import { Pill, AlertCircle, Search, Filter, ShoppingBag } from 'lucide-react';

const PharmacyDashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Inventory & Stock Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Pill className="text-emerald-500" />
            Inventory & Specialized Medicine Status
          </h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Global Supply Chain Monitoring</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition flex items-center gap-2">
            <ShoppingBag size={20} /> Update Global Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Critical Stock Alert */}
        <div className="lg:col-span-1 bg-red-50 p-8 rounded-[2rem] border border-red-100 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-6">
                 <AlertCircle className="text-red-600" size={24} />
                 <h4 className="text-lg font-black text-red-800 uppercase tracking-tight">Critical Shortage</h4>
              </div>
              <p className="text-red-700 font-semibold mb-6">Following items are below 5% stock. Immediate restock required for active partners.</p>
              
              <div className="space-y-3">
                 {[
                   { name: 'Insulin (Rapid Acting)', stock: 4 },
                   { name: 'Asthma Inhaler (Ventolin)', stock: 12 },
                   { name: 'Epinephrine Auto-injectors', stock: 2 }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-white/50 rounded-xl border border-red-100">
                      <span className="font-bold text-sm text-red-900">{item.name}</span>
                      <span className="text-xs font-black bg-red-600 text-white px-2 py-1 rounded">Qty: {item.stock}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Inventory Management Table / List */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
           <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Drug Inventory Control</h3>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="text" placeholder="Search medicines..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
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
    </div>
  );
};

export default PharmacyDashboard;
