import React from 'react';
import { 
  Globe, 
  Sparkles, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Users,
  Video,
  Briefcase,
  TrendingUp,
  Activity,
  HeartPulse,
  Scale
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Language, translations } from '@/lib/languages';

const IMAGES = {
  hero: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/hero-image-318f400e-1777020534334.webp",
  ai: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-analytics-hero-bccd5d14-1777028568713.webp",
  community: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/community-hub-image-c9ecb4f5-1777028568496.webp",
  virtual: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/virtual-hub-consultation-2f5e79f3-1777028568703.webp",
  consultancy: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/consultancy-directory-0ee1d7be-1777028568496.webp",
  education: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/educational-multimedia-e5d18ce4-1777028568873.webp"
};

export const LandingPage = ({ currentLang, onNavigate }: { currentLang: Language; onNavigate: (page: string) => void }) => {
  const t = translations[currentLang];

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: "Real-time AI Analytics",
      desc: "Predictive disease scoring and risk determination using advanced AI and medical literature."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Health Community",
      desc: "Collaborative space for patients and healthcare workers to share progress and support."
    },
    {
      icon: <Video className="w-6 h-6 text-orange-600" />,
      title: "Virtual Care Hub",
      desc: "Direct virtual connection with providers to reduce readmission and improve wellness."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-purple-600" />,
      title: "Expert Consultancy",
      desc: "Subscribe and select dedicated consultants for specialized progress reviews and follow-ups."
    }
  ];

  const stats = [
    { label: "Hospitals", value: "50+" },
    { label: "Patients", value: "100k+" },
    { label: "Languages", value: "12+" },
    { label: "AI Accuracy", value: "94%" },
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-32 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-4 py-1.5 rounded-full font-bold">
                World-Class Health Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                Empowering Your <span className="text-emerald-600">Health Journey</span> with AI.
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                GembeEduPro combines real-time analytics, AI disease prediction, and expert consultancy to provide a truly personalized healthcare experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button 
                  onClick={() => onNavigate('auth')}
                  size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-14 px-10 text-lg font-bold shadow-xl shadow-emerald-100 rounded-2xl"
                >
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl border-slate-200">
                  Watch AI Demo
                </Button>
              </div>
              
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-12">
                {stats.map((stat, i) => (
                   <div key={i}>
                      <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-[12px] border-white">
                <img 
                  src={IMAGES.hero} 
                  alt="Patient Education"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
              </div>
              
              {/* Floating AI Analytics Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block max-w-xs"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-100 p-2.5 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Insight</p>
                    <p className="text-sm font-black text-slate-900">Risk Score: Low</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Diabetes Prediction</span>
                    <span>24%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[24%]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100 border-none">Core Pillars</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">The Future of Patient Care</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              GembeEduPro isn't just a platform; it's a world-class health ecosystem designed for the unique needs of the African patient.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="mb-8 p-4 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 transition-colors w-fit">
                   {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Hub Preview */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
               >
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                    Real-time AI Prediction <br /><span className="text-emerald-400">Powered by Science.</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-10">
                    Our models analyze thousands of data points and medical literature to give you an accurate score of your lifestyle disease risk. 
                  </p>
                  <div className="space-y-6">
                     {[
                       { label: "Disease Prediction Models", icon: <Activity className="w-5 h-5" /> },
                       { label: "Real-time Vitals Monitoring", icon: <HeartPulse className="w-5 h-5" /> },
                       { label: "Scientific Evidence-based Advice", icon: <Scale className="w-5 h-5" /> }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 text-white font-bold">
                          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                            {item.icon}
                          </div>
                          {item.label}
                       </div>
                     ))}
                  </div>
                  <Button size="lg" className="mt-12 bg-emerald-600 hover:bg-emerald-700 h-14 px-10 text-lg font-bold">
                    Explore Analytics Hub
                  </Button>
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
               >
                  <img src={IMAGES.ai} alt="AI Hub" className="rounded-[40px] shadow-2xl border-8 border-white/5" />
               </motion.div>
            </div>
         </div>
      </section>

      {/* Multilingual Education Hub */}
      <section className="py-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="order-2 lg:order-1">
                  <img src={IMAGES.education} alt="Education Hub" className="rounded-[40px] shadow-2xl shadow-slate-200" />
               </div>
               <div className="order-1 lg:order-2">
                  <Badge className="bg-orange-100 text-orange-700 mb-4 border-none">Localized Learning</Badge>
                  <h2 className="text-4xl font-black text-slate-900 mb-6">Education in Your Own Language.</h2>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    We simplify complex medical jargon into easy-to-understand infographics and videos, translated into Swahili, Yoruba, Hausa, Amharic, and more.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     {['Swahili', 'Yoruba', 'Amharic', 'Hausa', 'Zulu', 'French'].map(lang => (
                        <div key={lang} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 font-bold text-slate-700">
                           <Globe className="w-5 h-5 text-emerald-600" />
                           {lang}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Institutional CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">Ready for a healthier future?</h2>
             <p className="text-emerald-50 text-xl mb-12 max-w-2xl mx-auto font-medium relative z-10">
               Join thousands of patients and providers using the world's most advanced African health education platform.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
               <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 h-16 px-12 text-xl font-black rounded-2xl shadow-2xl">
                 Join GembeEduPro
               </Button>
               <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10 h-16 px-12 text-xl font-black rounded-2xl backdrop-blur-md">
                 Contact Hospitals
               </Button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
             <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black text-slate-900">GembeEduPro</span>
                </div>
                <p className="text-slate-500 max-w-sm mb-8 font-medium">
                  World-class healthcare education and AI diagnostics for the African continent. Empowering patients, connecting providers.
                </p>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                <ul className="space-y-4 text-slate-500 font-medium">
                   <li className="hover:text-emerald-600 cursor-pointer">AI Analytics</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Community Hub</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Virtual Care</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Consultancy</li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                <ul className="space-y-4 text-slate-500 font-medium">
                   <li className="hover:text-emerald-600 cursor-pointer">About Us</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Hospital Plans</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Native Support</li>
                   <li className="hover:text-emerald-600 cursor-pointer">Contact</li>
                </ul>
             </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-medium">\u00a9 2024 GembeEduPro. All rights reserved.</p>
            <div className="flex gap-8 text-slate-400 font-medium">
               <span className="hover:text-emerald-600 cursor-pointer">Privacy Policy</span>
               <span className="hover:text-emerald-600 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};