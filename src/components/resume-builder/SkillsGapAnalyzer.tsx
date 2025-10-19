import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Target, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';
import { Badge } from '@/components/ui/badge';

interface SkillsGapAnalysis {
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  gapScore: number;
}

export const SkillsGapAnalyzer = () => {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<SkillsGapAnalysis | null>(null);

  const analyzeSkillsGap = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify({
            resume: resumeData,
            jobDescription: jobDescription
          }),
          type: 'skills-gap',
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
        setAnalysis(result);
        toast.success('Skills gap analysis complete!');
      }
    } catch (error) {
      console.error('Skills gap analysis error:', error);
      toast.error('Failed to analyze skills gap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Skills Gap Analyzer</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Compare your skills against job requirements and find gaps
      </p>

      <div className="space-y-2">
        <Label htmlFor="job-desc">Job Description</Label>
        <Textarea
          id="job-desc"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
        />
      </div>

      <Button 
        onClick={analyzeSkillsGap}
        disabled={loading || !jobDescription.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Skills Gap...
          </>
        ) : (
          <>
            <Target className="h-4 w-4" />
            Analyze Skills Gap
          </>
        )}
      </Button>

      {analysis && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
            <span className="text-sm font-medium">Skills Match Score</span>
            <Badge variant={analysis.gapScore >= 70 ? 'default' : analysis.gapScore >= 50 ? 'secondary' : 'destructive'}>
              {analysis.gapScore}%
            </Badge>
          </div>

          {analysis.matchingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Matching Skills ({analysis.matchingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matchingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-green-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {analysis.missingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Skills to Develop ({analysis.missingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="bg-orange-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {analysis.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">→</span>
                    {rec}
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