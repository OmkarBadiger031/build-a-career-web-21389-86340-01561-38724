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
      systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst with 15+ years of experience. Analyze the resume content THOROUGHLY and provide an ACCURATE, DATA-DRIVEN score.

CRITICAL SCORING GUIDELINES (0-100):
- 90-100: Exceptional - Comprehensive content, strong keywords, quantified achievements, perfect structure, complete sections
- 75-89: Good - Strong content, good keywords, most achievements quantified, minor gaps
- 60-74: Average - Basic content present, needs more keywords/quantification, some gaps
- 40-59: Below Average - Weak content, poor keywords, missing quantification, significant gaps
- 0-39: Poor - Minimal content, no keywords, no quantification, major sections missing

ANALYZE THESE 5 DIMENSIONS:
1. **Content Depth** (0-20 points):
   - Are work experiences detailed with specific responsibilities?
   - Is there a professional summary?
   - Are all sections complete (contact, summary, experience, education, skills)?

2. **Keyword Optimization** (0-20 points):
   - Are industry-specific keywords present?
   - Are role-relevant skills mentioned?
   - Are technical terms appropriate?

3. **Quantifiable Achievements** (0-20 points):
   - Are there metrics (%, $, numbers)?
   - Are results measurable?
   - Do bullet points show impact?

4. **Structure & Formatting** (0-20 points):
   - Is information logically organized?
   - Are sections clearly defined?
   - Is it ATS-parseable?

5. **Completeness** (0-20 points):
   - Personal info present?
   - Work history detailed?
   - Education included?
   - Skills listed?

RESPONSE FORMAT - Return valid JSON ONLY:
{
  "score": <number between 0-100>,
  "issues": [
    "Specific issue 1 with detail",
    "Specific issue 2 with detail",
    "Specific issue 3 with detail"
  ],
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2",
    "Actionable recommendation 3"
  ],
  "pros": [
    "Strength 1",
    "Strength 2"
  ],
  "cons": [
    "Weakness 1",
    "Weakness 2"
  ]
}

BE HONEST AND ACCURATE. If the resume is weak, score it low. If it's strong, score it high. Base your score on actual content, not potential.`;
    } else if (type === "auto-fix") {
      systemPrompt = `You are an expert resume optimization specialist. Your task is to FIX and ENHANCE the resume to maximize ATS compatibility while maintaining all original information.

CRITICAL RULES:
1. PRESERVE all original data structure - return complete JSON with same fields
2. ENHANCE every work experience bullet point with:
   - Strong action verbs (Led, Developed, Increased, Implemented, etc.)
   - Quantifiable metrics where possible (%, $, time, scale)
   - Clear impact statements
3. OPTIMIZE professional summary to be:
   - Keyword-rich
   - Achievement-focused
   - Industry-relevant
4. IMPROVE skills section:
   - Add relevant industry keywords
   - Organize by relevance
   - Include technical and soft skills
5. ENSURE completeness:
   - All fields filled where data exists
   - Consistent formatting
   - Professional language

ATS ISSUES TO FIX (from analysis):
${metadata?.atsScore ? `
Score: ${metadata.atsScore.score}/100
Issues: ${metadata.atsScore.issues?.join('; ') || 'None'}
Recommendations: ${metadata.atsScore.recommendations?.join('; ') || 'None'}
` : 'General optimization needed'}

OUTPUT FORMAT:
Return ONLY valid JSON with the complete enhanced resume structure. No markdown, no explanations, just pure JSON.`;
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
