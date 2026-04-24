import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ContentItem {
  key: string;
  value: string;
}

export const useContent = (defaults: Record<string, string>) => {
  const [content, setContent] = useState<Record<string, string>>(defaults);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (isMounted = true) => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value');

      if (error) {
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

  useEffect(() => {
    let isMounted = true;
    
    fetchContent(isMounted);

    // Subscribe to real-time updates
    const channel = supabase
      .channel('site_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content'
        },
        () => {
          // Re-fetch content when any change occurs
          fetchContent(isMounted);
        }
      )
      .subscribe();
    
    return () => { 
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { content, loading };
};