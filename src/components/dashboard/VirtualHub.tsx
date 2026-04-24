import React, { useEffect, useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Phone, 
  Users, 
  CheckCircle2,
  Stethoscope,
  Info,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const VirtualHub = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await supabase.from('appointments').select('*');
        if (data) setAppointments(data);
      } catch (err) {
        setAppointments([
          { 
            doctor: { full_name: 'Dr. Kofi Mensah' }, 
            type: 'Follow-up', 
            scheduled_at: new Date().toISOString() 
          }
        ]);
      }
    };
    fetchAppointments();
  }, []);

  const handleStartHub = () => {
    toast.success("Initializing encrypted video hub...");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Virtual Care Hub</h1>
          <p className="text-slate-500">Seamless virtual connections to reduce hospital readmissions.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> My Schedule</Button>
           <Button onClick={handleStartHub} className="bg-emerald-600">
             <Video className="w-4 h-4 mr-2" /> Start Instant Hub
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-none shadow-2xl relative group">
            <div className="absolute inset-0 bg-slate-900">
               <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/virtual-care-hub-interface-80e00c4c-1777029546129.webp" 
                alt="Consultation Preview"
                className="w-full h-[400px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>
            <div className="relative p-8 h-[400px] flex flex-col justify-between">
               <Badge className="w-fit bg-red-500/90 text-white border-none flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Live Connection Available
               </Badge>
               <div className="text-white">
                  <h3 className="text-3xl font-bold mb-2">Secure Virtual Consultation</h3>
                  <p className="text-slate-300 max-w-md mb-6">End-to-end encrypted medical hub for remote care.</p>
                  <Button onClick={handleStartHub} className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 font-bold">
                    Join Hub Now
                  </Button>
               </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-50 bg-emerald-50/30">
              <CardContent className="p-6">
                <Sparkles className="w-8 h-8 text-emerald-600 mb-4" />
                <h4 className="font-bold mb-2">Wellness Check-in</h4>
                <p className="text-sm text-slate-600 mb-4">Daily 5-minute virtual check-ins reduce readmission.</p>
                <Button variant="outline" className="w-full bg-white">Start Check</Button>
              </CardContent>
            </Card>
            <Card className="border-sky-50 bg-sky-50/30">
              <CardContent className="p-6">
                <UserPlus className="w-8 h-8 text-sky-600 mb-4" />
                <h4 className="font-bold mb-2">Care Team Group</h4>
                <p className="text-sm text-slate-600 mb-4">Invite family members to your virtual hub.</p>
                <Button variant="outline" className="w-full bg-white">Add Member</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((app, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <Avatar className="w-10 h-10">
                      <AvatarFallback>{app.doctor?.full_name?.charAt(0) || 'D'}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1">
                      <p className="font-bold text-sm">{app.doctor?.full_name || 'Dr. Mensah'}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase">{app.type}</p>
                   </div>
                   <Button size="icon" variant="ghost" className="text-slate-400"><Phone className="w-4 h-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};