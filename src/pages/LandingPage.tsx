import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Stethoscope, 
  Globe, 
  Activity,
  BookOpen,
  Video,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Language, translations } from '@/lib/languages';

const IMAGES = {
  hero: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/mobile-app-preview-59df2f63-1777039523338.webp",
  dashboard: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/dashboard-preview-ec16c8cb-1777039523616.webp"
};

export const LandingPage = ({ 
  currentLang, 
  onNavigate 
}: { 
  currentLang: Language; 
  onNavigate: (page: string, options?: any) => void; 
}) => {
  const t = translations[currentLang];

  const features = [
    { 
      icon: <Sparkles className="w-6 h-6" />, 
      title: "AI Health Educator", 
      desc: "Personalized medical knowledge in local languages, powered by fine-tuned AI.",
      color: "emerald"
    },
    { 
      icon: <ShieldCheck className="w-6 h-6" />, 
      title: "Blockchain Records", 
      desc: "Immutably secure medical records ensuring patient data integrity and trust.",
      color: "cyan"
    },
    { 
      icon: <Video className="w-6 h-6" />, 
      title: "Virtual Care Hub", 
      desc: "Seamless connection between patients and providers for remote consultations.",
      color: "blue"
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: "Multi-Lingual Support", 
      desc: "Education delivered in Swahili, Hausa, Yoruba, and English to bridge the gap.",
      color: "purple"
    }
  ];

  return (
    <div className="relative overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -ml-48 -mb-48" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-cyan-50 text-cyan-700 border-none px-4 py-1.5 font-black uppercase tracking-widest text-[11px] mb-8">
                <Lock className="w-3.5 h-3.5 mr-2" /> ISO 27001 SECURE PLATFORM
              </Badge>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
                Empowering <span className="text-cyan-600">African</span> Health Journeys.
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
                The most advanced AI-driven patient education platform designed for the African context, ensuring secure, accessible, and verified healthcare for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => onNavigate('auth', { mode: 'signup', tab: 'patient' })}
                  className="h-16 px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xl shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
                >
                  Start Your Journey <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('auth', { mode: 'login', tab: 'provider' })}
                  className="h-16 px-10 border-slate-200 text-slate-900 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  Provider Access
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
              <img 
                src={IMAGES.hero} 
                className="relative z-10 w-full rounded-[48px] shadow-[0_48px_96px_rgba(0,0,0,0.12)] border-[12px] border-white"
                alt="Platform Preview"
              />
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[32px] shadow-2xl z-20 hidden md:block border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 p-3 rounded-2xl">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">Verified</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Blockchain Secured</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Pioneering Digital Health across the Continent</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">GembeEduPro combines AI education with robust blockchain security to create a trustworthy healthcare ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <Card key={i} className="border-none shadow-sm bg-slate-50/50 rounded-[40px] hover:shadow-xl hover:-translate-y-2 transition-all group">
                <CardContent className="p-10">
                  <div className={`w-16 h-16 rounded-3xl mb-8 flex items-center justify-center transition-all bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 text-center">
            {[ 
              { label: "Active Patients", val: "100k+" },
              { label: "Hospitals Integrated", val: "450+" },
              { label: "Educations Delivered", val: "1.2M" },
              { label: "Security Rating", val: "A+" }
            ].map((s, i) => (
              <div key={i}>
                <p className="text-5xl lg:text-7xl font-black text-cyan-400 mb-2">{s.val}</p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[64px] p-12 lg:p-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10" />
             <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">Ready to revolutionize patient education?</h2>
                <p className="text-xl text-cyan-100 font-medium mb-12">Join GembeEduPro today and be part of the most secure health network in Africa.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button 
                    onClick={() => onNavigate('auth', { mode: 'signup', tab: 'provider' })}
                    className="h-16 px-12 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-black text-xl shadow-2xl transition-all"
                  >
                    Join as a Provider
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('auth', { mode: 'signup', tab: 'patient' })}
                    className="h-16 px-12 border-white/20 text-white hover:bg-white/10 rounded-2xl font-black text-xl transition-all"
                  >
                    Register as Patient
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2.5 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">GembeEduPro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-sm font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-cyan-600">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-600">HIPAA Compliance</a>
              <a href="#" className="hover:text-cyan-600">Data Security</a>
              <a href="#" className="hover:text-cyan-600">Terms of Service</a>
            </div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
              &copy; 2024 Gembe Health Global
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};