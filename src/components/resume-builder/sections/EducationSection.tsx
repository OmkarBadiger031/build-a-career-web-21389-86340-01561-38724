import type { Education } from '@/types/resume';

interface EducationSectionProps {
  education: Education[];
  format: 'standard' | 'minimal' | 'detailed' | 'academic' | 'timeline' | 'compact' | 'honors';
  colorClass: string;
  formatDate: (date: string) => string;
}

export const EducationSection = ({ education, format, colorClass, formatDate }: EducationSectionProps) => {
  if (education.length === 0) return null;

  if (format === 'standard') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Education
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">
                    {edu.degree || 'Degree'} in {edu.field || 'Field'}
                  </h3>
                  <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  <p>
                    {edu.startDate ? formatDate(edu.startDate) : 'Start'} -{' '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : 'End'}
                  </p>
                  {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'minimal') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Education
        </h2>
        <div className="space-y-1">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-center text-sm">
              <span className="font-bold">{edu.degree} in {edu.field} - {edu.institution}</span>
              <span className="text-xs text-gray-600">
                {edu.endDate ? formatDate(edu.endDate) : 'Present'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'detailed') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base">
                    {edu.degree || 'Degree'}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">{edu.field || 'Field'}</p>
                  <p className="text-sm text-gray-600">{edu.institution || 'Institution'}</p>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  <p className="font-medium">
                    {edu.startDate ? formatDate(edu.startDate) : 'Start'} -{' '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : 'End'}
                  </p>
                  {edu.gpa && <p className="mt-1 font-semibold">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'timeline') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Education</h2>
        <div className="relative border-l-2 border-gray-300 pl-4 space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="relative">
              <div className={`absolute -left-5 w-3 h-3 rounded-full ${colorClass} bg-current`} />
              <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-gray-700">{edu.institution}</p>
              <p className="text-xs text-gray-600">{edu.startDate ? formatDate(edu.startDate) : ''} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'compact') {
    return (
      <div>
        <h2 className={`text-base font-semibold mb-2 ${colorClass}`}>Education</h2>
        <div className="space-y-1">
          {education.map((edu) => (
            <p key={edu.id} className="text-xs">
              <span className="font-bold">{edu.degree}</span>, {edu.field} - {edu.institution} ({edu.endDate ? formatDate(edu.endDate) : 'Present'})
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'honors') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Education & Honors</h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 p-3 rounded">
              <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-gray-700 font-medium">{edu.institution}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-600">{edu.startDate ? formatDate(edu.startDate) : ''} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                {edu.gpa && <p className="text-xs font-bold text-current">GPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // academic format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
        Education
      </h2>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="border-l-4 border-current pl-3">
            <h3 className="font-bold uppercase text-sm tracking-wide">
              {edu.degree || 'Degree'}
            </h3>
            <p className="text-gray-700 font-medium">{edu.field || 'Field'}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm italic text-gray-600">{edu.institution || 'Institution'}</p>
              <div className="text-xs text-gray-600">
                {edu.startDate ? formatDate(edu.startDate) : 'Start'} -{' '}
                {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : 'End'}
                {edu.gpa && <span className="ml-2 font-semibold">• GPA: {edu.gpa}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};