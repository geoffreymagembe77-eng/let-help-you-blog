import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  LayoutDashboard,
  BookOpen,
  Video,
  Settings,
  Bell,
  LogOut,
  Stethoscope,
  ShieldAlert,
  CreditCard,
  Database,
  ShieldCheck,
  Fingerprint,
  Search,
  BarChart3,
  FileLock2,
  Terminal,
  Lock,
  Building2,
  UserCog,
  ClipboardCheck
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
import { SecurityService } from '@/lib/security';
import { toast } from 'sonner';

const IMAGES = {
  dashboard: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/dashboard-preview-ec16c8cb-1777039523616.webp",
  blockchain: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/medical-blockchain-586b93ba-1777039871861.webp"
};

export const ProviderDashboard = ({ role = 'provider', onLogout }: { role?: ProviderRole; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Command Center', roles: ['super_admin', 'admin', 'clinician', 'provider'] },
    { id: 'patients', icon: <Users className="w-5 h-5" />, label: 'Patient Census', roles: ['super_admin', 'admin', 'clinician', 'provider'] },
    { id: 'analytics', icon: <Activity className="w-5 h-5" />, label: 'Population Health', roles: ['super_admin', 'admin'] },
    { id: 'security', icon: <ShieldAlert className="w-5 h-5" />, label: 'Compliance & Audit', roles: ['super_admin', 'admin'] },
    { id: 'ledger', icon: <Database className="w-5 h-5" />, label: 'Blockchain Log', roles: ['super_admin', 'admin', 'clinician'] },
    { id: 'telemedicine', icon: <Video className="w-5 h-5" />, label: 'Virtual Hub', roles: ['clinician', 'provider', 'super_admin'] },
    { id: 'org', icon: <Building2 className="w-5 h-5" />, label: 'Org Admin', roles: ['super_admin'] },
  ];

  const visibleSidebarItems = sidebarItems.filter(item => item.roles.includes(role));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col lg:flex-row gap-12 items-center bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full -mr-32 -mt-32 opacity-50" />
                 <div className="flex-1 relative z-10">
                    <Badge className="bg-emerald-50 text-emerald-700 border-none mb-6 font-black uppercase tracking-widest text-[10px] px-3 py-1">Operational Status: Active</Badge>
                    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Portal Dashboard</h1>
                    <p className="text-slate-500 font-medium max-w-lg mb-10 text-xl leading-relaxed">
                      Managing institutional health data with <span className="text-cyan-600 font-bold">E2E Encryption</span> and real-time blockchain verification.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <Button className="bg-slate-900 hover:bg-slate-800 h-16 px-10 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-slate-200">Launch Virtual Clinic</Button>
                       <Button variant="outline" className="h-16 px-10 rounded-2xl border-slate-200 font-black text-lg hover:bg-slate-50 transition-all active:scale-95">Export HIPAA Logs</Button>
                    </div>
                 </div>
                 <div className="w-full lg:w-2/5 relative">
                    <img src={IMAGES.dashboard} className="rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] border-8 border-white" alt="Dashboard Stats" />
                 </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { label: 'Total Patients', val: '4,892', icon: <Users className="w-5 h-5" />, color: 'cyan', change: '+12%' },
                   { label: 'Verified Records', val: '124k', icon: <ShieldCheck className="w-5 h-5" />, color: 'emerald', change: '+4.2k' },
                   { label: 'Response Rate', val: '98.4%', icon: <Activity className="w-5 h-5" />, color: 'purple', change: '+2.1%' },
                   { label: 'Risk Flags', val: '12', icon: <ShieldAlert className="w-5 h-5" />, color: 'red', change: '-4' },
                 ].map((stat, i) => (
                   <Card key={i} className="border-none shadow-sm rounded-[32px] p-2 hover:shadow-xl transition-all group bg-white">
                      <CardContent className="p-8">
                         <div className="flex justify-between items-start">
                            <div className={`p-4 rounded-2xl transition-all ${
                              stat.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' : 
                              stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                              stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
                              'bg-red-50 text-red-600'
                            } group-hover:bg-slate-900 group-hover:text-white`}>
                               {stat.icon}
                            </div>
                            <Badge variant="outline" className="font-black text-[9px] border-emerald-100 text-emerald-600">{stat.change}</Badge>
                         </div>
                         <p className="text-[11px] font-black text-slate-400 uppercase mt-8 tracking-widest">{stat.label}</p>
                         <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">{stat.val}</p>
                      </CardContent>
                   </Card>
                 ))}
              </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-8">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-4xl font-black text-slate-900">Security & Compliance</h2>
                   <p className="text-slate-500 font-medium">Monitoring international data standards and PHI integrity.</p>
                </div>
                <div className="flex gap-4">
                   <Badge className="h-10 px-4 bg-emerald-50 text-emerald-700 border-none font-black flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> HIPAA COMPLIANT
                   </Badge>
                   <Badge className="h-10 px-4 bg-cyan-50 text-cyan-700 border-none font-black flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> GDPR PROTECTED
                   </Badge>
                </div>
             </div>

             <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
                   <CardHeader className="p-10 border-b border-slate-50">
                      <CardTitle className="text-2xl font-black">Encryption Activity Log</CardTitle>
                   </CardHeader>
                   <CardContent className="p-0">
                      <div className="divide-y divide-slate-50">
                         {[1,2,3,4,5].map(i => (
                            <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                               <div className="flex items-center gap-6">
                                  <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                                     <FileLock2 className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900">Patient Record Encryption</p>
                                     <p className="text-xs font-mono text-slate-400">ID: 0x82f...{i}9b | AES-256-GCM</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-xs font-black text-emerald-600">SECURE</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">{i * 2} mins ago</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>

                <Card className="bg-slate-950 text-white border-none rounded-[40px] p-10 relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <img src={IMAGES.blockchain} className="w-full h-full object-cover" alt="Security Bg" />
                   </div>
                   <div className="relative z-10">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-cyan-500 rounded-2xl">
                           <Terminal className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black">Security Health</h3>
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-400">Encryption Status</span>
                              <span className="font-black text-emerald-400">100%</span>
                           </div>
                           <Progress value={100} className="h-2 bg-white/10 [&>div]:bg-emerald-500" />
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-400">Blockchain Sync</span>
                              <span className="font-black text-cyan-400">92% Synchronized</span>
                           </div>
                           <Progress value={92} className="h-2 bg-white/10 [&>div]:bg-cyan-500" />
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-400">Access Control</span>
                              <span className="font-black text-amber-400">MFA Active</span>
                           </div>
                           <Progress value={100} className="h-2 bg-white/10 [&>div]:bg-amber-500" />
                        </div>
                     </div>

                     <Button className="w-full mt-12 h-14 bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl shadow-xl shadow-cyan-900/20">
                        Rotate Secret Keys
                     </Button>
                   </div>
                </Card>
             </div>
          </div>
        );
      case 'ledger':
        return <BlockchainLedger />;
      case 'org':
        return (
          <div className="space-y-8">
             <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-4xl font-black text-slate-900">Organization Admin</h2>
                   <p className="text-slate-500 font-medium">Manage staff roles, institutional billing, and high-level configuration.</p>
                </div>
                <Button className="bg-slate-900 h-14 px-8 rounded-2xl font-black">
                  <UserCog className="w-5 h-5 mr-2" /> Invite Staff
                </Button>
             </div>

             <div className="grid lg:grid-cols-3 gap-8">
                <Card className="border-none shadow-sm rounded-[32px] p-10 bg-white">
                   <h3 className="text-xl font-black mb-6">Staff Roles</h3>
                   <div className="space-y-4">
                      {[
                        { name: 'Dr. Osei Tutu', role: 'Super Admin', icon: <ShieldCheck className="w-4 h-4" /> },
                        { name: 'Dr. Sarah Ibrahim', role: 'Clinician', icon: <Stethoscope className="w-4 h-4" /> },
                        { name: 'James Adeyemi', role: 'Admin', icon: <UserCog className="w-4 h-4" /> }
                      ].map((staff, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                           <div className="flex items-center gap-3">
                             <div className="p-2 bg-white rounded-xl text-cyan-600">{staff.icon}</div>
                             <div>
                               <p className="font-bold text-slate-900 text-sm">{staff.name}</p>
                               <p className="text-[10px] text-slate-400 font-black uppercase">{staff.role}</p>
                             </div>
                           </div>
                           <Button variant="ghost" size="sm" className="text-[10px] font-black">MANAGE</Button>
                        </div>
                      ))}
                   </div>
                   <Button variant="outline" className="w-full mt-8 h-12 rounded-xl border-slate-200 font-black">View All Personnel</Button>
                </Card>
                
                <Card className="border-none shadow-sm rounded-[32px] p-10 bg-white">
                   <h3 className="text-xl font-black mb-6">Institutional Billing</h3>
                   <div className="space-y-6">
                      <div className="p-6 rounded-[24px] bg-slate-900 text-white">
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Balance</p>
                         <p className="text-3xl font-black">$24,850.00</p>
                         <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-400">
                           <Activity className="w-3 h-3" /> +12% from last month
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50">
                           <p className="text-[10px] font-black text-slate-400 uppercase">Licenses</p>
                           <p className="text-xl font-black">120 / 150</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50">
                           <p className="text-[10px] font-black text-slate-400 uppercase">Requests</p>
                           <p className="text-xl font-black">8.4k</p>
                        </div>
                      </div>
                   </div>
                   <Button className="w-full mt-8 h-12 rounded-xl bg-cyan-600 hover:bg-cyan-700 font-black shadow-lg shadow-cyan-100">Upgrade Plan</Button>
                </Card>

                <Card className="border-none shadow-sm rounded-[32px] p-10 bg-white">
                   <h3 className="text-xl font-black mb-6">Audit & Compliance</h3>
                   <div className="space-y-4">
                      {[
                        'Last HIPAA Audit: 2 days ago',
                        'Encryption Rotation: Successful',
                        'Node Sync: Primary Cluster',
                        'Access Log: 0 Anomalies'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <ClipboardCheck className="w-5 h-5 text-emerald-500" />
                           <span className="text-sm font-bold text-slate-600">{item}</span>
                        </div>
                      ))}
                   </div>
                   <Button variant="ghost" className="w-full mt-8 h-12 rounded-xl font-black text-cyan-600">Download Certificate</Button>
                </Card>
             </div>
          </div>
        );
      default:
        return <div className="text-center py-20 text-slate-400">Section coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50/30 overflow-hidden font-sans">
      {/* Modern Slim Sidebar */}
      <aside className="w-80 border-r border-slate-100 bg-white flex flex-col hidden lg:flex relative z-30">
        <div className="p-10 flex items-center gap-4">
          <div className="bg-slate-950 p-3 rounded-2xl shadow-xl shadow-slate-200">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Gembe</span>
            <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em]">{role.replace('_', ' ')}</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-6">
          <nav className="py-6 space-y-2">
            {visibleSidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] text-sm font-black transition-all ${
                  activeTab === item.id 
                  ? 'bg-slate-950 text-white shadow-2xl shadow-slate-300' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-10">
           <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-cyan-100 text-cyan-700 font-black">AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-black text-slate-900">Dr. Osei Tutu</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{role.replace('_', ' ')}</p>
                </div>
              </div>
              <Button 
                onClick={onLogout}
                variant="ghost"
                className="w-full h-10 flex items-center gap-2 rounded-xl font-black text-red-500 hover:bg-red-50 transition-all text-xs"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </Button>
           </div>
           <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mainnet Node Active</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-12 z-20 bg-white/70 backdrop-blur-xl border-b border-slate-100">
           <div className="flex items-center gap-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Secure lookup..." className="w-96 pl-12 h-14 bg-slate-50/50 border-none shadow-inner rounded-[24px] hidden md:block focus-visible:ring-cyan-500" />
              </div>
           </div>
           <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="w-14 h-14 text-slate-400 bg-slate-50 rounded-2xl relative">
                 <Bell className="w-6 h-6" />
                 <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </Button>
              <Button className="h-14 px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-2xl shadow-xl shadow-cyan-100 transition-all">
                 New Clinical Record
              </Button>
           </div>
        </header>

        <ScrollArea className="flex-1 bg-slate-50/50">
           <div className="max-w-7xl mx-auto p-12 pb-32">
              {renderContent()}
           </div>
        </ScrollArea>
      </main>
    </div>
  );
};