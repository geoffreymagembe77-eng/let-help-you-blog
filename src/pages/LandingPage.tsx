import React, { useState } from 'react';
import {
  Globe,
  ChevronRight,
  ShieldCheck,
  Users,
  Video,
  Building2,
  Database,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Lock,
  Star,
  Activity,
  Zap,
  Play,
  Heart,
  ArrowRight,
  Shield,
  Fingerprint,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Language, translations } from '@/lib/languages';
import { useContent } from '@/hooks/use-content';
import { PaymentManager } from '@/components/dashboard/PaymentManager';

const IMAGES = {
  hero: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/hero-modern-86aeece2-1777031656047.webp",
  ai: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-analytics-hero-bccd5d14-1777028568713.webp",
  community: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/community-hub-image-c9ecb4f5-1777028568496.webp",
  blockchain: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/blockchain-medical-records-44f1b109-1777031659244.webp",
  payment: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/secure-payment-ui-4ff00df0-1777031658876.webp",
  education: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/educational-multimedia-e5d18ce4-1777028568873.webp"
};

const DEFAULT_CONTENT = {
  hero_title: "Healthcare Redefined.",
  hero_subtitle: "GembeEduPro integrates AI analytics, Blockchain security, and localized education to empower millions across Africa. The future of health is here.",
  hero_cta_primary: "Start Journey",
  hero_cta_secondary: "Institutional Access",
  stat_users_val: "2.4M+",
  stat_users_label: "Users",
  stat_accuracy_val: "99.9%",
  stat_countries_val: "12",
  blockchain_badge: "Immutable Data Integrity",
  blockchain_title: "Your Data, Forever Secure.",
  blockchain_desc: "Every medical record and education milestone is hashed onto the blockchain, providing patients and providers with unbreakable proof of health journey and credential integrity.",
  payment_badge: "Flexible Subscriptions",
  payment_title: "Transparent Healthcare Access",
  cta_title: "Scale Your Hospital Impact Today.",
  cta_desc: "Join the network of world-class healthcare providers utilizing GembeEduPro to reduce readmissions and improve patient outcomes.",
  cta_button: "Get Started Now",
};

