import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import type { ResumeData } from '@/types/resume';

interface MedicalTemplateProps {
  resumeData: ResumeData;
  variant: 'clinical' | 'surgeon' | 'nurse' | 'specialist' | 'resident' | 'researcher';
}

export const MedicalTemplate = ({ resumeData, variant }: MedicalTemplateProps) => {
  const { personalInfo, summary, workExperience, education, skills, certifications } = resumeData;

  // Get design from resumeData
  const design = resumeData.design;
  const fontClass = design?.fontFamily ? `font-${design.fontFamily}` : 'font-merriweather';

  const colorMap = {
    clinical: { text: 'text-teal-600', border: 'border-teal-600', bg: 'bg-teal-600' },
    surgeon: { text: 'text-blue-900', border: 'border-blue-900', bg: 'bg-blue-900' },
    nurse: { text: 'text-pink-500', border: 'border-pink-500', bg: 'bg-pink-500' },
    specialist: { text: 'text-emerald-600', border: 'border-emerald-600', bg: 'bg-emerald-600' },
    resident: { text: 'text-indigo-600', border: 'border-indigo-600', bg: 'bg-indigo-600' },
    researcher: { text: 'text-gray-900', border: 'border-gray-900', bg: 'bg-gray-900' },
  };

  const colors = colorMap[variant];

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`bg-white text-black ${fontClass}`}>
      {/* Professional Header */}
      <div className={`text-center ${colors.border} border-b-4 pb-4 mb-6`}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className={`w-28 h-28 rounded-full object-cover mx-auto mb-3 ${colors.border} border-4`} />
        )}
        <h1 className={`text-3xl font-bold ${colors.text} mb-2`}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-4 w-4"/>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4"/>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-4 w-4"/>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3`}>Professional Profile</h2>
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3`}>Education & Training</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-bold text-lg text-black">{edu.degree} - {edu.field}</h3>
                <p className={`${colors.text} font-semibold`}>{edu.institution}</p>
                <p className="text-sm text-gray-600">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3`}>Licensure & Certifications</h2>
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
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3`}>Clinical Experience</h2>
          <div className="space-y-4">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <h3 className="font-bold text-lg text-black">{exp.position}</h3>
                <p className={`${colors.text} font-semibold`}>{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                <p className="text-gray-800 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold ${colors.text} border-b-2 pb-1 mb-3`}>Clinical Skills & Competencies</h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                <span className="text-gray-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
