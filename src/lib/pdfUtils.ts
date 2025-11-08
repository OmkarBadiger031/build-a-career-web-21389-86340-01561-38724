import { ResumeData } from '@/types/resume';
import { toast } from 'sonner';

/**
 * Generates a professionally formatted HTML document for PDF download
 * Uses the selected template styling to ensure consistent formatting
 */
export const generateResumePDF = (resumeData: ResumeData, templateId?: string) => {
  try {
    const { personalInfo, summary, workExperience, education, skills, projects, certifications } = resumeData;
    
    // Get the current preview element to clone its styles
    const previewElement = document.getElementById('resume-preview');
    let computedStyles = '';
    
    if (previewElement) {
      const styles = window.getComputedStyle(previewElement);
      computedStyles = `
        font-family: ${styles.fontFamily};
        font-size: ${styles.fontSize};
        line-height: ${styles.lineHeight};
        color: ${styles.color};
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume - ${personalInfo.fullName || 'Untitled'}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            ${computedStyles}
            background: white;
            padding: 40px;
            max-width: 850px;
            margin: 0 auto;
          }
          @media print {
            body { padding: 20px; }
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .name {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .contact-info {
            font-size: 14px;
            color: #555;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
          }
          .experience-item, .education-item, .project-item, .cert-item {
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .item-title {
            font-weight: bold;
            font-size: 16px;
          }
          .item-subtitle {
            color: #555;
            font-style: italic;
            margin-bottom: 5px;
          }
          .item-date {
            color: #666;
            font-size: 14px;
          }
          .description {
            margin-top: 8px;
            line-height: 1.6;
            white-space: pre-wrap;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .skill-badge {
            background: #e5e7eb;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 14px;
          }
          .summary {
            line-height: 1.6;
            margin-bottom: 20px;
          }
          @page {
            margin: 0.5in;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="name">${personalInfo.fullName || 'Your Name'}</div>
          <div class="contact-info">
            ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
            ${personalInfo.linkedin ? `<span>🔗 ${personalInfo.linkedin}</span>` : ''}
            ${personalInfo.portfolio ? `<span>🌐 ${personalInfo.portfolio}</span>` : ''}
          </div>
        </div>

        <!-- Summary -->
        ${summary ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary">${summary}</div>
          </div>
        ` : ''}

        <!-- Work Experience -->
        ${workExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">Work Experience</div>
            ${workExperience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-subtitle">${exp.company}</div>
                  </div>
                  <div class="item-date">
                    ${exp.startDate ? new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} - 
                    ${exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                  </div>
                </div>
                ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Education -->
        ${education.length > 0 ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree} in ${edu.field}</div>
                    <div class="item-subtitle">${edu.institution}</div>
                  </div>
                  <div class="item-date">
                    ${edu.startDate ? new Date(edu.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} - 
                    ${edu.current ? 'Present' : edu.endDate ? new Date(edu.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                  </div>
                </div>
                ${edu.gpa ? `<div class="item-subtitle">GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Skills -->
        ${skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills.map(skill => `<span class="skill-badge">${skill.name}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Projects -->
        ${projects.length > 0 ? `
          <div class="section">
            <div class="section-title">Projects</div>
            ${projects.map(proj => `
              <div class="project-item">
                <div class="item-title">${proj.name}</div>
                ${proj.description ? `<div class="description">${proj.description}</div>` : ''}
                ${proj.technologies?.length > 0 ? `
                  <div style="margin-top: 5px;">
                    <strong>Technologies:</strong> ${proj.technologies.join(', ')}
                  </div>
                ` : ''}
                ${proj.link ? `<div style="margin-top: 5px;"><strong>Link:</strong> ${proj.link}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Certifications -->
        ${certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            ${certifications.map(cert => `
              <div class="cert-item">
                <div class="item-header">
                  <div class="item-title">${cert.name}</div>
                  <div class="item-date">${cert.date ? new Date(cert.date + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</div>
                </div>
                <div class="item-subtitle">${cert.issuer}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <script>
          // Auto-trigger print dialog
          window.onload = function() {
            setTimeout(() => {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    // Open in new window and print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      toast.success('Opening print dialog - save as PDF');
    } else {
      toast.error('Please allow pop-ups to download PDF');
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    toast.error('Failed to generate PDF');
  }
};

/**
 * Downloads resume using the preview element with proper template styling
 * This ensures the exact visual appearance is preserved
 */
export const downloadResumeFromPreview = () => {
  try {
    const preview = document.getElementById('resume-preview');
    if (!preview) {
      toast.error('Resume preview not found');
      return;
    }
    
    toast.info('Opening print dialog - select "Save as PDF"');
    
    // Add print-specific styles
    const printStyles = document.createElement('style');
    printStyles.id = 'temp-print-styles';
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
          padding: 20px;
        }
      }
    `;
    document.head.appendChild(printStyles);
    
    // Trigger print
    window.print();
    
    // Clean up print styles after print dialog closes
    setTimeout(() => {
      const styles = document.getElementById('temp-print-styles');
      if (styles) {
        document.head.removeChild(styles);
      }
    }, 1000);
    
  } catch (error) {
    console.error('Print error:', error);
    toast.error('Failed to open print dialog');
  }
};
