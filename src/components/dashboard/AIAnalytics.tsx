import React from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  HeartPulse, 
  Scale, 
  Activity 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export const AIAnalytics = () => {
  const riskScores = [
    { label: 'Type II Diabetes', score: 24, level: 'Low', color: 'emerald' },
    { label: 'Hypertension', score: 68, level: 'Elevated', color: 'orange' },
    { label: 'Cardiovascular', score: 42, level: 'Moderate', color: 'blue' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            AI Health Insights <Sparkles className="w-6 h-6 text-emerald-600" />
          </h1>
          <p className="text-slate-500">Real-time predictive analytics based on your latest vitals.</p>
        </div>
        <Badge className="w-fit bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse">
          Live Data Stream Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-emerald-100 shadow-xl shadow-emerald-50">
          <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-sky-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Real-time Prediction Model</CardTitle>
                <CardDescription>Scientific Literature-based Scoring</CardDescription>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 relative flex items-end gap-3 mb-6">
              {[65, 59, 80, 81, 56, 55, 40, 67, 72, 85, 90, 78].map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-sky-400 rounded-t-sm group relative"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {val}% Risk Confidence
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Predicted Improvement</p>
                  <p className="text-xs text-slate-500">Based on current lifestyle changes</p>
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-600">+12.4%</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {riskScores.map((risk, i) => (
            <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-all">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-${risk.color}-500`} />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{risk.label}</p>
                    <p className={`text-xl font-black text-${risk.color}-600`}>{risk.score}%</p>
                  </div>
                  <Badge className={`bg-${risk.color}-100 text-${risk.color}-700 border-none`}>
                    {risk.level} Risk
                  </Badge>
                </div>
                <Progress value={risk.score} className={`h-2 bg-${risk.color}-50 [&>div]:bg-${risk.color}-500`} />
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  AI Analysis: Recent glucose spikes increase prediction confidence by 15%. Recommend specialist follow-up.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-slate-900 text-white border-none overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
               <ShieldAlert className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Lifestyle Disease Prevention</h3>
              <p className="text-slate-400 mb-6">
                Our AI has analyzed 10,000+ scientific journals to provide you with the most accurate risk determination possible. Keep syncing your wearable data for better precision.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2 text-yellow-400" /> Real-time Sync
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-4 py-2">
                  <Scale className="w-4 h-4 mr-2 text-sky-400" /> Clinical Evidence
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

import { Sparkles } from 'lucide-react';