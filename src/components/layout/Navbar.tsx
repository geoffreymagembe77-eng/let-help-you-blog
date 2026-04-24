import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  X,
  Stethoscope,
  Building2,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { translations, Language, languageNames } from '@/lib/languages';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (page: string) => void;
  activePage: string;
  onLogout?: () => void;
}

export const Navbar = ({ currentLang, setLang, onNavigate, activePage, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Ecosystem', icon: null },
    { id: 'auth', label: 'Patient Portal', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'auth', label: 'Institutional Access', icon: <Building2 className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="bg-slate-900 p-2.5 rounded-[18px] shadow-2xl shadow-slate-200 group-hover:scale-110 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter italic">GembeEduPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10">
               {navLinks.map((link, i) => (
                 <button 
                   key={i}
                   onClick={() => onNavigate(link.id)}
                   className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-emerald-600 ${activePage === link.id ? 'text-emerald-600' : 'text-slate-400'}`}
                 >
                   {link.label}
                 </button>
               ))}
            </div>
            
            <div className="h-10 w-[1px] bg-slate-100 mx-2" />

            <div className="flex items-center gap-4">
               <div className="relative">
                 <button 
                   onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                   className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 px-5 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                 >
                   <Globe className="w-4 h-4 text-emerald-600" />
                   {languageNames[currentLang]}
                   <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                 </button>
                 
                 <AnimatePresence>
                   {isLangMenuOpen && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       className="absolute right-0 mt-4 w-56 bg-white border border-slate-100 rounded-[28px] shadow-2xl p-3 z-[110]"
                     >
                       {(Object.keys(languageNames) as Language[]).map((lang) => (
                         <button
                           key={lang}
                           onClick={() => {
                             setLang(lang);
                             setIsLangMenuOpen(false);
                           }}
                           className={`w-full text-left px-5 py-4 rounded-xl text-sm font-black transition-all ${currentLang === lang ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-50 text-slate-400'}`}
                         >
                           {languageNames[lang]}
                         </button>
                       ))}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>

               {onLogout ? (
                 <Button 
                   onClick={onLogout} 
                   className="bg-red-50 text-red-600 hover:bg-red-100 font-black px-10 h-14 rounded-2xl border-none shadow-none"
                 >
                   <LogOut className="w-4 h-4 mr-2" /> Logout
                 </Button>
               ) : (
                 <Button 
                   onClick={() => onNavigate('auth')} 
                   className="bg-slate-900 hover:bg-slate-800 text-white font-black px-10 h-14 rounded-2xl shadow-2xl shadow-slate-200 transition-all hover:-translate-y-0.5"
                 >
                   Access Portals
                 </Button>
               )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-4 text-slate-900 bg-slate-50 rounded-2xl">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="lg:hidden fixed inset-0 top-0 bg-white z-[150] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
               <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-2.5 rounded-2xl">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">Gembe</span>
               </div>
               <button onClick={() => setIsMenuOpen(false)} className="p-4 text-slate-900 bg-slate-50 rounded-2xl">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="space-y-4 flex-1">
              {navLinks.map((link, i) => (
                <button 
                  key={i}
                  onClick={() => {onNavigate(link.id); setIsMenuOpen(false)}}
                  className="flex items-center justify-between w-full p-8 rounded-[40px] text-3xl font-black text-slate-900 bg-slate-50 hover:bg-slate-100 transition-all"
                >
                  {link.label}
                  <ChevronRight className="w-8 h-8 text-emerald-600" />
                </button>
              ))}
            </div>

            <div className="pt-10 flex flex-col gap-6">
               <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(languageNames) as Language[]).slice(0, 4).map((lang) => (
                     <button 
                        key={lang} 
                        onClick={() => {setLang(lang); setIsMenuOpen(false)}}
                        className={`p-6 rounded-[30px] border-2 text-sm font-black transition-all ${
                           currentLang === lang ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-400'
                        }`}
                     >
                        {languageNames[lang]}
                     </button>
                  ))}
               </div>
              <Button onClick={() => {onNavigate('auth'); setIsMenuOpen(false)}} className="w-full bg-emerald-600 hover:bg-emerald-700 h-24 text-3xl font-black rounded-[40px] shadow-2xl shadow-emerald-200">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};