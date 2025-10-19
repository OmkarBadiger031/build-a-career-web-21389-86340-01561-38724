import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Loader2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const LinkedInGenerator = () => {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [linkedInContent, setLinkedInContent] = useState<{
    headline?: string;
    about?: string;
    featured?: string;
  }>({});

  const generateLinkedInProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
        body: {
          content: JSON.stringify(resumeData),
          type: 'linkedin-profile',
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
        setLinkedInContent(result);
        toast.success('LinkedIn profile content generated!');
      }
    } catch (error) {
      console.error('LinkedIn generation error:', error);
      toast.error('Failed to generate LinkedIn content');
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
        <Linkedin className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">LinkedIn Profile Generator</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Generate optimized LinkedIn profile content from your resume
      </p>

      <Button 
        onClick={generateLinkedInProfile}
        disabled={loading}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Profile...
          </>
        ) : (
          <>
            <Linkedin className="h-4 w-4" />
            Generate LinkedIn Profile
          </>
        )}
      </Button>

      {Object.keys(linkedInContent).length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <Tabs defaultValue="headline" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="headline" className="flex-1">Headline</TabsTrigger>
              <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
              <TabsTrigger value="featured" className="flex-1">Featured</TabsTrigger>
            </TabsList>
            
            {linkedInContent.headline && (
              <TabsContent value="headline" className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">LinkedIn Headline:</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(linkedInContent.headline!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md">
                  <p className="text-sm">{linkedInContent.headline}</p>
                </div>
              </TabsContent>
            )}
            
            {linkedInContent.about && (
              <TabsContent value="about" className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">About Section:</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(linkedInContent.about!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md max-h-64 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">{linkedInContent.about}</p>
                </div>
              </TabsContent>
            )}
            
            {linkedInContent.featured && (
              <TabsContent value="featured" className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Featured Section:</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(linkedInContent.featured!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{linkedInContent.featured}</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </Card>
  );
};