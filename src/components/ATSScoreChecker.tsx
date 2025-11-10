import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, CheckCircle, AlertCircle, Loader2, Download, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { generateResumePDF } from '@/lib/pdfUtils';

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

  const getFileType = (file: File) => {
    const ext = file.name.toLowerCase().split('.').pop() || '';
    const mimeType = file.type.toLowerCase();
    
    if (['txt', 'json'].includes(ext) || mimeType.includes('text') || mimeType.includes('json')) {
      return 'text';
    }
    if (['pdf'].includes(ext) || mimeType.includes('pdf')) {
      return 'document';
    }
    if (['doc', 'docx'].includes(ext) || mimeType.includes('word') || mimeType.includes('document')) {
      return 'document';
    }
    if (['ppt', 'pptx'].includes(ext) || mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
      return 'document';
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext) || mimeType.includes('image')) {
      return 'image';
    }
    return 'unknown';
  };

  const handleUploadResume = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt,.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,text/plain,application/json,application/pdf';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 10MB.');
        return;
      }

      const fileType = getFileType(file);
      
      if (fileType === 'unknown') {
        toast.error('Unsupported file format. Please use PDF, DOCX, PPT, TXT, or JSON.');
        return;
      }

      setLoading(true);
      
      try {
        if (fileType === 'text') {
          // Handle text-based files (TXT, JSON)
          const fileName = file.name.toLowerCase();
          toast.info('Processing your resume...');
          
          if (fileName.endsWith('.json') || file.type === 'application/json') {
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
          } else {
            // Handle TXT files
            const reader = new FileReader();
          reader.onload = async (event: any) => {
            try {
              const content = event.target.result as string;
              
              // Validate content
              if (!content || content.trim().length === 0) {
                toast.error('File is empty or cannot be read. Please try a plain text file (.txt).');
                setLoading(false);
                return;
              }

              console.log('Parsing resume, content length:', content.length);
              
              // Use AI to parse the resume text into structured format
              const { data: parseResult, error: parseError } = await supabase.functions.invoke('ai-resume-suggestions', {
                body: {
                  content: content,
                  type: 'parse-resume',
                },
              });

              if (parseError) {
                console.error('Parse error:', parseError);
                if (parseError.message?.includes('429') || parseError.message?.includes('Rate limit')) {
                  toast.error('Rate limits exceeded. Please try again later.');
                } else if (parseError.message?.includes('402') || parseError.message?.includes('Payment')) {
                  toast.error('Payment required. Please add funds to your workspace.');
                } else if (parseError.message?.includes('FunctionsHttpError')) {
                  toast.error('Failed to parse resume. Please try uploading a plain text file (.txt) or JSON export from the Resume Builder.');
                } else {
                  toast.error(`Parsing failed: ${parseError.message || 'Unknown error'}`);
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

                console.log('Parsing JSON response...');
                const parsedData = JSON.parse(jsonString);
                setResumeData(parsedData);
                toast.success('Resume parsed successfully!');
                await checkATSScore(parsedData);
              } else {
                toast.error('No data received. Please try a different file format.');
                setLoading(false);
              }
            } catch (error) {
              console.error('Error processing document:', error);
              toast.error('Failed to parse resume. For best results, use a plain text file (.txt) or JSON export.');
              setLoading(false);
            }
          };

          reader.onerror = () => {
            toast.error('Failed to read file. Please try again.');
            setLoading(false);
          };

          reader.readAsText(file);
          }
        } else if (fileType === 'document' || fileType === 'image') {
          // Handle binary files (PDF, DOCX, PPT, images)
          toast.info(fileType === 'image' ? 'Processing image...' : 'Extracting text from document...');
          
          const reader = new FileReader();
          reader.onload = async (event: any) => {
            try {
              const base64Data = (event.target.result as string).split(',')[1];
              
              console.log('Sending file to parse-document function...');
              
              // Call parse-document edge function
              const { data: parseResult, error: parseError } = await supabase.functions.invoke('parse-document', {
                body: {
                  fileData: base64Data,
                  fileName: file.name,
                  mimeType: file.type
                }
              });
              
              if (parseError) {
                console.error('Document parsing error:', parseError);
                toast.error(parseError.message || 'Failed to extract text from document');
                setLoading(false);
                return;
              }
              
              if (parseResult?.error) {
                toast.error(parseResult.error);
                setLoading(false);
                return;
              }
              
              if (!parseResult?.text || parseResult.text.length < 20) {
                toast.error('Could not extract readable text from this file. Please try a text file or different format.');
                setLoading(false);
                return;
              }
              
              console.log('Extracted text length:', parseResult.text.length);
              toast.info('Text extracted! Now parsing with AI...');
              
              // Now parse the extracted text with AI
              const { data: aiResult, error: aiError } = await supabase.functions.invoke('ai-resume-suggestions', {
                body: {
                  content: parseResult.text,
                  type: 'parse-resume',
                },
              });
              
              if (aiError) {
                console.error('AI parsing error:', aiError);
                if (aiError.message?.includes('429') || aiError.message?.includes('Rate limit')) {
                  toast.error('Rate limits exceeded. Please try again later.');
                } else if (aiError.message?.includes('402') || aiError.message?.includes('Payment')) {
                  toast.error('Payment required. Please add funds to your workspace.');
                } else {
                  toast.error(`Parsing failed: ${aiError.message || 'Unknown error'}`);
                }
                setLoading(false);
                return;
              }
              
              if (aiResult?.text) {
                let jsonString = aiResult.text.trim();
                
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
              toast.error('Failed to process file. Please try a different format.');
              setLoading(false);
            }
          };
          
          reader.onerror = () => {
            toast.error('Failed to read file. Please try again.');
            setLoading(false);
          };
          
          reader.readAsDataURL(file);
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
      toast.error('No resume data available to download');
      return;
    }

    const savedTemplateId = localStorage.getItem('selectedTemplateId');
    generateResumePDF(resumeData, savedTemplateId || undefined);
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
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">ATS Score Checker</h3>
            <p className="text-sm text-muted-foreground">Upload & optimize your resume</p>
          </div>
        </div>
        
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm space-y-2">
          <p className="font-medium text-amber-700 dark:text-amber-400">⚠️ AI Credits Required</p>
          <p className="text-amber-600 dark:text-amber-300">
            This feature requires Lovable AI credits. If you see "Payment required" errors, add credits at <strong>Settings → Workspace → Usage</strong>.
          </p>
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
          Upload Resume (PDF, DOCX, TXT, JSON)
        </Button>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="text-xs">PDF</Badge>
          <Badge variant="outline" className="text-xs">DOCX</Badge>
          <Badge variant="outline" className="text-xs">DOC</Badge>
          <Badge variant="outline" className="text-xs">PPT</Badge>
          <Badge variant="outline" className="text-xs">TXT</Badge>
          <Badge variant="outline" className="text-xs">JSON</Badge>
        </div>
        
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
