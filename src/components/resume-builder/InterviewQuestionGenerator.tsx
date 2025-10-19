import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface QuestionAnswer {
  question: string;
  suggestedAnswer: string;
}

export const InterviewQuestionGenerator = () => {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionAnswer[]>([]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify(resumeData),
          type: 'interview-questions',
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
        setQuestions(result.questions || []);
        toast.success('Interview questions generated!');
      }
    } catch (error) {
      console.error('Interview question generation error:', error);
      toast.error('Failed to generate interview questions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Interview Question Generator</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Generate potential interview questions based on your resume and prepare answers
      </p>

      <Button 
        onClick={generateQuestions}
        disabled={loading}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Questions...
          </>
        ) : (
          <>
            <MessageSquare className="h-4 w-4" />
            Generate Interview Questions
          </>
        )}
      </Button>

      {questions.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <h4 className="text-sm font-medium">Potential Interview Questions:</h4>
          <Accordion type="single" collapsible className="w-full">
            {questions.map((qa, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-sm">
                  {qa.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-3 bg-secondary/30 rounded-md">
                    <p className="text-sm font-medium mb-2">Suggested Answer:</p>
                    <p className="text-sm text-muted-foreground">{qa.suggestedAnswer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </Card>
  );
};