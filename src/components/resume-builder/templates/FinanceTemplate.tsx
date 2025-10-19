import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/types/resume';

interface FinanceTemplateProps {
  resumeData: ResumeData;
  variant: 'analyst' | 'banker' | 'accountant' | 'advisor' | 'trader' | 'auditor';
}

export const FinanceTemplate = ({ resumeData, variant }: FinanceTemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData;

  const colorMap = {
    analyst: 'text-gray-800',
    banker: 'text-blue-900',
    accountant: 'text-green-800',
    advisor: 'text-blue-600',
    trader: 'text-red-600',
    auditor: 'text-gray-900',
  };

  const bgColorMap = {
    analyst: 'bg-gray-800',
    banker: 'bg-blue-900',
    accountant: 'bg-green-800',
    advisor: 'bg-blue-600',
    trader: 'bg-red-600',
    auditor: 'bg-gray-900',
  };

  const color = colorMap[variant];
  const bgColor = bgColorMap[variant];

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-black font-sans text-sm">
      {/* Header */}
      <div className="text-center border-b-4 pb-4 mb-4" style={{ borderColor: color.replace('text-', '') }}>
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt={personalInfo.fullName}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4"
            style={{ borderColor: color.replace('text-', '') }}
          />
        )}
        <h1 className={`text-3xl font-bold ${color} mb-2`}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-xs">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-2 uppercase tracking-wide`}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>
            Professional Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-l-3 pl-3" style={{ borderLeftWidth: '3px', borderColor: color.replace('text-', '') }}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-black">{exp.position}</h3>
                    <p className={`${color} font-semibold`}>{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-black">{edu.degree} in {edu.field}</h3>
                    <p className={`${color} text-sm`}>{edu.institution}</p>
                    {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-xs text-gray-600">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm text-gray-700">
                • {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>
            Certifications & Licenses
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-black">{cert.name}</span>
                  <span className="text-gray-600 text-sm ml-2">- {cert.issuer}</span>
                </div>
                <span className="text-xs text-gray-600">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className={`text-lg font-bold ${color} border-b-2 pb-1 mb-3 uppercase tracking-wide`}>
            Key Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-black">{project.name}</h3>
                <p className="text-sm text-gray-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
