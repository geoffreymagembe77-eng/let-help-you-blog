import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ContentItem {
  key: string;
  value: string;
}

export const useContent = (defaults: Record<string, string>) => {
  const [content, setContent] = useState<Record<string, string>>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('key, value');

        if (error) {
          // Silent fail to defaults
          return;
        }

        if (isMounted && data && data.length > 0) {
          const contentMap = data.reduce((acc: Record<string, string>, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          setContent({ ...defaults, ...contentMap });
        }
      } catch (err) {
        // Silent fail to defaults
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContent();
    
    return () => { isMounted = false; };
  }, []);

  return { content, loading };
};