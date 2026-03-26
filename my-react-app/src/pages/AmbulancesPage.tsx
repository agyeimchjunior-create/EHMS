import { Map, Zap, CircleDot, Truck } from 'lucide-react';
import { useState } from 'react';

const AmbulancesPage = () => {
  const [requested, setRequested] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ambulance Service</h2>
          <p className="text-slate-500 mt-1 text-lg">Live tracking of nearest emergency response vehicles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-200 rounded-2xl h-[500px] overflow-hidden relative shadow-inner">
          {/* Mock Map View */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-100 bg-opacity-70 backdrop-blur-sm z-10 rounded-2xl">
            <Map size={48} className="text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">Live Map Tracking</h3>
            <p className="text-slate-500 text-center max-w-sm mt-2">
              Detecting your location to pinpoint exactly where you are and dispatching the nearest ambulance dynamically.
            </p>
          </div>
          <div className="absolute inset-0 border border-slate-200 rounded-2xl"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-[500px]">
          <div>
            <div className="bg-blue-50 text-blue-600 rounded-xl p-4 inline-block mb-4">
              <Truck size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">Request Ambulance</h3>
            <p className="text-slate-500 text-sm mb-6">Advanced dispatch systems instantly alert paramedics with your precise GPS coordinates.</p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 flex gap-4 border border-slate-100">
                <CircleDot className="text-green-500 mt-1" size={18} />
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pickup Location</p>
                  <p className="text-slate-800 font-semibold mt-1">14 Medical Way, Victoria Island</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex gap-4 border border-slate-100">
                <CircleDot className="text-red-500 mt-1" size={18} />
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Destination</p>
                  <p className="text-slate-800 font-semibold mt-1">Nearest Hospital (Auto-detect)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 bg-opacity-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-blue-800">Available Units</p>
                <p className="text-xs text-blue-600 font-medium">3 nearby</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-800">Est. Time</p>
                <p className="text-2xl font-black text-blue-600">6 min</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setRequested(true)}
            className={`w-full py-4 px-6 rounded-xl font-black text-lg text-white shadow-lg transition duration-300 flex items-center justify-center gap-2 ${
              requested ? 'bg-slate-800' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {requested ? 'Assigned & En Route' : <><Zap size={22} className="fill-current" /> Auto-Dispatch</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmbulancesPage;
