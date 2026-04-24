import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Database, 
  Search, 
  RefreshCcw, 
  Link as LinkIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Transaction {
  id: string;
  hash: string;
  patientId: string;
  action: string;
  timestamp: string;
  status: 'verified' | 'pending';
  block: string;
}

export const BlockchainLedger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', hash: '0x7d2...f9a1', patientId: 'PAT-4829', action: 'Medical Record Entry', timestamp: '2 mins ago', status: 'verified', block: '19,482,102' },
    { id: '2', hash: '0x3a1...c4e2', patientId: 'PAT-1205', action: 'Education Milestone', timestamp: '15 mins ago', status: 'verified', block: '19,482,098' },
    { id: '3', hash: '0x9b5...e2d4', patientId: 'PAT-9932', action: 'Consent Authorization', timestamp: '42 mins ago', status: 'verified', block: '19,482,085' },
    { id: '4', hash: '0x2f8...a0b7', patientId: 'PAT-3381', action: 'Prescription Hash', timestamp: '1 hour ago', status: 'verified', block: '19,482,070' },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const newTx: Transaction = {
        id: Math.random().toString(),
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        patientId: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
        action: 'Vital Sync Verified',
        timestamp: 'Just now',
        status: 'verified',
        block: '19,482,105'
      };
      setTransactions([newTx, ...transactions.slice(0, 4)]);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            Blockchain Health Ledger
          </h2>
          <p className="text-slate-500 font-medium">Immutable verification of all healthcare interactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 px-4 py-1.5 rounded-full font-bold">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2 inline-block" />
            Network: Gembe-Chain Mainnet
          </Badge>
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="bg-slate-900 text-white rounded-xl flex items-center gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Ledger
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total Blocks', val: '19,482,105', icon: <Database className="w-4 h-4" /> },
          { label: 'Verification Time', val: '0.8s', icon: <Zap className="w-4 h-4" /> },
          { label: 'Active Validators', val: '42', icon: <Lock className="w-4 h-4" /> },
          { label: 'Integrity Score', val: '100%', icon: <CheckCircle2 className="w-4 h-4" /> },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-lg font-black text-slate-900">{stat.val}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl overflow-hidden rounded-[32px]">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Real-time Transaction Stream</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search Hash or ID..." 
                className="pl-10 h-10 rounded-xl bg-white border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-4">Transaction Hash</th>
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Action Type</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence initial={false}>
                  {transactions.map((tx) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="hover:bg-slate-50/50 transition-colors cursor-default group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <LinkIcon className="w-4 h-4" />
                          </div>
                          <span className="font-mono text-sm text-slate-600 font-bold">{tx.hash}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold">{tx.patientId}</Badge>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-900 text-sm">
                        {tx.action}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          {tx.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50/50 text-center border-t border-slate-100">
             <Button variant="ghost" className="text-slate-500 font-bold text-sm gap-2">
               View Full Ledger on Gembe-Explorer <ExternalLink className="w-4 h-4" />
             </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[40px] p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -mr-48 -mt-48" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-xl border border-white/10">
               <img 
                 src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/blockchain-ledger-f9ca3890-1777039180534.webp" 
                 className="w-32 h-32 rounded-2xl object-cover shadow-2xl" 
                 alt="Ledger Visualization" 
               />
            </div>
            <div className="flex-1">
               <h3 className="text-2xl font-black mb-2">Empowering Patients with Data Sovereignty</h3>
               <p className="text-slate-300 font-medium leading-relaxed max-w-2xl">
                 GembeEduPro uses decentralized ledger technology to ensure your medical history and educational achievements belong to YOU. No central authority can alter your records.
               </p>
            </div>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 rounded-2xl font-black shrink-0 transition-transform active:scale-95">
              Export Backup Key
            </Button>
         </div>
      </div>
    </div>
  );
};