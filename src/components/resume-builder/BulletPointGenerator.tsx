import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListOrdered, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const BulletPointGenerator = () => {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);

  const generateBullets = async () => {
    if (!task.trim()) {
      toast.error('Please enter a task or responsibility');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: task,
          type: 'bullet-points',
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
        setBullets(result.bullets || []);
        toast.success('Generated professional bullet points!');
      }
    } catch (error) {
      console.error('Bullet generation error:', error);
      toast.error('Failed to generate bullets');
    } finally {
      setLoading(false);
    }
  };

  const copyBullet = (bullet: string) => {
    navigator.clipboard.writeText(bullet);
    toast.success('Copied to clipboard!');
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <ListOrdered className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Bullet Point Generator</h3>
      </div>

      <div className="space-y-2">
        <Input
          placeholder="E.g., Led a team to develop a mobile app"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && generateBullets()}
        />
        <Button 
          onClick={generateBullets}
          disabled={loading || !task.trim()}
          className="w-full gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ListOrdered className="h-4 w-4" />
              Generate Impact Bullets
            </>
          )}
        </Button>
      </div>

      {bullets.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <h4 className="text-sm font-medium">Generated Bullets</h4>
          <div className="space-y-2">
            {bullets.map((bullet, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-2 p-3 bg-background rounded-lg border hover:bg-accent/5 transition-colors"
              >
                <span className="text-xs text-muted-foreground mt-1">•</span>
                <p className="text-sm flex-1">{bullet}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyBullet(bullet)}
                  className="h-7 w-7 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
