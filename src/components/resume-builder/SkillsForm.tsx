import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Settings } from 'lucide-react';
import SimplifiedSkillInput from './SimplifiedSkillInput';

const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState<'technical' | 'soft' | 'language'>('technical');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill({
        id: Date.now().toString(),
        name: newSkill.trim(),
        category,
      });
      setNewSkill('');
    }
  };

  const groupedSkills = {
    technical: resumeData.skills.filter(s => s.category === 'technical'),
    soft: resumeData.skills.filter(s => s.category === 'soft'),
    language: resumeData.skills.filter(s => s.category === 'language'),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Skills</h2>
          <p className="text-muted-foreground">
            Add your skills quickly or use advanced mode
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          {showAdvanced ? 'Simple' : 'Advanced'}
        </Button>
      </div>

      {!showAdvanced ? (
        <SimplifiedSkillInput />
      ) : (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="e.g., React, Leadership, Spanish"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft">Soft Skills</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </Card>
      )}

      {showAdvanced && (
        <div className="space-y-4">
          {/* Technical Skills */}
          {groupedSkills.technical.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {groupedSkills.technical.map(skill => (
                  <Badge key={skill.id} variant="secondary" className="gap-2 pr-1">
                    {skill.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Soft Skills */}
          {groupedSkills.soft.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {groupedSkills.soft.map(skill => (
                  <Badge key={skill.id} variant="secondary" className="gap-2 pr-1">
                    {skill.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Languages */}
          {groupedSkills.language.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {groupedSkills.language.map(skill => (
                  <Badge key={skill.id} variant="secondary" className="gap-2 pr-1">
                    {skill.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
