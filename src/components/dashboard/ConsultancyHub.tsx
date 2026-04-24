import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  ShieldCheck,
  Users,
  Award,
  Clock,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export const ConsultancyHub = () => {
  const [search, setSearch] = useState('');
  
  const consultants = [
    {
      name: 'Dr. Kofi Mensah',
      title: 'Senior Cardiologist',
      hospital: 'Lagos General Hospital',
      rating: 4.9,
      reviews: 128,
      specialties: ['Heart Health', 'Hypertension'],
      price: '$45 / session',
      availability: 'Available Today',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Dr. Sarah Okafor',
      title: 'Diabetes Specialist',
      hospital: 'Nairobi Central Hospital',
      rating: 4.8,
      reviews: 94,
      specialties: ['Insulin Management', 'Nutrition'],
      price: '$40 / session',
      availability: 'Available Tomorrow',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Nurse Amara (AI Assistant)',
      title: 'Certified Health Educator',
      hospital: 'GembeEduPro Virtual',
      rating: 5.0,
      reviews: 1420,
      specialties: ['General Wellness', 'Disease Prevention'],
      price: 'Free / included',
      availability: 'Instantly Available',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-educator-avatar-0ef69183-1777020532939.webp'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Consultancy Review</h1>
          <p className="text-slate-500">Select elite consultants to monitor your progress and provide follow-up care.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-slate-200">Consultant Sign-up</Button>
           <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100">Manage Subscriptions</Button>
        </div>
      </div>

      <Card className="border-emerald-100 bg-emerald-50/50">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <Badge className="bg-emerald-600 mb-4">World-Class Standards</Badge>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Elevate Your Patient Journey</h2>
                <p className="text-slate-600 mb-6">
                  Subscribed patients can select a dedicated consultant for monthly progress reviews, tailored education plans, and direct communication channels. Reduce risk with expert oversight.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Monthly Reviews
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Direct Follow-ups
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Priority Support
                   </div>
                </div>
             </div>
             <div className="relative">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/consultancy-directory-0ee1d7be-1777028568496.webp" 
                  alt="Consultancy Hero" 
                  className="rounded-3xl shadow-2xl"
                />
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 mb-8">
         <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
              placeholder="Search consultants by name, specialty, or hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200">
            <Filter className="w-4 h-4 mr-2" /> Filter
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {consultants.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-slate-100 hover:shadow-2xl transition-all group">
              <div className="h-2 bg-emerald-600 w-full" />
              <CardContent className="p-6">
                <div className="flex gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-slate-100 ring-2 ring-emerald-50 ring-offset-2">
                    <AvatarImage src={c.image} />
                    <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{c.name}</h3>
                    <p className="text-sm text-slate-500">{c.title}</p>
                    <p className="text-xs text-slate-400">{c.hospital}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                   <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-slate-700">{c.rating}</span>
                      <span className="text-[10px] text-slate-400">({c.reviews})</span>
                   </div>
                   <div className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {c.specialties.map(s => (
                    <Badge key={s} variant="secondary" className="bg-slate-100 text-slate-600 border-none">{s}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-6">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fee</p>
                      <p className="text-sm font-black text-slate-900">{c.price}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                      <p className="text-[10px] font-bold text-emerald-600">{c.availability}</p>
                   </div>
                </div>

                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 rounded-xl">
                   Select Consultant
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};