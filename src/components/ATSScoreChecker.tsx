import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, CheckCircle, AlertCircle, Loader2, Download, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

interface ATSScore {
  score: number;
  issues: string[];
  recommendations: string[];
  pros?: string[];
  cons?: string[];
}

export const ATSScoreChecker = () => {
  const [loading, setLoading] = useState(false);
  const [autoFixing, setAutoFixing] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  const handleUploadResume = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.pdf,.docx,.doc,.txt';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);
      toast.info('Processing your resume...');
      
      try {
        if (file.name.endsWith('.json')) {
          // Handle JSON files
          const reader = new FileReader();
          reader.onload = async (event: any) => {
            try {
              const data = JSON.parse(event.target.result as string);
              setResumeData(data);
              await checkATSScore(data);
            } catch (error) {
              console.error('Error parsing JSON:', error);
              toast.error('Invalid JSON file format');
              setLoading(false);
            }
          };
          reader.readAsText(file);
        } else if (file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc') || file.name.endsWith('.txt')) {
          // Handle PDF, DOCX, DOC, and TXT files - extract text and parse with AI
          const reader = new FileReader();
          reader.onload = async (event: any) => {
            try {
              const content = event.target.result as string;
              
              // Use AI to parse the resume text into structured format
              const { data: parseResult, error: parseError } = await supabase.functions.invoke('ai-resume-suggestions', {
                body: {
                  content: content,
                  type: 'parse-resume',
                },
              });

              if (parseError) {
                if (parseError.message?.includes('429') || parseError.message?.includes('Rate limit')) {
                  toast.error('Rate limits exceeded. Please try again later.');
                } else if (parseError.message?.includes('402') || parseError.message?.includes('Payment')) {
                  toast.error('Payment required. Please add funds to your workspace.');
                } else {
                  throw parseError;
                }
                setLoading(false);
                return;
              }

              if (parseResult?.text) {
                let jsonString = parseResult.text.trim();
                
                // Remove markdown code blocks
                if (jsonString.startsWith('```json')) {
                  jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
                } else if (jsonString.startsWith('```')) {
                  jsonString = jsonString.replace(/```\n?/g, '');
                }

                const parsedData = JSON.parse(jsonString);
                setResumeData(parsedData);
                toast.success('Resume parsed successfully!');
                await checkATSScore(parsedData);
              }
            } catch (error) {
              console.error('Error processing document:', error);
              toast.error('Failed to parse resume. Please try a different file format.');
              setLoading(false);
            }
          };
          reader.readAsText(file);
        } else {
          toast.error('Unsupported file format. Please upload JSON, PDF, DOCX, DOC, or TXT.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error reading file:', error);
        toast.error('Failed to read file');
        setLoading(false);
      }
    };
    input.click();
  };

  const checkATSScore = async (data?: any) => {
    const dataToCheck = data || resumeData;
    if (!dataToCheck) {
      toast.error('Please upload a resume first');
      return;
    }

    setLoading(true);
    try {
      // Prepare comprehensive resume data for accurate ATS analysis
      const resumeForAnalysis = {
        personalInfo: dataToCheck.personalInfo || {},
        summary: dataToCheck.summary || '',
        workExperience: dataToCheck.workExperience || dataToCheck.experience || [],
        education: dataToCheck.education || [],
        skills: dataToCheck.skills || {},
        projects: dataToCheck.projects || [],
        certifications: dataToCheck.certifications || []
      };

      // Create a detailed text representation for better AI analysis
      const content = `
PERSONAL INFORMATION:
Name: ${resumeForAnalysis.personalInfo.fullName || 'Not provided'}
Email: ${resumeForAnalysis.personalInfo.email || 'Not provided'}
Phone: ${resumeForAnalysis.personalInfo.phone || 'Not provided'}
Location: ${resumeForAnalysis.personalInfo.location || 'Not provided'}

PROFESSIONAL SUMMARY:
${resumeForAnalysis.summary || 'No summary provided'}

WORK EXPERIENCE:
${resumeForAnalysis.workExperience.map((exp: any, idx: number) => `
${idx + 1}. ${exp.position || 'Position'} at ${exp.company || 'Company'}
   Duration: ${exp.startDate || ''} - ${exp.endDate || (exp.current ? 'Present' : '')}
   ${exp.description ? `Description: ${exp.description}` : ''}
   ${exp.responsibilities && exp.responsibilities.length > 0 ? `Responsibilities:\n   - ${exp.responsibilities.join('\n   - ')}` : ''}
`).join('\n')}

EDUCATION:
${resumeForAnalysis.education.map((edu: any, idx: number) => `
${idx + 1}. ${edu.degree || 'Degree'} in ${edu.fieldOfStudy || 'Field'}
   Institution: ${edu.institution || 'Institution'}
   Duration: ${edu.startDate || ''} - ${edu.endDate || ''}
`).join('\n')}

SKILLS:
Technical Skills: ${resumeForAnalysis.skills.technical?.join(', ') || 'None listed'}
Soft Skills: ${resumeForAnalysis.skills.soft?.join(', ') || 'None listed'}
Languages: ${resumeForAnalysis.skills.languages?.join(', ') || 'None listed'}

PROJECTS:
${resumeForAnalysis.projects.map((proj: any, idx: number) => `
${idx + 1}. ${proj.name || 'Project'}
   ${proj.description || ''}
`).join('\n')}

CERTIFICATIONS:
${resumeForAnalysis.certifications.map((cert: any, idx: number) => `
${idx + 1}. ${cert.name || 'Certification'} - ${cert.issuer || ''}
`).join('\n')}
`.trim();

      const { data: result, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content,
          type: 'ats-score',
        },
      });

      if (error) {
        if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
          toast.error('Rate limits exceeded. Please try again later.');
        } else if (error.message?.includes('402') || error.message?.includes('Payment')) {
          toast.error('Payment required. Please add funds to your workspace.');
        } else {
          throw error;
        }
        return;
      }

      if (result?.text) {
        let jsonString = result.text.trim();
        
        // Remove markdown code blocks
        if (jsonString.startsWith('```json')) {
          jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonString.startsWith('```')) {
          jsonString = jsonString.replace(/```\n?/g, '');
        }

        const scoreData = JSON.parse(jsonString);
        
        // Ensure we have pros and cons
        if (!scoreData.pros) {
          scoreData.pros = scoreData.recommendations?.slice(0, 3) || [];
        }
        if (!scoreData.cons) {
          scoreData.cons = scoreData.issues || [];
        }
        
        setAtsScore(scoreData);
        toast.success(`ATS Score: ${scoreData.score}/100`);
      }
    } catch (error: any) {
      console.error('ATS Score Error:', error);
      toast.error('Failed to analyze ATS score');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFix = async () => {
    if (!atsScore || !resumeData) {
      toast.error('Please check ATS score first');
      return;
    }

    setAutoFixing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify(resumeData),
          type: 'auto-fix',
          metadata: { atsScore },
        },
      });

      if (error) {
        if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
          toast.error('Rate limits exceeded. Please try again later.');
        } else if (error.message?.includes('402') || error.message?.includes('Payment')) {
          toast.error('Payment required. Please add funds to your workspace.');
        } else {
          throw error;
        }
        return;
      }

      if (data?.text) {
        let fixedContent = data.text.trim();
        
        // Remove markdown code blocks
        if (fixedContent.startsWith('```json')) {
          fixedContent = fixedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (fixedContent.startsWith('```')) {
          fixedContent = fixedContent.replace(/```\n?/g, '');
        }

        try {
          const fixedData = JSON.parse(fixedContent);
          setResumeData(fixedData);
          toast.success('Resume auto-fixed! Review the changes.');
          
          // Re-check the score
          setTimeout(() => checkATSScore(fixedData), 500);
        } catch (parseError) {
          console.error('Parse error:', parseError);
          toast.error('Failed to apply auto-fix');
        }
      }
    } catch (error: any) {
      console.error('Auto-fix error:', error);
      toast.error('Failed to auto-fix resume');
    } finally {
      setAutoFixing(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!resumeData) {
      toast.error('No resume data to download');
      return;
    }

    try {
      // Build comprehensive HTML content with proper formatting
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.personalInfo?.fullName || 'Resume'} - Fixed Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 850px;
      margin: 0 auto;
      padding: 40px 60px;
      background: white;
    }
    
    h1 {
      font-size: 28px;
      margin-bottom: 8px;
      color: #1a1a1a;
      font-weight: 700;
    }
    
    .contact-info {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #333;
      font-size: 14px;
      color: #555;
    }
    
    .contact-info p {
      margin: 4px 0;
    }
    
    h2 {
      font-size: 20px;
      margin-top: 24px;
      margin-bottom: 12px;
      color: #1a1a1a;
      font-weight: 700;
      border-bottom: 2px solid #333;
      padding-bottom: 6px;
    }
    
    h3 {
      font-size: 16px;
      margin-top: 16px;
      margin-bottom: 6px;
      color: #1a1a1a;
      font-weight: 600;
    }
    
    p {
      margin: 6px 0;
      font-size: 14px;
    }
    
    ul {
      margin: 8px 0;
      padding-left: 24px;
    }
    
    li {
      margin: 4px 0;
      font-size: 14px;
    }
    
    .section {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    
    .experience-item, .education-item, .project-item, .cert-item {
      margin-bottom: 18px;
      page-break-inside: avoid;
    }
    
    .date {
      color: #666;
      font-style: italic;
      font-size: 13px;
    }
    
    .skills-list {
      margin: 8px 0;
    }
    
    @media print {
      body {
        padding: 20px 40px;
      }
      
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <h1>${resumeData.personalInfo?.fullName || 'Professional Resume'}</h1>
  
  <div class="contact-info">
    ${resumeData.personalInfo?.email ? `<p>Email: ${resumeData.personalInfo.email}</p>` : ''}
    ${resumeData.personalInfo?.phone ? `<p>Phone: ${resumeData.personalInfo.phone}</p>` : ''}
    ${resumeData.personalInfo?.location ? `<p>Location: ${resumeData.personalInfo.location}</p>` : ''}
    ${resumeData.personalInfo?.linkedin ? `<p>LinkedIn: ${resumeData.personalInfo.linkedin}</p>` : ''}
    ${resumeData.personalInfo?.website ? `<p>Website: ${resumeData.personalInfo.website}</p>` : ''}
  </div>

  ${resumeData.summary ? `
    <div class="section">
      <h2>Professional Summary</h2>
      <p>${resumeData.summary}</p>
    </div>
  ` : ''}

  ${resumeData.workExperience && resumeData.workExperience.length > 0 ? `
    <div class="section">
      <h2>Work Experience</h2>
      ${resumeData.workExperience.map((exp: any) => `
        <div class="experience-item">
          <h3>${exp.position || 'Position'}</h3>
          <p><strong>${exp.company || 'Company'}</strong></p>
          <p class="date">${exp.startDate || ''} - ${exp.endDate || (exp.current ? 'Present' : '')}</p>
          ${exp.description ? `<p>${exp.description}</p>` : ''}
          ${exp.responsibilities && exp.responsibilities.length > 0 ? `
            <ul>
              ${exp.responsibilities.map((resp: string) => `<li>${resp}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

  ${resumeData.education && resumeData.education.length > 0 ? `
    <div class="section">
      <h2>Education</h2>
      ${resumeData.education.map((edu: any) => `
        <div class="education-item">
          <h3>${edu.degree || 'Degree'}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
          <p><strong>${edu.institution || 'Institution'}</strong></p>
          <p class="date">${edu.startDate || ''} - ${edu.endDate || ''}</p>
          ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

  ${resumeData.skills && (resumeData.skills.technical?.length > 0 || resumeData.skills.soft?.length > 0 || resumeData.skills.languages?.length > 0) ? `
    <div class="section">
      <h2>Skills</h2>
      ${resumeData.skills.technical?.length > 0 ? `
        <div class="skills-list">
          <h3>Technical Skills</h3>
          <p>${resumeData.skills.technical.join(', ')}</p>
        </div>
      ` : ''}
      ${resumeData.skills.soft?.length > 0 ? `
        <div class="skills-list">
          <h3>Soft Skills</h3>
          <p>${resumeData.skills.soft.join(', ')}</p>
        </div>
      ` : ''}
      ${resumeData.skills.languages?.length > 0 ? `
        <div class="skills-list">
          <h3>Languages</h3>
          <p>${resumeData.skills.languages.join(', ')}</p>
        </div>
      ` : ''}
    </div>
  ` : ''}

  ${resumeData.projects && resumeData.projects.length > 0 ? `
    <div class="section">
      <h2>Projects</h2>
      ${resumeData.projects.map((proj: any) => `
        <div class="project-item">
          <h3>${proj.name || 'Project'}</h3>
          ${proj.description ? `<p>${proj.description}</p>` : ''}
          ${proj.technologies ? `<p><strong>Technologies:</strong> ${proj.technologies.join ? proj.technologies.join(', ') : proj.technologies}</p>` : ''}
          ${proj.url ? `<p><strong>URL:</strong> ${proj.url}</p>` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

  ${resumeData.certifications && resumeData.certifications.length > 0 ? `
    <div class="section">
      <h2>Certifications</h2>
      ${resumeData.certifications.map((cert: any) => `
        <div class="cert-item">
          <h3>${cert.name || 'Certification'}</h3>
          <p><strong>${cert.issuer || 'Issuing Organization'}</strong></p>
          ${cert.date ? `<p class="date">Issued: ${cert.date}</p>` : ''}
          ${cert.credentialId ? `<p>Credential ID: ${cert.credentialId}</p>` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}

  <script>
    // Auto-trigger print dialog when page loads
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>
      `;

      // Open in new window and trigger print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        toast.success('Opening print dialog. Choose "Save as PDF" as your printer.');
      } else {
        toast.error('Please allow pop-ups to download the PDF');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className="p-6 space-y-6 h-full">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">ATS Score Checker</h3>
            <p className="text-sm text-muted-foreground">Upload & optimize your resume</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleUploadResume}
          variant="outline"
          className="w-full gap-2"
          size="lg"
        >
          <Upload className="h-4 w-4" />
          Upload Your Resume
        </Button>
        
        {resumeData && (
          <Button 
            onClick={() => checkATSScore()}
            disabled={loading}
            className="w-full gap-2"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Check ATS Score
              </>
            )}
          </Button>
        )}
      </div>
      
      {atsScore && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">ATS Score</span>
              <Badge variant={getScoreBadgeVariant(atsScore.score)} className="text-lg px-3 py-1">
                {atsScore.score}/100
              </Badge>
            </div>
            <Progress value={atsScore.score} className="h-2" />
          </div>

          {atsScore.pros && atsScore.pros.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Strengths
              </h4>
              <ul className="space-y-1">
                {atsScore.pros.map((pro: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {atsScore.cons && atsScore.cons.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Issues Found
              </h4>
              <ul className="space-y-1">
                {atsScore.cons.map((con: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t space-y-2">
            <Button
              onClick={handleAutoFix}
              disabled={autoFixing}
              className="w-full gap-2"
              size="lg"
            >
              {autoFixing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Optimizing Resume...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Fix All Issues with AI
                </>
              )}
            </Button>

            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <Download className="h-4 w-4" />
              Download Fixed Resume as PDF
            </Button>
          </div>
        </div>
      )}

      {!atsScore && !resumeData && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Upload your resume to get started</p>
        </div>
      )}
    </Card>
  );
};
