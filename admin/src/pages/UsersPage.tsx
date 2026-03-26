import { Users, UserCheck, ShieldCheck, Mail, Phone, Calendar, CreditCard, Search, Filter, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      // Fallback for demo
      setUsers([
        { id: 'U-120', full_name: 'Kwame Mensah', email: 'kwame@example.com', phone: '+233 24 123 4567', created_at: '2023-11-20', tier: 'Platinum', is_active: true, is_subscribed: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic">Users & Subscriptions</h2>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-black tracking-[0.2em] text-blue-600">Database Record Explorer</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none w-full shadow-sm font-medium"
            />
          </div>
          <button onClick={fetchUsers} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-50 shadow-sm transition font-black text-xs uppercase italic tracking-widest">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Enrolled Citizens', value: users.length.toString(), icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Paid Subscriptions', value: users.filter(u => u.is_subscribed).length.toString(), icon: <UserCheck size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Unverified Entries', value: '0', icon: <ShieldCheck size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-24 text-slate-400 font-black italic">
             <Loader2 size={48} className="animate-spin mb-4" />
             Pulling Live User Records...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Coverage Tier</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subscription</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm overflow-hidden border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition">
                          {user.full_name?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm leading-tight tracking-tight">{user.full_name}</p>
                          <p className="text-xs text-slate-400 leading-tight mt-1 not-italic font-bold">{user.email}</p>
                          <p className="text-[10px] text-blue-500 leading-tight mt-1 flex items-center gap-1 font-black uppercase"><Phone size={10} /> {user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-1 border ${
                        user.tier === 'Platinum' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <ShieldCheck size={10} /> {user.tier || 'Community'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold not-italic">
                        <Calendar size={14} className="text-slate-300" /> {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 w-fit border ${
                        user.is_subscribed ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                         <CreditCard size={10} /> {user.is_subscribed ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="bg-slate-900 border-b-2 border-slate-950 text-white p-2.5 rounded-xl hover:bg-black transition active:border-b-0 active:translate-y-0.5"><Mail size={16} /></button>
                        <button className="bg-blue-600 border-b-2 border-blue-800 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition active:border-b-0 active:translate-y-0.5 font-black text-[10px] uppercase tracking-widest">Audit Profile</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
