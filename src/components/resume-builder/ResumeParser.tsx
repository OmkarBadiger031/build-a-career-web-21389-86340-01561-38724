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
      const fileType = selectedFile.type;
      
      if (fileType === 'application/pdf' || 
          fileType === 'application/msword' || 
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'text/plain') {
        setFile(selectedFile);
      } else {
        toast.error('Please upload a PDF, DOC, DOCX, or TXT file');
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
        const content = e.target?.result as string;
        
        const { data, error } = await supabase.functions.invoke('ai-resume-suggestions', {
          body: {
            content: content,
            type: 'parse-resume',
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
          
          const parsedData = JSON.parse(jsonString);
          
          // Update resume data
          if (parsedData.personalInfo) {
            updatePersonalInfo(parsedData.personalInfo);
          }
          
          if (parsedData.workExperience && Array.isArray(parsedData.workExperience)) {
            parsedData.workExperience.forEach((exp: any) => {
              addWorkExperience(exp);
            });
          }
          
          if (parsedData.education && Array.isArray(parsedData.education)) {
            parsedData.education.forEach((edu: any) => {
              addEducation(edu);
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
        }
      };
      
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    } catch (error) {
      console.error('Resume parsing error:', error);
      toast.error('Failed to parse resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <FileUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Resume Parser</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Upload your existing resume and let AI extract all the information automatically
      </p>

      <div className="space-y-2">
        <Label htmlFor="resume-file">Upload Resume (PDF, DOC, DOCX, TXT)</Label>
        <Input
          id="resume-file"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
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