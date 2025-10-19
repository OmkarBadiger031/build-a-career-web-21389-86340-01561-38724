import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();

  const handleAdd = () => {
    addProject({
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Projects</h2>
          <p className="text-muted-foreground">
            Showcase your notable projects and achievements
          </p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {resumeData.projects.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No projects added yet. Click "Add" to get started.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <Card key={project.id} className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Project #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="E-commerce Platform"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="Describe the project, your role, and the impact..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    updateProject(project.id, {
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>

              <div>
                <Label>Project Link (Optional)</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
