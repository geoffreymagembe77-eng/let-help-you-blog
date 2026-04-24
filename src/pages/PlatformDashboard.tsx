import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  Database,
  Search,
  ArrowUpRight,
  MoreVertical,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  FileText,
  Edit
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContentManager } from '@/components/dashboard/ContentManager';

const IMAGES = {
  admin: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/platform-admin-dashboard-df7ce926-1777031659122.webp",
  blockchain: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/blockchain-medical-records-44f1b109-1777031659244.webp"
};

export const PlatformDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Patients', value: '1,284,502', change: '+12.5%', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { label: 'Active Hospitals', value: '342', change: '+4.2%', icon: <Activity className="w-5 h-5 text-emerald-600" /> },
    { label: 'Revenue (ARR)', value: '$12.4M', change: '+28%', icon: <CreditCard className="w-5 h-5 text-purple-600" /> },
    { label: 'System Uptime', value: '99.99%', change: 'Stable', icon: <Zap className="w-5 h-5 text-amber-600" /> },
  ];

  const recentHospitals = [
    { name: "Lagos University Teaching Hospital", region: "Nigeria", tier: "Premium", status: "Active" },
    { name: "Kenyatta National Hospital", region: "Kenya", tier: "Enterprise", status: "Active" },
    { name: "Groote Schuur Hospital", region: "South Africa", tier: "Basic", status: "Pending" },
    { name: "Korle Bu Teaching Hospital", region: "Ghana", tier: "Enterprise", status: "Active" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">AdminPro</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {[
            { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Global Overview' },
            { id: 'content', icon: <Edit className="w-5 h-5" />, label: 'Content Manager' },
            { id: 'hospitals', icon: <Activity className="w-5 h-5" />, label: 'Institution Management' },
            { id: 'revenue', icon: <CreditCard className="w-5 h-5" />, label: 'Finance & Payments' },
            { id: 'blockchain', icon: <Database className="w-5 h-5" />, label: 'Blockchain Audit' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
              <Avatar className="w-10 h-10 border-2 border-emerald-500">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">System Admin</p>
                <p className="text-xs text-slate-500 truncate">super-admin@gembe.pro</p>
              </div>
           </div>
           <button 
            onClick={onLogout}
            className="w-full mt-4 flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
           >
              <LogOut className="w-4 h-4" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-8">
           <h2 className="text-lg font-bold text-white uppercase tracking-widest">Platform Dashboard</h2>
           <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input className="bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-emerald-500" placeholder="Search platform..." />
              </div>
              <button className="p-2 text-slate-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </button>
           </div>
        </header>

        <ScrollArea className="flex-1 p-8">
           <div className="max-w-7xl mx-auto">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Hero Banner */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-64 rounded-3xl overflow-hidden border border-slate-800"
                  >
                     <img src={IMAGES.admin} className="w-full h-full object-cover opacity-60" alt="Admin View" />
                     <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent p-12 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">System Status: Optimal</Badge>
                        <h1 className="text-4xl font-black text-white mb-4">Global Health Infrastructure</h1>
                        <p className="text-slate-400 max-w-lg">Monitoring cross-border patient education delivery and institutional compliance in real-time.</p>
                     </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {stats.map((stat, i) => (
                       <Card key={i} className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors group">
                          <CardContent className="p-6">
                             <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-2xl bg-slate-800 group-hover:bg-emerald-500/10 transition-colors">
                                   {stat.icon}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                                   <TrendingUp className="w-3 h-3" /> {stat.change}
                                </div>
                             </div>
                             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                             <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                          </CardContent>
                       </Card>
                     ))}
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                     {/* Hospital Table */}
                     <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between">
                           <div>
                              <CardTitle className="text-white">Recently Onboarded Institutions</CardTitle>
                              <CardDescription className="text-slate-500">Global institutional growth metrics.</CardDescription>
                           </div>
                           <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white">View All</Button>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                              {recentHospitals.map((hospital, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center font-black text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                          {hospital.name.charAt(0)}
                                       </div>
                                       <div>
                                          <p className="font-bold text-white">{hospital.name}</p>
                                          <div className="flex items-center gap-2 text-xs text-slate-500">
                                             <Globe className="w-3 h-3" /> {hospital.region} • {hospital.tier}
                                          </div>
                                       </div>
                                    </div>
                                    <Badge className={hospital.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}>
                                       {hospital.status}
                                    </Badge>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>

                     {/* Blockchain Audit */}
                     <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                        <CardHeader>
                           <CardTitle className="text-white flex items-center gap-2">
                              <Database className="w-5 h-5 text-emerald-500" /> 
                              Secure Audit Ledger
                           </CardTitle>
                           <CardDescription className="text-slate-500">Real-time blockchain verification.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <img src={IMAGES.blockchain} className="w-full h-32 object-cover rounded-2xl mb-4 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Blockchain" />
                           <div className="space-y-4">
                              {[
                                { tx: "0x7a...4e21", type: "Patient Consent", time: "2m ago" },
                                { tx: "0xf3...8b10", type: "Credential Sync", time: "5m ago" },
                                { tx: "0x2d...c944", type: "Billing Update", time: "12m ago" },
                              ].map((log, i) => (
                                 <div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                                    <div>
                                       <p className="font-mono text-emerald-400">{log.tx}</p>
                                       <p className="text-slate-500 mt-1">{log.type}</p>
                                    </div>
                                    <span className="text-slate-600">{log.time}</span>
                                 </div>
                              ))}
                           </div>
                           <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl">
                              Access Full Ledger
                           </Button>
                        </CardContent>
                     </Card>
                  </div>

                  {/* System Health Section */}
                  <Card className="bg-slate-900 border-slate-800">
                     <CardContent className="p-8">
                        <div className="grid md:grid-cols-3 gap-12 items-center">
                           <div className="space-y-4">
                              <h3 className="text-xl font-bold text-white">System Performance</h3>
                              <p className="text-sm text-slate-500">Core infrastructure latency and Edge Function execution rates across the African region.</p>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-bold">API Gateway: 42ms</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-xs font-bold">Database: 12ms</span>
                                 </div>
                              </div>
                           </div>
                           <div className="md:col-span-2 space-y-6">
                              <div className="space-y-2">
                                 <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-slate-400">CPU Usage</span>
                                    <span className="text-emerald-400">24%</span>
                                 </div>
                                 <Progress value={24} className="h-1.5 bg-slate-800 [&>div]:bg-emerald-500" />
                              </div>
                              <div className="space-y-2">
                                 <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-slate-400">Network Bandwidth</span>
                                    <span className="text-blue-400">62%</span>
                                 </div>
                                 <Progress value={62} className="h-1.5 bg-slate-800 [&>div]:bg-blue-500" />
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'content' && (
                <ContentManager />
              )}
              
              {activeTab !== 'overview' && activeTab !== 'content' && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                   <Settings className="w-16 h-16 text-slate-800 mb-6" />
                   <h3 className="text-2xl font-bold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
                   <p className="text-slate-500 mt-2">This module is currently being optimized for high-performance administration.</p>
                </div>
              )}
           </div>
        </ScrollArea>
      </main>
    </div>
  );
};