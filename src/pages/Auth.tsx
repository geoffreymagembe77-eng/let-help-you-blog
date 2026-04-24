import React, { useState } from 'react';
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
  Lock,
  Fingerprint,
  Mail,
  KeyRound,
  ArrowRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { toast } from 'sonner';

export const AuthPage = ({
  onLogin,
}: {
  onLogin: (role: UserRole) => void;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [tempRole, setTempRole] = useState<UserRole>('patient');

  const handleInitialSubmit = (role: UserRole) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setTempRole(role);
    setIs2FAStep(true);
    toast.success(isLogin ? 'Identity Challenge Sent' : 'Creating Secure Identity');
  };

  const handleFinalLogin = () => {
    onLogin(tempRole);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="bg-slate-900 p-4 rounded-3xl mb-6 shadow-2xl shadow-slate-200"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            GembeEduPro
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="bg-emerald-50 text-emerald-700 border-none font-black uppercase tracking-widest text-[10px] px-3 py-1">
              <Shield className="w-3 h-3 mr-1" /> ISO 27001 SECURE
            </Badge>
          </div>
        </div>

        <Card className="border-none shadow-[0_40px_80px_rgba(0,0,0,0.06)] bg-white/90 backdrop-blur-2xl rounded-[40px] overflow-hidden">
          <AnimatePresence mode="wait">
            {!is2FAStep ? (
              <motion.div
                key="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Tabs defaultValue="patient" className="w-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-black text-slate-900">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                      </h2>
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline"
                      >
                        {isLogin ? 'Create Account' : 'Back to Login'}
                      </button>
                    </div>
                    <TabsList className="grid grid-cols-3 w-full bg-slate-100/80 p-1.5 rounded-2xl">
                      <TabsTrigger value="patient" className="rounded-xl font-bold gap-2 text-xs">
                        <User className="w-3.5 h-3.5" /> Patient
                      </TabsTrigger>
                      <TabsTrigger value="provider" className="rounded-xl font-bold gap-2 text-xs">
                        <Building2 className="w-3.5 h-3.5" /> Provider
                      </TabsTrigger>
                      <TabsTrigger value="admin" className="rounded-xl font-bold gap-2 text-xs">
                        <Lock className="w-3.5 h-3.5" /> Admin
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <CardContent className="space-y-5 pt-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-slate-500 font-bold ml-1 text-xs uppercase tracking-widest">
                          Institutional Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type="email"
                            placeholder="name@gembe.pro"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-emerald-500 font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                          <Label className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                            Password
                          </Label>
                          {isLogin && (
                            <button className="text-[10px] text-emerald-600 font-black hover:underline uppercase">
                              Forgot?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            type="password"
                            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-emerald-500 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {!isLogin && (
                       <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-xs font-medium text-emerald-800">
                            By signing up, you agree to our GDPR and HIPAA compliant data processing terms.
                          </p>
                       </div>
                    )}
                  </CardContent>

                  <TabsContent value="patient">
                    <CardFooter className="px-6 pb-8">
                      <Button
                        onClick={() => handleInitialSubmit('patient')}
                        className="w-full bg-slate-900 hover:bg-slate-800 h-14 text-lg font-black rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
                      >
                        {isLogin ? 'Access Patient Portal' : 'Register Patient Account'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="provider">
                    <CardFooter className="px-6 pb-8">
                      <Button
                        onClick={() => handleInitialSubmit('provider')}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 h-14 text-lg font-black rounded-2xl shadow-xl shadow-cyan-100 transition-all active:scale-[0.98]"
                      >
                        {isLogin ? 'Provider Portal' : 'Apply as Provider'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </CardFooter>
                  </TabsContent>

                  <TabsContent value="admin">
                    <CardFooter className="px-6 pb-8">
                      <Button
                        onClick={() => handleInitialSubmit('platform_admin')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 text-lg font-black rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98]"
                      >
                        Platform Command
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </CardFooter>
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="2fa-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 text-center"
              >
                <div className="bg-emerald-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-100">
                  <Fingerprint className="w-12 h-12 text-emerald-600 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">
                  Biometric Auth
                </h2>
                <p className="text-slate-500 font-medium mb-10">
                  Confirm your identity using the 6-digit code sent to your secure device.
                </p>

                <div className="flex gap-3 justify-center mb-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-xl flex items-center justify-center text-xl font-black text-slate-900 focus-within:border-emerald-500 transition-all"
                    />
                  ))}
                </div>

                <Button
                  onClick={handleFinalLogin}
                  className="w-full bg-emerald-600 h-16 text-xl font-black rounded-2xl mb-6 shadow-xl shadow-emerald-100"
                >
                  Verify & Proceed
                </Button>
                <button
                  onClick={() => setIs2FAStep(false)}
                  className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest"
                >
                  Cancel Verification
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Security Protocol
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Privacy Shield
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Data Integrity
            </a>
          </div>
          <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            &copy; 2024 Gembe Health Global \u2022 End-to-End Encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
};