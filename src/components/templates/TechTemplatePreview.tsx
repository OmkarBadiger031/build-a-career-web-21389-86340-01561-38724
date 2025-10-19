interface TechTemplatePreviewProps {
  variant: 'modern' | 'minimal' | 'creative' | 'professional' | 'ats';
}

export const TechTemplatePreview = ({ variant }: TechTemplatePreviewProps) => {
  const variants = {
    modern: (
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            JD
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">John Developer</h1>
            <p className="text-gray-600">Senior Software Engineer</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Experience</h2>
            <div className="border-l-2 border-blue-200 pl-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">Tech Company</h3>
                <p className="text-sm text-gray-600">Senior Developer • 2020-Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    minimal: (
      <div className="bg-white p-8">
        <div className="border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-4xl font-light text-gray-900">JANE SMITH</h1>
          <p className="text-gray-600 mt-1">Full Stack Developer</p>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h2>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
              <span>• JavaScript</span>
              <span>• Python</span>
              <span>• React</span>
              <span>• PostgreSQL</span>
              <span>• Git</span>
              <span>• CI/CD</span>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h2>
            <div className="text-sm">
              <p className="font-semibold">Software Engineer</p>
              <p className="text-gray-600">StartupXYZ | 2019-2024</p>
            </div>
          </div>
        </div>
      </div>
    ),
    creative: (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">AS</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Alex Singh
            </h1>
            <p className="text-gray-700 font-medium">Creative Developer</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur rounded-xl p-4">
            <h2 className="text-lg font-bold text-purple-700 mb-2">✨ Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {['UI/UX', 'React', 'Three.js', 'Animation'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    professional: (
      <div className="bg-white p-8 border-t-4 border-gray-800">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">MICHAEL CHEN</h1>
          <p className="text-gray-600 mt-1">Software Engineering Manager</p>
          <div className="flex justify-center gap-3 text-xs text-gray-600 mt-2">
            <span>m.chen@email.com</span>
            <span>•</span>
            <span>linkedin.com/in/mchen</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-700">
              Results-driven software engineering manager with 10+ years of experience...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Languages:</span> Java, Python, Go
              </div>
              <div>
                <span className="font-semibold">Cloud:</span> AWS, Azure, GCP
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    ats: (
      <div className="bg-white p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black">SARAH JOHNSON</h1>
          <p className="text-black">Software Developer</p>
          <p className="text-sm text-gray-800 mt-1">
            Email: sarah.j@email.com | Phone: (555) 123-4567 | Location: San Francisco, CA
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-black uppercase mb-2">SKILLS</h2>
            <p className="text-sm text-gray-900">
              JavaScript, React, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Git, Agile, Scrum
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black uppercase mb-2">EXPERIENCE</h2>
            <div className="mb-3">
              <p className="font-bold text-black">Software Developer</p>
              <p className="text-sm text-gray-800">Tech Solutions Inc. | January 2020 - Present</p>
              <ul className="text-sm text-gray-900 mt-1 ml-4">
                <li>• Developed scalable web applications using React and Node.js</li>
                <li>• Reduced page load time by 40% through optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};
