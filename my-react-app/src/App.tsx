import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Home, PhoneCall, Building2, Car, Pill, Info, Activity } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import DonatePage from './pages/DonatePage';
import EmergencyPage from './pages/EmergencyPage';
import HospitalsPage from './pages/HospitalsPage';
import AmbulancePage from './pages/AmbulancePage';
import PharmacyPage from './pages/PharmacyPage';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function Navbar() {
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Auto-close menu when navigating
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Emergencies', path: '/emergencies', icon: <PhoneCall size={20} className="text-red-500 animate-pulse" />, color: 'text-red-600' },
    { name: 'Hospitals', path: '/hospitals', icon: <Building2 size={20} /> },
    { name: 'Ambulance', path: '/ambulance', icon: <Car size={20} /> },
    { name: 'Pharmacy', path: '/pharmacy', icon: <Pill size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition">
            <Activity className="text-white" size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic flex">
            <span className="text-blue-600">E</span>
            <span className="text-red-600">HM</span>
            <span className="text-blue-600">S</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-colors ${location.pathname === item.path
                  ? (item.color || 'text-blue-600')
                  : 'text-slate-500 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-600'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right + Mobile Hamburger */}
        <div className="flex gap-4 items-center">
          <Link to="/donate" className="hidden sm:block bg-blue-50 text-blue-700 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-100 transition border border-blue-100 italic">
            Donate Life
          </Link>
          {session ? (
            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-lg hover:scale-105 transition">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.user.email}`} alt="Avatar" />
            </Link>
          ) : (
            <Link to="/login" className="hidden lg:block bg-blue-900 text-white px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition shadow-xl shadow-blue-900/20 italic">
              Log In
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-xl hover:bg-slate-100 transition p-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Panel */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition ${
                location.pathname === item.path
                  ? 'bg-blue-50 ' + (item.color || 'text-blue-600')
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
          <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-3">
            <Link to="/donate" className="bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-100 transition border border-blue-100 italic text-center">
              Donate Life
            </Link>
            {session ? (
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 font-black text-xs uppercase tracking-widest text-slate-600 transition">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${session.user.email}`} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-blue-600" />
                My Profile
              </Link>
            ) : (
              <Link to="/login" className="bg-blue-900 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition italic text-center">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-center" richColors />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/ambulance" element={<AmbulancePage />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />
            <Route path="/emergencies" element={<EmergencyPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <footer className="bg-blue-900 text-blue-100 py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                <div className="bg-white p-1 rounded-lg">
                  <Activity className="text-blue-900" size={20} />
                </div>
                <span className="font-black text-xl text-white tracking-widest uppercase italic border-b border-white/20">EHMS PLATFORM</span>
              </div>
              <p className="text-sm opacity-70 leading-relaxed font-black uppercase italic tracking-tighter">Digitalizing emergency healthcare across the continent for a safer tomorrow.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:col-span-3 italic font-black text-xs uppercase tracking-widest">
              <div className="space-y-4">
                <h4 className="text-blue-300">Portals</h4>
                <p className="hover:text-white cursor-pointer transition">Admin Command</p>
                <p className="hover:text-white cursor-pointer transition">Partner Hub</p>
                <p className="hover:text-white cursor-pointer transition">Citizen Portal</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-blue-300">Security</h4>
                <p className="hover:text-white cursor-pointer transition">Encrypted Link</p>
                <p className="hover:text-white cursor-pointer transition">Protocol v4.0</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
