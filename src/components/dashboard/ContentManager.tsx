import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, 
  RotateCcw, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  Globe,
  Settings,
  Plus
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

  useEffect(() => {
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

      toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} content updated successfully!`);
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const categories = ['hero', 'stats', 'blockchain', 'payments', 'cta'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Website Content Manager</h2>
          <p className="text-slate-500">Easily update landing page text and media without touching code.</p>
        </div>
        <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white" onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4 mr-2" /> Reset View
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800 mb-8 w-full justify-start overflow-x-auto">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white capitalize"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white capitalize">{category} Section Content</CardTitle>
                <CardDescription className="text-slate-500">Modify the visible text for the {category} part of your landing page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {CONTENT_SCHEMA.filter(f => f.category === category).map(field => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key} className="text-slate-300 font-bold">{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          id={field.key}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      ) : (
                        <Input 
                          id={field.key}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="bg-slate-800 border-slate-700 text-white"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    onClick={() => handleSave(category)}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
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