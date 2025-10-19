interface EducationTemplatePreviewProps {
  variant: 'teacher' | 'professor' | 'admin' | 'counselor' | 'special' | 'coach';
}

export const EducationTemplatePreview = ({ variant }: EducationTemplatePreviewProps) => {
  const variants = {
    teacher: (
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">LT</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laura Thompson</h1>
            <p className="text-xl text-orange-700 font-semibold mt-1">Elementary School Teacher</p>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>📧 l.thompson@elementary.edu</p>
              <p>📱 (555) 234-8901</p>
              <p>🎓 M.Ed. in Elementary Education</p>
              <p>📜 State Teaching License #12345</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-lg p-4 border-l-4 border-yellow-500">
            <h2 className="text-lg font-bold text-orange-700 mb-2">TEACHING PHILOSOPHY</h2>
            <p className="text-sm text-gray-800 italic">
              "Every child deserves a nurturing environment where they can discover their unique potential..."
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-orange-700 mb-3">AREAS OF EXPERTISE</h2>
            <div className="flex flex-wrap gap-2">
              {['Differentiated Learning', 'Classroom Management', 'STEM Integration', 'Special Needs'].map(skill => (
                <span key={skill} className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-orange-700 mb-3">TEACHING EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">3rd Grade Teacher</h3>
                  <p className="text-gray-600">Sunshine Elementary School</p>
                </div>
                <span className="text-gray-600">2018-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    professor: (
      <div className="bg-white p-8 border-t-8 border-red-800" style={{ fontFamily: 'Crimson Text, serif' }}>
        <div className="text-center mb-6 pb-6 border-b-4 border-gray-800">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-lg bg-red-800 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">JA</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">DR. JAMES ANDERSON</h1>
          <p className="text-xl text-red-800 font-semibold mt-2">Professor of Computer Science</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>j.anderson@university.edu</span>
            <span>•</span>
            <span>Ph.D., MIT</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-red-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-red-200">
              Academic Profile
            </h2>
            <p className="text-sm text-gray-700">
              Tenured professor with 20+ publications in artificial intelligence and machine learning...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-red-200">
              Research Interests
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <span>• Machine Learning</span>
              <span>• Neural Networks</span>
              <span>• Computer Vision</span>
              <span>• AI Ethics</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-900 uppercase tracking-wide mb-3 pb-2 border-b-2 border-red-200">
              Academic Appointments
            </h2>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Professor</h3>
                    <p className="text-gray-600">Stanford University</p>
                  </div>
                  <span className="text-gray-600">2015-Present</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    admin: (
      <div className="bg-blue-50 p-8 border-4 border-blue-700 rounded-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="flex items-start gap-6 mb-6">
          <div className="w-32 h-32 rounded-xl border-4 border-blue-700 bg-white flex items-center justify-center">
            <span className="text-blue-800 font-bold text-3xl">MG</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-900">Michelle Garcia</h1>
            <p className="text-xl text-blue-700 font-semibold mt-1">School Administrator</p>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>📧 m.garcia@schooldistrict.edu</p>
              <p>📱 (555) 567-8901</p>
              <p>🎓 Ed.D. in Educational Leadership</p>
              <p>📍 Austin, TX</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-700">
            <h2 className="text-lg font-bold text-blue-800 mb-2">LEADERSHIP VISION</h2>
            <p className="text-sm text-gray-700">
              Transformational leader committed to educational excellence and student success...
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold text-blue-800 mb-3">ADMINISTRATIVE EXPERTISE</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Strategic Planning', 'Budget Management', 'Staff Development', 'Curriculum Design'].map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-700 rounded-full" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold text-blue-800 mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Assistant Superintendent</h3>
                  <p className="text-gray-600">Austin Independent School District</p>
                </div>
                <span className="text-gray-600">2019-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    counselor: (
      <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-teal-900">Christopher Lee, M.A.</h1>
            <p className="text-xl text-teal-700 mt-1">School Counselor</p>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>💚 c.lee@highschool.edu</p>
              <p>📱 (555) 678-9012</p>
              <p>🎓 M.A. in School Counseling</p>
              <p>📜 Licensed Professional Counselor</p>
            </div>
          </div>
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">CL</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl border-l-4 border-teal-500">
            <h2 className="text-lg font-bold text-teal-800 mb-2">COUNSELING APPROACH</h2>
            <p className="text-sm text-gray-800 italic">
              "Supporting students' academic, social, and emotional growth through comprehensive guidance..."
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl">
            <h2 className="text-lg font-bold text-teal-800 mb-3">COUNSELING SERVICES</h2>
            <div className="flex flex-wrap gap-2">
              {['Career Guidance', 'College Planning', 'Crisis Intervention', 'Student Support'].map(service => (
                <span key={service} className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl">
            <h2 className="text-lg font-bold text-teal-800 mb-3">EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">High School Counselor</h3>
                  <p className="text-gray-600">Central High School</p>
                </div>
                <span className="text-gray-600">2017-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    special: (
      <div className="bg-white p-8 border-l-8 border-pink-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jennifer Martinez, M.Ed.</h1>
            <p className="text-lg text-pink-700 font-semibold mt-1">Special Education Teacher</p>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📧 j.martinez@speced.edu</p>
              <p>📱 (555) 789-0123</p>
              <p>🎓 M.Ed. in Special Education</p>
              <p>📜 Special Ed License K-12</p>
            </div>
          </div>
          <div className="w-28 h-28 rounded-lg border-4 border-pink-600 bg-pink-50 flex items-center justify-center">
            <span className="text-pink-700 font-bold text-2xl">JM</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-pink-700 mb-3 pb-2 border-b-2 border-pink-200">
              SPECIALIZED EXPERTISE
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['IEP Development', 'Behavior Management', 'Adaptive Technology', 'Inclusion Strategies'].map(skill => (
                <div key={skill} className="bg-pink-50 p-2 rounded border-l-4 border-pink-600">
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-pink-700 mb-3 pb-2 border-b-2 border-pink-200">
              TEACHING PHILOSOPHY
            </h2>
            <p className="text-sm text-gray-700 italic">
              "Every student can learn and thrive with the right support and individualized approach..."
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-pink-700 mb-3 pb-2 border-b-2 border-pink-200">
              EXPERIENCE
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">Special Education Teacher</h3>
                  <span className="text-gray-600">2016-Present</span>
                </div>
                <p className="text-gray-600">Roosevelt Elementary School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    coach: (
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-lg" style={{ fontFamily: 'Lora, serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">DW</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">David Wilson, M.Ed.</h1>
            <p className="text-xl text-orange-700 font-semibold mt-1">Academic Coach</p>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>📧 d.wilson@coaching.edu</p>
              <p>📱 (555) 890-1234</p>
              <p>🎓 M.Ed. in Educational Psychology</p>
              <p>📍 Seattle, WA</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-lg p-4 border-l-4 border-orange-500">
            <h2 className="text-lg font-bold text-orange-700 mb-2">COACHING APPROACH</h2>
            <p className="text-sm text-gray-800">
              Personalized academic coaching focused on developing study skills, time management, and academic confidence...
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-orange-700 mb-3">COACHING SPECIALTIES</h2>
            <div className="flex flex-wrap gap-2">
              {['Study Skills', 'Test Prep', 'College Planning', 'Executive Function', 'ADHD Support', 'Motivation'].map(skill => (
                <span key={skill} className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-orange-700 mb-3">COACHING EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Academic Coach & Tutor</h3>
                  <p className="text-gray-600">Private Practice</p>
                  <p className="text-xs text-gray-500 mt-1">50+ students coached • 95% improvement rate</p>
                </div>
                <span className="text-gray-600">2019-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};