import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TrendingUp, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const AchievementQuantifier = () => {
  const [loading, setLoading] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [quantifiedResults, setQuantifiedResults] = useState<string[]>([]);

  const quantifyAchievement = async () => {
    if (!achievement.trim()) {
      toast.error('Please enter an achievement to quantify');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: achievement,
          type: 'quantify-achievement',
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
        setQuantifiedResults(result.quantified || []);
        toast.success('Achievement quantified successfully!');
      }
    } catch (error) {
      console.error('Achievement quantification error:', error);
      toast.error('Failed to quantify achievement');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Achievement Quantifier</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Add numbers and metrics to your achievements to make them more impactful
      </p>

      <div className="space-y-2">
        <Label htmlFor="achievement">Your Achievement</Label>
        <Textarea
          id="achievement"
          placeholder="E.g., Improved team productivity through new process implementation"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          rows={3}
        />
      </div>

      <Button 
        onClick={quantifyAchievement}
        disabled={loading || !achievement.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Quantifying...
          </>
        ) : (
          <>
            <TrendingUp className="h-4 w-4" />
            Add Metrics
          </>
        )}
      </Button>

      {quantifiedResults.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <h4 className="text-sm font-medium">Quantified Versions:</h4>
          <div className="space-y-2">
            {quantifiedResults.map((result, idx) => (
              <div key={idx} className="p-3 bg-secondary/50 rounded-md flex justify-between items-start gap-2">
                <p className="text-sm flex-1">{result}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};