export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface SectionFormats {
  workExperience: 'detailed' | 'compact' | 'timeline' | 'modern' | 'minimalist' | 'executive' | 'creative' | 'sidebar';
  education: 'standard' | 'minimal' | 'detailed' | 'academic' | 'timeline' | 'compact' | 'honors';
  skills: 'badges' | 'columns' | 'bars' | 'categorized' | 'cloud' | 'rating' | 'grid' | 'compact';
  projects: 'cards' | 'list' | 'grid' | 'detailed' | 'showcase' | 'timeline' | 'minimal';
  certifications: 'simple' | 'detailed' | 'timeline' | 'badges' | 'grid' | 'accordion';
  header: 'centered' | 'left-aligned' | 'two-column' | 'modern' | 'banner' | 'sidebar' | 'photo-left' | 'photo-right';
  summary: 'paragraph' | 'bullet-points' | 'highlight-box' | 'bordered' | 'sidebar' | 'compact' | 'key-strengths';
}

export interface TemplateDesign {
  fontFamily: 'inter' | 'roboto' | 'playfair' | 'merriweather' | 'lato';
  fontSize: 'small' | 'medium' | 'large';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'neutral';
  headerStyle: 'bold' | 'elegant' | 'minimal';
  sectionFormats: SectionFormats;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  template: 'modern' | 'professional' | 'creative' | 'ats' | 'tech' | 'healthcare' | 'finance' | 'marketing';
  jobProfile?: string;
  design?: TemplateDesign;
}
