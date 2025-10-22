import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/types/resume';

interface TechTemplateProps {
  resumeData: ResumeData;
  variant: 'modern' | 'minimal' | 'creative' | 'professional' | 'ats';
}

export const TechTemplate = ({ resumeData, variant }: TechTemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData;

  // Get design from resumeData
  const design = resumeData.design;
  const fontClass = design?.fontFamily ? `font-${design.fontFamily}` : 'font-inter';
  
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Color scheme mapping
  const colorSchemes = {
    blue: { primary: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' },
    green: { primary: 'text-green-600', bg: 'bg-green-50', border: 'border-green-500' },
    purple: { primary: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500' },
    orange: { primary: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-500' },
    neutral: { primary: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-500' },
  };
  
  const colors = colorSchemes[design?.colorScheme || 'blue'];

  if (variant === 'modern') {
    return (
      <div className={`bg-white p-8 ${fontClass}`}>
        <div className={`flex items-center gap-4 mb-6 border-l-4 ${colors.border} pl-4`}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className={`w-20 h-20 rounded-full object-cover border-4 ${colors.bg}`} />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
            <p className={`${colors.primary} font-medium`}>Software Engineer</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3"/>{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3"/>{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{personalInfo.location}</span>}
            </div>
          </div>
        </div>

        {summary && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${colors.primary} mb-2`}>About</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${colors.primary} mb-3`}>Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill.id} className={`${colors.bg} ${colors.primary} hover:opacity-80`}>{skill.name}</Badge>
              ))}
            </div>
          </div>
        )}

        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${colors.primary} mb-3`}>Experience</h2>
            <div className={`border-l-2 ${colors.border} pl-4 space-y-4`}>
              {workExperience.map(exp => (
                <div key={exp.id}>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className={`${colors.primary} text-sm`}>{exp.company} • {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${colors.primary} mb-3`}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-gray-600">{edu.institution} • {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${colors.primary} mb-3`}>Projects</h2>
            <div className="space-y-3">
              {projects.map(project => (
                <div key={project.id} className={`${colors.bg} p-3 rounded`}>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-white px-2 py-1 rounded">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className={`text-xl font-bold ${colors.primary} mb-3`}>Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-2">
                <span className="font-semibold">{cert.name}</span> - <span className="text-gray-600">{cert.issuer}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default for other variants
  return (
    <div className={`bg-white p-8 ${fontClass}`}>
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-full object-cover mx-auto mb-3" />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {summary && <div className="mb-6"><p className="text-gray-700">{summary}</p></div>}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => <span key={skill.id} className="text-sm">{skill.name}</span>).reduce((prev, curr) => [prev, ' • ', curr] as any)}
          </div>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">EXPERIENCE</h2>
          <div className="space-y-4">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id}>
              <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-gray-600">{edu.institution} | {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
