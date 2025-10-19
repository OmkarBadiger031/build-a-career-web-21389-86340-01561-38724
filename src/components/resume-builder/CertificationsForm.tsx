import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsForm = () => {
  const { resumeData, addCertification, removeCertification } = useResume();
  const [newCert, setNewCert] = React.useState({ name: '', issuer: '', date: '' });

  const handleAdd = () => {
    if (newCert.name.trim() && newCert.issuer.trim()) {
      addCertification({
        id: Date.now().toString(),
        ...newCert,
      });
      setNewCert({ name: '', issuer: '', date: '' });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Certifications</h2>
        <p className="text-muted-foreground mb-6">
          Add your professional certifications and licenses
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <Label>Certification Name</Label>
            <Input
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              placeholder="AWS Certified Solutions Architect"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Issuing Organization</Label>
              <Input
                value={newCert.issuer}
                onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                placeholder="Amazon Web Services"
              />
            </div>
            <div>
              <Label>Date Obtained</Label>
              <Input
                type="month"
                value={newCert.date}
                onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </Card>

      {resumeData.certifications.length > 0 && (
        <div className="space-y-3">
          {resumeData.certifications.map((cert) => (
            <Card key={cert.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(cert.date + '-01').toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
