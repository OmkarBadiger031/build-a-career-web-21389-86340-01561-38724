import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface TemplatePreviewCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  popular?: boolean;
  preview: React.ReactNode;
}

export const TemplatePreviewCard = ({ 
  id, 
  name, 
  description, 
  icon: Icon, 
  color, 
  popular,
  preview 
}: TemplatePreviewCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] group">
      {/* Preview Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 border-b overflow-hidden">
        <div className="absolute inset-0 scale-[0.4] origin-top-left p-4">
          {preview}
        </div>
        {popular && (
          <Badge className="absolute top-3 right-3 z-10" variant="default">
            Popular
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center ${color} flex-shrink-0`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link to={`/build?template=${id}`}>
            Use This Template
          </Link>
        </Button>
      </div>
    </Card>
  );
};
