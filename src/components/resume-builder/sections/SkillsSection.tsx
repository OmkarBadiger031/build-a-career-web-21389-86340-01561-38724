import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/types/resume';

interface SkillsSectionProps {
  skills: Skill[];
  format: 'badges' | 'columns' | 'bars' | 'categorized' | 'cloud' | 'rating' | 'grid' | 'compact';
  colorClass: string;
}

export const SkillsSection = ({ skills, format, colorClass }: SkillsSectionProps) => {
  if (skills.length === 0) return null;

  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languages = skills.filter(s => s.category === 'language');

  if (format === 'badges') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <Badge key={skill.id} variant="secondary" className="text-xs">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'columns') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Skills
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {skills.map(skill => (
            <div key={skill.id} className="text-sm text-gray-700">
              • {skill.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'bars') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Skills
        </h2>
        <div className="space-y-2">
          {skills.map(skill => (
            <div key={skill.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{skill.name}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${colorClass} bg-current h-2 rounded-full`} style={{ width: '85%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'cloud') {
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg'];
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Skills</h2>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {skills.map((skill, idx) => (
            <span key={skill.id} className={`${sizes[idx % sizes.length]} text-gray-700 font-medium`}>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'rating') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Skills</h2>
        <div className="space-y-2">
          {skills.map(skill => (
            <div key={skill.id} className="flex justify-between items-center">
              <span className="text-sm font-medium">{skill.name}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-current' : 'bg-gray-300'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'grid') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Skills</h2>
        <div className="grid grid-cols-4 gap-2">
          {skills.map(skill => (
            <div key={skill.id} className="bg-gray-50 p-2 rounded text-center">
              <span className="text-xs font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'compact') {
    return (
      <div>
        <h2 className={`text-base font-semibold mb-1 ${colorClass}`}>Skills</h2>
        <p className="text-xs text-gray-700">{skills.map(s => s.name).join(' • ')}</p>
      </div>
    );
  }

  // categorized format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
        Skills
      </h2>
      <div className="space-y-3">
        {technicalSkills.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map(skill => (
                <Badge key={skill.id} variant="outline" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {languages.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map(skill => (
                <Badge key={skill.id} variant="outline" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};