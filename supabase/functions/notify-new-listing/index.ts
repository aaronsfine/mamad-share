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

    // Get the newest non-demo listing
    const { data: newest } = await supabase
      .from("listings")
      .select("host_name, city, neighborhood, created_at")
      .eq("is_demo", false)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Try to send via transactional email system if available
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-listing-admin",
          recipientEmail: req.headers.get("x-admin-email") || "",
          idempotencyKey: `new-listing-${newest?.created_at || Date.now()}`,
          templateData: {
            hostName: newest?.host_name || "Unknown",
            city: newest?.city || "Unknown",
            neighborhood: newest?.neighborhood || "Unknown",
            totalReal: totalReal || 0,
            totalDemo: totalDemo || 0,
          },
        },
      });
    } catch {
      // Transactional email not set up yet — log it
      console.log("Transactional email not available yet. Stats:", {
        totalReal,
        totalDemo,
        newest,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        stats: { totalReal, totalDemo },
        newest,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in notify-new-listing:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
