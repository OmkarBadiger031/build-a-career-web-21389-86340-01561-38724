import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updatePersonalInfo({ photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ photo: '' });
  };

  const { personalInfo } = resumeData;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Start with your basic contact information
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg border border-border">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={personalInfo.photo} alt={personalInfo.fullName} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl">
              {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('') : <Camera />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Label htmlFor="photo" className="text-sm font-medium">Profile Photo (Optional)</Label>
            <p className="text-xs text-muted-foreground">Upload a professional headshot</p>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {personalInfo.photo ? 'Change' : 'Upload'}
              </Button>
              {personalInfo.photo && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRemovePhoto}
                >
                  Remove
                </Button>
              )}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="john.doe@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
            <Input
              id="portfolio"
              value={personalInfo.portfolio || ''}
              onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
