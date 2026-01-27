import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get global statistics
    const { data: submissions, error: subError } = await supabase
      .from("waste_submissions")
      .select("waste_type, co2_saved, energy_saved, circular_score, created_at");

    if (subError) throw subError;

    // Calculate aggregated stats
    const totalSubmissions = submissions?.length || 0;
    const totalCO2Saved = submissions?.reduce((sum, s) => sum + (Number(s.co2_saved) || 0), 0) || 0;
    const totalEnergySaved = submissions?.reduce((sum, s) => sum + (Number(s.energy_saved) || 0), 0) || 0;
    const avgCircularScore = totalSubmissions > 0
      ? submissions.reduce((sum, s) => sum + (s.circular_score || 0), 0) / totalSubmissions
      : 0;

    // Get waste type distribution
    const wasteTypeCounts: Record<string, number> = {};
    submissions?.forEach(s => {
      const type = s.waste_type || "Unknown";
      wasteTypeCounts[type] = (wasteTypeCounts[type] || 0) + 1;
    });

    const wasteTypeDistribution = Object.entries(wasteTypeCounts)
      .map(([name, count]) => ({ name, count, percentage: (count / totalSubmissions) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSubmissions = submissions?.filter(
      s => new Date(s.created_at) > sevenDaysAgo
    ) || [];

    // Daily breakdown
    const dailyStats: Record<string, { count: number; co2: number }> = {};
    recentSubmissions.forEach(s => {
      const date = new Date(s.created_at).toISOString().split("T")[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { count: 0, co2: 0 };
      }
      dailyStats[date].count++;
      dailyStats[date].co2 += Number(s.co2_saved) || 0;
    });

    const dailyActivity = Object.entries(dailyStats)
      .map(([date, stats]) => ({ date, ...stats }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const stats = {
      totalSubmissions,
      totalCO2Saved: Math.round(totalCO2Saved),
      totalEnergySaved: Math.round(totalEnergySaved),
      avgCircularScore: Math.round(avgCircularScore),
      wasteTypeDistribution,
      dailyActivity,
      recentSubmissionsCount: recentSubmissions.length,
      topWasteType: wasteTypeDistribution[0]?.name || "None yet",
    };

    console.log("Stats fetched:", stats);

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to fetch stats" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
