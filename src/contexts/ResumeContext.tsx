import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addWorkExperience: (experience: ResumeData['workExperience'][0]) => void;
  updateWorkExperience: (id: string, experience: Partial<ResumeData['workExperience'][0]>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  removeSkill: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addCertification: (cert: ResumeData['certifications'][0]) => void;
  removeCertification: (id: string) => void;
  setTemplate: (template: ResumeData['template']) => void;
  updateDesign: (design: Partial<ResumeData['design']>) => void;
  clearResume: () => void;
  exportData: () => string;
  importData: (data: string) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  template: 'modern',
  jobProfile: '',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const addWorkExperience = (experience: ResumeData['workExperience'][0]) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, experience]
    }));
  };

  const updateWorkExperience = (id: string, experience: Partial<ResumeData['workExperience'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, ...experience } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education: ResumeData['education'][0]) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  const updateEducation = (id: string, education: Partial<ResumeData['education'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...education } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill: ResumeData['skills'][0]) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = (project: ResumeData['projects'][0]) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (id: string, project: Partial<ResumeData['projects'][0]>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, ...project } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const addCertification = (cert: ResumeData['certifications'][0]) => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, cert]
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const setTemplate = (template: ResumeData['template']) => {
    setResumeData(prev => ({ ...prev, template }));
  };

  const updateDesign = (design: Partial<ResumeData['design']>) => {
    setResumeData(prev => {
      const currentDesign = prev.design || {
        fontFamily: 'inter',
        fontSize: 'medium',
        sectionSpacing: 'normal',
        colorScheme: 'blue',
        headerStyle: 'bold',
        sectionFormats: {
          workExperience: 'detailed',
          education: 'standard',
          skills: 'badges',
          projects: 'cards',
          certifications: 'simple',
          header: 'centered',
          summary: 'paragraph',
        },
      };

      return {
        ...prev,
        design: {
          ...currentDesign,
          ...design,
          // Deep merge sectionFormats to preserve other format settings
          sectionFormats: {
            ...currentDesign.sectionFormats,
            ...(design.sectionFormats || {})
          }
        } as ResumeData['design']
      };
    });
  };

  const clearResume = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem('resumeData');
  };

  const exportData = () => {
    return JSON.stringify(resumeData, null, 2);
  };

  const importData = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      setResumeData(parsed);
    } catch (error) {
      console.error('Failed to import data:', error);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateSummary,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        removeCertification,
        setTemplate,
        updateDesign,
        clearResume,
        exportData,
        importData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};
