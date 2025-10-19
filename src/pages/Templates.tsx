import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { FileText, Sparkles, Briefcase, Palette, Code2, HeartPulse, TrendingUp, Megaphone, Scale, DollarSign, GraduationCap } from 'lucide-react';
import { TemplatePreviewCard } from '@/components/templates/TemplatePreviewCard';
import { TechTemplatePreview } from '@/components/templates/TechTemplatePreview';
import { BusinessTemplatePreview } from '@/components/templates/BusinessTemplatePreview';
import { MedicalTemplatePreview } from '@/components/templates/MedicalTemplatePreview';
import { LegalTemplatePreview } from '@/components/templates/LegalTemplatePreview';
import { FinanceTemplatePreview } from '@/components/templates/FinanceTemplatePreview';
import { MarketingTemplatePreview } from '@/components/templates/MarketingTemplatePreview';
import { EducationTemplatePreview } from '@/components/templates/EducationTemplatePreview';

const techTemplates = [
  { id: 'tech-modern', name: 'Tech Modern', description: 'Contemporary design with bold colors (Montserrat font)', icon: Code2, color: 'text-blue-500', popular: true, variant: 'modern' as const },
  { id: 'tech-minimal', name: 'Tech Minimal', description: 'Clean, minimalist design (Open Sans font)', icon: FileText, color: 'text-gray-600', popular: true, variant: 'minimal' as const },
  { id: 'tech-creative', name: 'Tech Creative', description: 'Bold gradient design (Raleway font)', icon: Palette, color: 'text-purple-500', popular: false, variant: 'creative' as const },
  { id: 'tech-professional', name: 'Tech Professional', description: 'Traditional professional (Roboto font)', icon: Briefcase, color: 'text-gray-800', popular: false, variant: 'professional' as const },
  { id: 'tech-ats', name: 'Tech ATS Optimized', description: 'ATS-friendly format (Open Sans font)', icon: Sparkles, color: 'text-green-600', popular: true, variant: 'ats' as const },
];

const businessTemplates = [
  { id: 'business-executive', name: 'Executive', description: 'Senior leadership format (Merriweather font)', icon: Briefcase, color: 'text-gray-900', popular: true, variant: 'executive' as const },
  { id: 'business-corporate', name: 'Corporate', description: 'Corporate professional design (Roboto font)', icon: Briefcase, color: 'text-blue-900', popular: true, variant: 'corporate' as const },
  { id: 'business-consulting', name: 'Consulting', description: 'Management consulting format (Open Sans font)', icon: TrendingUp, color: 'text-green-600', popular: false, variant: 'consulting' as const },
  { id: 'business-finance', name: 'Finance', description: 'Financial services professional (Lora font)', icon: DollarSign, color: 'text-gray-800', popular: false, variant: 'finance' as const },
  { id: 'business-startup', name: 'Startup', description: 'Entrepreneurial & innovative (Raleway font)', icon: Sparkles, color: 'text-purple-600', popular: true, variant: 'startup' as const },
  { id: 'business-manager', name: 'Operations Manager', description: 'Management roles (Montserrat font)', icon: Briefcase, color: 'text-orange-500', popular: false, variant: 'manager' as const },
];

const medicalTemplates = [
  { id: 'medical-clinical', name: 'Clinical Physician', description: 'Primary care & internal medicine (Merriweather font)', icon: HeartPulse, color: 'text-teal-600', popular: true, variant: 'clinical' as const },
  { id: 'medical-surgeon', name: 'Surgeon', description: 'Surgical specialties format (Roboto font)', icon: HeartPulse, color: 'text-blue-900', popular: true, variant: 'surgeon' as const },
  { id: 'medical-nurse', name: 'Registered Nurse', description: 'Nursing professional design (Open Sans font)', icon: HeartPulse, color: 'text-pink-500', popular: true, variant: 'nurse' as const },
  { id: 'medical-specialist', name: 'Medical Specialist', description: 'Specialty medicine format (Lora font)', icon: HeartPulse, color: 'text-emerald-600', popular: false, variant: 'specialist' as const },
  { id: 'medical-resident', name: 'Resident', description: 'Residency & fellowship (Montserrat font)', icon: GraduationCap, color: 'text-indigo-600', popular: false, variant: 'resident' as const },
  { id: 'medical-researcher', name: 'Medical Researcher', description: 'Research & academia (Crimson Text font)', icon: FileText, color: 'text-gray-900', popular: false, variant: 'researcher' as const },
];

