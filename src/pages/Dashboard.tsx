import React, { useState } from 'react';
import { 
  LogOut,
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Sparkles,
  Users,
  Video,
  ShieldCheck,
  Activity,
  ChevronRight
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Language, translations } from '@/lib/languages';

// Import Sub-components
import { AIAnalytics } from '@/components/dashboard/AIAnalytics';
import { CommunityHub } from '@/components/dashboard/CommunityHub';
import { ConsultancyHub } from '@/components/dashboard/ConsultancyHub';
import { VirtualHub } from '@/components/dashboard/VirtualHub';
import { EducationHub } from '@/components/dashboard/EducationHub';
import { AIEducator } from '@/components/dashboard/AIEducator';
import { HealthTrends } from '@/components/dashboard/HealthTrends';
import { ProviderPatients } from '@/components/dashboard/ProviderPatients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// --- Dashboard Layout ---

export const DashboardLayout = ({ 
  children, 
  activeTab, 
  setActiveTab,
  userRole = 'patient',
  currentLang,
  onLogout
}: { 
  children: React.ReactNode; 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  userRole?: 'patient' | 'provider' | 'admin';
  currentLang: Language;
  onLogout: () => void;
}) => {
  const t = translations[currentLang];
  
  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Command Center' },
    { id: 'education', icon: <BookOpen className="w-5 h-5" />, label: t.educationHub },
    { id: 'ai_chat', icon: <MessageSquare className="w-5 h-5" />, label: t.aiEducator },
    { id: 'ai_insights', icon: <Sparkles className="w-5 h-5" />, label: t.aiPredictions },
    { id: 'community', icon: <Users className="w-5 h-5" />, label: t.community },
    { id: 'virtual', icon: <Video className="w-5 h-5" />, label: t.virtualHub },
    { id: 'consultancy', icon: <ShieldCheck className="w-5 h-5" />, label: t.consultancy },
    { id: 'trends', icon: <Activity className="w-5 h-5" />, label: t.healthTrends },
  ];

  return (
    <div className="flex h-screen bg-slate-50 pt-16 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
        <div className="flex-1 py-8 px-6 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] text-sm font-black transition-all ${
                activeTab === item.id 
                ? 'bg-slate-950 text-white shadow-xl shadow-slate-200 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span className="tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
        <ScrollArea className="flex-1 p-6 md:p-12">
          <div className="max-w-6xl mx-auto pb-32">
            {children}
          </div>
        </ScrollArea>
      </main>

      {/* Mobile Nav - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 flex justify-around py-4 px-4 z-50 rounded-t-[32px] shadow-2xl">
        {sidebarItems.slice(0, 5).map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 p-2 transition-all ${
              activeTab === item.id ? 'text-slate-950 scale-110' : 'text-slate-300'
            }`}
          >
            {item.icon}
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Patient Views ---

const Overview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome, Kwesi</h1>
          <p className="text-slate-500 font-medium text-lg">Your health command center is active and synchronized.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-white text-slate-900 border-slate-100 shadow-sm py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest">Next Review: Oct 24</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 border-none shadow-sm py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Optimal Recovery
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Daily Activity', val: '6,432', sub: 'Steps Count', color: 'emerald', progress: 64 },
          { label: 'Glucose Level', val: '114', sub: 'mg/dL (Stable)', color: 'blue', progress: 45 },
          { label: 'Edu Progress', val: '72%', sub: '3 Modules Done', color: 'cyan', progress: 72 },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl bg-white rounded-[32px] p-2 hover:shadow-2xl transition-all group">
            <CardContent className="p-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <h3 className="text-4xl font-black text-slate-900">{stat.val}</h3>
                <span className="text-xs font-bold text-slate-400">{stat.sub}</span>
              </div>
              <Progress value={stat.progress} className="h-2 bg-slate-50" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-xl bg-white rounded-[40px] overflow-hidden">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-2xl font-black">Continuing Education</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-6">
            {[
              { title: "Insulin Management", time: "15 min", lang: "Swahili", progress: 100, color: "emerald" },
              { title: "Low Glycemic Diets", time: "10 min", lang: "Swahili", progress: 45, color: "blue" },
              { title: "Diabetes Foot Care", time: "20 min", lang: "English", progress: 0, color: "slate" },
            ].map((lesson, i) => (
              <div key={i} className="flex items-center gap-6 p-5 rounded-[24px] border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer">
                <div className={`bg-${lesson.color}-100 p-4 rounded-2xl text-${lesson.color}-600 shadow-inner`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-900">{lesson.title}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{lesson.lang} • {lesson.time}</p>
                </div>
                {lesson.progress === 100 ? (
                  <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] uppercase px-3 py-1.5">Mastered</Badge>
                ) : (
                  <span className="text-xs font-black text-slate-300">{lesson.progress}%</span>
                )}
              </div>
            ))}
            <Button variant="ghost" className="w-full h-14 rounded-2xl text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-black text-sm uppercase tracking-widest mt-4">
              View All Learning Modules <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-slate-950 text-white rounded-[40px] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-2xl font-black flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-emerald-400" /> 
              AI Health Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-8 backdrop-blur-md">
              <p className="text-lg text-slate-300 leading-relaxed font-medium italic">
                "I noticed your activity was lower yesterday. Even a short 10-minute walk can help stabilize your blood sugar level. Would you like to set a reminder for a morning walk?"
              </p>
              <Button className="mt-8 h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl shadow-xl shadow-emerald-900/40">
                Initialize Reminder
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Personalized Protocol</p>
              <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                Hydration Target: 2.5L Daily
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                Glucose Verification: Post-Lunch
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- Page Export ---

export const DashboardPage = ({ 
  currentLang, 
  role = 'patient',
  onLogout
}: { 
  currentLang: Language; 
  role?: 'patient' | 'provider';
  onLogout: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'education': return <EducationHub />;
      case 'ai_chat': return <AIEducator />;
      case 'ai_insights': return <AIAnalytics />;
      case 'community': return <CommunityHub />;
      case 'virtual': return <VirtualHub />;
      case 'consultancy': return <ConsultancyHub />;
      case 'trends': return <HealthTrends />;
      case 'patients': return <ProviderPatients />;
      default: return <Overview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userRole={role} currentLang={currentLang} onLogout={onLogout}>
      {renderContent()}
    </DashboardLayout>
  );
};