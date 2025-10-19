import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export const ResumeAIEnhancer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const { resumeData } = useResume();

  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-enhance', {
        body: {
          action: 'tailor-resume',
          data: {
            resume: resumeData,
            jobDescription,
          },
        },
      });

      if (error) throw error;

      if (data?.error) {
        if (data.error.includes('Rate limits')) {
          toast.error('Rate limits exceeded. Please try again later.');
        } else if (data.error.includes('Payment required')) {
          toast.error('Payment required. Please add funds to your workspace.');
        } else {
          toast.error(data.error);
        }
        return;
      }

      setSuggestions(data.result);
      toast.success('Resume tailoring suggestions generated!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Resume Enhancer</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Tailor your resume to specific job descriptions using AI
        </p>
        <Button onClick={() => setIsOpen(true)} className="w-full">
          Enhance for Job
        </Button>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Resume Enhancement</DialogTitle>
            <DialogDescription>
              Paste the job description below, and AI will suggest how to tailor your resume
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="resize-none"
            />

            <Button
              onClick={handleTailorResume}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Suggestions
                </>
              )}
            </Button>

            {suggestions && (
              <div className="space-y-2">
                <h4 className="font-semibold">AI Suggestions:</h4>
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm">
                  {suggestions}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
