import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useResume } from '@/contexts/ResumeContext';

export const ResumeParser = () => {
  const { updatePersonalInfo, addWorkExperience, addEducation, addSkill } = useResume();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileName = selectedFile.name.toLowerCase();
      
      // Accept text-based files and JSON
      if (fileName.endsWith('.txt') || 
          fileName.endsWith('.json') ||
          selectedFile.type === 'text/plain' ||
          selectedFile.type === 'application/json') {
        setFile(selectedFile);
      } else {
        toast.error('Please upload a TXT or JSON file. For best results, copy your resume content into a text file.');
      }
    }
  };

  const parseResume = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          
          // Validate content
          if (!content || content.trim().length === 0) {
            toast.error('File is empty or cannot be read');
            setLoading(false);
            return;
          }

          console.log('Sending content to AI for parsing, length:', content.length);
          
          const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
            body: {
              content: content,
              type: 'parse-resume',
            },
          });

          if (error) {
            console.error('Edge function error:', error);
            if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
              toast.error('Rate limits exceeded. Please try again later.');
            } else if (error.message?.includes('402') || error.message?.includes('Payment')) {
              toast.error('Payment required. Please add funds to your workspace.');
            } else if (error.message?.includes('FunctionsHttpError')) {
              toast.error('Failed to parse resume. Please try uploading a plain text file (.txt) with your resume content.');
            } else {
              toast.error(`Parsing failed: ${error.message || 'Unknown error'}`);
            }
            setLoading(false);
            return;
          }

          if (data?.text) {
            let jsonString = data.text.trim();
            
            // Remove markdown code blocks
            if (jsonString.startsWith('```json')) {
              jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (jsonString.startsWith('```')) {
              jsonString = jsonString.replace(/```\n?/g, '');
            }
            
            console.log('Parsing JSON response...');
            const parsedData = JSON.parse(jsonString);
            
            // Update resume data
            if (parsedData.personalInfo) {
              updatePersonalInfo(parsedData.personalInfo);
            }
            
            if (parsedData.workExperience && Array.isArray(parsedData.workExperience)) {
              parsedData.workExperience.forEach((exp: any) => {
                addWorkExperience({
                  ...exp,
                  id: crypto.randomUUID(),
                  current: exp.endDate?.toLowerCase().includes('present') || false
                });
              });
            }
            
            if (parsedData.education && Array.isArray(parsedData.education)) {
              parsedData.education.forEach((edu: any) => {
                addEducation({
                  ...edu,
                  id: crypto.randomUUID(),
                  current: edu.endDate?.toLowerCase().includes('present') || false
                });
              });
            }
            
            if (parsedData.skills) {
              // Add technical skills
              if (parsedData.skills.technical && Array.isArray(parsedData.skills.technical)) {
                parsedData.skills.technical.forEach((skill: string) => {
                  addSkill({ id: crypto.randomUUID(), name: skill, category: 'technical' });
                });
              }
              // Add soft skills
              if (parsedData.skills.soft && Array.isArray(parsedData.skills.soft)) {
                parsedData.skills.soft.forEach((skill: string) => {
                  addSkill({ id: crypto.randomUUID(), name: skill, category: 'soft' });
                });
              }
              // Add languages
              if (parsedData.skills.languages && Array.isArray(parsedData.skills.languages)) {
                parsedData.skills.languages.forEach((skill: string) => {
                  addSkill({ id: crypto.randomUUID(), name: skill, category: 'language' });
                });
              }
            }
            
            toast.success('Resume parsed successfully! Check the form sections.');
            setFile(null);
          } else {
            toast.error('No data received from AI. Please try again.');
          }
        } catch (parseError) {
          console.error('Parse error:', parseError);
          toast.error('Failed to parse AI response. Please try a different file format.');
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        toast.error('Failed to read file. Please try again.');
        setLoading(false);
      };
      
      // Read file as text (works best with .txt files)
      reader.readAsText(file);
    } catch (error) {
      console.error('Resume parsing error:', error);
      toast.error('Failed to parse resume. Please try again with a plain text file.');
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <FileUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Resume Parser</h3>
      </div>
      
      <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-2">
        <p className="font-medium">⚠️ Credits Required</p>
        <p className="text-muted-foreground">
          AI parsing requires Lovable AI credits. If you see a "Payment required" error, add credits at Settings → Workspace → Usage.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Upload your resume as a <strong>plain text file (.txt)</strong> or <strong>JSON export</strong>. Copy your resume content into a text file for best results.
      </p>

      <div className="space-y-2">
        <Label htmlFor="resume-file">Upload Resume (TXT or JSON only)</Label>
        <Input
          id="resume-file"
          type="file"
          accept=".txt,.json,text/plain,application/json"
          onChange={handleFileChange}
          disabled={loading}
        />
        {file && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {file.name}
          </div>
        )}
      </div>

      <Button 
        onClick={parseResume}
        disabled={loading || !file}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Parsing Resume...
          </>
        ) : (
          <>
            <FileUp className="h-4 w-4" />
            Parse Resume with AI
          </>
        )}
      </Button>
    </Card>
  );
};