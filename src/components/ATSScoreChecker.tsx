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
      const content = JSON.stringify({
        summary: dataToCheck.summary || '',
        experience: dataToCheck.workExperience || dataToCheck.experience || [],
        education: dataToCheck.education || [],
        skills: dataToCheck.skills || [],
      });

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

  const handleDownloadFixed = () => {
    if (!resumeData) {
      toast.error('No resume data to download');
      return;
    }

    try {
      const data = JSON.stringify(resumeData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume-ats-optimized.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('✓ Optimized resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume. Please try again.');
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
              onClick={handleDownloadFixed}
              variant="outline"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Download Optimized Resume
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
