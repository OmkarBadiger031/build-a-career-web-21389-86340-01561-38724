import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface BusinessTemplateProps {
  resumeData: ResumeData;
  variant: 'executive' | 'corporate' | 'consulting' | 'finance' | 'startup' | 'manager';
}

export const BusinessTemplate = ({ resumeData, variant }: BusinessTemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData;

  // Get design from resumeData
  const design = resumeData.design;
  const fontClass = design?.fontFamily ? `font-${design.fontFamily}` : 'font-merriweather';

  const colorMap = {
    executive: { text: 'text-gray-900', border: 'border-gray-900' },
    corporate: { text: 'text-blue-900', border: 'border-blue-900' },
    consulting: { text: 'text-green-600', border: 'border-green-600' },
    finance: { text: 'text-gray-800', border: 'border-gray-800' },
    startup: { text: 'text-purple-600', border: 'border-purple-600' },
    manager: { text: 'text-orange-500', border: 'border-orange-500' },
  };

  const colors = colorMap[variant];

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`bg-white text-black ${fontClass}`}>
      {/* Executive Header */}
      <div className={`${colors.border} border-t-4 border-b pt-4 pb-4 mb-6`}>
        <div className="text-center">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-full object-cover mx-auto mb-3" />
          )}
          <h1 className={`text-4xl font-bold ${colors.text}`}>{personalInfo.fullName || 'YOUR NAME'}</h1>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3"/>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3"/>{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{personalInfo.location}</span>}
          </div>
          {(personalInfo.linkedin || personalInfo.portfolio) && (
            <div className="flex justify-center gap-3 text-xs text-gray-600 mt-1">
              {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3"/>{personalInfo.linkedin}</span>}
              {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="h-3 w-3"/>{personalInfo.portfolio}</span>}
            </div>
          )}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Executive Summary</h2>
          <p className="text-gray-800 leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Professional Experience</h2>
          <div className="space-y-4">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-black">{exp.position}</h3>
                    <p className={`${colors.text} font-semibold`}>{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 italic">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-black">{edu.degree}, {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">{formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Core Competencies</h2>
          <div className="grid grid-cols-3 gap-2">
            {skills.map(skill => (
              <div key={skill.id} className="text-gray-800">• {skill.name}</div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Professional Certifications</h2>
          <div className="space-y-1">
            {certifications.map(cert => (
              <div key={cert.id}>
                <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({formatDate(cert.date)})
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>Key Achievements</h2>
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.id}>
                <h3 className="font-bold text-black">{project.name}</h3>
                <p className="text-gray-800">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
