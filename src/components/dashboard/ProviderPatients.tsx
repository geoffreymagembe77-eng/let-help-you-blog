import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const ProviderPatients = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Patient Census</h1>
          <p className="text-slate-500 font-medium">Monitoring 24 patients under your direct care with E2E encryption.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 h-14 px-8 rounded-2xl font-black shadow-xl shadow-slate-200">
          <Plus className="w-5 h-5 mr-2" /> Register Patient
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <Input className="pl-12 h-14 rounded-2xl bg-white border-slate-200 focus-visible:ring-emerald-500 font-bold" placeholder="Secure patient lookup..." />
        </div>
        <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black flex items-center gap-2 hover:bg-slate-50 transition-all">
          <Filter className="w-4 h-4" /> Advanced Filters
        </Button>
      </div>

      <Card className="bg-white rounded-[32px] border-none shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-10 py-6">Clinical Identity</th>
                <th className="px-6 py-6">Condition / Risk</th>
                <th className="px-6 py-6">Edu Progress</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Kwesi Mensah", age: 45, disease: "Diabetes Type II", progress: 72, risk: "Low", color: "emerald" },
                { name: "Ayo Balogun", age: 62, disease: "Hypertension", progress: 15, risk: "High", color: "red" },
                { name: "Sarah Ibrahim", age: 29, disease: "Pregnancy Care", progress: 94, risk: "Low", color: "emerald" },
                { name: "James Adeyemi", age: 54, disease: "Cardiovascular", progress: 48, risk: "Moderate", color: "amber" },
              ].map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-4 border-white shadow-sm">
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-black">{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.age} YEARS \u2022 ID: #PT-{(1000+i)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-2">
                       <Badge variant="outline" className="text-[10px] font-black border-slate-200 uppercase tracking-widest">{p.disease}</Badge>
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${p.color}-500 animate-pulse`} />
                          <span className="text-[10px] font-black text-slate-500 uppercase">{p.risk} RISK</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="w-32">
                       <div className="flex justify-between items-center mb-1.5 text-[10px] font-black">
                          <span className="text-slate-400">{p.progress}%</span>
                          <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: `${p.progress}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-md">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-slate-50/30 text-center border-t border-slate-100">
           <Button variant="ghost" className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900">
              View Entire Institutional Census (24 Patients)
           </Button>
        </div>
      </Card>
    </div>
  );
};