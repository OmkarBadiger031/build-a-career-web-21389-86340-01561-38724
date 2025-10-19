import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';

export const JobMatcher = () => {
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify(resumeData),
          type: 'job-match',
          metadata: { jobDescription },
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
        let jsonString = data.text.trim();
        if (jsonString.startsWith('```json')) {
          jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonString.startsWith('```')) {
          jsonString = jsonString.replace(/```\n?/g, '');
        }
        
        const result = JSON.parse(jsonString);
        setMatchResult(result);
        toast.success(`Match Score: ${result.matchScore}%`);
      }
    } catch (error) {
      console.error('Job match error:', error);
      toast.error('Failed to analyze job match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Job Description Matcher</h3>
      </div>

      <Textarea
        placeholder="Paste the job description here to see how well your resume matches..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
        className="resize-none"
      />

      <Button 
        onClick={analyzeMatch}
        disabled={loading || !jobDescription.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Match...
          </>
        ) : (
          <>
            <Briefcase className="h-4 w-4" />
            Analyze Job Match
          </>
        )}
      </Button>

      {matchResult && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
            <span className="font-medium">Match Score</span>
            <Badge 
              variant={matchResult.matchScore >= 80 ? 'default' : matchResult.matchScore >= 60 ? 'secondary' : 'destructive'}
              className="text-lg"
            >
              {matchResult.matchScore}%
            </Badge>
          </div>

          {matchResult.matchingSkills && matchResult.matchingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Matching Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchingSkills.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-green-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {matchResult.missingSkills && matchResult.missingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-red-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {matchResult.suggestions && matchResult.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Suggestions to Improve</h4>
              <ul className="space-y-1">
                {matchResult.suggestions.map((suggestion: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">→</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
