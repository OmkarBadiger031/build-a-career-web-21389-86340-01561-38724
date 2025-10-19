import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const COMMON_TECH_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
  'Git', 'Docker', 'AWS', 'SQL', 'MongoDB', 'REST APIs'
];

const SimplifiedSkillInput = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkills = () => {
    if (!skillInput.trim()) return;

    const skills = skillInput.split(',').map(s => s.trim()).filter(s => s);
    skills.forEach(skill => {
      // Auto-categorize based on common patterns
      let category: 'technical' | 'soft' | 'language' = 'technical';
      
      const softSkills = ['leadership', 'communication', 'teamwork', 'problem solving', 'collaboration'];
      const languages = ['english', 'spanish', 'french', 'german', 'chinese', 'japanese'];
      
      if (softSkills.some(s => skill.toLowerCase().includes(s))) {
        category = 'soft';
      } else if (languages.some(l => skill.toLowerCase().includes(l))) {
        category = 'language';
      }

      addSkill({
        id: Date.now().toString() + Math.random(),
        name: skill,
        category,
      });
    });
    
    setSkillInput('');
  };

  const handleQuickAdd = (skill: string) => {
    addSkill({
      id: Date.now().toString() + Math.random(),
      name: skill,
      category: 'technical',
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="skills-input">Add Your Skills</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Type skills separated by commas (e.g., React, TypeScript, Python)
        </p>
        <div className="flex gap-2">
          <Input
            id="skills-input"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkills()}
            placeholder="React, TypeScript, Node.js..."
          />
          <Button onClick={handleAddSkills}>Add</Button>
        </div>
      </div>

      {/* Quick add common skills */}
      <div>
        <Label className="text-sm flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Quick Add Common Skills
        </Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {COMMON_TECH_SKILLS.map(skill => (
            <Button
              key={skill}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(skill)}
              disabled={resumeData.skills.some(s => s.name === skill)}
              className="h-7 text-xs"
            >
              {skill}
            </Button>
          ))}
        </div>
      </div>

      {/* Display added skills */}
      {resumeData.skills.length > 0 && (
        <Card className="p-4">
          <Label className="mb-3 block">Your Skills ({resumeData.skills.length})</Label>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(skill => (
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
  );
};

export default SimplifiedSkillInput;
