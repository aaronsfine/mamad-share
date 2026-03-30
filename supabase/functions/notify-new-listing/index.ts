import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get listing stats
    const { count: totalReal } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_demo", false)
      .eq("is_active", true);

    const { count: totalDemo } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_demo", true)
      .eq("is_active", true);

    const { count: totalAll } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // Get the most recent real listings
    const { data: recentReal } = await supabase
      .from("listings")
      .select("host_name, city, neighborhood, created_at")
      .eq("is_demo", false)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(5);

    // Log for edge function logs (you can check these in the backend)
    console.log(`📊 Listing Status Report:
  🏠 Real listings: ${totalReal || 0}
  🤖 Demo listings: ${totalDemo || 0}
  📋 Total active: ${totalAll || 0}
  📅 Recent real listings: ${JSON.stringify(recentReal || [], null, 2)}`);

    return new Response(
      JSON.stringify({
        success: true,
        report: {
          realListings: totalReal || 0,
          demoListings: totalDemo || 0,
          totalActive: totalAll || 0,
          recentRealListings: recentReal || [],
          timestamp: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in notify-new-listing:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
