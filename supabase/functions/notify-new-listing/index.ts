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

    // Get the newest non-demo listing for context
    const { data: newest } = await supabase
      .from("listings")
      .select("host_name, city, neighborhood, created_at, host_id")
      .eq("is_demo", false)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const hostName = triggerData.host_name || newest?.host_name || "Unknown";
    const city = triggerData.city || newest?.city || "Unknown";
    const neighborhood = triggerData.neighborhood || newest?.neighborhood || "Unknown";

    // Get the admin email — find the first user who created a listing (project owner)
    // For simplicity, get the host's email from auth.users
    let adminEmail: string | null = null;
    if (newest?.host_id) {
      const { data: userData } = await supabase.auth.admin.getUserById(newest.host_id);
      adminEmail = userData?.user?.email || null;
    }

    // If we have an admin email, send the notification
    if (adminEmail) {
      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "new-listing-admin",
            recipientEmail: adminEmail,
            idempotencyKey: `new-listing-${newest?.created_at || Date.now()}`,
            templateData: {
              hostName,
              city,
              neighborhood,
              totalReal: totalReal || 0,
              totalDemo: totalDemo || 0,
            },
          },
        });
        console.log(`📧 Notification sent to ${adminEmail}`);
      } catch (emailErr) {
        console.error("Failed to send email notification:", emailErr);
      }
    } else {
      console.log("No admin email found — skipping email notification");
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
          notifiedEmail: adminEmail,
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
