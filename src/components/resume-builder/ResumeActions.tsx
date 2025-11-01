import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Trash2, Upload, Copy } from 'lucide-react';
import { toast } from 'sonner';

const ResumeActions = () => {
  const { clearResume, exportData, importData } = useResume();

  const handleDownloadPDF = () => {
    try {
      const preview = document.getElementById('resume-preview');
      if (!preview) {
        toast.error('Resume preview not found');
        return;
      }
      
      toast.info('Opening print dialog...');
      
      // Add print-specific styles
      const printStyles = document.createElement('style');
      printStyles.textContent = `
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `;
      document.head.appendChild(printStyles);
      
      window.print();
      
      // Clean up print styles
      setTimeout(() => {
        document.head.removeChild(printStyles);
      }, 1000);
      
      toast.success('✓ Ready to save as PDF!');
    } catch (error) {
      console.error('Print error:', error);
      toast.error('Failed to open print dialog');
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all resume data? This cannot be undone.')) {
      clearResume();
      toast.success('Resume cleared successfully');
    }
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('✓ Resume data exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export resume data');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            importData(event.target.result);
            toast.success('Resume data imported successfully');
          } catch (error) {
            toast.error('Failed to import resume data');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleCopyPreview = () => {
    const preview = document.getElementById('resume-preview');
    if (preview) {
      const text = preview.innerText;
      navigator.clipboard.writeText(text);
      toast.success('Resume text copied to clipboard');
    }
  };

  return (
    <Card className="p-4 space-y-3 animate-fade-in">
      <h3 className="font-semibold mb-2">Actions</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleDownloadPDF} className="gap-2" variant="default">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        
        <Button onClick={handleCopyPreview} className="gap-2" variant="outline">
          <Copy className="h-4 w-4" />
          Copy Text
        </Button>
        
        <Button onClick={handleExport} className="gap-2" variant="outline">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
        
        <Button onClick={handleImport} className="gap-2" variant="outline">
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
      </div>
      
      <Button 
        onClick={handleClear} 
        className="w-full gap-2" 
        variant="destructive"
      >
        <Trash2 className="h-4 w-4" />
        Clear All Data
      </Button>
      
      <p className="text-xs text-muted-foreground">
        Your data is automatically saved to your browser's local storage.
      </p>
    </Card>
  );
};

export default ResumeActions;
