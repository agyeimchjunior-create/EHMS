import { HeartPulse, Truck, Map, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">System Overview</h2>
          <p className="text-slate-500 mt-1">Real-time stats and active emergencies.</p>
        </div>
        <button className="bg-red-100 text-red-700 hover:bg-red-200 transition font-bold py-2 px-6 rounded-lg flex items-center gap-2 border border-red-200">
          <ShieldAlert size={20} /> Override Dispatch
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Emergencies', icon: <HeartPulse />, value: '14', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Available Ambulances', icon: <Truck />, value: '82', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Response Time', icon: <Clock />, value: '6m 12s', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Resolved (Today)', icon: <CheckCircle />, value: '1,490', color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
              <p className={`text-4xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Emergency Feed */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[600px] overflow-auto">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Incidents Feed
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 hover:border-blue-300 transition cursor-pointer">
                <div className="mt-1 text-red-500">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-800">Critical Priority</p>
                    <span className="text-xs text-slate-400 font-medium">Just now</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Car crash reported at Lekki Toll Gate</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded font-bold uppercase">Trauma</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">Ambulance #42 Dispatched</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Map Tracking */}
        <div className="lg:col-span-2 bg-slate-200 rounded-2xl border border-slate-300 relative shadow-inner h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center pointer-events-none">
            <Map size={48} className="text-slate-400 mb-4" />
            <span className="text-slate-500 font-medium text-lg">System-wide Live Geospatial View</span>
            <p className="text-sm text-slate-400 max-w-sm text-center mt-2">Displaying all active ambulances, hospitals, and emergency requests dynamically.</p>
          </div>
          {/* Simulated map markers */}
          <div className="absolute top-1/4 left-1/3 bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
            <Truck size={16} />
          </div>
          <div className="absolute bottom-1/3 right-1/4 bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-white animate-pulse">
            <HeartPulse size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
