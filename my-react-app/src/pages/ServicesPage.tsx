import { Link } from 'react-router-dom';
import { Building2, Car, Pill, ArrowRight, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const services = [
    {
      title: 'Hospitals',
      description: 'Find and connect with top-rated partner hospitals across our network for premium healthcare services.',
      icon: <Building2 size={48} strokeWidth={1.5} />,
      path: '/hospitals',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      hoverColor: 'group-hover:bg-blue-600',
    },
    {
      title: 'Ambulance',
      description: 'Request rapid emergency medical response and track ambulance dispatch in real-time.',
      icon: <Car size={48} strokeWidth={1.5} />,
      path: '/ambulance',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
      hoverColor: 'group-hover:bg-red-600',
    },
    {
      title: 'Pharmacy',
      description: 'Locate nearby pharmacies, verify medication availability, and get essential drugs quickly.',
      icon: <Pill size={48} strokeWidth={1.5} />,
      path: '/pharmacy',
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      hoverColor: 'group-hover:bg-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <header className="bg-slate-900 pt-20 pb-32 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <Grid size={600} className="absolute -right-20 -bottom-20" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-slate-300 font-bold text-sm mb-6 backdrop-blur-sm border border-white/10"
          >
            <Grid size={16} /> EHMS Services
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6"
          >
            Our Core <span className="text-blue-400">Services</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-slate-300 font-medium mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Access a comprehensive network of medical services designed to provide rapid, reliable healthcare when you need it most.
          </motion.p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 -mt-20 relative z-20">
         <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 + index * 0.1 }}
                 key={service.title} 
               >
                 <Link 
                   to={service.path}
                   className="block h-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:-translate-y-2 transition duration-500"
                 >
                    <div className={`h-32 ${service.lightColor} relative overflow-hidden transition-colors duration-500`}>
                       <div className={`absolute -right-6 -bottom-6 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition duration-500 ${service.textColor}`}>
                         {service.icon}
                       </div>
                    </div>
                    <div className="p-8 md:p-10 -mt-16 flex flex-col h-[calc(100%-8rem)]">
                       <div className={`w-20 h-20 rounded-2xl ${service.color} text-white flex items-center justify-center shadow-lg mb-8 transform -rotate-3 group-hover:rotate-0 transition duration-500`}>
                         {service.icon}
                       </div>
                       
                       <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 mb-4 group-hover:text-slate-900 transition flex items-center gap-2">
                         {service.title}
                       </h3>
                       
                       <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-grow">
                         {service.description}
                       </p>
                       
                       <div className="mt-auto flex items-center text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-800 transition">
                         Explore {service.title}
                         <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition duration-500" />
                       </div>
                    </div>
                 </Link>
               </motion.div>
            ))}
         </div>
      </main>
    </div>
  );
};

export default ServicesPage;
