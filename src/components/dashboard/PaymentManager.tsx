import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Users, 
  Star,
  ArrowRight,
  Globe,
  Lock,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const PaymentManager = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'hospital' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Basic Patient',
      price: '$0',
      description: 'Essential health education and basic AI assistance.',
      features: ['Limited AI Educator access', 'Public Community Hub', 'Standard health tracking', 'Multilingual support'],
      cta: 'Current Plan',
      popular: false,
      color: 'slate'
    },
    {
      id: 'premium',
      name: 'Patient Pro',
      price: '$9.99',
      period: '/mo',
      description: 'Full AI capabilities and specialized wellness tracking.',
      features: ['Unlimited AI Educator', 'Priority Expert Consultancy', 'Personalized Health Trends', 'Premium Course Content', 'Verified Blockchain Ledger'],
      cta: 'Upgrade to Pro',
      popular: true,
      color: 'emerald'
    },
    {
      id: 'hospital',
      name: 'Institutional',
      price: 'Custom',
      description: 'Enterprise solutions for clinics and hospitals.',
      features: ['Provider Dashboard Hub', 'Staff Role Management', 'Patient Trend Analytics', 'Custom Content Creator', 'Dedicated Account Manager'],
      cta: 'Contact Sales',
      popular: false,
      color: 'cyan'
    }
  ];

  const handlePayment = (planId: string) => {
    if (planId === 'free') return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedPlan(planId as any);
      toast.success(`Successfully upgraded to ${planId.toUpperCase()} plan!`);
    }, 2000);
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-slate-500 font-medium text-lg">Choose the plan that fits your healthcare journey or institutional needs.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -5 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-emerald-500 text-white border-none px-4 py-1 font-black uppercase tracking-widest text-[10px]">Most Popular</Badge>
              </div>
            )}
            <Card className={`h-full border-none shadow-xl rounded-[40px] overflow-hidden flex flex-col ${
              plan.popular ? 'ring-2 ring-emerald-500 shadow-emerald-100' : 'bg-white'
            }`}>
              <CardHeader className={`p-8 ${plan.popular ? 'bg-emerald-50/50' : 'bg-slate-50/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${
                    plan.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 
                    plan.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {plan.id === 'hospital' ? <Building2 className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                  </div>
                </div>
                <CardTitle className="text-2xl font-black text-slate-900">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 font-bold">{plan.period}</span>}
                </div>
                <CardDescription className="mt-4 font-medium text-slate-500">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-0.5 mt-1 rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button 
                  onClick={() => handlePayment(plan.id)}
                  disabled={plan.id === 'free' || isProcessing}
                  className={`w-full h-14 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 ${
                    plan.popular 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isProcessing && plan.id !== 'free' ? 'Processing...' : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <Card className="border-none shadow-lg bg-white rounded-[32px] p-2">
           <CardContent className="p-8 flex items-center gap-6">
              <div className="bg-cyan-50 p-4 rounded-3xl text-cyan-600">
                 <Wallet className="w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-900">Multi-Currency Support</h4>
                 <p className="text-sm font-medium text-slate-500">We accept Mobile Money (M-Pesa, MTN), Stripe, and Crypto payments across 40+ countries.</p>
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-white rounded-[32px] p-2">
           <CardContent className="p-8 flex items-center gap-6">
              <div className="bg-amber-50 p-4 rounded-3xl text-amber-600">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-900">Secure & Encrypted</h4>
                 <p className="text-sm font-medium text-slate-500">All transactions are PCI-DSS compliant and secured with bank-grade AES-256 encryption.</p>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Simulated Checkout Modal */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-hidden relative"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full bg-emerald-300"
                  />
               </div>
               
               <div className="flex flex-col items-center text-center">
                  <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-6">
                     <Lock className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Securing Transaction</h3>
                  <p className="text-slate-500 font-medium mb-8">Connecting to secure gateway. Please do not refresh the page.</p>
                  
                  <div className="w-full space-y-4 mb-8">
                     <div className="h-12 rounded-xl bg-slate-50 flex items-center justify-between px-4">
                        <span className="text-xs font-bold text-slate-400 uppercase">Payment Method</span>
                        <div className="flex items-center gap-2">
                           <CreditCard className="w-4 h-4 text-slate-400" />
                           <span className="text-sm font-black text-slate-700">\u2022\u2022\u2022\u2022 4242</span>
                        </div>
                     </div>
                     <div className="h-12 rounded-xl bg-slate-50 flex items-center justify-between px-4">
                        <span className="text-xs font-bold text-slate-400 uppercase">Amount Due</span>
                        <span className="text-sm font-black text-emerald-600">$9.99</span>
                     </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Verified by Gembe Security
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};