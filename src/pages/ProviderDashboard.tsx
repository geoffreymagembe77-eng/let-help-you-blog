import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  ChevronRight, 
  Filter, 
  Search, 
  Plus, 
  MoreVertical,
  LayoutDashboard,
  BookOpen,
  Video,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Stethoscope,
  ShieldAlert,
  CreditCard,
  Database,
  BarChart3,
  ShieldCheck,
  Fingerprint,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ProviderRole } from '@/types/auth';
import { BlockchainLedger } from '@/components/dashboard/BlockchainLedger';
import { toast } from 'sonner';

const IMAGES = {
  dashboard: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/provider-dashboard-c635d0e0-1777031659359.webp"
};

export const ProviderDashboard = ({ role = 'provider', onLogout }: { role?: ProviderRole; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Provider Overview' },
    { id: 'patients', icon: <Users className="w-5 h-5" />, label: 'Patient Census' },
    { id: 'analytics', icon: <Activity className="w-5 h-5" />, label: 'Clinical Analytics' },
    { id: 'ledger', icon: <ShieldCheck className="w-5 h-5" />, label: 'Health Ledger' },
    { id: 'virtual', icon: <Video className="w-5 h-5" />, label: 'Telemedicine' },
    { id: 'education', icon: <BookOpen className="w-5 h-5" />, label: 'Curriculum Mgr' },
    { id: 'billing', icon: <CreditCard className="w-5 h-5" />, label: 'Institution Billing' },
  ];

  if (role === 'super_admin') {
    sidebarItems.push({ id: 'staff', icon: <ShieldAlert className="w-5 h-5" />, label: 'Staff Management' });
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative"
              >
                 <div className="flex-1 relative z-10">
                    <Badge className="bg-cyan-50 text-cyan-600 border-none mb-4 font-black uppercase tracking-widest text-[10px]">Institutional Access</Badge>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Good Morning, Dr. Osei</h1>
                    <p className="text-slate-500 font-medium max-w-lg mb-8 text-lg">Your hospital has seen a <span className="text-emerald-600 font-bold">14% improvement</span> in patient education completion this month.</p>
                    <div className="flex flex-wrap gap-4">
                       <Button className="bg-slate-900 hover:bg-slate-800 h-14 px-8 rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95">Start Virtual Rounds</Button>
                       <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black hover:bg-slate-50 transition-all active:scale-95">Review Analytics</Button>
                    </div>
                 </div>
                 <div className="w-full md:w-1/3 relative">
                    <img src={IMAGES.dashboard} className="rounded-[32px] shadow-2xl border-8 border-white" alt="Provider Stats" />
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: 'Active Patients', val: '1,248', icon: <Users className="w-5 h-5" />, color: 'blue', change: '+5.4%' },
                   { label: 'Health Score', val: '84/100', icon: <Activity className="w-5 h-5" />, color: 'emerald', change: '+2.1%' },
                   { label: 'Edu Completion', val: '68%', icon: <BookOpen className="w-5 h-5" />, color: 'amber', change: '+12.5%' },
                   { label: 'Verified Blocks', val: '8.4k', icon: <Database className="w-5 h-5" />, color: 'cyan', change: '+3.2%' },
                 ].map((stat, i) => (
                   <Card key={i} className="border-none shadow-sm rounded-[32px] group hover:shadow-lg transition-all">
                      <CardContent className="p-8">
                         <div className="flex justify-between items-start">
                            <div className={`p-3.5 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-${stat.color}-600 group-hover:text-white transition-colors`}>
                               {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{stat.change} \u2191</span>
                         </div>
                         <p className="text-xs font-black text-slate-400 uppercase mt-6 tracking-[0.1em]">{stat.label}</p>
                         <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                      </CardContent>
                   </Card>
                 ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                 <Card className="lg:col-span-2 border-none shadow-sm rounded-[40px] overflow-hidden">
                    <CardHeader className="p-8">
                       <div className="flex items-center justify-between">
                          <div>
                             <CardTitle className="text-2xl font-black">High-Priority Patient Census</CardTitle>
                             <CardDescription className="font-medium">Patients flagged by AI for immediate clinical review.</CardDescription>
                          </div>
                          <Button variant="ghost" className="text-cyan-600 font-black hover:bg-cyan-50">View All Patients</Button>
                       </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                       <div className="space-y-4">
                          {[
                            { name: "Kwesi Mensah", condition: "Diabetes Type II", score: 92, risk: "High" },
                            { name: "Ayo Balogun", condition: "Hypertension", score: 84, risk: "High" },
                            { name: "Fatima Ahmed", condition: "Prenatal Care", score: 45, risk: "Low" },
                            { name: "John Okafor", condition: "Post-Op Recovery", score: 78, risk: "Medium" },
                          ].map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-[28px] bg-slate-50/50 hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-slate-100 transition-all group">
                               <div className="flex items-center gap-5">
                                  <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                                     <AvatarFallback className="bg-slate-200 text-slate-500 font-black text-lg">{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                     <p className="font-black text-slate-900 text-lg">{p.name}</p>
                                     <p className="text-sm font-medium text-slate-500">{p.condition}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-10">
                                  <div className="text-right hidden sm:block">
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Risk Score</p>
                                     <p className={`text-xl font-black ${
                                       p.score > 80 ? 'text-red-500' : p.score > 50 ? 'text-amber-500' : 'text-emerald-500'
                                     }`}>{p.score}%</p>
                                  </div>
                                  <Button size="lg" variant="outline" className="rounded-2xl font-black border-slate-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">Review Record</Button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>

                 <div className="space-y-8">
                    <Card className="border-none shadow-2xl rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-transparent" />
                       <CardHeader className="relative z-10 p-8">
                          <CardTitle className="flex items-center gap-3">
                             <div className="p-2.5 rounded-2xl bg-white/10">
                                <ShieldAlert className="w-6 h-6 text-cyan-400" />
                             </div>
                             Blockchain Integrity
                          </CardTitle>
                          <CardDescription className="text-slate-400 font-medium">Verification status for St. Peter's Hospital</CardDescription>
                       </CardHeader>
                       <CardContent className="relative z-10 p-8 pt-0 space-y-6">
                          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                             <div className="flex items-center justify-between mb-4">
                                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Mainnet Status</p>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[9px]">OPERATIONAL</Badge>
                             </div>
                             <p className="text-xs font-mono text-slate-300 mb-2 truncate">Block: 19,482,105</p>
                             <Progress value={100} className="h-1.5 bg-white/10 [&>div]:bg-cyan-500" />
                          </div>
                          <Button className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/20 transition-transform active:scale-95">
                             Verify Node Sync
                          </Button>
                       </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[40px] overflow-hidden">
                       <CardHeader className="p-8">
                          <CardTitle className="text-xl font-black">Upcoming Telemedicine</CardTitle>
                       </CardHeader>
                       <CardContent className="p-8 pt-0 space-y-4">
                          {[
                            { time: "10:30 AM", patient: "Kwesi M.", type: "Video Hub" },
                            { time: "11:15 AM", patient: "Sarah L.", type: "Virtual Chat" },
                          ].map((item, i) => (
                             <div key={i} className="flex items-center gap-5 p-5 rounded-3xl bg-slate-50 border border-slate-100/50 hover:shadow-md transition-all">
                                <div className="bg-white p-3 rounded-2xl text-cyan-600 shadow-sm">
                                   <Video className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                   <p className="font-black text-slate-900">{item.patient}</p>
                                   <p className="text-xs font-bold text-slate-400">{item.time} \u2022 {item.type}</p>
                                </div>
                                <Button size="sm" className="h-10 bg-cyan-600 font-black rounded-xl">Join</Button>
                             </div>
                          ))}
                       </CardContent>
                    </Card>
                 </div>
              </div>
          </div>
        );
      case 'ledger':
        return <BlockchainLedger />;
      case 'staff':
        return (
          <div className="space-y-8">
             <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-3xl font-black text-slate-900">Staff Management</h1>
                   <p className="text-slate-500 font-medium">Manage roles and access permissions for medical staff.</p>
                </div>
                <Button className="bg-slate-900 h-14 px-8 rounded-2xl font-black shadow-xl">Onboard New Staff</Button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Dr. Sarah K.', role: 'Senior Consultant', patients: 45, access: 'Full' },
                  { name: 'Nurse Michael O.', role: 'Nurse Practitioner', patients: 82, access: 'Standard' },
                  { name: 'Dr. Jane D.', role: 'Junior Resident', patients: 12, access: 'Restricted' },
                ].map((staff, i) => (
                  <Card key={i} className="border-none shadow-sm rounded-[32px] p-8">
                     <div className="flex items-center gap-5 mb-8">
                        <Avatar className="w-16 h-16">
                           <AvatarFallback className="bg-slate-100 text-slate-900 font-black">{staff.name.charAt(4)}</AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="text-lg font-black text-slate-900">{staff.name}</p>
                           <p className="text-sm font-medium text-slate-500">{staff.role}</p>
                        </div>
                     </div>
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between">
                           <span className="text-sm text-slate-400 font-bold">Active Patients</span>
                           <span className="text-sm text-slate-900 font-black">{staff.patients}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm text-slate-400 font-bold">Access Level</span>
                           <Badge className="bg-slate-100 text-slate-700 font-black uppercase text-[9px] border-none">{staff.access}</Badge>
                        </div>
                     </div>
                     <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-black">Edit Permissions</Button>
                  </Card>
                ))}
             </div>
          </div>
        );
      default:
        return <div className="text-center py-20 text-slate-400">Section coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col hidden lg:flex">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-cyan-600 p-2.5 rounded-2xl shadow-xl shadow-cyan-100">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">ProviderHub</span>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <nav className="py-4 space-y-2">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-sm font-black transition-all ${
                  activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-8 border-t border-slate-100">
           <div className="flex items-center gap-4 p-4 rounded-[28px] bg-slate-50 mb-6">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-cyan-100 text-cyan-700 font-black">DR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-black text-slate-900">Dr. Osei Tutu</p>
                <Badge variant="outline" className="text-[10px] uppercase font-black py-0.5 px-2 border-cyan-200 text-cyan-700">
                  {role.replace('_', ' ')}
                </Badge>
              </div>
           </div>
           <Button 
            onClick={onLogout}
            variant="ghost"
            className="w-full h-12 flex items-center gap-3 rounded-xl font-black text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
           >
              <LogOut className="w-5 h-5" /> Sign Out
           </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 z-20">
           <div className="flex items-center gap-6">
              <h2 className="text-xl font-black text-slate-900">Institutional Command Center</h2>
              <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none font-black text-[10px]">St. Peter's Hospital</Badge>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search patient records..." className="w-64 pl-10 h-11 bg-slate-50 border-none rounded-2xl hidden md:block" />
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 bg-slate-50 rounded-xl relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 bg-slate-50 rounded-xl">
                 <Settings className="w-5 h-5" />
              </Button>
           </div>
        </header>

        <ScrollArea className="flex-1 bg-[#F8FAFC]">
           <div className="max-w-7xl mx-auto p-10">
              {renderContent()}
           </div>
        </ScrollArea>
      </main>
    </div>
  );
};