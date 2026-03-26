import { MapPin, Search, Filter } from 'lucide-react';

const mockEmergencies = [
  { id: 'E-1234', type: 'Cardiac Arrest', location: 'Osu, Accra', priority: 'Critical', status: 'In Transit', timeReceived: '5 mins ago', responder: 'Ambulance #42' },
  { id: 'E-1235', type: 'Road Accident', location: 'Legon Mall', priority: 'Critical', status: 'Dispatched', timeReceived: '12 mins ago', responder: 'Ambulance #18' },
  { id: 'E-1236', type: 'Severe Bleeding', location: 'East Legon', priority: 'High', status: 'On Site', timeReceived: '18 mins ago', responder: 'Ambulance #07' },
  { id: 'E-1237', type: 'Difficulty Breathing', location: 'Dansoman', priority: 'Medium', status: 'Pending', timeReceived: '22 mins ago', responder: 'Not Assigned' },
  { id: 'E-1238', type: 'Snake Bite', location: 'Madina', priority: 'High', status: 'In Transit', timeReceived: '25 mins ago', responder: 'Ambulance #29' },
];

const EmergenciesPage = () => {

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Live Emergencies</h2>
          <p className="text-slate-500 mt-1">Real-time monitoring and management of active incidents.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or type..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full"
            />
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-sm transition">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Incident ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type & Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Time Received</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Responder</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockEmergencies.map((emergency) => (
                <tr key={emergency.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">{emergency.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{emergency.type}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <MapPin size={12} /> {emergency.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                      emergency.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      emergency.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {emergency.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${
                         emergency.status === 'Pending' ? 'bg-red-500 animate-pulse' :
                         emergency.status === 'Dispatched' ? 'bg-blue-500' :
                         'bg-emerald-500'
                       }`}></div>
                       <span className="text-sm font-medium text-slate-700">{emergency.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{emergency.timeReceived}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{emergency.responder}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmergenciesPage;
