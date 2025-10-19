import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/resume';

interface ProjectsSectionProps {
  projects: Project[];
  format: 'cards' | 'list' | 'grid' | 'detailed' | 'showcase' | 'timeline' | 'minimal';
  colorClass: string;
}

export const ProjectsSection = ({ projects, format, colorClass }: ProjectsSectionProps) => {
  if (projects.length === 0) return null;

  if (format === 'cards') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Projects
        </h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 p-3 rounded-lg border-l-4 border-current">
              <h3 className="font-bold mb-1">{project.name || 'Project Name'}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              {project.link && (
                <p className="text-xs text-blue-600 mt-1">{project.link}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'list') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Projects
        </h2>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="text-sm">
              <span className="font-bold">{project.name}</span>
              {project.description && <span className="text-gray-600"> - {project.description}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (format === 'grid') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Projects
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-300 p-2 rounded">
              <h3 className="font-bold text-sm">{project.name}</h3>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs text-gray-600">
                      {tech}{idx < Math.min(2, project.technologies.length - 1) ? ',' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'showcase') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Featured Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border-2 border-gray-200 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{project.name}</h3>
              {project.description && <p className="text-sm text-gray-700 mb-3 leading-relaxed">{project.description}</p>}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} className="text-xs">{tech}</Badge>
                  ))}
                </div>
              )}
              {project.link && <a href={project.link} className="text-xs text-blue-600 hover:underline">{project.link}</a>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'timeline') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Projects</h2>
        <div className="relative border-l-2 border-gray-300 pl-4 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <div className={`absolute -left-5 w-3 h-3 rounded-full ${colorClass} bg-current`} />
              <h3 className="font-bold">{project.name}</h3>
              {project.description && <p className="text-sm text-gray-600">{project.description}</p>}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs text-gray-500">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'minimal') {
    return (
      <div>
        <h2 className={`text-base font-semibold mb-2 ${colorClass}`}>Projects</h2>
        <div className="space-y-1">
          {projects.map((project) => (
            <p key={project.id} className="text-xs">
              <span className="font-bold">{project.name}</span> - {project.description}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // detailed format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
        Projects
      </h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id}>
            <h3 className="font-bold text-base mb-1">{project.name || 'Project Name'}</h3>
            {project.description && (
              <p className="text-sm text-gray-700 mb-2 leading-relaxed">{project.description}</p>
            )}
            {project.technologies.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600">Technologies: </span>
                <div className="inline-flex flex-wrap gap-1">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {project.link && (
              <p className="text-xs text-blue-600 mt-1 font-medium">
                Link: {project.link}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};