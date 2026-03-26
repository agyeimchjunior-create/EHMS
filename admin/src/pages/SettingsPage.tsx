import { Settings, ShieldCheck, Mail, Bell, Lock, Globe, Database, Smartphone, Save, AlertTriangle } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
             <Settings className="text-blue-600" size={32} /> System Configuration
          </h2>
          <p className="text-slate-500 mt-1 uppercase text-xs font-black tracking-widest text-blue-600">Global Admin Environment Settings</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl transition shadow-blue-500/20">
          <Save size={20} /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
           {[
             { name: 'Security & Access', icon: <Lock size={18} />, active: true },
             { name: 'Communication', icon: <Mail size={18} />, active: false },
             { name: 'Notifications', icon: <Bell size={18} />, active: false },
             { name: 'Geofencing Settings', icon: <Globe size={18} />, active: false },
             { name: 'Data Management', icon: <Database size={18} />, active: false },
             { name: 'App Settings', icon: <Smartphone size={18} />, active: false },
           ].map((item, i) => (
             <div key={i} className={`p-3 px-4 rounded-xl flex items-center gap-3 font-bold text-sm cursor-pointer transition ${
               item.active ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
             }`}>
               {item.icon} {item.name}
             </div>
           ))}
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <ShieldCheck size={24} className="text-blue-600" /> Administrative Security Controls
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 mt-1">Require multi-factor authentication for all admin accounts.</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800">Automatic Emergency Dispatch</p>
                    <p className="text-xs text-slate-500 mt-1">Enable AI-based dispatching of nearest ambulance without manual approval.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                   <p className="font-bold text-slate-800 text-sm">Emergency Override Password</p>
                   <input 
                    type="password" 
                    placeholder="Enter new master password" 
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono tracking-widest"
                   />
                   <p className="text-[10px] text-slate-400">Used for manual override of intelligent dispatching during center-wide failure events.</p>
                </div>
              </div>
           </div>

           <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
              <h4 className="text-red-700 font-black text-lg flex items-center gap-2 mb-4">
                <AlertTriangle size={24} /> Danger Zone Control Panel
              </h4>
              <p className="text-sm text-red-600/70 mb-6 font-medium">Critical system actions below. These trigger global state changes across the EHMS network.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="bg-red-600 text-white font-black text-xs uppercase px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition">Factory Reset Dispatcher</button>
                 <button className="bg-white border border-red-200 text-red-600 font-black text-xs uppercase px-6 py-3 rounded-xl hover:bg-red-50 transition">Suspend Global API Access</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
