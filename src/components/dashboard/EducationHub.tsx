import React, { useState } from 'react';
import { 
  BookOpen, 
  Globe, 
  PlayCircle, 
  ChevronRight, 
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const EducationHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Cardiology', 'Diabetes', 'Nutrition', 'Mental Health', 'Pregnancy'];

  const lessons = [
    { title: "Managing Blood Sugar", cat: "Diabetes", lang: "Yoruba", premium: false, img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400" },
    { title: "Healthy Heart Diet", cat: "Cardiology", lang: "Swahili", premium: true, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" },
    { title: "Postnatal Care", cat: "Pregnancy", lang: "Hausa", premium: false, img: "https://images.unsplash.com/photo-1555252333-978fead06c92?auto=format&fit=crop&q=80&w=400" },
    { title: "Coping with Stress", cat: "Mental Health", lang: "English", premium: false, img: "https://images.unsplash.com/photo-1493839523149-2864fca44919?auto=format&fit=crop&q=80&w=400" },
    { title: "Antenatal Nutrition", cat: "Pregnancy", lang: "Amharic", premium: true, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
    { title: "Hypertension 101", cat: "Cardiology", lang: "Zulu", premium: false, img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400" },
  ];

  const handleStartLearning = (title: string, premium: boolean) => {
    if (premium) {
      toast.error("Institutional Access Required", {
        description: "This course is restricted to premium institutional accounts."
      });
      return;
    }
    toast.success(`Starting Lesson: ${title}`, {
      description: "Loading interactive content..."
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Education Hub</h1>
        <p className="text-slate-500 font-medium">Learn about your health in your native language.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.filter(item => selectedCategory === 'All' || item.cat === selectedCategory).map((item, i) => (
          <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all border-none bg-white rounded-[24px]">
            <div className="relative h-44 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-md font-bold">{item.cat}</Badge>
                {item.premium && (
                  <Badge className="bg-orange-500 text-white border-none flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3" /> Institutional
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-black text-slate-900 mb-2 text-lg leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-400 mb-6 flex items-center gap-2 font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" /> Available in {item.lang}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <PlayCircle className="w-4 h-4" /> 12 Lessons
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleStartLearning(item.title, item.premium)}
                  className="text-emerald-600 p-0 hover:bg-transparent font-black hover:text-emerald-700"
                >
                  Start Learning <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};