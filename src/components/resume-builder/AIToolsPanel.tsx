import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AchievementQuantifier } from './AchievementQuantifier';
import { ResumeScorer } from './ResumeScorer';
import { SkillsGapAnalyzer } from './SkillsGapAnalyzer';
import { JobMatcher } from './JobMatcher';
import { BulletPointGenerator } from './BulletPointGenerator';
import { InterviewQuestionGenerator } from './InterviewQuestionGenerator';
import { LinkedInGenerator } from './LinkedInGenerator';
import { ResumeAIEnhancer } from './ResumeAIEnhancer';

const AIToolsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="p-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <div className="text-left">
                <h3 className="font-semibold">AI Assistant Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance your resume with AI-powered suggestions
                </p>
              </div>
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">Smart Enhancement</div>
            <ResumeAIEnhancer />
          </div>

          <div className="space-y-3 pt-3 border-t">
            <div className="text-sm font-medium text-muted-foreground">Writing Assistance</div>
            <BulletPointGenerator />
            <AchievementQuantifier />
          </div>
          
          <div className="space-y-3 pt-3 border-t">
            <div className="text-sm font-medium text-muted-foreground">Resume Analysis</div>
            <ResumeScorer />
            <JobMatcher />
            <SkillsGapAnalyzer />
          </div>
          
          <div className="space-y-3 pt-3 border-t">
            <div className="text-sm font-medium text-muted-foreground">Career Tools</div>
            <LinkedInGenerator />
            <InterviewQuestionGenerator />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default AIToolsPanel;
