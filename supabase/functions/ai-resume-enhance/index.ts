import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "improve-bullet":
        systemPrompt = "You are an expert resume writer. Transform work responsibilities into powerful achievement-focused bullet points using the STAR method (Situation, Task, Action, Result). Include metrics when possible.";
        userPrompt = `Transform this into a compelling resume bullet point:\n\n${data.text}`;
        break;

      case "quantify-achievement":
        systemPrompt = "You are a resume optimization expert. Add quantifiable metrics and impact to achievements. Use percentages, numbers, and concrete results.";
        userPrompt = `Add quantifiable metrics to this achievement:\n\n${data.text}`;
        break;

      case "score-resume":
        systemPrompt = "You are an ATS (Applicant Tracking System) expert. Analyze resumes for ATS compatibility, keyword optimization, and formatting. Provide a score out of 100 and specific improvement suggestions.";
        userPrompt = `Analyze this resume:\n\n${JSON.stringify(data.resume, null, 2)}`;
        break;

      case "skills-gap":
        systemPrompt = "You are a career development expert. Analyze skill gaps between a candidate's current skills and target job requirements. Provide actionable learning recommendations.";
        userPrompt = `Current skills: ${data.currentSkills.join(', ')}\nTarget job description: ${data.jobDescription}`;
        break;

      case "job-match":
        systemPrompt = "You are a job matching expert. Analyze how well a resume matches a job description. Provide a match score (0-100) and detailed feedback on strengths and gaps.";
        userPrompt = `Resume:\n${JSON.stringify(data.resume, null, 2)}\n\nJob Description:\n${data.jobDescription}`;
        break;

      case "interview-questions":
        systemPrompt = "You are an interview preparation expert. Generate relevant interview questions based on the resume and job role. Include both technical and behavioral questions.";
        userPrompt = `Resume:\n${JSON.stringify(data.resume, null, 2)}`;
        break;

      case "linkedin-optimize":
        systemPrompt = "You are a LinkedIn optimization expert. Create compelling profile content including headline, about section, and experience descriptions optimized for visibility and engagement.";
        userPrompt = `Create LinkedIn profile content from this resume:\n${JSON.stringify(data.resume, null, 2)}`;
        break;

      case "tailor-resume":
        systemPrompt = "You are a resume tailoring expert. Optimize the resume content to match the specific job description while maintaining truthfulness. Suggest keyword additions and content adjustments.";
        userPrompt = `Resume:\n${JSON.stringify(data.resume, null, 2)}\n\nJob Description:\n${data.jobDescription}`;
        break;

      default:
        throw new Error("Invalid action");
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
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add funds to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;

    return new Response(
      JSON.stringify({ result: content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
