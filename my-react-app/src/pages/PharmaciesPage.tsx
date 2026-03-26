import { Pill, Search, PackageOpen } from 'lucide-react';

const mockPharmacies = [
  { id: 1, name: 'MedPlus Pharmacy', distance: '0.8 km', stock: '95% in stock', open: true },
  { id: 2, name: 'HealthPlus Pharmacy', distance: '2.1 km', stock: '88% in stock', open: true },
  { id: 3, name: 'Alpha Pharmacy', distance: '4.5 km', stock: '72% in stock', open: false },
];

const PharmaciesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pharmacies & Meds</h2>
          <p className="text-slate-500 mt-1 text-lg">Search for critical medications and nearby rapid-delivery pharmacies.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex items-center gap-3">
        <Search className="text-slate-400 ml-3" />
        <input 
          type="text" 
          placeholder="Search for medication (e.g., Insulin, Epipen)..." 
          className="w-full bg-transparent border-none focus:ring-0 text-slate-700 py-3"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 font-medium transition">Check Stock</button>
      </div>

      <div className="space-y-4">
        {mockPharmacies.map(pharmacy => (
          <div key={pharmacy.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition">
            <div className="flex gap-4 items-center">
              <div className={`p-4 rounded-full ${pharmacy.open ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                <Pill size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                  {pharmacy.name}
                  <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full ${pharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {pharmacy.open ? 'Open Now' : 'Closed'}
                  </span>
                </h3>
                <p className="text-slate-500 font-medium">{pharmacy.distance} away • Walk-in & Delivery</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center bg-slate-50 rounded-xl p-3 px-6 border border-slate-100">
                <PackageOpen size={20} className="mx-auto text-slate-400 mb-1" />
                <p className="text-sm font-bold text-slate-700">{pharmacy.stock}</p>
              </div>
              <button 
                disabled={!pharmacy.open}
                className={`py-3 px-8 rounded-xl font-bold transition shadow-sm ${
                  pharmacy.open 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Order Delivery
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmaciesPage;
