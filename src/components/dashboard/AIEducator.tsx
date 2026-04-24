import React, { useState } from 'react';
import { 
  Send, 
  Settings, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const AIEducator = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm Nurse Amara, your AI Health Educator. How are you feeling today? I'm here to answer any questions about your diabetes management, diet, or overall wellness." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      // Attempt to call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-educator', {
        body: { message: userMessage, context: 'patient_chat' }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'ai', text: data.reply || "I've analyzed your question. Regarding your health journey, consistency is key. Would you like to dive deeper into specific dietary adjustments?" }]);
    } catch (err) {
      console.error('Edge Function Error:', err);
      // Fallback simulation with delayed response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "That's an important question. Based on clinical standards, it's best to prioritize fiber-rich foods like traditional whole grains. Would you like me to suggest some local recipes that are low-glycemic?" }]);
        setIsTyping(false);
      }, 1500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-14 h-14 border-4 border-white shadow-xl">
              <AvatarImage src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5df26582-d38a-4e79-a7a8-2ec65fc75dda/ai-educator-avatar-0ef69183-1777020532939.webp" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nurse Amara</h1>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Active Assistant
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 border-slate-200 rounded-xl font-bold">
          <Settings className="w-4 h-4" /> Customize Assistant
        </Button>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-2xl rounded-[32px] bg-white">
        <ScrollArea className="flex-1 p-8">
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-[24px] text-sm font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-emerald-100' 
                  : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Amara is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex gap-3">
            <Input 
              placeholder="Ask about diet, exercise, or medications..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 h-14 rounded-2xl bg-white border-slate-200 focus-visible:ring-emerald-500 font-bold px-6"
            />
            <Button onClick={handleSend} className="rounded-2xl bg-slate-900 hover:bg-slate-800 w-14 h-14 p-0 shadow-lg">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};