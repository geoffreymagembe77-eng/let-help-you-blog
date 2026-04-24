import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { patientId } = await req.json()
  
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Fetch trends and generate insights
  const { data: trends } = await supabaseClient
    .from('health_trends')
    .select('*')
    .eq('patient_id', patientId)
    .order('recorded_at', { ascending: false })

  return new Response(JSON.stringify({ insights: "Monitoring your trends..." }), {
    headers: { "Content-Type": "application/json" },
  })
})