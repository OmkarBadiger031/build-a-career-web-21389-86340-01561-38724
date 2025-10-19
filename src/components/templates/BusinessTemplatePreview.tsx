interface BusinessTemplatePreviewProps {
  variant: 'executive' | 'corporate' | 'consulting' | 'finance' | 'startup' | 'manager';
}

export const BusinessTemplatePreview = ({ variant }: BusinessTemplatePreviewProps) => {
  const variants = {
    executive: (
      <div className="bg-white p-8">
        <div className="border-b-4 border-gray-900 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ROBERT WILLIAMS</h1>
              <p className="text-xl text-gray-700 mt-2">Chief Executive Officer</p>
            </div>
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">RW</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mt-4">
            <span>robert.w@executive.com</span>
            <span>•</span>
            <span>(555) 987-6543</span>
            <span>•</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXECUTIVE SUMMARY</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Strategic business leader with 20+ years of experience driving growth and operational excellence...
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">LEADERSHIP EXPERIENCE</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">CEO</h3>
                  <span className="text-sm text-gray-600">2018 - Present</span>
                </div>
                <p className="text-sm text-gray-700">Fortune 500 Company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    corporate: (
      <div className="bg-white p-8">
        <div className="bg-blue-900 text-white p-6 -m-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white font-bold text-3xl">JD</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Jennifer Davis</h1>
              <p className="text-blue-100 text-lg mt-1">Corporate Strategy Director</p>
              <div className="flex gap-3 text-sm mt-3">
                <span>j.davis@corp.com</span>
                <span>•</span>
                <span>Chicago, IL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">PROFESSIONAL PROFILE</h2>
            <p className="text-sm text-gray-700">Corporate strategist with proven track record in M&A and business transformation...</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">CORE COMPETENCIES</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-900 rounded-full" />
                <span>Strategic Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-900 rounded-full" />
                <span>Change Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    consulting: (
      <div className="bg-white p-8 border-l-8 border-green-600">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Michael Chen</h1>
            <p className="text-lg text-green-600 font-semibold mt-1">Management Consultant</p>
            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>📧 m.chen@consulting.com</p>
              <p>📱 (555) 234-5678</p>
              <p>📍 Boston, MA</p>
            </div>
          </div>
          <div className="w-24 h-24 rounded-lg border-4 border-green-600 bg-green-50 flex items-center justify-center">
            <span className="text-green-700 font-bold text-2xl">MC</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600" />
              EXPERTISE
            </h2>
            <p className="text-sm text-gray-700 pl-3">Process optimization specialist with Big 4 consulting experience...</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600" />
              CONSULTING ENGAGEMENTS
            </h2>
            <div className="pl-3 space-y-3">
              <div className="border-l-2 border-green-200 pl-4">
                <h3 className="font-semibold text-gray-900">Senior Consultant</h3>
                <p className="text-sm text-gray-600">McKinsey & Company • 2019-2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    finance: (
      <div className="bg-white p-8">
        <div className="text-center mb-6 pb-6 border-b-2 border-gray-800">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SA</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SARAH ANDERSON</h1>
          <p className="text-lg text-gray-700 mt-2">Financial Analyst | CFA</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>s.anderson@finance.com</span>
            <span>•</span>
            <span>New York, NY</span>
            <span>•</span>
            <span>(555) 876-5432</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">Professional Summary</h2>
            <p className="text-sm text-gray-700 text-center">
              CFA charterholder with expertise in equity research and portfolio management...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">Experience</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">Senior Financial Analyst</h3>
                    <p className="text-sm text-gray-600">Goldman Sachs</p>
                  </div>
                  <span className="text-sm text-gray-600">2020-Present</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    startup: (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">DL</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              David Lee
            </h1>
            <p className="text-lg text-gray-800 font-semibold mt-1">Startup Growth Specialist</p>
            <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-700">
              <span className="bg-white/60 px-3 py-1 rounded-full">d.lee@startup.io</span>
              <span className="bg-white/60 px-3 py-1 rounded-full">San Francisco</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-4">
            <h2 className="text-lg font-bold text-purple-700 mb-2">🚀 Impact</h2>
            <p className="text-sm text-gray-800">
              Serial entrepreneur with 3 successful exits. Expert in scaling startups from seed to Series B...
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4">
            <h2 className="text-lg font-bold text-purple-700 mb-3">💼 Ventures</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">Co-Founder & COO</h3>
                  <p className="text-sm text-gray-600">TechStartup Inc. (Acquired)</p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">2020-2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    manager: (
      <div className="bg-white p-8 border-t-8 border-orange-500">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-xl border-4 border-orange-500 overflow-hidden bg-orange-50 flex items-center justify-center">
            <span className="text-orange-600 font-bold text-3xl">EM</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Emily Martinez</h1>
            <p className="text-xl text-orange-600 font-semibold mt-1">Operations Manager</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
              <span>✉️ e.martinez@ops.com</span>
              <span>📱 (555) 345-6789</span>
              <span>💼 LinkedIn/emilymart</span>
              <span>📍 Austin, TX</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-orange-600 mb-3 pb-2 border-b-2 border-orange-200">
              MANAGEMENT PROFILE
            </h2>
            <p className="text-sm text-gray-700">
              Results-driven operations manager with expertise in process improvement and team leadership...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-orange-600 mb-3 pb-2 border-b-2 border-orange-200">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">Operations Manager</h3>
                    <span className="text-sm text-gray-600">2019-Present</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Tech Corporation</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Led team of 25+ employees</li>
                    <li>• Improved efficiency by 35%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};
