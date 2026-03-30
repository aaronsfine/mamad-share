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

    // Parse the trigger payload (from pg_net call)
    let triggerData: { host_name?: string; city?: string; neighborhood?: string } = {};
    try {
      triggerData = await req.json();
    } catch {
      // GET request for manual status check — no body needed
    }

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

    const hostName = triggerData.host_name || "Unknown";
    const city = triggerData.city || "Unknown";
    const neighborhood = triggerData.neighborhood || "Unknown";

    // Send notification — template has a fixed `to` address so recipientEmail is ignored
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-listing-admin",
          recipientEmail: "noop@placeholder.local",
          idempotencyKey: `new-listing-${Date.now()}`,
          templateData: {
            hostName,
            city,
            neighborhood,
            totalReal: totalReal || 0,
            totalDemo: totalDemo || 0,
          },
        },
      });
      console.log("📧 Notification enqueued");
    } catch (emailErr) {
      console.error("Failed to send email notification:", emailErr);
    }

    console.log(`📊 Status: ${totalReal} real, ${totalDemo} demo listings`);

    return new Response(
      JSON.stringify({
        success: true,
        report: {
          realListings: totalReal || 0,
          demoListings: totalDemo || 0,
          totalActive: (totalReal || 0) + (totalDemo || 0),
          latestRealListing: { hostName, city, neighborhood },
          notifiedEmail: 'aaronsfine@gmail.com',
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