const legalTemplates = [
  { id: 'legal-corporate', name: 'Corporate Attorney', description: 'Corporate law practice (Merriweather font)', icon: Scale, color: 'text-gray-900', popular: true, variant: 'corporate' as const },
  { id: 'legal-litigation', name: 'Trial Attorney', description: 'Litigation specialist (Roboto font)', icon: Scale, color: 'text-red-700', popular: true, variant: 'litigation' as const },
  { id: 'legal-prosecutor', name: 'Prosecutor', description: 'District attorney format (Open Sans font)', icon: Scale, color: 'text-blue-900', popular: false, variant: 'prosecutor' as const },
  { id: 'legal-paralegal', name: 'Paralegal', description: 'Legal support professional (Raleway font)', icon: FileText, color: 'text-amber-600', popular: false, variant: 'paralegal' as const },
  { id: 'legal-associate', name: 'Associate Attorney', description: 'Law firm associate (Lora font)', icon: Scale, color: 'text-slate-700', popular: true, variant: 'associate' as const },
  { id: 'legal-partner', name: 'Law Firm Partner', description: 'Partner & leadership (Playfair Display font)', icon: Briefcase, color: 'text-amber-800', popular: false, variant: 'partner' as const },
];

const financeTemplates = [
  { id: 'finance-analyst', name: 'Financial Analyst', description: 'Investment analysis (Roboto font)', icon: TrendingUp, color: 'text-gray-800', popular: true, variant: 'analyst' as const },
  { id: 'finance-banker', name: 'Investment Banker', description: 'I-banking professional (Merriweather font)', icon: Briefcase, color: 'text-blue-900', popular: true, variant: 'banker' as const },
  { id: 'finance-accountant', name: 'CPA / Accountant', description: 'Accounting professional (Open Sans font)', icon: FileText, color: 'text-green-800', popular: true, variant: 'accountant' as const },
  { id: 'finance-advisor', name: 'Financial Advisor', description: 'Wealth management (Raleway font)', icon: DollarSign, color: 'text-blue-600', popular: false, variant: 'advisor' as const },
  { id: 'finance-trader', name: 'Trader', description: 'Trading professional (Montserrat font)', icon: TrendingUp, color: 'text-red-600', popular: false, variant: 'trader' as const },
  { id: 'finance-auditor', name: 'Auditor', description: 'Internal/external audit (Lora font)', icon: FileText, color: 'text-gray-900', popular: false, variant: 'auditor' as const },
];

const marketingTemplates = [
  { id: 'marketing-digital', name: 'Digital Marketing', description: 'Digital specialist (Montserrat font)', icon: Megaphone, color: 'text-purple-600', popular: true, variant: 'digital' as const },
  { id: 'marketing-content', name: 'Content Marketing', description: 'Content strategist (Open Sans font)', icon: FileText, color: 'text-teal-600', popular: true, variant: 'content' as const },
  { id: 'marketing-brand', name: 'Brand Manager', description: 'Brand strategy (Playfair Display font)', icon: Palette, color: 'text-indigo-900', popular: true, variant: 'brand' as const },
  { id: 'marketing-social', name: 'Social Media', description: 'Social media expert (Raleway font)', icon: Megaphone, color: 'text-pink-600', popular: false, variant: 'social' as const },
  { id: 'marketing-growth', name: 'Growth Marketing', description: 'Growth hacking (Roboto font)', icon: TrendingUp, color: 'text-green-600', popular: false, variant: 'growth' as const },
  { id: 'marketing-manager', name: 'Marketing Director', description: 'Leadership role (Lora font)', icon: Briefcase, color: 'text-orange-600', popular: false, variant: 'manager' as const },
];

const educationTemplates = [
  { id: 'education-teacher', name: 'K-12 Teacher', description: 'Primary/secondary education (Open Sans font)', icon: GraduationCap, color: 'text-blue-600', popular: true, variant: 'teacher' as const },
  { id: 'education-professor', name: 'Professor', description: 'Higher education (Crimson Text font)', icon: GraduationCap, color: 'text-gray-900', popular: true, variant: 'professor' as const },
  { id: 'education-admin', name: 'Administrator', description: 'Educational leadership (Roboto font)', icon: Briefcase, color: 'text-purple-700', popular: false, variant: 'admin' as const },
  { id: 'education-counselor', name: 'Counselor', description: 'Academic counseling (Raleway font)', icon: HeartPulse, color: 'text-teal-600', popular: false, variant: 'counselor' as const },
  { id: 'education-special', name: 'Special Education', description: 'Special ed teacher (Montserrat font)', icon: GraduationCap, color: 'text-pink-600', popular: false, variant: 'special' as const },
  { id: 'education-coach', name: 'Academic Coach', description: 'Coaching & tutoring (Lora font)', icon: TrendingUp, color: 'text-orange-600', popular: false, variant: 'coach' as const },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Professional Resume Templates
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from 40+ AI-optimized templates across 7 industries. Each template features unique fonts and designs.
            </p>
          </div>

          {/* Tech Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Technology Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<TechTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Business Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Business Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<BusinessTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Medical Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Healthcare Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<MedicalTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Legal Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Legal Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<LegalTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Finance Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Finance Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financeTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<FinanceTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Marketing Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Marketing Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<MarketingTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>

          {/* Education Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Education Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationTemplates.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  {...template}
                  preview={<EducationTemplatePreview variant={template.variant} />}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              All templates are fully customizable and include AI-powered features to enhance your resume.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/build">
                Start Building Your Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
