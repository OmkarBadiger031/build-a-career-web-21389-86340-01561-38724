import { useResume } from '@/contexts/ResumeContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Professional Summary</h2>
        <p className="text-muted-foreground mb-6">
          Write a brief overview of your professional background and key achievements
        </p>
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
          className="min-h-[200px] mt-2"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Aim for 3-5 sentences highlighting your experience, skills, and career goals
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
