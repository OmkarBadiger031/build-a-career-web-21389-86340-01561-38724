import { useResume } from '@/contexts/ResumeContext';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import type { TemplateDesign, SectionFormats } from '@/types/resume';
import { HeaderSection } from './sections/HeaderSection';
import { SummarySection } from './sections/SummarySection';
import { WorkExperienceSection } from './sections/WorkExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { TechTemplate } from './templates/TechTemplate';
import { BusinessTemplate } from './templates/BusinessTemplate';
import { MedicalTemplate } from './templates/MedicalTemplate';
import { FinanceTemplate } from './templates/FinanceTemplate';

const ResumePreview = () => {
  const { resumeData } = useResume();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || localStorage.getItem('selectedTemplateId');

  const defaultDesign: TemplateDesign = {
    fontFamily: 'inter',
    fontSize: 'medium',
    sectionSpacing: 'normal',
    colorScheme: 'blue',
    headerStyle: 'bold',
    sectionFormats: {
      workExperience: 'detailed',
      education: 'standard',
      skills: 'badges',
      projects: 'cards',
      certifications: 'simple',
      header: 'centered',
      summary: 'paragraph',
    },
  };

  const design = resumeData.design || defaultDesign;
  const formats = design.sectionFormats || defaultDesign.sectionFormats;

  const fontFamilyMap = {
    inter: 'font-sans',
    roboto: 'font-sans',
    playfair: 'font-serif',
    merriweather: 'font-serif',
    lato: 'font-sans',
  };

  const fontSizeMap = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const spacingMap = {
    compact: 'space-y-2',
    normal: 'space-y-4',
    spacious: 'space-y-6',
  };

  const colorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    neutral: 'text-gray-700',
  };

  const headerStyleMap = {
    bold: 'font-bold text-2xl',
    elegant: 'font-semibold text-xl tracking-wide',
    minimal: 'font-medium text-lg',
  };

  const fontClass = fontFamilyMap[design.fontFamily];
  const sizeClass = fontSizeMap[design.fontSize];
  const spacingClass = spacingMap[design.sectionSpacing];
  const colorClass = colorMap[design.colorScheme];
  const headerClass = headerStyleMap[design.headerStyle];

  // Check if a specific template is selected via URL parameter
  if (templateId) {
    const [category, variant] = templateId.split('-');
    
    let TemplateComponent = null;
    
    if (category === 'tech') {
      TemplateComponent = <TechTemplate resumeData={resumeData} variant={variant as any} />;
    } else if (category === 'business') {
      TemplateComponent = <BusinessTemplate resumeData={resumeData} variant={variant as any} />;
    } else if (category === 'medical') {
      TemplateComponent = <MedicalTemplate resumeData={resumeData} variant={variant as any} />;
    } else if (category === 'finance') {
      TemplateComponent = <FinanceTemplate resumeData={resumeData} variant={variant as any} />;
    } else if (category === 'marketing') {
      // Use creative/startup style for marketing
      TemplateComponent = <TechTemplate resumeData={resumeData} variant="creative" />;
    } else if (category === 'education') {
      // Use professional style for education
      TemplateComponent = <BusinessTemplate resumeData={resumeData} variant="corporate" />;
    } else if (category === 'legal') {
      // Use executive style for legal
      TemplateComponent = <BusinessTemplate resumeData={resumeData} variant="executive" />;
    }
    
    if (TemplateComponent) {
      return (
        <Card 
          id="resume-preview" 
          className="p-8 bg-white text-black print:shadow-none animate-fade-in"
        >
          {TemplateComponent}
        </Card>
      );
    }
  }

  // Default fallback to original preview
  const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Card 
      id="resume-preview" 
      className={`p-8 bg-white text-black print:shadow-none animate-fade-in ${fontClass} ${sizeClass}`}
    >
      <div className={spacingClass}>
        <HeaderSection 
          personalInfo={personalInfo}
          format={formats.header}
          headerClass={headerClass}
          colorClass={colorClass}
        />

        <SummarySection 
          summary={summary}
          format={formats.summary}
          colorClass={colorClass}
        />

        <WorkExperienceSection 
          workExperience={workExperience}
          format={formats.workExperience}
          colorClass={colorClass}
          formatDate={formatDate}
        />

        <EducationSection 
          education={education}
          format={formats.education}
          colorClass={colorClass}
          formatDate={formatDate}
        />

        <SkillsSection 
          skills={skills}
          format={formats.skills}
          colorClass={colorClass}
        />

        <ProjectsSection 
          projects={projects}
          format={formats.projects}
          colorClass={colorClass}
        />

        <CertificationsSection 
          certifications={certifications}
          format={formats.certifications}
          colorClass={colorClass}
          formatDate={formatDate}
        />
      </div>
    </Card>
  );
};

export default ResumePreview;