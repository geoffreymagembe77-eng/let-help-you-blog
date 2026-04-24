import React from 'react';
import { motion } from 'framer-motion';
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
  TrendingUp,
  Map,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export const GembeEduProDashboard = ({ onLogout }: { onLogout: () => void }) => {
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col hidden lg:flex fixed h-full">
        <div className="p-8">
           <div className="flex items-center gap-3 mb-10">
              <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">GembeAdmin</span>
           </div>
           
           <nav className="space-y-2">
              {[
                { label: 'Platform Overview', icon: <BarChart3 className="w-5 h-5" />, active: true },
                { label: 'Hospital Network', icon: <Building2 className="w-5 h-5" /> },
                { label: 'Global Analytics', icon: <Globe className="w-5 h-5" /> },
                { label: 'Blockchain Ledger', icon: <Database className="w-5 h-5" /> },
                { label: 'Subscription Plans', icon: <CreditCard className="w-5 h-5" /> },
                { label: 'System Health', icon: <Activity className="w-5 h-5" /> },
                { label: 'Platform Settings', icon: <Settings className="w-5 h-5" /> },
              ].map((item, i) => (
                <button 
                  key={i} 
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    item.active 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                   {item.icon} {item.label}
                </button>
              ))}
           </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-100">
           <div className="p-4 rounded-[24px] bg-slate-50 mb-6">
              <div className="flex items-center gap-3 mb-4">
                 <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">AD</AvatarFallback>
                 </Avatar>
                 <div>
                    <p className="text-sm font-black text-slate-900">System Root</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Super Admin</p>
                 </div>
              </div>
              <Button onClick={onLogout} variant="outline" className="w-full h-10 rounded-xl border-slate-200 text-slate-500 font-bold hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
           </div>
           <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-widest">v4.2.0-stable</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-72">
         <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <h1 className="text-xl font-black text-slate-900">Platform Command Center</h1>
               <Badge className="bg-emerald-100 text-emerald-700 border-none font-black uppercase tracking-widest text-[10px]">Live Performance</Badge>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input placeholder="Search hospitals, nodes, users..." className="w-80 pl-10 h-11 bg-slate-50 border-none rounded-2xl" />
               </div>
               <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
               </Button>
            </div>
         </header>

         <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-8">
               {/* Hero Banner */}
               <div className="relative rounded-[48px] bg-slate-900 overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
                  <div className="relative z-10 flex-1">
                     <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Global Health <br /> <span className="text-emerald-400">Expansion</span> Dashboard</h2>
                     <p className="text-slate-400 text-lg font-medium max-w-xl mb-10">
                       Real-time monitoring of GembeEduPro's footprint across the African continent. Scalability: 98% efficient.
                     </p>
                     <div className="flex gap-4">
                        <Button className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-900/20">
                          Onboard New Institution
                        </Button>
                        <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5 font-black rounded-2xl backdrop-blur-md">
                          Generate Global Report
                        </Button>
                     </div>
                  </div>
                  <div className="relative z-10 w-full md:w-1/2">
                     <img 
                       src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/platform-dashboard-hero-5715a183-1777039179897.webp" 
                       className="rounded-[40px] shadow-2xl border-4 border-white/5"
                       alt="Platform Vision"
                     />
                  </div>
               </div>

               {/* Quick Stats */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm rounded-[32px] bg-white group hover:shadow-xl transition-all">
                       <CardContent className="p-8">
                          <div className="flex justify-between items-start mb-6">
                             <div className="p-3.5 rounded-2xl bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                {stat.icon}
                             </div>
                             <Badge className={`${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} border-none font-black`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {stat.trend}
                             </Badge>
                          </div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                          <p className="text-3xl font-black text-slate-900 mt-1">{stat.val}</p>
                       </CardContent>
                    </Card>
                  ))}
               </div>

               <div className="grid lg:grid-cols-3 gap-8">
                  {/* Institutions List */}
                  <Card className="lg:col-span-2 border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
                     <CardHeader className="p-8 pb-0">
                        <div className="flex items-center justify-between">
                           <div>
                              <CardTitle className="text-2xl font-black">Recent Institution Onboarding</CardTitle>
                              <CardDescription className="font-medium">Track hospital network growth and health scores.</CardDescription>
                           </div>
                           <Button variant="ghost" className="text-slate-500 font-bold hover:bg-slate-50">
                             View All <ChevronRight className="w-4 h-4 ml-1" />
                           </Button>
                        </div>
                     </CardHeader>
                     <CardContent className="p-8">
                        <div className="space-y-4">
                           {recentHospitals.map((h, i) => (
                             <div key={i} className="flex items-center justify-between p-6 rounded-[28px] bg-slate-50 hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-slate-100 transition-all">
                                <div className="flex items-center gap-6">
                                   <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                                      <Building2 className="w-7 h-7 text-slate-400" />
                                   </div>
                                   <div>
                                      <p className="font-black text-slate-900 text-lg">{h.name}</p>
                                      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                                         <span className="flex items-center gap-1"><Map className="w-3.5 h-3.5" /> {h.location}</span>
                                         <span className="w-1 h-1 rounded-full bg-slate-300" />
                                         <span>{h.beds} Beds</span>
                                      </div>
                                   </div>
                                </div>
                                <div className="flex items-center gap-8">
                                   <div className="text-right hidden sm:block">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                      <Badge className={`mt-1 font-black ${h.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} border-none uppercase text-[9px]`}>
                                         {h.status}
                                      </Badge>
                                   </div>
                                   <div className="text-right hidden sm:block">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                                      <p className="font-black text-slate-900">{h.revenue}</p>
                                   </div>
                                   <Button size="icon" variant="ghost" className="rounded-xl">
                                      <MoreVertical className="w-5 h-5 text-slate-400" />
                                   </Button>
                                </div>
                             </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  {/* Growth Analytics Card */}
                  <Card className="border-none shadow-xl rounded-[40px] bg-slate-900 text-white overflow-hidden">
                     <CardHeader className="p-8">
                        <CardTitle className="text-2xl font-black">Growth Projection</CardTitle>
                        <CardDescription className="text-slate-400">Regional impact analysis for Q4 2024.</CardDescription>
                     </CardHeader>
                     <CardContent className="p-8 space-y-8">
                        <div className="relative h-48 flex items-end justify-between gap-3">
                           {[30, 45, 60, 40, 75, 90, 85].map((h, i) => (
                             <motion.div 
                               key={i}
                               initial={{ height: 0 }}
                               animate={{ height: `${h}%` }}
                               transition={{ delay: i * 0.1, duration: 1 }}
                               className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl"
                             />
                           ))}
                        </div>
                        
                        <div className="space-y-6">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                 <span className="text-sm font-bold">Patient Engagement</span>
                              </div>
                              <span className="font-black">+42%</span>
                           </div>
                           <Progress value={75} className="h-1.5 bg-white/10 [&>div]:bg-emerald-500" />
                           
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                 <span className="text-sm font-bold">AI Accuracy</span>
                              </div>
                              <span className="font-black">99.9%</span>
                           </div>
                           <Progress value={99} className="h-1.5 bg-white/10 [&>div]:bg-cyan-500" />
                        </div>

                        <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl">
                           View Expansion Map
                        </Button>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};