import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, CalendarRange, MapPin, Car, Pill, Bike, ShoppingBag } from 'lucide-react';
import HospitalDashboard from './pages/HospitalDashboard';
import AmbulanceDashboard from './pages/AmbulanceDashboard';
import PharmacyDashboard from './pages/PharmacyDashboard';
import RiderDashboard from './pages/RiderDashboard';
import AuthPage from './pages/AuthPage';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Toaster } from 'sonner';

const MockModule = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 font-black italic uppercase tracking-[0.2em] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 shadow-inner">
     <div className="p-8 bg-slate-50 rounded-full mb-6 animate-pulse scale-110">
        <Activity size={64} className="opacity-20 text-blue-600" />
     </div>
     <h2 className="text-2xl mb-2 text-slate-800">{name}</h2>
     <p className="text-[10px] text-slate-400 mb-8">System node pending live deployment</p>
     <div className="flex gap-4">
        <div className="h-2 w-12 bg-emerald-500 rounded-full"></div>
        <div className="h-2 w-12 bg-blue-500 rounded-full"></div>
        <div className="h-2 w-12 bg-red-500 rounded-full"></div>
     </div>
  </div>
);

function Sidebar({ isOpen, setIsOpen, session }: { isOpen: boolean, setIsOpen: (val: boolean) => void, session: any }) {
  const location = useLocation();
  const type = session?.type?.toLowerCase();

  const getNavItems = () => {
    const base = [
      { name: 'Facility Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    if (type === 'hospital') return [
      { name: 'Hospital Overview', path: '/hospitals', icon: <LayoutDashboard size={20} /> },
      { name: 'Patient Requests', path: '/requests', icon: <Activity size={20} /> },
      { name: 'Staff Management', path: '/staff', icon: <Users size={20} /> },
      { name: 'Capacity Planner', path: '/capacity', icon: <CalendarRange size={20} /> },
      ...base
    ];
    
    if (type === 'ambulance') return [
       { name: 'Fleet Overview', path: '/ambulances', icon: <Car size={20} /> },
       { name: 'Dispatch Logs', path: '/dispatch', icon: <Activity size={20} /> },
       ...base
    ];

    if (type === 'pharmacy') return [
       { name: 'Inventory Control', path: '/pharmacies', icon: <Pill size={20} /> },
       { name: 'Drug Requests', path: '/requests', icon: <ShoppingBag size={20} /> },
       ...base
    ];

    if (type === 'rider') return [
       { name: 'Logistics Overview', path: '/riders', icon: <Bike size={20} /> },
       { name: 'Transit Map', path: '/map', icon: <MapPin size={20} /> },
       ...base
    ];

    return base;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`w-64 bg-emerald-900 text-emerald-100 min-h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
              onClick={() => setIsOpen(false)}
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
    </>
  );
}

function AppContent() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const loadSession = () => {
    supabase.auth.getSession().then(({ data: { session: supabaseSession } }) => {
      if (supabaseSession) {
        setSession(supabaseSession);
      } else {
        const localSession = localStorage.getItem('ehms_partner_session');
        if (localSession) {
          try {
             setSession(JSON.parse(localSession));
          } catch(e) {
             setSession(null);
          }
        } else {
          setSession(null);
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadSession();

    // Re-check session if localStorage changes in other tabs or through manual events
    window.addEventListener('storage', loadSession);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // ONLY update if we got a real Supabase session, otherwise allow local session to persist
      if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', loadSession);
    };
  }, []);

  const isAuthPage = location.pathname === '/login';

  useEffect(() => {
    // Protected route logic
    if (!loading && !isAuthPage) {
      if (!session) {
        // Double check localStorage synchronously to avoid race condition with state updates
        const localSession = localStorage.getItem('ehms_partner_session');
        if (!localSession) {
          console.log('🛑 NO SESSION FOUND. PROTECTED ROUTE REDIRECT TO LOGIN.');
          navigate('/login');
        } else {
          // If local session exists but state isn't set yet, try to load it
          try {
            const parsedSession = JSON.parse(localSession);
            setSession(parsedSession);
          } catch (e) {
            navigate('/login');
          }
        }
      } else {
        // Role-based access control (RBAC) - Whitelist sub-routes for each type
        const type = session.type?.toLowerCase();
        const path = location.pathname;

        const routesByType: Record<string, string[]> = {
          hospital: ['/hospitals', '/requests', '/staff', '/capacity', '/settings'],
          ambulance: ['/ambulances', '/dispatch', '/settings'],
          pharmacy: ['/pharmacies', '/requests', '/settings'],
          rider: ['/riders', '/map', '/settings'],
        };

        const allowedRoutes = routesByType[type] || [];
        
        // If the path is not in the whitelist for this partner type, redirect to their main dashboard
        if (allowedRoutes.length > 0 && !allowedRoutes.includes(path)) {
           console.warn(`🔒 Access Denied for ${type} to ${path}. Redirecting to primary landing.`);
           navigate(allowedRoutes[0]);
        }
      }
    }
  }, [loading, session, isAuthPage, navigate, location.pathname]);

  if (loading || (!session && !isAuthPage)) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden">
      <Toaster position="top-right" richColors />
      {!isAuthPage && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} session={session} />}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isAuthPage ? 'lg:ml-64' : ''}`}>
        {!isAuthPage && (
          <header className="h-20 bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between px-4 md:px-8 z-30 sticky top-0 gap-4 md:gap-8">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition"
            >
              <Activity size={24} />
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-black text-slate-800 tracking-tighter truncate leading-tight uppercase italic">
                {(session?.name || session?.user?.email?.split('@')[0] || 'Partner')}
              </h1>
              <p className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5 italic flex items-center gap-1 md:gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span className="hidden xs:inline">Status:</span> Operational
              </p>
            </div>
            
            {/* Facility Switcher - ONLY shown for system admins, NOT for specific partners */}
            {session?.role === 'admin' && (
              <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto max-w-[40%] lg:max-w-none no-scrollbar">
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
            )}

            <div className="flex items-center gap-2 md:gap-4 border-l border-slate-100 pl-2 md:pl-4">
              <button 
                onClick={() => {
                   supabase.auth.signOut();
                   localStorage.removeItem('ehms_partner_session');
                   navigate('/login');
                }}
                className="text-[8px] md:text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition italic"
              >
                Exit
              </button>
              <button className="bg-emerald-600 text-white px-3 md:px-6 py-2 font-black rounded-lg md:rounded-xl hover:bg-emerald-500 transition shadow-xl text-[8px] md:text-[10px] uppercase tracking-widest italic border-b-2 md:border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1">
                Sync
              </button>
            </div>
          </header>
        )}
        <div className={!isAuthPage ? "p-4 md:p-8 flex-1 overflow-auto" : "flex-1"}>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/hospitals" element={<HospitalDashboard />} />
            <Route path="/requests" element={<MockModule name="Live Emergency Requests" />} />
            <Route path="/staff" element={<MockModule name="Personnel Deployment" />} />
            <Route path="/capacity" element={<MockModule name="Facility Load Balancer" />} />
            
            <Route path="/ambulances" element={<AmbulanceDashboard />} />
            <Route path="/dispatch" element={<MockModule name="Command Dispatch Feed" />} />
            
            <Route path="/pharmacies" element={<PharmacyDashboard />} />
            
            <Route path="/riders" element={<RiderDashboard />} />
            <Route path="/map" element={<MockModule name="Regional Transit Grid" />} />
            <Route path="/settings" element={<MockModule name="Module Configuration" />} />
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
