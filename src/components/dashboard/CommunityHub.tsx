import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  Search,
  Flame,
  Trophy,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export const CommunityHub = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  
  const categories = [
    { name: 'General', count: 1240 },
    { name: 'Diabetes Warriors', count: 850 },
    { name: 'Heart Heroes', count: 640 },
    { name: 'Maternal Care', count: 420 },
    { name: 'Provider Talk', count: 180 },
  ];

  const posts = [
    {
      author: 'Dr. Sarah Okafor',
      role: 'Provider',
      content: 'Just published a new guide on managing hypertension during the rainy season. Check the Education Hub for details!',
      likes: 45,
      comments: 12,
      time: '2h ago',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/community-hub-image-c9ecb4f5-1777028568496.webp'
    },
    {
      author: 'Kofi Mensah',
      role: 'Patient',
      content: "Has anyone tried the new localized diet plan for Amharic speakers? I'm finding it much easier to follow than the standard one.",
      likes: 28,
      comments: 24,
      time: '5h ago',
    },
    {
      author: 'Ayo Balogun',
      role: 'Patient',
      content: "30 days of consistent blood sugar tracking! Feel amazing. Thanks to this community for the motivation.",
      likes: 112,
      comments: 18,
      time: 'Yesterday',
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Hub</h1>
          <p className="text-slate-500">Connect with fellow patients and healthcare professionals.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 h-11 px-6 rounded-full shadow-lg shadow-emerald-100">
          <Plus className="w-4 h-4 mr-2" /> New Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="space-y-6">
          <Card className="border-slate-100">
            <CardContent className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input className="pl-10 bg-slate-50 border-none" placeholder="Search groups..." />
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.name 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4" />
                      {cat.name}
                    </div>
                    <Badge variant="outline" className="bg-white border-slate-200 text-slate-400">{cat.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold">Community Streak</p>
              </div>
              <p className="text-sm text-white/80 mb-4">You've been active for 5 days straight! Help 2 more people today to hit your goal.</p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className="h-full bg-white" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
           {posts.map((post, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className="border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                 <CardContent className="p-0">
                   {post.image && (
                     <div className="h-64 overflow-hidden">
                        <img src={post.image} alt="Post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     </div>
                   )}
                   <div className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-slate-100">
                            <AvatarFallback className="bg-slate-100 text-slate-600">{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900">{post.author}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={`h-4 text-[10px] ${post.role === 'Provider' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                {post.role}
                              </Badge>
                              <span className="text-[10px] text-slate-400">{post.time}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                     </div>
                     
                     <p className="text-slate-700 leading-relaxed mb-6">
                       {post.content}
                     </p>

                     <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-emerald-600">
                          <Share2 className="w-5 h-5" />
                        </button>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};