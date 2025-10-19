import type { WorkExperience } from '@/types/resume';

interface WorkExperienceSectionProps {
  workExperience: WorkExperience[];
  format: 'detailed' | 'compact' | 'timeline' | 'modern' | 'minimalist' | 'executive' | 'creative' | 'sidebar';
  colorClass: string;
  formatDate: (date: string) => string;
}

export const WorkExperienceSection = ({ workExperience, format, colorClass, formatDate }: WorkExperienceSectionProps) => {
  if (workExperience.length === 0) return null;

  if (format === 'detailed') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Work Experience
        </h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{exp.position || 'Position'}</h3>
                  <p className="text-gray-700 font-medium">{exp.company || 'Company'}</p>
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start'} -{' '}
                  {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End'}
                </p>
              </div>
              {exp.description && (
                <div className="text-sm text-gray-700 whitespace-pre-line pl-4 border-l-2 border-gray-200">
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'compact') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Work Experience
        </h2>
        <div className="space-y-2">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{exp.position}</span>
                <span className="text-xs text-gray-600">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End'}
                </span>
              </div>
              <p className="text-xs text-gray-700">{exp.company}</p>
              {exp.description && (
                <p className="text-xs text-gray-600 line-clamp-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'timeline') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Work Experience
        </h2>
        <div className="relative border-l-2 border-gray-300 pl-4 space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="relative">
              <div className={`absolute -left-5 w-3 h-3 rounded-full ${colorClass} bg-current`} />
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate ? formatDate(exp.startDate) : 'Start'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'minimalist') {
    return (
      <div>
        <h2 className={`text-base font-semibold mb-2 ${colorClass}`}>Experience</h2>
        <div className="space-y-2">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between">
                <span className="font-bold text-sm">{exp.position}</span>
                <span className="text-xs text-gray-600">{exp.startDate ? formatDate(exp.startDate) : ''} - {exp.current ? 'Now' : formatDate(exp.endDate)}</span>
              </div>
              <p className="text-xs text-gray-600">{exp.company}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'executive') {
    return (
      <div>
        <h2 className={`text-xl font-bold mb-4 ${colorClass} uppercase tracking-wider border-b-2 pb-2`}>Professional Experience</h2>
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <div className="grid grid-cols-[1fr,auto] gap-4 mb-2">
                <div>
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className="text-gray-700 font-semibold italic">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-600 text-right">{exp.startDate ? formatDate(exp.startDate) : ''} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              {exp.description && <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'creative') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Experience</h2>
        <div className="space-y-3">
          {workExperience.map((exp) => (
            <div key={exp.id} className={`relative pl-6 border-l-4 ${colorClass} border-current`}>
              <div className={`absolute -left-2 w-4 h-4 rounded-full ${colorClass} bg-current`} />
              <h3 className="font-bold">{exp.position}</h3>
              <p className="text-sm text-gray-700">{exp.company} • {exp.startDate ? formatDate(exp.startDate) : ''} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'sidebar') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Experience</h2>
        <div className="space-y-3">
          {workExperience.map((exp) => (
            <div key={exp.id} className={`grid grid-cols-[120px,1fr] gap-3 ${colorClass}`}>
              <div className="text-right border-r-2 border-current pr-3">
                <p className="text-xs font-semibold">{exp.startDate ? formatDate(exp.startDate) : ''}</p>
                <p className="text-xs">{exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <div>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm text-gray-700">{exp.company}</p>
                {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // modern format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
        Work Experience
      </h2>
      <div className="grid gap-3">
        {workExperience.map((exp) => (
          <div key={exp.id} className="bg-gray-50 p-3 rounded-lg border-l-4 border-current">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm text-gray-700">{exp.company}</p>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded">
                {exp.startDate ? formatDate(exp.startDate) : 'Start'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End'}
              </span>
            </div>
            {exp.description && (
              <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};