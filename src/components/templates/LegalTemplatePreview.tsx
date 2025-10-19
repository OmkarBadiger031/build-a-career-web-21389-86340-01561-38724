interface LegalTemplatePreviewProps {
  variant: 'corporate' | 'litigation' | 'prosecutor' | 'paralegal' | 'associate' | 'partner';
}

export const LegalTemplatePreview = ({ variant }: LegalTemplatePreviewProps) => {
  const variants = {
    corporate: (
      <div className="bg-white p-8" style={{ fontFamily: 'Merriweather, serif' }}>
        <div className="border-b-4 border-gray-900 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ROBERT WILLIAMS, ESQ.</h1>
              <p className="text-xl text-gray-700 mt-2">Corporate Attorney</p>
              <p className="text-sm text-gray-600 mt-1">JD, Harvard Law School • Bar: NY, CA</p>
            </div>
            <div className="w-24 h-24 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">RW</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mt-4">
            <span>robert.williams@lawfirm.com</span>
            <span>•</span>
            <span>(555) 123-4567</span>
            <span>•</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">PRACTICE AREAS</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Mergers & Acquisitions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Securities Law</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Corporate Governance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Contract Negotiation</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">EXPERIENCE</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">Senior Partner</h3>
                  <span className="text-sm text-gray-600">2015-Present</span>
                </div>
                <p className="text-sm text-gray-700">Skadden, Arps, Slate, Meagher & Flom LLP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    litigation: (
      <div className="bg-white p-8 border-l-8 border-red-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jennifer Martinez, Esq.</h1>
            <p className="text-lg text-red-700 font-semibold mt-1">Trial Attorney</p>
            <p className="text-sm text-gray-600 mt-1">JD, Yale Law School • Bar: NY, NJ, CT</p>
            <div className="text-sm text-gray-600 mt-3 space-y-1">
              <p>📧 j.martinez@litigation.com</p>
              <p>📱 (555) 234-5678</p>
              <p>📍 New York, NY</p>
            </div>
          </div>
          <div className="w-24 h-24 rounded-lg border-4 border-red-700 bg-red-50 flex items-center justify-center">
            <span className="text-red-700 font-bold text-2xl">JM</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-700" />
              LITIGATION EXPERTISE
            </h2>
            <div className="pl-3 space-y-2 text-sm">
              <div className="bg-red-50 p-3 rounded">
                <p className="font-semibold text-gray-900">Commercial Litigation</p>
                <p className="text-gray-600 text-xs mt-1">50+ successful verdicts</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="font-semibold text-gray-900">Civil Rights</p>
                <p className="text-gray-600 text-xs mt-1">$10M+ recovered for clients</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-700" />
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="pl-3 border-l-2 border-red-200">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900">Managing Partner</h3>
                <p className="text-sm text-gray-600">Martinez & Associates • 2018-Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    prosecutor: (
      <div className="bg-white p-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="bg-blue-900 text-white p-6 -m-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-lg bg-white flex items-center justify-center">
              <span className="text-blue-900 font-bold text-3xl">DC</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">David Chen, Esq.</h1>
              <p className="text-blue-100 text-lg mt-1">Assistant District Attorney</p>
              <p className="text-sm text-blue-200 mt-1">JD, Columbia Law School</p>
              <div className="flex gap-3 text-sm mt-3 text-blue-100">
                <span>d.chen@da.gov</span>
                <span>•</span>
                <span>Chicago, IL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-4 border-blue-900">PROSECUTORIAL EXPERIENCE</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-900">Criminal Trials</p>
                <p className="text-gray-600 text-xs mt-1">85% conviction rate</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-900">Major Crimes</p>
                <p className="text-gray-600 text-xs mt-1">30+ felony cases</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-4 border-blue-900">CAREER HISTORY</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Assistant District Attorney</h3>
                  <p className="text-sm text-gray-600">Cook County State's Attorney Office</p>
                </div>
                <span className="text-sm text-gray-600">2019-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    paralegal: (
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">ST</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Sophia Taylor</h1>
              <p className="text-lg font-semibold text-amber-700 mt-1">Senior Paralegal</p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Certified Paralegal</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">10+ Years</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-amber-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚖️</span> EXPERTISE
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">✓</span>
                <span>Legal Research</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-600">✓</span>
                <span>Document Drafting</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-600">✓</span>
                <span>Case Management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-600">✓</span>
                <span>E-Discovery</span>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-amber-700 mb-3">EXPERIENCE</h2>
            <div className="border-l-4 border-amber-300 pl-4">
              <h3 className="font-semibold text-gray-900">Senior Paralegal</h3>
              <p className="text-sm text-gray-600">Cravath, Swaine & Moore LLP • 2018-Present</p>
            </div>
          </div>
        </div>
      </div>
    ),
    associate: (
      <div className="bg-white p-8 border-t-8 border-slate-700" style={{ fontFamily: 'Lora, serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-28 h-28 rounded-xl border-4 border-slate-700 bg-slate-50 flex items-center justify-center">
            <span className="text-slate-700 font-bold text-2xl">EW</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Emily White, Esq.</h1>
            <p className="text-xl text-slate-700 font-semibold mt-1">Associate Attorney</p>
            <p className="text-sm text-gray-600 mt-1">JD, Stanford Law School • Bar: CA</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
              <span>✉️ e.white@biglaw.com</span>
              <span>📱 (555) 345-6789</span>
              <span>💼 LinkedIn/emilywhite</span>
              <span>📍 San Francisco, CA</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-700 mb-3 pb-2 border-b-2 border-slate-200">PRACTICE FOCUS</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Intellectual property litigation with emphasis on patent disputes and technology licensing...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-700 mb-3 pb-2 border-b-2 border-slate-200">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-slate-700 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">Associate Attorney</h3>
                    <span className="text-sm text-gray-600">2021-Present</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Latham & Watkins LLP</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Led discovery in 5 patent cases</li>
                    <li>• Drafted briefs for Federal Circuit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    partner: (
      <div className="bg-white p-8" style={{ fontFamily: 'Playfair Display, serif' }}>
        <div className="text-center mb-6 pb-6 border-b-4 border-amber-800">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-amber-800 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">TB</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">THOMAS BRADFORD, ESQ.</h1>
          <p className="text-xl text-amber-800 mt-2">Managing Partner</p>
          <p className="text-sm text-gray-600 mt-1">JD, University of Chicago Law School • Bar: IL, NY, DC</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>t.bradford@partners.com</span>
            <span>•</span>
            <span>(555) 987-6543</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-amber-800 uppercase tracking-wide mb-3 text-center">Leadership Profile</h2>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              30+ years of legal excellence. Named Super Lawyer for 15 consecutive years. Led firm growth from 20 to 150 attorneys...
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-amber-800 uppercase tracking-wide mb-3 text-center">Career Highlights</h2>
            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">Managing Partner</h3>
                    <p className="text-sm text-gray-600">Bradford & Associates LLP</p>
                  </div>
                  <span className="text-sm text-gray-600">2005-Present</span>
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