import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Sparkles, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { ATSScoreChecker } from '@/components/ATSScoreChecker';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Professional Resume Builder
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Build Your Perfect Resume in{' '}
            <span className="text-primary">Minutes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a professional, ATS-friendly resume with our easy-to-use builder. 
            Choose from beautiful templates and export to PDF instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="gap-2 text-lg px-8">
              <Link to="/build">
                Start Building
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="gap-2 text-lg px-8">
              <Link to="/templates">
                View Templates
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* ATS Checker + Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our Resume Builder?
          </h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* ATS Score Checker - Left side */}
            <div className="lg:col-span-1">
              <ATSScoreChecker />
            </div>
            
            {/* Features - Right side */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simple step-by-step process to create your resume. No design skills needed.
              </p>
            </Card>
            
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Professional Templates</h3>
              <p className="text-muted-foreground">
                Choose from multiple professionally designed templates that stand out.
              </p>
            </Card>
            
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Export to PDF</h3>
              <p className="text-muted-foreground">
                Download your resume as a PDF with one click. Ready to send to employers.
              </p>
            </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          
          <div className="space-y-6">
            {[
              'ATS-friendly format to pass applicant tracking systems',
              'Auto-save feature so you never lose your progress',
              'Multiple templates to match your industry',
              'Live preview as you build',
              'Import/Export functionality for easy editing',
              'Mobile-friendly and works on all devices'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-lg text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of job seekers who've created their perfect resume with our builder.
          </p>
          <Button size="lg" asChild className="gap-2 text-lg px-8">
            <Link to="/build">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 ResumeBuilder. Built with ❤️ for job seekers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
