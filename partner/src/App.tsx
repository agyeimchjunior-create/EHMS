import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, CalendarRange, MapPin, Car, Pill, Bike } from 'lucide-react';
import HospitalDashboard from './pages/HospitalDashboard';
import AmbulanceDashboard from './pages/AmbulanceDashboard';
import PharmacyDashboard from './pages/PharmacyDashboard';
import RiderDashboard from './pages/RiderDashboard';
import AuthPage from './pages/AuthPage';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Toaster } from 'sonner';

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { name: 'Hospital Overview', path: '/hospitals', icon: <LayoutDashboard size={20} /> },
    { name: 'Patient Requests', path: '/requests', icon: <Activity size={20} /> },
    { name: 'Staff Management', path: '/staff', icon: <Users size={20} /> },
    { name: 'Capacity Planner', path: '/capacity', icon: <CalendarRange size={20} /> },
    { name: 'Facility Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-emerald-900 text-emerald-100 min-h-screen fixed left-0 top-0">
      <div className="h-20 flex flex-col justify-center px-6 border-b border-emerald-800 bg-emerald-950">
        <span className="font-black text-xl text-white tracking-widest flex items-center gap-2 uppercase italic">
          <span className="text-blue-400">E</span>
          <span className="text-red-400">HM</span>
          <span className="text-blue-400">S</span>
        </span>
        <span className="text-xs text-emerald-300 font-bold uppercase mt-1 tracking-wider italic opacity-80">Partner Portal</span>
      </div>
      <nav className="p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-colors ${
              location.pathname === item.path 
                ? 'bg-emerald-600 text-white shadow-md italic' 
                : 'hover:bg-emerald-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function AppContent() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  const isAuthPage = location.pathname === '/login';

  if (!session && !isAuthPage) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Toaster position="top-right" richColors />
      {!isAuthPage && <Sidebar />}
      <main className={`flex-1 flex flex-col min-h-screen ${!isAuthPage ? 'ml-64' : ''}`}>
        {!isAuthPage && (
          <header className="h-20 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between px-8 z-10 sticky top-0 gap-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter truncate leading-tight uppercase italic">{session?.user?.email?.split('@')[0]} Regional Hub</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5 italic flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 Status: Operational & Accepting Emergencies
              </p>
            </div>
            
            {/* Facility Switcher */}
            <div className="hidden lg:flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1">
               {[
                 { name: 'Hospitals', path: '/hospitals', icon: <MapPin size={14} /> },
                 { name: 'Ambulances', path: '/ambulances', icon: <Car size={14} /> },
                 { name: 'Pharmacies', path: '/pharmacies', icon: <Pill size={14} /> },
                 { name: 'Riders', path: '/riders', icon: <Bike size={14} /> }
               ].map((fac) => (
                 <Link 
                   key={fac.name} 
                   to={fac.path} 
                   className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all duration-300 italic ${
                     location.pathname === fac.path || (location.pathname === '/' && fac.path === '/hospitals')
                       ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' 
                       : 'text-slate-500 hover:bg-white hover:text-slate-800 border border-transparent hover:border-slate-200'
                   }`}
                 >
                   {fac.icon} {fac.name}
                 </Link>
               ))}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
              <button 
                onClick={() => {
                   supabase.auth.signOut();
                   localStorage.removeItem('ehms_partner_session');
                   navigate('/login');
                }}
                className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition italic"
              >
                Sign Out
              </button>
              <button className="bg-emerald-600 text-white px-6 py-2 font-black rounded-xl hover:bg-emerald-500 transition shadow-xl text-[10px] uppercase tracking-widest italic border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1">
                Update Capacity
              </button>
            </div>
          </header>
        )}
        <div className={!isAuthPage ? "p-8 flex-1 overflow-auto" : "flex-1"}>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/hospitals" element={<HospitalDashboard />} />
            <Route path="/ambulances" element={<AmbulanceDashboard />} />
            <Route path="/pharmacies" element={<PharmacyDashboard />} />
            <Route path="/riders" element={<RiderDashboard />} />
            <Route path="/" element={<Navigate to="/hospitals" replace />} />
            <Route path="*" element={<div className="text-slate-500 flex items-center justify-center h-full font-bold uppercase tracking-widest italic text-xs">404: Partner Module Not Found</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
