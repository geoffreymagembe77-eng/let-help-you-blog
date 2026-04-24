import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Users, 
  Lock,
  Wallet,
  Globe,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type Step = 'plans' | 'checkout' | 'processing' | 'success';

const IMAGES = {
  secure_payment: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/secure-payment-8484d07f-1777039871710.webp"
};

export const PaymentManager = () => {
  const [step, setStep] = useState<Step>('plans');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvc: '' });

  const plans = [
    {
      id: 'free',
      name: 'Essential',
      price: '$0',
      description: 'Fundamental education for every patient.',
      features: ['5 AI Education Sessions/mo', 'Community Health Hub', 'Standard Tracking'],
      color: 'slate'
    },
    {
      id: 'pro',
      name: 'Patient Pro',
      price: '$9.99',
      period: '/mo',
      description: 'Advanced analytics and unlimited AI education.',
      features: ['Unlimited AI Educator', 'Priority Specialist Access', 'Verified Health Ledger', 'Family Care Sharing'],
      popular: true,
      color: 'cyan'
    },
    {
      id: 'hospital',
      name: 'Institutional',
      price: 'Custom',
      description: 'Enterprise healthcare orchestration.',
      features: ['Staff Management Dashboard', 'Population Health Analytics', 'Custom Content Engine', 'API Integration'],
      color: 'slate'
    }
  ];

  const handleSelectPlan = (plan: any) => {
    if (plan.id === 'free') {
      toast.info('Security: You are already on the Essential verified tier.');
      return;
    }
    setSelectedPlan(plan);
    setStep('checkout');
  };

  const handlePaymentSubmit = async () => {
    if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
      toast.error('Payment Error: All secure fields are required.');
      return;
    }

    setStep('processing');
    // Simulate multi-factor payment authorization
    await new Promise(r => setTimeout(r, 3000));
    setStep('success');
    toast.success(`Welcome to Gembe ${selectedPlan.name}! Subscription active.`);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 font-sans relative">
      <AnimatePresence mode="wait">
        {step === 'plans' && (
          <motion.div 
            key="plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <div className="text-center space-y-6">
              <Badge className="bg-cyan-50 text-cyan-700 border-none font-black px-5 py-2 uppercase tracking-widest text-[11px] rounded-full shadow-sm">Verified Subscription Gateway</Badge>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">Invest in your <span className="text-cyan-600 underline decoration-cyan-100 underline-offset-8">Health Wealth.</span></h2>
              <p className="text-slate-500 font-medium text-xl max-w-3xl mx-auto leading-relaxed">Secure, transparent pricing for individuals and healthcare institutions. No hidden fees, just world-class African health technology.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative border-none rounded-[48px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-all hover:shadow-[0_48px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 ${
                    plan.popular ? 'ring-4 ring-cyan-500/20 bg-white' : 'bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-8 right-8">
                      <Badge className="bg-cyan-600 text-white border-none font-black uppercase text-[10px] py-1.5 px-4 rounded-full shadow-lg shadow-cyan-200">Recommended</Badge>
                    </div>
                  )}
                  <CardHeader className="p-12">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-inner ${
                      plan.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {plan.id === 'hospital' ? <Building2 className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-3xl font-black text-slate-900">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                      {plan.period && <span className="text-slate-400 font-black uppercase text-sm tracking-widest ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-slate-500 font-bold mt-4 text-sm">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="p-12 pt-0 flex-1">
                    <div className="h-px bg-slate-100 mb-8 w-full" />
                    <ul className="space-y-5">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="p-0.5 rounded-full bg-cyan-50 text-cyan-600 mt-1">
                             <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-slate-600 font-black text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-12 pt-0">
                    <Button 
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full h-16 rounded-2xl font-black text-lg transition-all shadow-xl ${
                        plan.popular ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-200' : 'bg-slate-950 hover:bg-slate-900 text-white shadow-slate-200'
                      }`}
                    >
                      {plan.id === 'free' ? 'Current Verified Plan' : 'Select Subscription'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-16 pt-16 border-t border-slate-100">
               <div className="flex items-center gap-4">
                  <ShieldCheck className="w-7 h-7 text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PCI-DSS Compliant Gateway</span>
               </div>
               <div className="flex items-center gap-4">
                  <Globe className="w-7 h-7 text-cyan-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Accepting Global Fiat & Crypto</span>
               </div>
               <div className="flex items-center gap-4">
                  <Lock className="w-7 h-7 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">256-bit AES SSL Infrastructure</span>
               </div>
            </div>
          </motion.div>
        )}

        {step === 'checkout' && (
          <motion.div 
            key="checkout"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12"
          >
            <div className="space-y-8">
              <Button 
                variant="ghost" 
                onClick={() => setStep('plans')} 
                className="font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Return to Selection
              </Button>

              <h2 className="text-5xl font-black text-slate-900">Secure Checkout</h2>
              <p className="text-slate-500 font-medium text-lg">Your health data protection starts with secure financial transactions. All data is encrypted before transmission.</p>

              <Card className="border-none bg-slate-50 rounded-[40px] p-8">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                       <Zap className="w-8 h-8 text-cyan-600" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Selected Plan</p>
                       <p className="text-2xl font-black text-slate-900">{selectedPlan?.name}</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between font-bold text-slate-600">
                       <span>Annual License</span>
                       <span>{selectedPlan?.price} {selectedPlan?.period || ''}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-600">
                       <span>Security Audit Fee</span>
                       <span className="text-emerald-600">Included</span>
                    </div>
                    <div className="h-px bg-slate-200 my-4" />
                    <div className="flex justify-between items-center">
                       <span className="text-xl font-black text-slate-900">Total Due</span>
                       <span className="text-4xl font-black text-cyan-600">{selectedPlan?.price}</span>
                    </div>
                 </div>
              </Card>
            </div>

            <Card className="border-none shadow-2xl rounded-[48px] overflow-hidden bg-white">
               <CardHeader className="bg-slate-950 text-white p-12 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl" />
                  <div className="relative z-10 flex justify-between items-center">
                    <CardTitle className="text-3xl font-black">Payment Vault</CardTitle>
                    <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  </div>
                  <CardDescription className="text-slate-400 font-medium mt-2">Authenticated session active. Transaction ID: #TX-9821</CardDescription>
               </CardHeader>
               <CardContent className="p-12 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name on Card</Label>
                       <Input 
                        placeholder="Kwesi Mensah" 
                        className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold text-lg focus-visible:ring-cyan-500 transition-all"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Details</Label>
                       <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input 
                            placeholder="4242 4242 4242 4242" 
                            className="h-14 pl-12 rounded-2xl bg-slate-50 border-slate-100 font-bold text-lg focus-visible:ring-cyan-500"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry</Label>
                          <Input 
                            placeholder="MM / YY" 
                            className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold text-lg focus-visible:ring-cyan-500"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Code</Label>
                          <Input 
                            placeholder="CVC" 
                            className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold text-lg focus-visible:ring-cyan-500"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                          />
                       </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePaymentSubmit}
                    className="w-full h-20 bg-slate-950 hover:bg-slate-900 text-white rounded-[24px] font-black text-2xl shadow-2xl transition-all active:scale-[0.98] mt-4"
                  >
                    Authorize {selectedPlan?.price}
                  </Button>
               </CardContent>
               <CardFooter className="p-12 pt-0 bg-slate-50 flex items-center justify-center gap-3">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bank-Level 256-bit Encryption</span>
               </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto py-32 space-y-12"
          >
             <div className="relative w-40 h-40 mx-auto">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-8 border-cyan-100 border-t-cyan-600"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <ShieldCheck className="w-16 h-16 text-cyan-600" />
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900">Validating Session</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Gembe security protocols are confirming the transaction with your financial institution. Please do not refresh.</p>
             </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto py-20 bg-white p-16 rounded-[64px] shadow-2xl border border-slate-50"
          >
             <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[48px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-100">
                <CheckCircle2 className="w-16 h-16" />
             </div>
             <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Security Upgrade Complete</h2>
             <p className="text-slate-500 font-medium text-xl mb-12 leading-relaxed">Your account has been successfully upgraded to the <strong>{selectedPlan?.name}</strong> tier. You now have full access to our premium clinical features.</p>
             <Button 
               onClick={() => setStep('plans')}
               className="h-20 px-16 bg-slate-950 text-white rounded-[24px] font-black text-xl shadow-2xl shadow-slate-200 transition-all active:scale-95"
             >
               Go to Dashboard
             </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Tags */}
      {step === 'plans' && (
        <div className="flex justify-center gap-10 mt-20">
           <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" className="h-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all" alt="Stripe" />
           <img src="https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg" className="h-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all" alt="PayPal" />
           <img src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" className="h-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all" alt="Visa" />
        </div>
      )}
    </div>
  );
};