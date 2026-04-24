import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Stethoscope,
  Building2,
  User,
  ShieldCheck,
  Mail,
  KeyRound,
  ArrowRight,
  Shield,
  CheckCircle2,
  Fingerprint,
  Loader2,
  Globe,
  Info,
  ChevronLeft,
  Lock,
  Unlock
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { toast } from 'sonner';

const IMAGES = {
  auth_bg: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/auth-preview-135d1573-1777039525430.webp",
  biometric: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/biometric-security-47b439fb-1777039871016.webp"
};

export const AuthPage = ({
  onLogin,
  initialTab = 'patient',
  initialMode = 'login'
}: {
  onLogin: (role: UserRole) => void;
  initialTab?: string;
  initialMode?: 'login' | 'signup';
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [tempRole, setTempRole] = useState<UserRole>('patient');

  const handleInitialSubmit = async (role: UserRole) => {
    if (!email || !password || (mode === 'signup' && !fullName)) {
      toast.error('Security Protocol: Please fill in all required credentials');
      return;
    }

    if (password.length < 8) {
      toast.error('Security Protocol: Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setTempRole(role);

    // Simulate secure hand-shake and database insertion
    await new Promise(r => setTimeout(r, 2000));
    
    setIsLoading(false);
    setIs2FAStep(true);
    
    if (mode === 'signup') {
      toast.success('Identity Created. Initializing 2FA Sequence...');
    } else {
      toast.success('Identity Validated. Pending MFA Approval.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleFinalLogin = async () => {
    if (otp.some(digit => !digit)) {
      toast.error('MFA Error: Complete the 6-digit verification code');
      return;
    }

    setIsLoading(true);
    // Simulate biometric verification
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    
    onLogin(tempRole);
    toast.success('Session Authenticated Securely');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 lg:p-12 relative overflow-hidden font-sans selection:bg-cyan-100 selection:text-cyan-900">
      {/* Dynamic Background Architecture */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img 
            src={IMAGES.auth_bg} 
            className="w-full h-full object-cover blur-[80px]" 
            alt="Background"
          />
        </motion.div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[20px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/80 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 border border-white/50"
      >
        {/* Left Branding Side: Professional, Modern, Trust-building */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" />
          
          <div className="relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 mb-16 cursor-pointer"
            >
              <div className="bg-cyan-500 p-3.5 rounded-2xl shadow-2xl shadow-cyan-500/40">
                <ShieldCheck className="w-9 h-9 text-white" />
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter block">GembeEduPro</span>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Secure Health Network</span>
              </div>
            </motion.div>

            <div className="space-y-8 max-w-md">
              <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                {is2FAStep ? 'Multi-Factor' : 'The Standard in'} <span className="text-cyan-400">{is2FAStep ? 'Protection.' : 'Health Data.'}</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Protecting patient trust through AES-256 encryption and blockchain-verified medical record integrity.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                  ))}
               </div>
               <div>
                 <p className="text-sm font-black">Join 12,000+ Professionals</p>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Verified on Mainnet</p>
               </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge className="bg-white/5 text-white border-white/10 py-2 px-5 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                <Lock className="w-3 h-3 mr-2 text-cyan-400" /> HIPAA COMPLIANT
              </Badge>
              <Badge className="bg-white/5 text-white border-white/10 py-2 px-5 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                <Globe className="w-3 h-3 mr-2 text-emerald-400" /> GDPR READY
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Form Side: Functional, Accessible, Clean */}
        <div className="p-8 lg:p-20 flex flex-col justify-center bg-white/40">
          <AnimatePresence mode="wait">
            {!is2FAStep ? (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-3 lg:hidden">
                    <ShieldCheck className="w-6 h-6 text-cyan-600" />
                    <span className="text-xl font-black tracking-tighter">GembeEduPro</span>
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                    {mode === 'login' ? 'Access Portal' : 'Register Identity'}
                  </h3>
                  <p className="text-slate-500 font-medium text-lg">
                    {mode === 'login' 
                      ? 'Securely authenticate to your clinical dashboard.' 
                      : 'Join the most advanced health education ecosystem.'}
                  </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
                  <TabsList className="grid grid-cols-3 w-full bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
                    <TabsTrigger value="patient" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Patient
                    </TabsTrigger>
                    <TabsTrigger value="provider" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Provider
                    </TabsTrigger>
                    <TabsTrigger value="platform_admin" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      Staff
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-6">
                  {mode === 'signup' && (
                    <div className="space-y-2.5">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                        <Input
                          placeholder="e.g. Dr. Kwesi Mensah"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-16 pl-12 rounded-2xl border-slate-200 bg-white/50 focus-visible:ring-cyan-500 font-bold text-lg transition-all focus-visible:bg-white"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Verified Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                      <Input
                        type="email"
                        placeholder="name@institution.pro"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-16 pl-12 rounded-2xl border-slate-200 bg-white/50 focus-visible:ring-cyan-500 font-bold text-lg transition-all focus-visible:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between ml-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Password</Label>
                      {mode === 'login' && (
                        <button className="text-[10px] text-cyan-600 font-black hover:underline uppercase tracking-widest">
                          Recover?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-16 pl-12 rounded-2xl border-slate-200 bg-white/50 focus-visible:ring-cyan-500 font-bold text-lg transition-all focus-visible:bg-white"
                      />
                    </div>
                    {mode === 'signup' && (
                      <div className="flex gap-1.5 mt-2 ml-1">
                         {[1,2,3,4].map(i => (
                           <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${password.length >= i*2 ? 'bg-cyan-500' : 'bg-slate-100'}`} />
                         ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleInitialSubmit(activeTab as UserRole)}
                  disabled={isLoading}
                  className="w-full mt-10 bg-slate-950 hover:bg-slate-900 h-16 text-lg font-black rounded-2xl shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] group overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>SECURING HANDSHAKE...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center">
                        {mode === 'login' ? `Authenticate ${activeTab}` : 'Initialize Secure Registration'}
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </>
                  )}
                </Button>

                <div className="mt-10 text-center">
                  <button
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-[10px] font-black text-slate-400 hover:text-cyan-600 uppercase tracking-[0.25em] transition-colors border-b border-transparent hover:border-cyan-600 pb-1"
                  >
                    {mode === 'login' ? "New to Gembe? Create Secure ID" : 'Already Have an ID? Sign In'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="2fa-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <button 
                  onClick={() => setIs2FAStep(false)}
                  className="absolute top-10 left-10 lg:static lg:mb-12 flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" /> Go Back
                </button>

                <div className="relative w-32 h-32 mx-auto mb-10">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-[40px] animate-pulse" />
                  <img src={IMAGES.biometric} className="w-full h-full object-cover rounded-[40px] shadow-2xl" alt="2FA" />
                  <div className="absolute -bottom-3 -right-3 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-50">
                    <Fingerprint className="w-7 h-7 text-cyan-600" />
                  </div>
                </div>

                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Verification Required
                </h2>
                <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto text-lg leading-relaxed">
                  Identity protection active. Please enter the 6-digit MFA code generated on your device.
                </p>

                <div className="flex gap-3 sm:gap-4 justify-center mb-12">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-11 h-14 sm:w-14 sm:h-20 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black text-slate-900 focus:border-cyan-500 focus:bg-white outline-none transition-all shadow-sm"
                    />
                  ))}
                </div>

                <Button
                  onClick={handleFinalLogin}
                  disabled={isLoading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 h-16 text-xl font-black rounded-2xl mb-8 shadow-2xl shadow-cyan-100 transition-all active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                    <div className="flex items-center gap-3">
                      <Unlock className="w-6 h-6" />
                      <span>Verify & Access Portal</span>
                    </div>
                  )}
                </Button>

                <div className="flex flex-col gap-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Didn't receive the code?
                  </p>
                  <button 
                    className="text-cyan-600 font-black text-xs uppercase tracking-widest hover:underline"
                    onClick={() => toast.info('New MFA code dispatched to secondary device.')}
                  >
                    Resend Security Token
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Security Infrastructure Tags */}
      <div className="fixed bottom-10 left-10 hidden xl:flex flex-col gap-4">
         <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Mainnet Node Online</span>
         </div>
         <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50">
            <Shield className="w-4 h-4 text-cyan-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">E2E Encryption Active</span>
         </div>
      </div>
    </div>
  );
};