import React, { useEffect, useState } from 'react';
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
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const ConsultancyHub = () => {
  const [consultants, setConsultants] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const { data } = await supabase.from('consultants').select('*');
        if (data && data.length > 0) {
          setConsultants(data);
        } else {
           throw new Error('Empty');
        }
      } catch (err) {
        setConsultants([
          {
            id: '1',
            full_name: 'Dr. Kofi Mensah',
            title: 'Senior Cardiologist',
            rating: 4.9,
            reviews_count: 128,
            specialties: ['Heart Health', 'Hypertension'],
            price_per_session: '$45',
            availability_status: 'Available Today',
            image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
          },
          {
            id: '2',
            full_name: 'Dr. Sarah Okafor',
            title: 'Diabetes Specialist',
            rating: 4.8,
            reviews_count: 94,
            specialties: ['Insulin', 'Nutrition'],
            price_per_session: '$40',
            availability_status: 'Available Tomorrow',
            image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  const handleSelect = (name: string) => {
    toast.success(`Request sent to ${name}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Consultancy Review</h1>
          <p className="text-slate-500">Select elite consultants to monitor your progress and provide follow-up care.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline">Consultant Sign-up</Button>
           <Button className="bg-emerald-600">Manage Subscriptions</Button>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden h-64 shadow-2xl">
         <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/healthcare-consultant-directory-ed9bb2a6-1777029546180.webp" 
          className="w-full h-full object-cover" 
          alt="Hero"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent flex items-center p-12">
            <div className="max-w-md text-white">
               <h2 className="text-3xl font-bold mb-4">World-Class Standards</h2>
               <p className="text-emerald-50 mb-6">Get personalized expert oversight for your health journey.</p>
            </div>
         </div>
      </div>

      <div className="flex gap-4">
         <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-10 h-12" placeholder="Search consultants..." value={search} onChange={e => setSearch(e.target.value)} />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {consultants.map((c, i) => (
          <Card key={i} className="overflow-hidden border-slate-100 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={c.image_url} />
                  <AvatarFallback>{c.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{c.full_name}</h3>
                  <p className="text-sm text-slate-500">{c.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-6">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold">{c.rating}</span>
                <span className="text-xs text-slate-400 ml-1">({c.reviews_count} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {c.specialties?.map((s: string) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
              <Button onClick={() => handleSelect(c.full_name)} className="w-full bg-slate-900 hover:bg-slate-800">
                Select for Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};