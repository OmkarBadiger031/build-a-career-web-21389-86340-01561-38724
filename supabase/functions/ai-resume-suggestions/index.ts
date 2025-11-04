import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { content, type, jobProfile, metadata } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    
    if (type === "ats-score") {
      systemPrompt = `You are an ATS (Applicant Tracking System) expert. Analyze the resume content thoroughly and provide:

SCORING CRITERIA (0-100):
- 90-100: Excellent - Well-structured, keyword-rich, proper formatting, quantified achievements
- 75-89: Good - Solid content with minor improvements needed
- 60-74: Average - Needs optimization in keywords, formatting, or achievements
- 40-59: Below Average - Significant issues with structure, keywords, or content
- 0-39: Poor - Major issues, incomplete sections, or very weak content

Analyze:
1. Content Quality: Are there detailed work experiences, achievements, skills?
2. Keyword Optimization: Are relevant industry keywords present?
3. Formatting: Is the structure clear and ATS-friendly?
4. Quantifiable Results: Are there metrics, percentages, or numbers?
5. Completeness: Are all major sections filled (summary, experience, education, skills)?

Provide:
1. An accurate ATS compatibility score (0-100) based on actual content quality
2. Top 3-5 specific issues affecting ATS readability (be detailed)
3. Top 3-5 actionable recommendations to improve ATS score
4. 2-3 strengths (pros) of the current resume
5. 2-3 weaknesses (cons) of the current resume

Respond in JSON format: { 
  "score": number, 
  "issues": string[], 
  "recommendations": string[],
  "pros": string[],
  "cons": string[]
}`;
    } else if (type === "auto-fix") {
      systemPrompt = `You are a professional resume optimization expert. Based on the ATS score analysis provided in metadata, automatically fix and improve the resume data to maximize ATS compatibility.

Rules:
1. Keep all existing information but optimize wording and formatting
2. Fix common ATS issues (poor keywords, weak action verbs, inconsistent formatting)
3. Enhance bullet points with stronger action verbs and quantifiable achievements
4. Ensure proper keyword optimization for the role
5. Return the complete fixed resume in the same JSON structure

Return ONLY the fixed JSON resume data, no explanations.`;
    } else if (type === "smart-suggestion") {
      const suggestionType = metadata?.suggestionType || 'general';
      systemPrompt = `You are a professional resume writing expert. Provide a smart, actionable suggestion to improve the ${suggestionType} section of a resume.

Guidelines:
1. Be specific and actionable
2. Use strong action verbs
3. Focus on achievements and impact
4. Keep it concise (2-3 sentences max)
5. Make it ATS-friendly

Return ONLY the suggestion text, no additional formatting.`;
    } else if (type === "improve-content") {
      systemPrompt = `You are a professional resume writer. Improve this resume section for ${jobProfile || 'general'} positions. Make it:
- More impactful and results-oriented
- ATS-friendly with relevant keywords
- Concise and professional
- Quantified where possible
Return ONLY the improved text, no explanations.`;
    } else if (type === "generate-summary") {
      systemPrompt = `You are a professional resume writer. Generate a compelling professional summary for a ${jobProfile || 'professional'} role based on the provided work experience and skills. Make it:
- 3-4 sentences
- Highlights key achievements and skills
- Results-oriented
- ATS-friendly
Return ONLY the summary text.`;
    } else if (type === "keywords") {
      systemPrompt = `Extract the most important keywords and skills from the following job description. Focus on technical skills, required qualifications, and key responsibilities.
Return ONLY valid JSON with a "keywords" array containing 10-15 important keywords.`;
    } else if (type === "cover-letter") {
      systemPrompt = `You are a professional cover letter writer. Create a compelling cover letter based on the resume content and job information provided.
The cover letter should:
- Be professional and engaging
- Highlight relevant experience and skills
- Show enthusiasm for the role
- Be 3-4 paragraphs long
- Include a strong opening and closing

Company: ${metadata?.companyName || 'the company'}
Position: ${metadata?.position || 'the position'}
${metadata?.jobDescription ? `Job Description: ${metadata.jobDescription}` : ''}

Return ONLY valid JSON with a "coverLetter" field containing the complete cover letter text.`;
    } else if (type === "resume-score") {
      systemPrompt = `You are a professional resume analyst. Analyze the resume and provide a detailed score.
Return JSON: {
  "overall": number (0-100),
  "categories": {
    "content": number (0-100),
    "formatting": number (0-100),
    "keywords": number (0-100),
    "impact": number (0-100)
  },
  "strengths": string[],
  "improvements": string[]
}`;
    } else if (type === "job-match") {
      systemPrompt = `You are a job matching expert. Analyze how well the resume matches the job description.
Return JSON: {
  "matchScore": number (0-100),
  "matchingSkills": string[],
  "missingSkills": string[],
  "suggestions": string[]
}`;
    } else if (type === "bullet-points") {
      systemPrompt = `You are a resume writing expert. Generate 3-5 professional bullet points that:
- Start with strong action verbs
- Include quantifiable achievements when possible
- Are ATS-friendly
- Focus on impact and results

Return JSON: { "bullets": string[] }`;
    } else if (type === "parse-resume") {
      systemPrompt = `You are a resume parsing expert. Extract structured data from this resume content and return it in JSON format:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "workExperience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "responsibilities": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "fieldOfStudy": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": [],
    "languages": []
  }
}`;
    } else if (type === "quantify-achievement") {
      systemPrompt = `You are a resume optimization expert. Take this achievement and provide 3 versions with specific metrics and numbers added to make it more impactful.

Guidelines:
- Add realistic percentages, dollar amounts, time saved, or other metrics
- Use strong action verbs
- Make it ATS-friendly
- Focus on measurable impact

Return JSON: { "quantified": string[] }`;
    } else if (type === "interview-questions") {
      systemPrompt = `You are an interview preparation expert. Based on this resume, generate 8-10 potential interview questions the candidate might be asked, along with suggested answers.

Return JSON: {
  "questions": [
    {
      "question": "interview question here",
      "suggestedAnswer": "detailed suggested answer based on resume"
    }
  ]
}`;
    } else if (type === "linkedin-profile") {
      systemPrompt = `You are a LinkedIn optimization expert. Generate optimized LinkedIn profile content from this resume.

Return JSON: {
  "headline": "professional headline (120 chars max)",
  "about": "compelling about section (2600 chars max, 3-4 paragraphs)",
  "featured": "featured section content highlighting top achievements"
}`;
    } else if (type === "skills-gap") {
      systemPrompt = `You are a skills gap analysis expert. Compare the resume skills against the job description and identify:
1. Skills the candidate has that match the job
2. Skills the candidate is missing
3. Recommendations to bridge the gap
4. A gap score (0-100) indicating how well skills match

Return JSON: {
  "matchingSkills": string[],
  "missingSkills": string[],
  "recommendations": string[],
  "gapScore": number
}`;
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
          { role: "user", content: content }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log('AI Response:', JSON.stringify(data, null, 2));
    const text = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-resume-suggestions:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
