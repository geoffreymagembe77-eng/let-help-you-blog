import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Activity, 
  MessageSquare, 
  Settings,
  LogOut,
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  Bell,
  Search,
  Filter,
  Play,
  Lock,
  ArrowUpRight,
  TrendingDown,
  ChevronRight,
  Send,
  User,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Language, translations } from '@/lib/languages';

// --- Dashboard Layout ---

export const DashboardLayout = ({ 
  children, 
  activeTab, 
  setActiveTab,
  userRole = 'patient'
}: { 
  children: React.ReactNode; 
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  userRole?: 'patient' | 'provider' | 'admin'
}) => {
  const sidebarItems = [
    { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
    { id: 'education', icon: <BookOpen className="w-5 h-5" />, label: 'Education Hub' },
    { id: 'ai', icon: <MessageSquare className="w-5 h-5" />, label: 'AI Educator' },
    { id: 'trends', icon: <Activity className="w-5 h-5" />, label: 'Health Trends' },
  ];

  if (userRole === 'provider') {
    sidebarItems.push({ id: 'patients', icon: <Users className="w-5 h-5" />, label: 'My Patients' });
    sidebarItems.push({ id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' });
  }

  return (
    <div className="flex h-screen bg-slate-50 pt-16">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="flex-1 py-6 px-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto pb-20">
            {children}
          </div>
        </ScrollArea>
      </main>

      {/* Mobile Nav - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 z-50">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Patient Views ---

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Kwesi</h1>
          <p className="text-slate-500">Here's your health summary for today.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <Badge variant="outline" className="bg-white">Next checkup: Tomorrow</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 border-none">Stable Progress</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Daily Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">6,432</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Blood Glucose</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">114 mg/dL</div>
            <p className="text-xs text-slate-500 mt-1">Normal Range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Content Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">72%</div>
            <Progress value={72} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Education Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Understanding Insulin", time: "15 min", lang: "Swahili", progress: 100 },
              { title: "Low Sugar Diets", time: "10 min", lang: "Swahili", progress: 45 },
              { title: "Foot Care for Diabetics", time: "20 min", lang: "English", progress: 0 },
            ].map((lesson, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <Play className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">{lesson.title}</p>
                  <p className="text-xs text-slate-500">{lesson.lang} • {lesson.time}</p>
                </div>
                {lesson.progress === 100 ? (
                  <Badge className="bg-emerald-500 border-none">Completed</Badge>
                ) : (
                  <span className="text-xs font-medium text-slate-400">{lesson.progress}%</span>
                )}
              </div>
            ))}
            <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">View all lessons</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Health Assistant Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
              <div className="flex gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm h-fit">
                   <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-900 leading-relaxed font-medium">
                    "I noticed your activity was lower yesterday. Even a short 10-minute walk can help stabilize your blood sugar level. Would you like to set a reminder for a morning walk?"
                  </p>
                  <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">Set Reminder</Button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Personalized Recommendations</p>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Drink 2L of water today
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Track afternoon glucose
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const EducationHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Cardiology', 'Diabetes', 'Nutrition', 'Mental Health', 'Pregnancy'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Education Hub</h1>
        <p className="text-slate-500">Learn about your health in your native language.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat 
              ? 'bg-emerald-600 text-white' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Managing Blood Sugar", cat: "Diabetes", lang: "Yoruba", premium: false, img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400" },
          { title: "Healthy Heart Diet", cat: "Cardiology", lang: "Swahili", premium: true, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" },
          { title: "Postnatal Care", cat: "Pregnancy", lang: "Hausa", premium: false, img: "https://images.unsplash.com/photo-1555252333-978fead06c92?auto=format&fit=crop&q=80&w=400" },
          { title: "Coping with Stress", cat: "Mental Health", lang: "English", premium: false, img: "https://images.unsplash.com/photo-1493839523149-2864fca44919?auto=format&fit=crop&q=80&w=400" },
          { title: "Antenatal Nutrition", cat: "Pregnancy", lang: "Amharic", premium: true, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
          { title: "Hypertension 101", cat: "Cardiology", lang: "Zulu", premium: false, img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400" },
        ].filter(item => selectedCategory === 'All' || item.cat === selectedCategory).map((item, i) => (
          <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow border-slate-100">
            <div className="relative h-40">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-white/90 text-slate-900 border-none backdrop-blur-sm">{item.cat}</Badge>
                {item.premium && (
                  <Badge className="bg-orange-500 text-white border-none flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Institutional
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Available in {item.lang}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <PlayCircle className="w-4 h-4" /> 12 Lessons
                </div>
                <Button size="sm" variant="ghost" className="text-emerald-600 p-0 hover:bg-transparent">
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

const AIEducator = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello Kwesi! I'm Nurse Amara, your AI Health Educator. How are you feeling today? I'm here to answer any questions about your diabetes management or diet." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "That's a great question! Regarding your diet, it's best to prioritize complex carbohydrates like whole grains. Would you like me to suggest some traditional African dishes that are low-glycemic?" }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-emerald-500">
            <AvatarImage src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-educator-avatar-0ef69183-1777020532939.webp" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Nurse Amara</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Always Active
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
          <Settings className="w-4 h-4" /> Customize AI
        </Button>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 shadow-lg">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <Input 
              placeholder="Ask anything about your health..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-full bg-slate-50 focus-visible:ring-emerald-500"
            />
            <Button onClick={handleSend} className="rounded-full bg-emerald-600 w-10 h-10 p-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["Diet tips", "Medication help", "Exercise ideas", "Explain Swahili"].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(tag)}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-medium text-slate-500 whitespace-nowrap hover:border-emerald-500 hover:text-emerald-600"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

const HealthTrends = () => {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-2xl font-bold text-slate-900">Health Trends</h1>
        <p className="text-slate-500">Track your progress and share with your doctor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Blood Pressure</h3>
            <Badge variant="outline">Last 7 Days</Badge>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {[120, 118, 125, 122, 115, 119, 121].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-100 rounded-t-lg transition-all hover:bg-blue-600"
                    style={{ height: `${(val/150) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">Day {i+1}</span>
               </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-medium text-slate-600">Avg: 119/80</span>
             </div>
             <div className="text-emerald-600 text-[10px] font-bold">STABLE</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Physical Activity</h3>
            <Badge variant="outline">Monthly View</Badge>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {[45, 60, 30, 80, 20, 55, 90].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-emerald-100 rounded-t-lg transition-all hover:bg-emerald-600"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">{i+10}th</span>
               </div>
            ))}
          </div>
           <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-600">Total: 12.4 hrs</span>
             </div>
             <div className="text-emerald-600 text-[10px] font-bold">+5% INCREASE</div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-900">Provider Connection</h3>
        <Card className="p-4 border-emerald-100 bg-emerald-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Dr. Kofi Mensah</p>
                <p className="text-xs text-slate-500">Lagos General Hospital • Linked since Jan 2024</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
              Message Doctor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Provider Portal ---

const ProviderPatients = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Patients</h1>
          <p className="text-slate-500">Monitoring 24 patients under your care.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Patient
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <Input className="pl-10" placeholder="Search by name or disease..." />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Patient</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Condition</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Education Progress</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: "Kwesi Mensah", age: 45, disease: "Diabetes Type II", progress: 72, status: "Active", risk: "Low" },
              { name: "Ayo Balogun", age: 62, disease: "Hypertension", progress: 15, status: "Inactive", risk: "High" },
              { name: "Zainab Yusuf", age: 28, disease: "Antenatal", progress: 90, status: "Active", risk: "Low" },
              { name: "Fatima Bello", age: 53, disease: "Cardiovascular", progress: 40, status: "Active", risk: "Medium" },
            ].map((p, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px]">{p.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.age} years old</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="text-xs font-medium border-slate-200">{p.disease}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span>Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} className="h-1.5" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`border-none ${
                    p.risk === 'High' ? 'bg-red-100 text-red-700' : 
                    p.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {p.risk} Risk
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Page Export ---

export const DashboardPage = ({ 
  currentLang, 
  role = 'patient' 
}: { 
  currentLang: Language; 
  role?: 'patient' | 'provider' 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    if (role === 'patient') {
      switch (activeTab) {
        case 'overview': return <Overview />;
        case 'education': return <EducationHub />;
        case 'ai': return <AIEducator />;
        case 'trends': return <HealthTrends />;
        default: return <Overview />;
      }
    } else {
      switch (activeTab) {
        case 'overview': return <div className="space-y-6">
          <h1 className="text-2xl font-bold">Institution Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { label: 'Total Patients', val: '1,284', change: '+5%' },
               { label: 'Edu Completion', val: '68%', change: '+12%' },
               { label: 'Avg Health Score', val: '8.4/10', change: '+2%' },
               { label: 'Staff Active', val: '42', change: '0%' },
             ].map((stat, i) => (
               <Card key={i} className="p-4">
                 <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                 <p className="text-xl font-bold mt-1">{stat.val}</p>
                 <p className="text-[10px] text-emerald-600 font-bold mt-1">{stat.change} ↑</p>
               </Card>
             ))}
          </div>
          <Card className="h-80 flex items-center justify-center border-dashed text-slate-400">
             Institutional Trend Graph Here
          </Card>
        </div>;
        case 'patients': return <ProviderPatients />;
        default: return <ProviderPatients />;
      }
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} userRole={role}>
      {renderContent()}
    </DashboardLayout>
  );
};

import { CheckCircle2, PlayCircle, Globe, Stethoscope, Sparkles } from 'lucide-react';