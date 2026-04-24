import React from 'react';
import { 
  ArrowUpRight, 
  BarChart3
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const HealthTrends = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div>
        <h1 className="text-2xl font-bold text-slate-900">Health Trends</h1>
        <p className="text-slate-500 font-medium">Track your progress and share secure logs with your clinical team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-none shadow-xl bg-white rounded-[32px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900">Blood Pressure</h3>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">Historical Analysis</p>
            </div>
            <Badge variant="outline" className="rounded-lg border-slate-100 font-bold text-slate-500 px-3 py-1">Last 7 Days</Badge>
          </div>
          <div className="h-56 flex items-end gap-3 px-2 mb-8">
            {[120, 118, 125, 122, 115, 119, 121].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div 
                    className="w-full bg-blue-50 rounded-t-xl transition-all group-hover:bg-blue-600 cursor-pointer"
                    style={{ height: `${(val/150) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-400 font-black">DAY {i+1}</span>
               </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <span className="text-sm font-black text-slate-600">Avg: 119/80 mmHg</span>
             </div>
             <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase tracking-widest">STABLE</Badge>
          </div>
        </Card>

        <Card className="p-8 border-none shadow-xl bg-white rounded-[32px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900">Physical Activity</h3>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">Milestone Tracking</p>
            </div>
            <Badge variant="outline" className="rounded-lg border-slate-100 font-bold text-slate-500 px-3 py-1">Monthly View</Badge>
          </div>
          <div className="h-56 flex items-end gap-3 px-2 mb-8">
            {[45, 60, 30, 80, 20, 55, 90].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div 
                    className="w-full bg-emerald-50 rounded-t-xl transition-all group-hover:bg-emerald-600 cursor-pointer"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-400 font-black">{i+10}TH</span>
               </div>
            ))}
          </div>
           <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-sm font-black text-slate-600">Total: 12.4 hrs</span>
             </div>
             <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <ArrowUpRight className="w-3 h-3" /> +5% INCREASE
             </div>
          </div>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white border-none rounded-[32px] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)]" />
        <CardContent className="p-10 relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                 <h3 className="text-2xl font-black">Comprehensive Health Sync</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">Your data is analyzed using our proprietary AI models to predict potential risk factors before they become emergencies. 98% prediction accuracy for lifestyle complications.</p>
                 <div className="flex gap-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl h-12 px-8">
                      Export Clinical Report
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-black rounded-xl h-12 px-8">
                      Sync Wearable
                    </Button>
                 </div>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                 <BarChart3 className="w-24 h-24 text-emerald-400" />
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};