export const LandingPage = ({ currentLang, onNavigate }: { currentLang: Language; onNavigate: (page: string) => void }) => {
  const t = translations[currentLang];
  const { content } = useContent(DEFAULT_CONTENT);

  const renderSplittableText = (text: string, index: number) => {
    if (!text) return "";
    const parts = text.split(',');
    return (parts[index] || "").trim();
  };

  const getBlockchainTitlePart = (part: number) => {
     const title = content.blockchain_title || DEFAULT_CONTENT.blockchain_title;
     if (part === 0) return renderSplittableText(title, 0);
     const secondPart = renderSplittableText(title, 1);
     const words = secondPart.split(' ');
     if (part === 1) return words[1] || "";
     return words[words.length - 1] || "";
  };

  return (
    <div className="pt-16 min-h-screen bg-white overflow-x-hidden font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[150px] rounded-full -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 mb-8 border border-white/10 shadow-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">African Healthcare Revolution</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter italic">
                Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  {content.hero_title}
                </span>
              </h1>
              
              <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-bold">
                {content.hero_subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => onNavigate('auth')}
                  size="lg" 
                  className="bg-slate-900 hover:bg-slate-800 text-white h-20 px-12 text-2xl font-black rounded-[32px] shadow-2xl transition-all hover:scale-105 active:scale-95 group"
                >
                  {content.hero_cta_primary} 
                  <ChevronRight className="ml-3 w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-20 px-12 text-2xl font-black rounded-[32px] border-slate-200 text-slate-900 hover:bg-slate-50"
                  onClick={() => onNavigate('auth')}
                >
                  {content.hero_cta_secondary}
                </Button>
              </div>

              <div className="mt-16 flex items-center gap-16">
                 {[
                   { label: content.stat_users_label, val: content.stat_users_val },
                   { label: 'AI Accuracy', val: content.stat_accuracy_val },
                   { label: 'Global Nodes', val: content.stat_countries_val }
                 ].map((stat, i) => (
                   <div key={i}>
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                   </div>
                 ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[80px] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] border-[12px] border-white/50 backdrop-blur-3xl">
                <img 
                  src={IMAGES.hero} 
                  alt="High-End Health Tech"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                
                {/* Floating Micro-Card */}
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-[40px] bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="bg-emerald-500 p-4 rounded-3xl">
                         <ShieldCheck className="w-8 h-8 text-white" />
                      </div>
                      <div>
                         <p className="text-white font-black text-xl">Data Secured</p>
                         <p className="text-white/70 text-sm font-bold">Hashed on Blockchain</p>
                      </div>
                   </div>
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="pb-20">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
               <div className="flex items-center gap-3 font-black text-2xl italic"><Shield className="w-8 h-8" /> HIPAA</div>
               <div className="flex items-center gap-3 font-black text-2xl italic"><Lock className="w-8 h-8" /> ISO 27001</div>
               <div className="flex items-center gap-3 font-black text-2xl italic"><Globe className="w-8 h-8" /> GDPR</div>
               <div className="flex items-center gap-3 font-black text-2xl italic"><Fingerprint className="w-8 h-8" /> 2FA Ready</div>
            </div>
         </div>
      </section>

      {/* Blockchain Proof Section */}
      <section className="py-40 bg-slate-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
         </div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
               >
                  <img src={IMAGES.blockchain} alt="Blockchain security" className="rounded-[80px] shadow-2xl border-4 border-white/10" />
               </motion.div>
               
               <div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-none mb-8 px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">
                    {content.blockchain_badge}
                  </Badge>
                  <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] italic">
                    {getBlockchainTitlePart(0)}, <br />
                    {getBlockchainTitlePart(1)} <span className="text-emerald-500">{getBlockchainTitlePart(2)}</span>
                  </h2>
                  <p className="text-slate-400 text-2xl mb-16 leading-relaxed font-medium">
                    {content.blockchain_desc}
                  </p>
                  
                  <div className="grid gap-8">
                     {[
                       { title: "Smart Consent Protocols", desc: "Patients control access via cryptographic keys.", icon: <Lock className="w-7 h-7 text-emerald-500" /> },
                       { title: "Audit-Ready Ledger", desc: "Institutions prove compliance with real-time logs.", icon: <Database className="w-7 h-7 text-cyan-500" /> },
                       { title: "Verified Credentials", desc: "Doctor certifications are verified on-chain.", icon: <Star className="w-7 h-7 text-amber-500" /> }
                     ].map((item, i) => (
                       <div key={i} className="flex items-start gap-8 p-8 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                          <div className="p-4 rounded-3xl bg-white/5 group-hover:scale-110 transition-transform">
                             {item.icon}
                          </div>
                          <div>
                            <span className="text-2xl font-black block mb-1">{item.title}</span>
                            <p className="text-slate-400 font-medium">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Payments & Pricing */}
      <section className="py-40 bg-[#F8FAFC]">
         <div className="max-w-7xl mx-auto px-6">
            <PaymentManager />
         </div>
      </section>

      {/* Final Institutional CTA */}
      <section className="py-40">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-[100px] p-16 md:p-32 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-cyan-700/40" />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
               
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="relative z-10"
               >
                  <h2 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
                    Scale Your Impact <br /> Today.
                  </h2>
                  <p className="text-white/70 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-bold">
                    {content.cta_desc}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-8">
                     <Button 
                       onClick={() => onNavigate('auth')} 
                       size="lg" 
                       className="bg-white text-slate-900 hover:bg-slate-100 h-24 px-20 text-3xl font-black rounded-[40px] shadow-2xl transition-transform hover:scale-105 active:scale-95"
                     >
                       {content.cta_button}
                     </Button>
                     <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-24 px-20 text-3xl font-black rounded-[40px] backdrop-blur-md">
                       Contact Sales
                     </Button>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-32">
         <div className="max-w-7xl mx-auto px-6 text-slate-900">
            <div className="grid lg:grid-cols-4 gap-24 mb-24">
               <div className="col-span-2">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="bg-slate-900 p-2.5 rounded-2xl">
                        <ShieldCheck className="w-7 h-7 text-white" />
                     </div>
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">GembeEduPro</span>
                  </div>
                  <p className="text-slate-500 text-xl max-w-md font-bold leading-relaxed">
                    Bridging the gap between knowledge and care through AI, Blockchain, and cultural localization.
                  </p>
               </div>
               <div>
                  <h4 className="text-slate-900 font-black uppercase tracking-[0.2em] text-xs mb-10">Technology</h4>
                  <ul className="space-y-6 font-bold text-slate-500 text-lg">
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">AI Diagnostics</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Blockchain Ledger</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Virtual Care</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Security Stack</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-slate-900 font-black uppercase tracking-[0.2em] text-xs mb-10">Company</h4>
                  <ul className="space-y-6 font-bold text-slate-500 text-lg">
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Our Mission</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Hospital Network</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Privacy Center</li>
                     <li className="hover:text-emerald-600 transition-colors cursor-pointer">Contact</li>
                  </ul>
               </div>
            </div>
            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12">
               <p className="text-slate-400 font-bold text-sm">&copy; 2024 Gembe Health Global. AES-256 Secure.</p>
               <div className="flex flex-wrap justify-center gap-12 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                  <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-emerald-600 transition-colors">Data Processing Agreement</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};