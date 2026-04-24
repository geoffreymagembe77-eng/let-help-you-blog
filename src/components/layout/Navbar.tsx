import React from 'react';
import { Globe, LogOut, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Language } from '@/lib/languages';
import { Badge } from '@/components/ui/badge';

export const Navbar = ({ 
  currentLang, 
  setLang, 
  onNavigate,
  activePage,
  onLogout 
}: { 
  currentLang: Language; 
  setLang: (lang: Language) => void; 
  onNavigate: (page: string, options?: any) => void;
  activePage: string;
  onLogout?: () => void;
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'sw', label: 'Kiswahili' },
    { code: 'ha', label: 'Hausa' },
    { code: 'yo', label: 'Yoruba' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center bg-white/70 backdrop-blur-2xl border-b border-white">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-slate-900 p-2.5 rounded-xl shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">GembeEduPro</span>
            <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em]">Health Network</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('landing')} 
            className={`text-sm font-black uppercase tracking-widest transition-colors ${activePage === 'landing' ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-900'}`}
          >
            Home
          </button>
          <button 
            className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            Features
          </button>
          <button 
            className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            About Security
          </button>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-11 rounded-xl gap-2 font-black border-slate-100 border">
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === currentLang)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-2 border-slate-100">
              {languages.map(lang => (
                <DropdownMenuItem 
                  key={lang.code} 
                  onClick={() => setLang(lang.code)}
                  className="rounded-xl font-bold cursor-pointer"
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {onLogout ? (
             <Button 
               onClick={onLogout} 
               variant="outline"
               className="h-11 px-6 rounded-xl border-red-100 text-red-600 font-black hover:bg-red-50 hover:text-red-700 transition-all"
             >
               <LogOut className="w-4 h-4 mr-2" /> Exit
             </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                onClick={() => onNavigate('auth', { mode: 'login' })}
                className="h-11 px-6 font-black text-slate-900 uppercase text-xs tracking-widest hidden sm:flex hover:bg-slate-50 rounded-xl"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => onNavigate('auth', { mode: 'signup' })}
                className="h-11 px-8 bg-slate-900 text-white rounded-xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};