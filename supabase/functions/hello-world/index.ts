import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, apikey, x-client-info');
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  )

  const { data, error } = await supabaseClient
    .from('messages')
    .select('content')
    .eq('id', 1)
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: headers,
      status: 500
    })
  }

  return new Response(
    JSON.stringify({ message: data.content }),
    { 
      headers: headers,
    }
  )
})