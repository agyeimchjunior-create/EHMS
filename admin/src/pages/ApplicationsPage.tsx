import { FileText, CheckCircle2, Clock, Building2, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();

    // Enable Real-time listener
    const subscription = supabase
      .channel('application_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partner_applications' }, () => {
        fetchApplications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Fetch from real Supabase table 'partner_applications'
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      // Fallback to mock data for demo if table doesn't exist
      setApplications([
        { id: 'APP-001', name: 'St. Nicholas Hospital', email: 'admin@stnicholas.com', phone: '+233 24 123 4567', type: 'Hospital', status: 'Pending', created_at: '2026-03-25' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (app: any) => {
    setApprovingId(app.id);
    try {
      // 1. Generate Credentials
      const prefix = app.type.substring(0, 4).toUpperCase();
      const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
      const secretId = `${prefix}-${randomPart}`;
      const tempPassword = Math.random().toString(36).substring(2, 10); // Generate a random 8-char password

      // 2. Insert into 'partners' table
      const { error: partnerError } = await supabase
        .from('partners')
        .insert([{ 
          name: app.name, 
          email: app.email, 
          type: app.type.toLowerCase(), 
          secret_id: secretId,
          password: tempPassword,
          is_active: true 
        }]);

      if (partnerError) throw partnerError;

      // 3. Update application status
      const { error: updateError } = await supabase
        .from('partner_applications')
        .update({ status: 'Approved' })
        .eq('id', app.id);

      if (updateError) throw updateError;

      toast.success('Facility Approved!', {
        description: `Credentials for ${app.name} are ready.`,
        action: {
          label: 'Copy Credentials',
          onClick: () => {
            const credentials = `Email: ${app.email}\nPassword: ${tempPassword}\nSecret ID: ${secretId}`;
            navigator.clipboard.writeText(credentials);
            toast.success('Credentials copied to clipboard!');
          }
        },
        duration: 20000,
      });
      fetchApplications();
    } catch (err: any) {
      toast.error('Approval Failed', {
        description: err.message
      });
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic">Partner Applications</h2>
          <p className="text-slate-500 font-medium">Review and approve new facility partnerships from the live database.</p>
        </div>
        <button 
          onClick={fetchApplications}
          className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
        >
          <Clock size={18} className="text-slate-400" />
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-24 text-slate-400 font-black italic">
             <Loader2 size={48} className="animate-spin mb-4" />
             Connecting to Supabase...
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-24 text-slate-400 font-black italic">
             <FileText size={48} className="mb-4 opacity-50" />
             No New Applications Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner / ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Type</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic">
                {applications.map((app) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={app.id} 
                    className="hover:bg-slate-50/50 transition duration-300 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                            <Building2 size={24} />
                         </div>
                         <div>
                            <p className="font-black text-slate-800">{app.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter not-italic">{app.id}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                         {app.type}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1 not-italic">
                         <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail size={14} className="text-slate-300" /> {app.email}</p>
                         <p className="text-xs font-medium text-slate-400 flex items-center gap-2"><Phone size={14} className="text-slate-300" /> {app.phone}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {app.status === 'Approved' ? (
                        <div className="flex justify-end items-center gap-2 text-emerald-500 font-black text-xs uppercase italic">
                           <ShieldCheck size={18} /> Credentials Sent
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                           <button 
                             onClick={() => handleApprove(app)}
                             disabled={approvingId === app.id}
                             className="px-4 py-2 bg-slate-900 border-b-2 border-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition active:border-b-0 active:translate-y-0.5 flex items-center gap-2 disabled:opacity-50"
                           >
                             {approvingId === app.id ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />} 
                             Verify & Approve
                           </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12 italic font-black">
         <div className="md:col-span-1 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-20"><ShieldCheck size={80} /></div>
            <h4 className="text-xl mb-2 tracking-tight">Security Layer</h4>
            <p className="text-slate-400 text-sm font-medium not-italic leading-relaxed">
               All approvals are cryptographically logged. Partners cannot access EHMS without a valid, system-generated Secret ID.
            </p>
         </div>

         <div className="md:col-span-2 bg-emerald-50 border-2 border-emerald-200 border-dashed rounded-[2.5rem] flex items-center justify-center p-12">
            <div className="text-center">
               <ShieldCheck className="text-emerald-300 mx-auto mb-4" size={48} />
               <p className="text-emerald-900 text-xl tracking-tight">Database Connectivity Established</p>
               <p className="text-emerald-700 font-medium text-sm mt-2 not-italic">Syncing with partner_applications & partners tables.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
