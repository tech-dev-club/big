import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      demandIndex, 
      competitionIndex, 
      forecastGrowth, 
      populationDensity,
      bizScoreToday,
      bizScore12M,
      trendDirection,
      category,
      title,
      competitionDensity,
      competitorCount,
      categoryDifficulty,
      opportunityType
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a business opportunity analyst. Provide concise, actionable insights about business opportunities. Keep responses under 150 words, human-friendly, and focused on key metrics.`;

    const userPrompt = `Analyze this business opportunity (BizScore 3.0 - Competition-Aware Model):
    
Business: ${title}
Category: ${category}
Category Difficulty: ${categoryDifficulty || "Medium"}

MARKET METRICS:
- Demand Index: ${demandIndex}/100
- Competition Density: ${competitionDensity || "Balanced"} (${competitorCount || 0} competitors)
- Population Density: ${populationDensity}/sq km

BIZSCORE ANALYSIS:
- BizScore Today: ${bizScoreToday}/100
- BizScore 12M: ${bizScore12M}/100
- Forecast Growth: ${(forecastGrowth * 100).toFixed(0)}%
- Trend: ${trendDirection}
- Opportunity Type: ${opportunityType || "Moderate Opportunity"}

Provide a consultant-style mini summary (under 150 words):
1. Brief opportunity description highlighting demand vs competition
2. Category outlook with strategic reasoning
3. Combined risk score and key factors
4. Actionable recommendation (Start Now/Wait/Avoid) with differentiation strategy if competitive`;

    // Retry logic for rate limiting
    let retries = 3;
    let response;
    let lastError;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
          }),
        });

        if (response.ok) {
          break; // Success, exit retry loop
        }

        // Handle specific error codes
        if (response.status === 429) {
          const errorText = await response.text();
          console.error(`AI Gateway rate limited (attempt ${attempt + 1}/${retries}):`, errorText);
          lastError = {
            status: 429,
            message: "Rate limit exceeded. Please wait a moment and try again, or upgrade your plan for higher limits.",
            type: "rate_limit"
          };
          
          // Don't retry on last attempt
          if (attempt < retries - 1) {
            // Exponential backoff: 2s, 4s
            const delay = Math.pow(2, attempt + 1) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        } else if (response.status === 402) {
          const errorText = await response.text();
          console.error("AI Gateway payment required:", errorText);
          lastError = {
            status: 402,
            message: "AI credits exhausted. Please add credits to your workspace to continue.",
            type: "payment_required"
          };
          break; // Don't retry payment errors
        } else {
          const errorText = await response.text();
          console.error("AI Gateway error:", response.status, errorText);
          lastError = {
            status: response.status,
            message: "AI service temporarily unavailable. Please try again.",
            type: "service_error"
          };
          break;
        }
      } catch (error) {
        console.error(`Request attempt ${attempt + 1} failed:`, error);
        lastError = {
          status: 500,
          message: "Network error. Please check your connection.",
          type: "network_error"
        };
        if (attempt < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    // If all retries failed, throw the last error
    if (!response || !response.ok) {
      throw new Error(lastError?.message || "AI Gateway error");
    }

    const data = await response.json();
    const insight = data.choices?.[0]?.message?.content || "Analysis not available";

    return new Response(
      JSON.stringify({ insight }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in generate-insights:", error);
    
    // Provide user-friendly error messages
    let errorMessage = "Unable to generate AI insights at this time.";
    let errorDetails = error instanceof Error ? error.message : "Unknown error";
    
    if (errorDetails.includes("Rate limit")) {
      errorMessage = "⏳ Too many requests. Please wait a moment and try again. For higher limits, consider upgrading your plan.";
    } else if (errorDetails.includes("credits")) {
      errorMessage = "💳 AI credits exhausted. Please add credits to your workspace to continue using AI insights.";
    } else if (errorDetails.includes("Network error")) {
      errorMessage = "🌐 Connection issue. Please check your internet and try again.";
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorDetails,
        insight: errorMessage,
        userFriendly: true
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 // Return 200 to prevent frontend errors, but include error details
      }
    );
  }
});
