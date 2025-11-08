import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, AlertCircle, CheckCircle, Loader2, Upload, Download, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { downloadResumeFromPreview } from '@/lib/pdfUtils';

export const AIAssistant = () => {
  const { resumeData, importData } = useResume();
  const [loading, setLoading] = useState(false);
  const [autoFixing, setAutoFixing] = useState(false);
  const [atsScore, setAtsScore] = useState<any>(null);

  const checkATSScore = async () => {
    setLoading(true);
    try {
      const content = JSON.stringify({
        summary: resumeData.summary,
        experience: resumeData.workExperience,
        education: resumeData.education,
        skills: resumeData.skills,
      });

      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content,
          type: 'ats-score',
          jobProfile: resumeData.jobProfile,
        },
      });

      if (error) throw error;

      if (data?.text) {
        let jsonString = data.text.trim();
        
        // Remove markdown code blocks
        if (jsonString.startsWith('```json')) {
          jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonString.startsWith('```')) {
          jsonString = jsonString.replace(/```\n?/g, '');
        }

        const scoreData = JSON.parse(jsonString);
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleUploadResume = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            importData(event.target.result);
            toast.success('Resume uploaded successfully!');
            setTimeout(() => checkATSScore(), 500);
          } catch (error) {
            toast.error('Failed to upload resume');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleAutoFix = async () => {
    if (!atsScore) {
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

      if (error) throw error;

      if (data?.text) {
        let fixedContent = data.text.trim();
        
        // Remove markdown code blocks
        if (fixedContent.startsWith('```json')) {
          fixedContent = fixedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (fixedContent.startsWith('```')) {
          fixedContent = fixedContent.replace(/```\n?/g, '');
        }

        try {
          importData(fixedContent);
          toast.success('Resume auto-fixed! Review the changes.');
          setTimeout(() => checkATSScore(), 500);
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
    downloadResumeFromPreview();
  };

  return (
    <Card className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">ATS Score Checker with Auto-Fix</h3>
      </div>

      <div className="space-y-2">
        <Button 
          onClick={handleUploadResume}
          variant="outline"
          className="w-full gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Existing Resume
        </Button>
        
        <Button 
          onClick={checkATSScore} 
          disabled={loading}
          className="w-full gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Check ATS Compatibility
            </>
          )}
        </Button>
      </div>
      
      {atsScore && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
            <span className="font-medium">ATS Score</span>
            <span className={`text-2xl font-bold ${getScoreColor(atsScore.score)}`}>
              {atsScore.score}/100
            </span>
          </div>

          {atsScore.issues && atsScore.issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Top Issues
              </h4>
              <ul className="space-y-1">
                {atsScore.issues.map((issue: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {atsScore.recommendations && atsScore.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Recommendations
              </h4>
              <ul className="space-y-1">
                {atsScore.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 pt-4 border-t space-y-2">
            <Button
              onClick={handleAutoFix}
              disabled={autoFixing}
              className="w-full gap-2"
              variant="default"
            >
              {autoFixing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Auto-Fixing Resume...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Auto-Fix Resume Based on ATS
                </>
              )}
            </Button>

            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              Download Fixed Resume as PDF
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};