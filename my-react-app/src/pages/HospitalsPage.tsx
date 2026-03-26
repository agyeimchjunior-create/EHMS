import { Building2, Search, MapPin, Phone, Star, ShieldCheck, HeartPulse, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const HospitalsPage = () => {
  const hospitals = [
    { name: 'St. Nicholas Hospital', location: 'Accra Central', type: 'Private Tertiary', rating: 4.8, beds: '24 Available', specialty: 'Trauma & Cardiac' },
    { name: 'Rapha Medical Center', location: 'Lagos Island', type: 'Specialist Clinic', rating: 4.6, beds: '12 Available', specialty: 'General Surgery' },
    { name: 'City Rescue Center', location: 'Tema Port', type: 'Public General', rating: 4.2, beds: '40 Available', specialty: 'Emergency Care' },
    { name: 'Hope Clinic', location: 'East Legon', type: 'Private General', rating: 4.9, beds: '5 Available', specialty: 'Maternity' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <header className="bg-blue-900 pt-20 pb-32 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <Building2 size={600} className="absolute -right-20 -bottom-20" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Partner Hospitals</h1>
          <p className="text-blue-200 font-bold mb-10 text-lg">Integrated Medical Network Coverage Across West Africa.</p>
          
          <div className="max-w-2xl mx-auto relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" size={24} />
             <input 
               type="text" 
               placeholder="Search by facility name, region, or specialty..." 
               className="w-full bg-white p-6 pl-16 rounded-[2rem] shadow-2xl text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/20 transition font-medium italic"
             />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 -mt-20 relative z-20">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hospitals.map((h, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={i} 
                 className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 overflow-hidden group hover:shadow-2xl transition duration-500 flex flex-col h-full"
               >
                  <div className="h-48 bg-slate-800 relative overflow-hidden">
                     <img 
                       src={`https://images.unsplash.com/photo-1586773860418-d3b9a8ec817f?auto=format&fit=crop&q=80&w=800&n=${i}`} 
                       alt={h.name} 
                       className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-1000"
                     />
                     <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {h.beds}
                     </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="font-black text-xl text-slate-800 italic uppercase tracking-tighter group-hover:text-blue-600 transition">{h.name}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                              <MapPin size={10} className="text-blue-500" /> {h.location}
                           </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 italic text-xs">
                           <Star size={12} fill="currentColor" /> {h.rating}
                        </div>
                     </div>

                     <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition">
                           <div className="bg-blue-600 text-white p-2 rounded-xl"><HeartPulse size={16} /></div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Specialty</p>
                              <p className="text-xs font-black text-slate-700 italic uppercase tracking-tight">{h.specialty}</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto space-y-3">
                        <button className="w-full bg-blue-900 border-b-4 border-blue-950 text-white font-black py-3 rounded-2xl hover:bg-blue-800 transition active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-xs italic">
                           <Phone size={14} /> Contact Facility
                        </button>
                        <button className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-black py-3 rounded-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 uppercase tracking-widest text-xs italic">
                           <ExternalLink size={14} /> Full Profile
                        </button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Assurance Card */}
         <div className="mt-24 bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-200 flex flex-col md:row items-center gap-12 font-sans italic">
            <div className="p-8 bg-blue-50 text-blue-600 rounded-[2.5rem] shadow-inner shrink-0 scale-125">
               <ShieldCheck size={64} strokeWidth={1.5} />
            </div>
            <div>
               <h3 className="text-3xl font-black italic uppercase italic tracking-tighter text-slate-800 mb-4">Quality Verification Protocol</h3>
               <p className="text-slate-500 font-medium leading-relaxed italic">
                  All listed facilities undergo a strict 120-point clinical audit to ensure compliance with EHMS global emergency care standards. Your safety is our mandate.
               </p>
            </div>
         </div>
      </main>
    </div>
  );
};

export default HospitalsPage;
