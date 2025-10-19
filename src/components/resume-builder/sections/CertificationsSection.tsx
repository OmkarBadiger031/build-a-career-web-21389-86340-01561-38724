import { Badge } from '@/components/ui/badge';
import type { Certification } from '@/types/resume';

interface CertificationsSectionProps {
  certifications: Certification[];
  format: 'simple' | 'detailed' | 'timeline' | 'badges' | 'grid' | 'accordion';
  colorClass: string;
  formatDate: (date: string) => string;
}

export const CertificationsSection = ({ certifications, format, colorClass, formatDate }: CertificationsSectionProps) => {
  if (certifications.length === 0) return null;

  if (format === 'simple') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Certifications
        </h2>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{cert.name}</h3>
                <p className="text-xs text-gray-700">{cert.issuer}</p>
              </div>
              {cert.date && (
                <p className="text-xs text-gray-600">{formatDate(cert.date)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'detailed') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{cert.name}</h3>
                  <p className="text-sm text-gray-700 font-medium">{cert.issuer}</p>
                </div>
                {cert.date && (
                  <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                    {formatDate(cert.date)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'timeline') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
          Certifications
        </h2>
        <div className="relative border-l-2 border-gray-300 pl-4 space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="relative">
              <div className={`absolute -left-5 w-3 h-3 rounded-full ${colorClass} bg-current`} />
              <div>
                <h3 className="font-bold">{cert.name}</h3>
                <p className="text-sm text-gray-700">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-xs text-gray-600 mt-1">{formatDate(cert.date)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'grid') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Certifications</h2>
        <div className="grid grid-cols-2 gap-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="border border-gray-300 p-2 rounded">
              <h3 className="font-bold text-sm">{cert.name}</h3>
              <p className="text-xs text-gray-600">{cert.issuer}</p>
              {cert.date && <p className="text-xs text-gray-500">{formatDate(cert.date)}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === 'accordion') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Certifications</h2>
        <div className="space-y-2">
          {certifications.map((cert) => (
            <details key={cert.id} className="border border-gray-300 rounded p-2">
              <summary className="font-bold text-sm cursor-pointer">{cert.name}</summary>
              <div className="mt-2 text-xs text-gray-700">
                <p>Issuer: {cert.issuer}</p>
                {cert.date && <p>Date: {formatDate(cert.date)}</p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  // badges format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>
        Certifications
      </h2>
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <Badge key={cert.id} variant="secondary" className="text-xs px-3 py-1">
            {cert.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};