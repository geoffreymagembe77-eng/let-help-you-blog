import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Building2, 
  ShieldCheck, 
  Database, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  MoreVertical,
  Activity,
  Zap,
  Map,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Layout,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ContentManager } from '@/components/dashboard/ContentManager';
import { toast } from 'sonner';

export const GembeEduProDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Patients', val: '2.4M', icon: <Users className="w-5 h-5 text-emerald-600" />, trend: '+12%', up: true },
    { label: 'Onboarded Hospitals', val: '1,420', icon: <Building2 className="w-5 h-5 text-cyan-600" />, trend: '+8%', up: true },
    { label: 'Active Sessions', val: '15.8k', icon: <Zap className="w-5 h-5 text-amber-600" />, trend: '-2%', up: false },
    { label: 'Blockchain TXs', val: '42.1M', icon: <Database className="w-5 h-5 text-purple-600" />, trend: '+24%', up: true },
  ];

  const recentHospitals = [
    { name: "St. Mary's General", location: "Accra, Ghana", beds: 450, status: 'active', revenue: '$12,400' },
    { name: "Nairobi City Clinic", location: "Nairobi, Kenya", beds: 120, status: 'pending', revenue: '$0' },
    { name: "Victoria Falls Health", location: "Harare, Zimbabwe", beds: 280, status: 'active', revenue: '$8,200' },
    { name: "Lagos Central Hub", location: "Lagos, Nigeria", beds: 1200, status: 'active', revenue: '$45,000' },
  ];

  const handleAction = (action: string) => {
    toast.info(`Initializing ${action} sequence...`);
  };

  const menuItems = [
    { id: 'overview', label: 'Platform Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'content', label: 'Content Manager (CMS)', icon: <Layout className="w-5 h-5" /> },
    { id: 'network', label: 'Hospital Network', icon: <Building2 className="w-5 h-5" /> },
    { id: 'analytics', label: 'Global Analytics', icon: <Globe className="w-5 h-5" /> },
    { id: 'ledger', label: 'Blockchain Ledger', icon: <Database className="w-5 h-5" /> },
    { id: 'finance', label: 'Subscription Plans', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'health', label: 'System Health', icon: <Activity className="w-5 h-5" /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10">
             {/* Hero Banner */}
             <div className="relative rounded-[64px] bg-slate-900 overflow-hidden p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 shadow-2xl shadow-slate-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
                <div className="relative z-10 flex-1">
                   <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">Global Health <br /> <span className="text-emerald-400">Expansion</span> Protocol</h2>
                   <p className="text-slate-400 text-xl font-medium max-w-xl mb-12 leading-relaxed">
                     Real-time monitoring of GembeEduPro's footprint across the African continent. Multi-node synchronization efficiency: <span className="text-white font-black underline underline-offset-4 decoration-emerald-500">98%</span>.
                   </p>
                   <div className="flex flex-wrap gap-6">
                      <Button onClick={() => handleAction('Hospital Onboarding')} className="h-16 px-10 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[24px] shadow-2xl shadow-emerald-900/40 text-lg transition-all active:scale-95">
                        Onboard New Institution
                      </Button>
                      <Button variant="outline" onClick={() => handleAction('Global Report')} className="h-16 px-10 border-white/20 text-white hover:bg-white/5 font-black rounded-[24px] backdrop-blur-md text-lg transition-all active:scale-95">
                        Generate Global Report
                      </Button>
                   </div>
                </div>
                <div className="relative z-10 w-full md:w-2/5">
                   <img 
                     src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/platform-dashboard-hero-5715a183-1777039179897.webp" 
                     className="rounded-[48px] shadow-2xl border-8 border-white/5"
                     alt="Platform Vision"
                   />
                </div>
             </div>

             {/* Quick Stats */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm rounded-[40px] bg-white group hover:shadow-2xl transition-all">
                     <CardContent className="p-10">
                        <div className="flex justify-between items-start mb-8">
                           <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                              {stat.icon}
                           </div>
                           <Badge className={`${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} border-none font-black text-[10px] px-3 py-1`}>
                              {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                              {stat.trend}
                           </Badge>
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{stat.val}</p>
                     </CardContent>
                  </Card>
                ))}
             </div>

             <div className="grid lg:grid-cols-3 gap-10">
                {/* Institutions List */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[48px] overflow-hidden bg-white">
                   <CardHeader className="p-12 pb-0">
                      <div className="flex items-center justify-between">
                         <div>
                            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Institution Onboarding</CardTitle>
                            <CardDescription className="font-bold text-slate-400 mt-2 text-lg">Tracking hospital network growth and regional health scores.</CardDescription>
                         </div>
                         <Button variant="ghost" className="text-slate-400 font-black hover:text-slate-950 transition-colors uppercase tracking-widest text-xs">
                           View Full Registry <ChevronRight className="w-4 h-4 ml-1" />
                         </Button>
                      </div>
                   </CardHeader>
                   <CardContent className="p-12">
                      <div className="space-y-6">
                         {recentHospitals.map((h, i) => (
                           <div key={i} className="flex items-center justify-between p-8 rounded-[32px] bg-slate-50 hover:bg-white hover:shadow-2xl hover:ring-1 hover:ring-slate-100 transition-all cursor-pointer group">
                              <div className="flex items-center gap-8">
                                 <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-slate-900 transition-colors">
                                    <Building2 className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-900 text-xl tracking-tight">{h.name}</p>
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-[10px]">
                                       <span className="flex items-center gap-1.5"><Map className="w-3.5 h-3.5" /> {h.location}</span>
                                       <span className="w-1 h-1 rounded-full bg-slate-300" />
                                       <span>{h.beds} Clinical Beds</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-10">
                                 <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Regional Status</p>
                                    <Badge className={`mt-2 font-black ${h.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} border-none uppercase text-[10px] px-3 py-1.5 shadow-sm`}>
                                       {h.status}
                                    </Badge>
                                 </div>
                                 <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Revenue ARR</p>
                                    <p className="font-black text-slate-900 text-lg mt-1">{h.revenue}</p>
                                 </div>
                                 <Button size="icon" variant="ghost" className="rounded-2xl h-12 w-12 hover:bg-white hover:shadow-md">
                                    <MoreVertical className="w-6 h-6 text-slate-300 group-hover:text-slate-950 transition-colors" />
                                 </Button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>

                {/* Growth Analytics Card */}
                <Card className="border-none shadow-2xl rounded-[48px] bg-slate-950 text-white overflow-hidden relative group">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)]" />
                   <CardHeader className="p-12 pb-0">
                      <CardTitle className="text-3xl font-black">Growth Projection</CardTitle>
                      <CardDescription className="text-slate-500 font-bold mt-2">Regional impact analysis for Q4 2024.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-12 space-y-12 relative z-10">
                      <div className="relative h-56 flex items-end justify-between gap-4 px-2">
                         {[30, 45, 60, 40, 75, 90, 85].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ delay: i * 0.1, duration: 1 }}
                             className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                           />
                         ))}
                      </div>
                      
                      <div className="space-y-8">
                         <div className="space-y-4">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                  <span className="text-sm font-black uppercase tracking-widest">Patient Engagement</span>
                               </div>
                               <span className="font-black text-xl">+42%</span>
                            </div>
                            <Progress value={75} className="h-2 bg-white/5 [&>div]:bg-emerald-500 shadow-inner" />
                         </div>
                         
                         <div className="space-y-4">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                  <span className="text-sm font-black uppercase tracking-widest">AI Prediction Accuracy</span>
                               </div>
                               <span className="font-black text-xl">99.9%</span>
                            </div>
                            <Progress value={99} className="h-2 bg-white/5 [&>div]:bg-cyan-500 shadow-inner" />
                         </div>
                      </div>

                      <Button 
                        onClick={() => handleAction('Expansion Map')}
                        className="w-full h-20 bg-white text-slate-900 hover:bg-slate-100 font-black rounded-[24px] text-xl shadow-2xl transition-all active:scale-95"
                      >
                         Access Expansion Map
                      </Button>
                   </CardContent>
                </Card>
             </div>
          </div>
        );
      case 'content':
        return <ContentManager />;
      default:
        return <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Activity className="w-16 h-16 text-slate-200 animate-pulse" />
          <h3 className="text-2xl font-black text-slate-400">This module is currently syncing...</h3>
        </div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans animate-in fade-in duration-700">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-200 bg-white flex flex-col hidden lg:flex fixed h-full shadow-[20px_0_40px_rgba(0,0,0,0.01)]">
        <div className="p-10">
           <div className="flex items-center gap-4 mb-12">
              <div className="bg-slate-900 p-3.5 rounded-2xl shadow-2xl shadow-slate-200">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">GembeAdmin</span>
           </div>
           
           <nav className="space-y-2">
              {menuItems.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4.5 rounded-[24px] text-sm font-black transition-all ${
                    activeTab === item.id 
                    ? 'bg-slate-950 text-white shadow-2xl shadow-slate-300 translate-x-1' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                   {item.icon} {item.label}
                </button>
              ))}
           </nav>
        </div>
        
        <div className="mt-auto p-10 border-t border-slate-100">
           <div className="p-6 rounded-[32px] bg-slate-50 mb-8 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                 <Avatar className="w-12 h-12 border-4 border-white shadow-md">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-black">AD</AvatarFallback>
                 </Avatar>
                 <div>
                    <p className="text-sm font-black text-slate-900">System Root</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Super Admin</p>
                 </div>
              </div>
              <Button onClick={onLogout} variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-slate-500 font-black hover:bg-red-50 hover:text-red-600 transition-all">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out Securely
              </Button>
           </div>
           <p className="text-[10px] text-center text-slate-300 font-black uppercase tracking-widest tracking-[0.3em]">Build v4.2.0-stable</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-80">
         <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 px-10 flex items-center justify-between">
            <div className="flex items-center gap-8">
               <h1 className="text-2xl font-black text-slate-900">Platform Command Center</h1>
               <Badge className="bg-emerald-100 text-emerald-700 border-none font-black uppercase tracking-widest text-[10px] px-3 py-1 shadow-sm">Live Performance</Badge>
            </div>
            <div className="flex items-center gap-6">
               <div className="relative hidden xl:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Search hospitals, nodes, users..." className="w-96 pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" />
               </div>
               <Button variant="ghost" size="icon" className="relative h-14 w-14 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <Bell className="w-6 h-6 text-slate-400" />
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
               </Button>
            </div>
         </header>

         <div className="p-10">
            <div className="max-w-7xl mx-auto pb-32">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </main>
    </div>
  );
};