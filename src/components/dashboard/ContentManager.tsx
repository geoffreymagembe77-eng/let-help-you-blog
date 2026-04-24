import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, 
  RotateCcw, 
  Layout, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ContentField {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  category: string;
}

const CONTENT_SCHEMA: ContentField[] = [
  // Hero Section
  { key: 'hero_title', label: 'Hero Title', type: 'textarea', category: 'hero' },
  { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', category: 'hero' },
  { key: 'hero_cta_primary', label: 'Primary CTA Button', type: 'text', category: 'hero' },
  { key: 'hero_cta_secondary', label: 'Secondary CTA Button', type: 'text', category: 'hero' },
  
  // Stats
  { key: 'stat_users_val', label: 'Users Stat Value', type: 'text', category: 'stats' },
  { key: 'stat_users_label', label: 'Users Stat Label', type: 'text', category: 'stats' },
  { key: 'stat_accuracy_val', label: 'Accuracy Stat Value', type: 'text', category: 'stats' },
  { key: 'stat_countries_val', label: 'Countries Stat Value', type: 'text', category: 'stats' },

  // Blockchain Section
  { key: 'blockchain_badge', label: 'Blockchain Badge Text', type: 'text', category: 'blockchain' },
  { key: 'blockchain_title', label: 'Blockchain Section Title', type: 'textarea', category: 'blockchain' },
  { key: 'blockchain_desc', label: 'Blockchain Description', type: 'textarea', category: 'blockchain' },

  // Payment Section
  { key: 'payment_badge', label: 'Payment Badge Text', type: 'text', category: 'payments' },
  { key: 'payment_title', label: 'Payment Section Title', type: 'text', category: 'payments' },
  
  // Institutional CTA
  { key: 'cta_title', label: 'Institutional CTA Title', type: 'textarea', category: 'cta' },
  { key: 'cta_desc', label: 'Institutional CTA Description', type: 'textarea', category: 'cta' },
  { key: 'cta_button', label: 'Institutional CTA Button', type: 'text', category: 'cta' },
];

export const ContentManager = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value');

      if (error) {
        toast.error('Failed to load content from database');
        return;
      }

      const contentMap = data?.reduce((acc: Record<string, string>, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {}) || {};
      
      setFormData(contentMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (category: string) => {
    setSaving(true);
    const categoryFields = CONTENT_SCHEMA.filter(f => f.category === category);
    
    try {
      const updates = categoryFields.map(field => ({
        key: field.key,
        value: formData[field.key] || '',
        category: field.category
      }));

      for (const item of updates) {
        const { error } = await supabase
          .from('site_content')
          .upsert(item, { onConflict: 'key' });
        
        if (error) throw error;
      }

      toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} content updated! Syncing across platform...`);
    } catch (err: any) {
      toast.error(`Error saving content: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Fetching Real-time Content...</p>
      </div>
    );
  }

  const categories = ['hero', 'stats', 'blockchain', 'payments', 'cta'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-[32px] border border-slate-800">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Layout className="w-8 h-8 text-emerald-500" />
            Website CMS
          </h2>
          <p className="text-slate-500 font-medium">Global content management with real-time blockchain-verified syncing.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white rounded-2xl h-12" onClick={fetchContent}>
            <RotateCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl h-12">
            <Eye className="w-4 h-4 mr-2" /> Preview Site
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800 mb-8 w-full justify-start overflow-x-auto p-1.5 h-14 rounded-2xl">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white capitalize px-8 rounded-xl font-bold transition-all h-full"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 rounded-[32px] overflow-hidden">
              <CardHeader className="border-b border-slate-800 p-8 bg-slate-900/50">
                <CardTitle className="text-2xl font-black text-white capitalize">{category} Configuration</CardTitle>
                <CardDescription className="text-slate-500 font-bold">Modify the semantic content for the {category} module.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-8">
                  {CONTENT_SCHEMA.filter(f => f.category === category).map(field => (
                    <div key={field.key} className="space-y-3">
                      <Label htmlFor={field.key} className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          id={field.key}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="bg-slate-950 border-slate-800 text-white min-h-[120px] rounded-2xl focus:ring-emerald-500 p-4 font-medium"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      ) : (
                        <Input 
                          id={field.key}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="bg-slate-950 border-slate-800 h-14 text-white rounded-2xl focus:ring-emerald-500 px-4 font-medium"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
                  <p className="text-xs text-slate-600 font-bold">Last synced: {new Date().toLocaleTimeString()}</p>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-emerald-900/20"
                    onClick={() => handleSave(category)}
                    disabled={saving}
                  >
                    {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Push Changes</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};