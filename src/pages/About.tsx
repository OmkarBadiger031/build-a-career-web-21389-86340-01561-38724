import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Target, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              About ResumeBuilder
            </h1>
            <p className="text-xl text-muted-foreground">
              Helping job seekers create professional resumes with ease
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6 animate-fade-in">
            <p className="text-lg text-muted-foreground">
              ResumeBuilder is a modern, user-friendly platform designed to help you create 
              professional resumes that stand out. Whether you're a recent graduate, career 
              changer, or experienced professional, our tools make it easy to showcase your 
              skills and experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-shadow animate-fade-in">
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                To make resume building simple, fast, and accessible for everyone.
              </p>
            </Card>
            
            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Who We Serve</h3>
              <p className="text-muted-foreground">
                Job seekers across all industries and experience levels.
              </p>
            </Card>
            
            <Card className="p-6 space-y-4 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">What We Do</h3>
              <p className="text-muted-foreground">
                Provide tools to create, customize, and export professional resumes.
              </p>
            </Card>
          </div>
          
          <Card className="p-8 space-y-6 bg-muted/30 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Why Choose Us?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Easy to Use</h3>
                  <p className="text-muted-foreground">
                    Our intuitive interface guides you through each step of creating your resume.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Professional Results</h3>
                  <p className="text-muted-foreground">
                    All templates are designed by professionals and optimized for ATS systems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Free & Accessible</h3>
                  <p className="text-muted-foreground">
                    No hidden fees or premium features. Everything you need is completely free.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
