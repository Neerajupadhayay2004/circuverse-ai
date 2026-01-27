import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an expert AI waste analysis system for CIRCUVERSE, specializing in circular economy and waste transformation.

Analyze the waste input and provide a detailed JSON response with these fields:
- wasteType: The identified type of waste (e.g., "Plastic Polymer", "E-Waste", "Organic")
- recyclability: A percentage (0-100) indicating how recyclable this waste is
- products: An array of 4-6 products that can be made from this waste
- co2Saved: Estimated kg of CO2 saved per ton of this waste recycled (100-800 range)
- energySaved: Estimated kWh of energy saved per ton recycled (200-1500 range)
- circularScore: A score (0-100) indicating circular economy potential
- smartCityApplications: An array of 3-5 smart city applications for the recycled products
- description: A 2-3 sentence description of the transformation potential
- processingSteps: An array of 4-6 steps describing how to process this waste
- environmentalImpact: A brief description of environmental benefits

Be specific, use real statistics when possible, and be enthusiastic about sustainability!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { wasteInput, userId } = await req.json();
    
    console.log("Analyzing waste:", wasteInput);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this waste input and provide transformation possibilities: "${wasteInput}". Respond ONLY with valid JSON.` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI error:", errorText);
      throw new Error("AI analysis failed");
    }

    const aiResult = await response.json();
    const analysisText = aiResult.choices?.[0]?.message?.content || "{}";
    
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch {
      console.error("Failed to parse AI response:", analysisText);
      throw new Error("Invalid AI response format");
    }

    // Store in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: insertError } = await supabase
      .from("waste_submissions")
      .insert({
        user_id: userId || null,
        waste_type: analysis.wasteType || "Unknown",
        waste_input: wasteInput,
        recyclability: analysis.recyclability || 0,
        co2_saved: analysis.co2Saved || 0,
        energy_saved: analysis.energySaved || 0,
        circular_score: analysis.circularScore || 0,
        products: analysis.products || [],
        smart_city_applications: analysis.smartCityApplications || [],
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
    }

    // Update impact metrics if user is logged in
    if (userId) {
      const { data: existingMetrics } = await supabase
        .from("impact_metrics")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingMetrics) {
        const newTotal = existingMetrics.total_submissions + 1;
        await supabase
          .from("impact_metrics")
          .update({
            total_co2_saved: existingMetrics.total_co2_saved + (analysis.co2Saved || 0),
            total_energy_saved: existingMetrics.total_energy_saved + (analysis.energySaved || 0),
            total_submissions: newTotal,
            average_circular_score: 
              ((existingMetrics.average_circular_score * existingMetrics.total_submissions) + (analysis.circularScore || 0)) / newTotal,
          })
          .eq("user_id", userId);
      }
    }

    console.log("Analysis complete:", analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
