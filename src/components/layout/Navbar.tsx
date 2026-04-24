import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  X,
  Stethoscope,
  Sparkles,
  Users,
  Video,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { translations, Language, languageNames } from '@/lib/languages';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

export const Navbar = ({ currentLang, setLang, onNavigate, activePage }: NavbarProps) => {
  const t = translations[currentLang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const navLinks = [
    { id: 'patient', label: t.patientDash, icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'provider', label: t.providerPortal, icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">GembeEduPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${activePage === link.id ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-full border border-slate-200 bg-slate-50"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                {languageNames[currentLang]}
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2"
                  >
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLang(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm ${currentLang === lang ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button onClick={() => onNavigate('auth')} className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200">
              {t.login}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
             <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 text-slate-600 bg-slate-100 rounded-full"
              >
                <Globe className="w-5 h-5" />
              </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 bg-slate-100 rounded-full">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-2xl z-40"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => {onNavigate(link.id); setIsMenuOpen(false)}}
                  className="flex items-center gap-3 w-full p-4 rounded-xl text-lg font-medium text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <Button onClick={() => {onNavigate('auth'); setIsMenuOpen(false)}} className="w-full bg-emerald-600 h-12 text-lg">
                  {t.login}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};