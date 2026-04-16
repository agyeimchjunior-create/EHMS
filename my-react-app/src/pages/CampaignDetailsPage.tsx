import { useParams, Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { ArrowLeft, ShieldCheck, CreditCard, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const CampaignDetailsPage = () => {
  const { id } = useParams();
  const campaign = campaigns.find(c => c.id === Number(id));
  
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<'paystack' | 'stripe' | null>(null);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-black italic uppercase">Campaign Not Found</h2>
          <Link to="/donate" className="text-blue-600 font-bold underline mt-4 inline-block">Return to Campaigns</Link>
        </div>
      </div>
    );
  }

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !selectedMethod) return;
    
    // In a real application, you would initialize Paystack or Stripe here.
    alert(`Initiating payment of GHS ${amount} via ${selectedMethod.toUpperCase()} for "${campaign.title}"`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
           <Link to="/donate" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition">
             <ArrowLeft size={20} />
           </Link>
           <h2 className="font-black italic uppercase tracking-widest text-xs opacity-70">Back to Campaigns</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 grid lg:grid-cols-3 gap-12">
         {/* Main Content: Images & Description */}
         <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-2">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-red-200">
                  {campaign.type}
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-blue-200 flex items-center gap-1">
                   <ShieldCheck size={12} /> Verified Case
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">
                {campaign.title}
              </h1>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
               <div className="h-96 md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                  <img src={campaign.images[0]} alt={campaign.title} className="w-full h-full object-cover" />
               </div>
               {campaign.images.length > 1 && (
                 <div className="grid grid-cols-2 gap-4">
                    {campaign.images.slice(1).map((img, idx) => (
                      <div key={idx} className="h-48 rounded-[2rem] overflow-hidden shadow-lg">
                        <img src={img} alt={`Support Image ${idx+1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* Description */}
            <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 mb-6">Patient & Medical Details</h3>
               <p className="text-slate-600 font-medium text-lg leading-relaxed whitespace-pre-line">
                 {campaign.fullDesc}
               </p>
               
               <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start">
                  <AlertCircle className="text-blue-500 shrink-0 mt-1" />
                  <p className="text-sm font-bold text-slate-600 italic">
                    Funds raised for this campaign are sent directly to the treating medical facility or the verified medical equipment vendor. We do not disburse cash to individuals, ensuring 100% accountability.
                  </p>
               </div>
            </div>
         </div>

         {/* Sidebar: Payment & Progress */}
         <div className="relative">
            <div className="sticky top-28 space-y-8">
               {/* Progress Card */}
               <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
                  <div className="flex font-black items-end gap-2 mb-4">
                     <span className="text-4xl text-slate-900 italic tracking-tighter">GHS {campaign.raised.toLocaleString()}</span>
                     <span className="text-sm text-slate-400 uppercase tracking-widest mb-1 italic">raised</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className="bg-red-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 italic mb-8">
                     <span>{progress.toFixed(1)}% Goal</span>
                     <span>Target: GHS {campaign.goal.toLocaleString()}</span>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-6 border-t border-slate-100 pt-8">
                     <h4 className="font-black italic uppercase tracking-tighter text-slate-800 text-xl">Quick Support</h4>
                     
                     {/* Amount Input */}
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 italic">GHS</span>
                        <input 
                          type="number" 
                          required
                          min="1"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00" 
                          className="w-full bg-slate-50 border border-slate-200 pl-16 pr-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/10 font-black text-xl text-slate-800 italic transition" 
                        />
                     </div>

                     {/* Payment Method Selector */}
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button"
                          onClick={() => setSelectedMethod('paystack')}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition ${
                            selectedMethod === 'paystack' 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                              : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-500'
                          }`}
                        >
                           <Smartphone size={24} className="mb-2" />
                           <span className="text-[10px] font-black uppercase tracking-widest italic text-center">Mobile Money<br/>(Paystack)</span>
                           {selectedMethod === 'paystack' && <CheckCircle size={16} className="absolute top-2 right-2 text-emerald-500" />}
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => setSelectedMethod('stripe')}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition ${
                            selectedMethod === 'stripe' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/50 text-slate-500'
                          }`}
                        >
                           <CreditCard size={24} className="mb-2" />
                           <span className="text-[10px] font-black uppercase tracking-widest italic text-center">Credit Card<br/>(Stripe)</span>
                           {selectedMethod === 'stripe' && <CheckCircle size={16} className="absolute top-2 right-2 text-blue-500" />}
                        </button>
                     </div>

                     <button 
                        type="submit"
                        disabled={!amount || !selectedMethod}
                        className="w-full bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-500 text-white font-black uppercase tracking-widest italic py-5 rounded-[2rem] shadow-xl hover:bg-red-700 transition"
                     >
                        Process Contribution
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
