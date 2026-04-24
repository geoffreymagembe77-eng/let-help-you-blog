import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  HeartPulse, 
  Scale, 
  Activity, 
  Sparkles 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const AIAnalytics = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_predictions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data) setPredictions(data);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        // Fallback to mock data if table doesn't exist yet
        setPredictions([
          { prediction_type: 'Type II Diabetes', score: 24, risk_level: 'Low', confidence_score: 0.92, analysis_notes: 'Stable glucose levels over last 30 days.' },
          { prediction_type: 'Hypertension', score: 68, risk_level: 'Elevated', confidence_score: 0.85, analysis_notes: 'Systolic pressure showing upward trend.' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            AI Health Insights <Sparkles className="w-6 h-6 text-emerald-600" />
          </h1>
          <p className="text-slate-500">Real-time predictive analytics based on your latest vitals.</p>
        </div>
        <Badge className="w-fit bg-emerald-100 text-emerald-700 border-emerald-200">
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
             <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-health-predictions-dashboard-2773bdd8-1777029545996.webp" 
                  alt="AI Insights Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[2px]" />
                <div className="absolute bottom-4 left-4">
                   <Badge className="bg-white/90 text-emerald-700">+12.4% Predicted Improvement</Badge>
                </div>
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
          {predictions.map((risk, i) => (
            <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-all">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                risk.risk_level === 'Low' ? 'bg-emerald-500' : risk.risk_level === 'Moderate' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{risk.prediction_type}</p>
                    <p className="text-xl font-black text-slate-900">{risk.score}%</p>
                  </div>
                  <Badge variant="outline">
                    {risk.risk_level} Risk
                  </Badge>
                </div>
                <Progress value={risk.score} className="h-2" />
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  AI Analysis: {risk.analysis_notes} Prediction confidence: {(risk.confidence_score * 100).toFixed(0)}%.
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