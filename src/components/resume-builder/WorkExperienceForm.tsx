import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const WorkExperienceForm = () => {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResume();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    addWorkExperience({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Work Experience</h2>
          <p className="text-muted-foreground">
            Add your professional work history
          </p>
        </div>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {resumeData.workExperience.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No work experience added yet. Click "Add" to get started.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {resumeData.workExperience.map((exp, index) => (
            <Card key={exp.id} className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Experience #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(exp.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    updateWorkExperience(exp.id, { current: checked as boolean, endDate: '' })
                  }
                />
                <label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">
                  I currently work here
                </label>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                  placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Quantify results when possible"
                  className="min-h-[120px]"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;
