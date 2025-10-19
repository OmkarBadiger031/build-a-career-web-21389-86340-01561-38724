import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { PersonalInfo } from '@/types/resume';

interface HeaderSectionProps {
  personalInfo: PersonalInfo;
  format: 'centered' | 'left-aligned' | 'two-column' | 'modern' | 'banner' | 'sidebar' | 'photo-left' | 'photo-right';
  headerClass: string;
  colorClass: string;
}

export const HeaderSection = ({ personalInfo, format, headerClass, colorClass }: HeaderSectionProps) => {
  if (format === 'centered') {
    return (
      <div className={`text-center border-b-2 pb-4 ${colorClass} border-current`}>
        <div className="flex items-start justify-center gap-4">
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover print:block"
            />
          )}
          <div className="flex-1">
            <h1 className={`${headerClass} mb-2 text-black`}>{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap justify-center gap-3 text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.location}</span>
                </div>
              )}
            </div>
            {(personalInfo.linkedin || personalInfo.portfolio) && (
              <div className="flex flex-wrap justify-center gap-3 text-gray-600 mt-1">
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="h-3 w-3" />
                    <span className="text-xs">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    <span className="text-xs">{personalInfo.portfolio}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (format === 'left-aligned') {
    return (
      <div className={`border-b-2 pb-4 ${colorClass} border-current`}>
        <div className="flex items-start gap-4">
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-lg object-cover print:block"
            />
          )}
          <div className="flex-1">
            <h1 className={`${headerClass} text-black`}>{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-3 text-gray-600 mt-2">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span className="text-xs">{personalInfo.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (format === 'two-column') {
    return (
      <div className={`grid grid-cols-2 gap-4 border-b-2 pb-4 ${colorClass} border-current`}>
        <div>
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-lg object-cover mb-2 print:block"
            />
          )}
          <h1 className={`${headerClass} text-black`}>{personalInfo.fullName || 'Your Name'}</h1>
        </div>
        <div className="space-y-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (format === 'banner') {
    return (
      <div className={`${colorClass} bg-current text-white p-6 -mx-8 -mt-8 mb-4`}>
        <div className="flex items-center gap-4">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-full object-cover border-4 border-white" />
          )}
          <div>
            <h1 className={`${headerClass} text-white`}>{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-3 text-white/90 mt-2 text-sm">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (format === 'sidebar') {
    return (
      <div className="grid grid-cols-[140px,1fr] gap-4 border-b-2 pb-4 border-current">
        <div className={`${colorClass} bg-current/10 p-3 rounded-lg flex flex-col items-center`}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-24 h-24 rounded-full object-cover mb-2" />
          )}
        </div>
        <div>
          <h1 className={`${headerClass} text-black`}>{personalInfo.fullName || 'Your Name'}</h1>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
            {personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="h-3 w-3"/>{personalInfo.linkedin}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (format === 'photo-left') {
    return (
      <div className={`flex items-center gap-4 border-b-2 pb-4 ${colorClass} border-current`}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-28 h-28 rounded-lg object-cover" />
        )}
        <div className="flex-1">
          <h1 className={`${headerClass} text-black mb-2`}>{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{personalInfo.location}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (format === 'photo-right') {
    return (
      <div className={`flex items-center gap-4 border-b-2 pb-4 ${colorClass} border-current`}>
        <div className="flex-1">
          <h1 className={`${headerClass} text-black mb-2`}>{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {personalInfo.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{personalInfo.location}</div>}
          </div>
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt={personalInfo.fullName} className="w-28 h-28 rounded-lg object-cover" />
        )}
      </div>
    );
  }

  // modern format
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border-l-4 mb-4 ${colorClass} border-current`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded-full object-cover print:block border-2 border-current"
            />
          )}
          <div>
            <h1 className={`${headerClass} text-black`}>{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
            </div>
          </div>
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="flex gap-2">
            {personalInfo.linkedin && <Linkedin className="h-5 w-5 text-gray-600" />}
            {personalInfo.portfolio && <Globe className="h-5 w-5 text-gray-600" />}
          </div>
        )}
      </div>
    </div>
  );
};