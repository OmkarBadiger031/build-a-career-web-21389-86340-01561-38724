import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface MedicalTemplateProps {
  resumeData: ResumeData;
  variant: 'clinical' | 'surgeon' | 'nurse' | 'specialist' | 'resident' | 'researcher';
}

export const MedicalTemplate = ({ resumeData, variant }: MedicalTemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, certifications } = resumeData;

  const colorMap = {
    clinical: 'text-teal-600',
    surgeon: 'text-blue-900',
    nurse: 'text-pink-500',
    specialist: 'text-emerald-600',
    resident: 'text-indigo-600',
    researcher: 'text-gray-900',
  };

  const color = colorMap[variant];

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-black font-serif">
      {/* Professional Header */}
      <div className="text-center border-b-4 pb-4 mb-6" style={{ borderColor: color.replace('text-', '') }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-28 h-28 rounded-full object-cover mx-auto mb-3 border-4" style={{ borderColor: color.replace('text-', '') }} />
        )}
        <h1 className={`text-3xl font-bold ${color} mb-2`}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-4 w-4"/>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4"/>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-4 w-4"/>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${color} border-b-2 pb-1 mb-3`}>Professional Profile</h2>
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${color} border-b-2 pb-1 mb-3`}>Education & Training</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-bold text-lg text-black">{edu.degree} - {edu.field}</h3>
                <p className={`${color} font-semibold`}>{edu.institution}</p>
                <p className="text-sm text-gray-600">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${color} border-b-2 pb-1 mb-3`}>Licensure & Certifications</h2>
          <div className="space-y-2">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-black">{cert.name}</span>
                  <span className="text-gray-600 ml-2">- {cert.issuer}</span>
                </div>
                <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${color} border-b-2 pb-1 mb-3`}>Clinical Experience</h2>
          <div className="space-y-4">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <h3 className="font-bold text-lg text-black">{exp.position}</h3>
                <p className={`${color} font-semibold`}>{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                <p className="text-gray-800 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold ${color} border-b-2 pb-1 mb-3`}>Clinical Skills & Competencies</h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${color.replace('text-', 'bg-')} rounded-full`}></div>
                <span className="text-gray-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
