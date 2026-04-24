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
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const ConsultancyHub = () => {
  const [consultants, setConsultants] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        // Fallback for demo stability
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
          },
          {
            id: '3',
            full_name: 'Dr. Abebe Bikila',
            title: 'Neurology Expert',
            rating: 5.0,
            reviews_count: 210,
            specialties: ['Brain Health', 'Sleep'],
            price_per_session: '$55',
            availability_status: 'Available Monday',
            image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  const handleSelect = (id: string, name: string) => {
    setSelectedId(id);
    toast.success(`Elite Consultant Selected`, {
      description: `${name} will be notified to review your health logs.`
    });
  };

  const filteredConsultants = consultants.filter(c => 
    c.full_name.toLowerCase().includes(search.toLowerCase()) || 
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consultancy Review</h1>
          <p className="text-slate-500 font-medium text-lg">Select elite consultants for professional oversight and follow-up care.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-slate-200">Apply as Consultant</Button>
           <Button className="h-12 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100">Manage Subscriptions</Button>
        </div>
      </div>

      <div className="relative rounded-[40px] overflow-hidden h-72 shadow-2xl shadow-slate-200 group">
         <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/healthcare-consultant-directory-ed9bb2a6-1777029546180.webp" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
          alt="Hero"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-transparent flex items-center p-16">
            <div className="max-w-md text-white">
               <Badge className="bg-emerald-500 text-white border-none mb-6 font-black uppercase tracking-widest text-[10px]">Verified Network</Badge>
               <h2 className="text-4xl font-black mb-4 leading-tight">Clinical Oversight Standards</h2>
               <p className="text-emerald-50/80 font-medium text-lg">Get personalized expert verification for your health data journey.</p>
            </div>
         </div>
      </div>

      <div className="flex gap-4">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              className="pl-12 h-14 rounded-2xl border-slate-200 bg-white focus-visible:ring-emerald-500 font-bold"
              placeholder="Search by name, title, or specialty..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
         </div>
         <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200">
           <Filter className="w-4 h-4" />
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredConsultants.map((c, i) => (
          <Card 
            key={i} 
            className={`overflow-hidden border-none shadow-xl transition-all rounded-[32px] bg-white hover:shadow-2xl hover:-translate-y-1 ${
              selectedId === c.id ? 'ring-4 ring-emerald-500/20' : ''
            }`}
          >
            <CardContent className="p-8">
              <div className="flex gap-6 mb-8">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-slate-50 shadow-inner">
                    <AvatarImage src={c.image_url} />
                    <AvatarFallback className="bg-emerald-50 text-emerald-600 font-black">{c.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">{c.full_name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{c.title}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-black">{c.rating}</span>
                    <span className="text-xs text-slate-400 font-bold">({c.reviews_count} Reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {c.specialties?.map((s: string) => (
                    <Badge key={s} className="bg-slate-50 text-slate-600 border-none font-bold rounded-lg px-3 py-1">{s}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Fee</p>
                  <p className="text-xl font-black text-slate-900">{c.price_per_session}<span className="text-xs text-slate-400">/milestone</span></p>
                </div>
                <Button 
                  onClick={() => handleSelect(c.id, c.full_name)}
                  className={`rounded-2xl h-12 px-6 font-black transition-all ${
                    selectedId === c.id ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-950 hover:bg-slate-900 text-white shadow-slate-200'
                  }`}
                >
                  {selectedId === c.id ? 'Request Pending' : 'Select Expert'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-950 text-white border-none rounded-[40px] overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-32 -mb-32" />
        <CardContent className="p-12 relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-xl">
                 <Sparkles className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="flex-1 space-y-4">
                 <h3 className="text-3xl font-black">Institutional Oversight Hub</h3>
                 <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                   Our network of consultants follows strict international protocols to ensure every patient record and educational milestone is verified for accuracy and clinical safety.
                 </p>
                 <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5 text-emerald-400" />
                       <span className="text-sm font-bold uppercase tracking-widest">Clinical Integrity</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Users className="w-5 h-5 text-cyan-400" />
                       <span className="text-sm font-bold uppercase tracking-widest">Expert Selection</span>
                    </div>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};