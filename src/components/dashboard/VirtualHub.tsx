import React from 'react';
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

export const VirtualHub = () => {
  const upcomingAppointments = [
    { 
      doctor: 'Dr. Kofi Mensah', 
      specialty: 'Cardiologist', 
      time: '14:30 Today', 
      type: 'Follow-up', 
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
    },
    { 
      doctor: 'Dr. Sarah Okafor', 
      specialty: 'Nutritionist', 
      time: '10:00 Tomorrow', 
      type: 'Consultation', 
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Virtual Care Hub</h1>
          <p className="text-slate-500">Seamless virtual connections to reduce hospital readmissions.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
             <Calendar className="w-4 h-4 mr-2" /> My Schedule
           </Button>
           <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100">
             <Video className="w-4 h-4 mr-2" /> Start Instant Hub
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Call / Video Preview */}
          <Card className="overflow-hidden border-none shadow-2xl relative">
            <div className="absolute inset-0 bg-slate-900">
               <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/virtual-hub-consultation-2f5e79f3-1777028568703.webp" 
                alt="Consultation Preview"
                className="w-full h-[400px] object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>
            <div className="relative p-8 h-[400px] flex flex-col justify-between">
               <div className="flex justify-between items-start">
                  <Badge className="bg-red-500/90 text-white border-none flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Live Connection Available
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="bg-white/10 hover:bg-white/20 border-none text-white">
                      <Users className="w-5 h-5" />
                    </Button>
                  </div>
               </div>
               <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Reduce Hospital Visits</h3>
                  <p className="text-slate-300 max-w-md mb-6">Connect with your primary care provider from home. Our hub ensures 24/7 access to your health team.</p>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 text-lg font-bold">
                    Connect Now
                  </Button>
               </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-50 bg-emerald-50/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                   </div>
                   <h4 className="font-bold text-slate-900">Wellness Check-in</h4>
                </div>
                <p className="text-sm text-slate-600 mb-6">Daily 5-minute virtual check-ins have shown to reduce readmission by 40%.</p>
                <Button variant="outline" className="w-full bg-white">Start Today's Check</Button>
              </CardContent>
            </Card>
            <Card className="border-sky-50 bg-sky-50/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-white rounded-2xl shadow-sm">
                      <UserPlus className="w-6 h-6 text-sky-600" />
                   </div>
                   <h4 className="font-bold text-slate-900">Care Team Group</h4>
                </div>
                <p className="text-sm text-slate-600 mb-6">Invite family members to join your virtual care hub for better support.</p>
                <Button variant="outline" className="w-full bg-white">Add Family Member</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-100 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              <CardDescription>Scheduled virtual consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((app, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                   <Avatar className="w-12 h-12">
                      <AvatarImage src={app.image} />
                      <AvatarFallback>{app.doctor.charAt(0)}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{app.doctor}</p>
                      <p className="text-xs text-slate-500">{app.specialty}</p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-emerald-600">
                        <Clock className="w-3 h-3" /> {app.time}
                      </div>
                   </div>
                   <Button size="icon" variant="ghost" className="text-slate-400">
                      <Phone className="w-4 h-4" />
                   </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-emerald-600 hover:bg-emerald-50 mt-2">
                View All Sessions
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none">
             <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                   <Info className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-wider">System Status</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">All encryption channels are active. Your virtual hub is HIPAA compliant and secure.</p>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span className="text-xs font-medium text-slate-300">End-to-end Encrypted</span>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};