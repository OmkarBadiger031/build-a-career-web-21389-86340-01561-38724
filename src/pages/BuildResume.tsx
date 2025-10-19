import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PersonalInfoForm from '@/components/resume-builder/PersonalInfoForm';
import SummaryForm from '@/components/resume-builder/SummaryForm';
import WorkExperienceForm from '@/components/resume-builder/WorkExperienceForm';
import EducationForm from '@/components/resume-builder/EducationForm';
import SkillsForm from '@/components/resume-builder/SkillsForm';
import ProjectsForm from '@/components/resume-builder/ProjectsForm';
import CertificationsForm from '@/components/resume-builder/CertificationsForm';
import ResumePreview from '@/components/resume-builder/ResumePreview';
import ResumeActions from '@/components/resume-builder/ResumeActions';
import { ResumeParser } from '@/components/resume-builder/ResumeParser';
import AIToolsPanel from '@/components/resume-builder/AIToolsPanel';
import { User, FileText, Briefcase, GraduationCap, Code, FolderGit2, Award, ArrowRight } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { getTemplateDesign } from '@/lib/templateDesigns';
import { toast } from 'sonner';

const BuildResume = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [searchParams] = useSearchParams();
  const { resumeData, updateDesign, setTemplate } = useResume();

  const tabs = ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'];
  
  const calculateProgress = () => {
    let completed = 0;
    const total = 5; // Core sections
    
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email) completed++;
    if (resumeData.summary) completed++;
    if (resumeData.workExperience.length > 0) completed++;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    
    return (completed / total) * 100;
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };
  
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      const design = getTemplateDesign(templateId);
      if (design) {
        updateDesign(design);
        // Extract base template type from template ID
        const baseTemplate = templateId.split('-')[0] as 'modern' | 'professional' | 'creative' | 'ats' | 'tech' | 'healthcare' | 'finance' | 'marketing';
        setTemplate(baseTemplate);
      }
    }
  }, [searchParams, updateDesign, setTemplate]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 space-y-4 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Build Your Resume</h1>
            <p className="text-muted-foreground">
              Fill in your information and see your resume come to life in real-time
            </p>
          </div>
          
          {/* Progress Indicator */}
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Resume Progress</span>
                <span className="text-muted-foreground">{Math.round(calculateProgress())}% Complete</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            <Card className="p-6 animate-fade-in">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-4 lg:grid-cols-7 mb-6">
                  <TabsTrigger value="personal" className="gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="gap-1">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Summary</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Work</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="gap-1">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="gap-1">
                    <FolderGit2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Projects</span>
                  </TabsTrigger>
                  <TabsTrigger value="certifications" className="gap-1">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">Certs</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <PersonalInfoForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Summary
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="summary" className="space-y-4">
                  <SummaryForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Work Experience
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-4">
                  <WorkExperienceForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Education
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="education" className="space-y-4">
                  <EducationForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Skills
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <SkillsForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Projects (Optional)
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="projects" className="space-y-4">
                  <ProjectsForm />
                  <Button onClick={handleNext} className="w-full gap-2">
                    Next: Certifications (Optional)
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="certifications" className="space-y-4">
                  <CertificationsForm />
                  <p className="text-sm text-muted-foreground text-center py-4">
                    You've completed all sections! Use the tools below to enhance your resume.
                  </p>
                </TabsContent>
              </Tabs>
            </Card>

            <ResumeParser />
            <AIToolsPanel />
            <ResumeActions />
          </div>
          
          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildResume;
