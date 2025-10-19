import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';

export const ResumeScorer = () => {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify(resumeData),
          type: 'resume-score',
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
        
        const analysisData = JSON.parse(jsonString);
        setAnalysis(analysisData);
        toast.success('Resume analyzed successfully!');
      }
    } catch (error) {
      console.error('Resume analysis error:', error);
      toast.error('Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Resume Scorer</h3>
      </div>

      <Button 
        onClick={analyzeResume}
        disabled={loading}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          <>
            <Target className="h-4 w-4" />
            Get Detailed Score
          </>
        )}
      </Button>

      {analysis && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Score</span>
              <Badge variant={analysis.overall >= 80 ? 'default' : analysis.overall >= 60 ? 'secondary' : 'destructive'}>
                {analysis.overall}/100
              </Badge>
            </div>
            <Progress value={analysis.overall} className="h-2" />
          </div>

          {analysis.categories && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Category Breakdown</h4>
              {Object.entries(analysis.categories).map(([key, value]: [string, any]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span className="font-medium">{value}/100</span>
                  </div>
                  <Progress value={value} className="h-1" />
                </div>
              ))}
            </div>
          )}

          {analysis.strengths && analysis.strengths.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Strengths
              </h4>
              <ul className="space-y-1">
                {analysis.strengths.map((strength: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.improvements && analysis.improvements.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Areas for Improvement
              </h4>
              <ul className="space-y-1">
                {analysis.improvements.map((improvement: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-500">→</span>
                    {improvement}
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
