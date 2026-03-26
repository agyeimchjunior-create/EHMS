import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LayoutDashboard, Users, HeartPulse, Truck, Activity, FileText, Menu, X } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import EmergenciesPage from './pages/EmergenciesPage';
import DispatchPage from './pages/DispatchPage';
import UsersPage from './pages/UsersPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AuthPage from './pages/AuthPage';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const location = useLocation();
  const navItems = [
    { name: 'Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Live Emergencies', path: '/emergencies', icon: <HeartPulse size={20} /> },
    { name: 'Dispatch & Fleet', path: '/dispatch', icon: <Truck size={20} /> },
    { name: 'Partner Applications', path: '/applications', icon: <FileText size={20} /> },
    { name: 'Users & Subscriptions', path: '/users', icon: <Users size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`w-64 bg-slate-900 text-slate-300 min-h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center">
            <Activity className="text-red-500 mr-2" size={24} />
            <span className="font-black text-xl text-white tracking-widest italic uppercase">EHMS ADMIN</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-md font-black italic' 
                  : 'hover:bg-slate-800 hover:text-white font-bold'
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

  useEffect(() => {
    // Check for dev session FIRST
    const devLogin = localStorage.getItem('ehms_dev_auth');
    if (devLogin) {
      setSession({ user: { email: devLogin } });
      setLoading(false);
    }

    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false); 
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      } else if (!localStorage.getItem('ehms_dev_auth')) {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Use a second effect to handle the redirect to avoid state updates during render lifecycle
  useEffect(() => {
    if (!loading && !session && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [loading, session, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
         <div className="flex flex-col items-center">
            <Activity className="text-red-500 animate-pulse mb-4" size={48} />
            <span className="text-white font-black uppercase tracking-[0.2em] text-xs">Initializing Secure Link...</span>
         </div>
      </div>
    );
  }

  const isAuthPage = location.pathname === '/login';

  // Protect all non-auth routes
  if (!session && !isAuthPage) {
    return null; // The redirect effect will handle this
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <Toaster position="top-right" richColors />
      {!isAuthPage && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isAuthPage ? 'lg:ml-64' : ''}`}>
        {!isAuthPage && (
          <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 sticky top-0 z-10 gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-base sm:text-xl font-black text-slate-800 italic shrink-0">System Command</h1>
            </div>
            
            <div className="flex-1 max-w-lg hidden md:block">
               <div className="bg-slate-100/50 rounded-full px-4 py-2 flex items-center gap-2 border border-slate-200 italic">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">Protocol: Active Monitoring</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  localStorage.removeItem('ehms_dev_auth');
                  setSession(null);
                  navigate('/login');
                }}
                className="text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition italic"
              >
                Sign Out
              </button>
              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-md border border-slate-700">
                  {session?.user?.email?.charAt(0).toUpperCase() || 'AD'}
                </div>
                <span className="font-black text-xs text-slate-800 italic hidden sm:block">{session?.user?.email?.split('@')[0]}</span>
              </div>
            </div>
          </header>
        )}
        <div className={!isAuthPage ? "p-8 flex-1 overflow-auto" : "flex-1"}>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/emergencies" element={<EmergenciesPage />} />
            <Route path="/dispatch" element={<DispatchPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="*" element={<div className="text-slate-500 flex items-center justify-center h-full font-bold italic">404: Management Module Not Found</div>} />
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
