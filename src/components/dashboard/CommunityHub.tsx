import React, { useEffect, useState } from 'react';
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
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const CommunityHub = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [posts, setPosts] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: comms } = await supabase.from('communities').select('*');
        const { data: feed } = await supabase.from('community_posts').select('*, author:profiles(full_name, avatar_url)').order('created_at', { ascending: false });
        
        if (comms) setCommunities(comms);
        if (feed) setPosts(feed);
      } catch (err) {
        console.error('Error fetching community data:', err);
        // Fallback
        setCommunities([
          { name: 'General', member_count: 1240 },
          { name: 'Diabetes Warriors', member_count: 850 },
          { name: 'Heart Heroes', member_count: 640 },
        ]);
        setPosts([
          {
            author: { full_name: 'Dr. Sarah Okafor' },
            content: 'Just published a new guide on managing hypertension during the rainy season. Check the Education Hub for details!',
            likes_count: 45,
            comments_count: 12,
            created_at: new Date().toISOString(),
            image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/african-health-community-hub-13e27ae8-1777029546104.webp'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewDiscussion = () => {
    toast.info("Creating new discussion...");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Hub</h1>
          <p className="text-slate-500">Connect with fellow patients and healthcare professionals.</p>
        </div>
        <Button onClick={handleNewDiscussion} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-6 rounded-full shadow-lg shadow-emerald-100">
          <Plus className="w-4 h-4 mr-2" /> New Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <Card className="border-slate-100">
            <CardContent className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input className="pl-10 bg-slate-50 border-none" placeholder="Search groups..." />
              </div>
              <div className="space-y-1">
                {communities.map((cat) => (
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
                    <Badge variant="outline" className="bg-white border-slate-200 text-slate-400">{cat.member_count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold">Community Streak</p>
              </div>
              <p className="text-sm text-white/80 mb-4">You've been active for 5 days straight! Your health journey is inspiring others.</p>
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

        <div className="lg:col-span-3 space-y-6">
           {posts.map((post, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className="border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
                 <CardContent className="p-0">
                   {post.image_url && (
                     <div className="h-64 overflow-hidden">
                        <img src={post.image_url} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     </div>
                   )}
                   <div className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-slate-100">
                            <AvatarImage src={post.author?.avatar_url} />
                            <AvatarFallback>{post.author?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900">{post.author?.full_name || 'Anonymous'}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400">Just now</span>
                            </div>
                          </div>
                        </div>
                     </div>
                     <p className="text-slate-700 leading-relaxed mb-6">{post.content}</p>
                     <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.likes_count || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments_count || 0}</span>
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