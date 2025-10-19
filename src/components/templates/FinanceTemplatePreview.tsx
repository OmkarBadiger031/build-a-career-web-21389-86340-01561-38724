interface FinanceTemplatePreviewProps {
  variant: 'analyst' | 'banker' | 'accountant' | 'advisor' | 'trader' | 'auditor';
}

export const FinanceTemplatePreview = ({ variant }: FinanceTemplatePreviewProps) => {
  const variants = {
    analyst: (
      <div className="bg-white p-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="text-center mb-6 pb-6 border-b-2 border-gray-800">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SA</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SARAH ANDERSON</h1>
          <p className="text-lg text-gray-700 mt-2">Financial Analyst | CFA Level III Candidate</p>
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
              Equity research analyst specializing in technology sector with expertise in financial modeling and valuation...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">Core Competencies</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="font-semibold">Financial Modeling</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="font-semibold">DCF Valuation</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="font-semibold">Equity Research</p>
              </div>
              <div className="bg-gray-50 p-3 rounded text-center">
                <p className="font-semibold">Bloomberg Terminal</p>
              </div>
            </div>
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
    banker: (
      <div className="bg-white p-8 border-l-8 border-blue-900" style={{ fontFamily: 'Merriweather, serif' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Michael Chen</h1>
            <p className="text-lg text-blue-900 font-semibold mt-1">Investment Banking Associate</p>
            <p className="text-sm text-gray-600 mt-1">MBA, Wharton School of Business</p>
            <div className="text-sm text-gray-600 mt-3 space-y-1">
              <p>📧 m.chen@ibank.com</p>
              <p>📱 (555) 234-5678</p>
              <p>📍 New York, NY</p>
            </div>
          </div>
          <div className="w-24 h-24 rounded-lg border-4 border-blue-900 bg-blue-50 flex items-center justify-center">
            <span className="text-blue-900 font-bold text-2xl">MC</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-900" />
              DEAL EXPERIENCE
            </h2>
            <div className="pl-3 space-y-2 text-sm">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-900">
                <p className="font-semibold text-gray-900">M&A Advisory</p>
                <p className="text-gray-600 text-xs mt-1">$2.5B+ in closed transactions</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-900">
                <p className="font-semibold text-gray-900">Capital Raising</p>
                <p className="text-gray-600 text-xs mt-1">IPOs & Follow-on Offerings</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-900" />
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="pl-3 border-l-2 border-blue-200">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900">Associate, M&A Group</h3>
                <p className="text-sm text-gray-600">J.P. Morgan • 2021-Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    accountant: (
      <div className="bg-white p-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="bg-green-800 text-white p-6 -m-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-lg bg-white flex items-center justify-center">
              <span className="text-green-800 font-bold text-3xl">JD</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Jennifer Davis, CPA</h1>
              <p className="text-green-100 text-lg mt-1">Certified Public Accountant</p>
              <p className="text-sm text-green-200 mt-1">CPA License #12345 • State of California</p>
              <div className="flex gap-3 text-sm mt-3 text-green-100">
                <span>j.davis@accounting.com</span>
                <span>•</span>
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-4 border-green-800">PROFESSIONAL EXPERTISE</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-900">Tax Planning</p>
                <p className="text-gray-600 text-xs mt-1">Individual & Corporate</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-900">Financial Reporting</p>
                <p className="text-gray-600 text-xs mt-1">GAAP & IFRS</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-900">Audit & Assurance</p>
                <p className="text-gray-600 text-xs mt-1">SOX Compliance</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold text-green-900">QuickBooks Expert</p>
                <p className="text-gray-600 text-xs mt-1">Certified ProAdvisor</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-4 border-green-800">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Accountant</h3>
                  <p className="text-sm text-gray-600">Deloitte & Touche LLP</p>
                </div>
                <span className="text-sm text-gray-600">2019-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    advisor: (
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">RL</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Robert Lee, CFP</h1>
              <p className="text-lg font-semibold text-blue-700 mt-1">Financial Advisor</p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">CFP®</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Series 7 & 63</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">💼</span> ADVISORY SERVICES
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sky-600">✓</span>
                <span>Wealth Management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-600">✓</span>
                <span>Retirement Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-600">✓</span>
                <span>Estate Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-600">✓</span>
                <span>Investment Strategy</span>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-blue-700 mb-3">EXPERIENCE</h2>
            <div className="border-l-4 border-sky-300 pl-4">
              <h3 className="font-semibold text-gray-900">Senior Financial Advisor</h3>
              <p className="text-sm text-gray-600">Merrill Lynch • 2017-Present</p>
              <p className="text-xs text-gray-500 mt-1">Managing $150M+ in client assets</p>
            </div>
          </div>
        </div>
      </div>
    ),
    trader: (
      <div className="bg-white p-8 border-t-8 border-red-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-28 h-28 rounded-xl border-4 border-red-600 bg-red-50 flex items-center justify-center">
            <span className="text-red-600 font-bold text-2xl">AK</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Alex Kim</h1>
            <p className="text-xl text-red-600 font-semibold mt-1">Equity Trader</p>
            <p className="text-sm text-gray-600 mt-1">Series 55 & 57 Licensed</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
              <span>✉️ a.kim@trading.com</span>
              <span>📱 (555) 345-6789</span>
              <span>💼 LinkedIn/alexkim</span>
              <span>📍 Chicago, IL</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-3 pb-2 border-b-2 border-red-200">TRADING EXPERTISE</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-600">
                <p className="font-semibold text-gray-900">Equities Trading</p>
                <p className="text-gray-600 text-xs mt-1">$500M daily volume</p>
              </div>
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-600">
                <p className="font-semibold text-gray-900">Options Strategies</p>
                <p className="text-gray-600 text-xs mt-1">Advanced derivatives</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-3 pb-2 border-b-2 border-red-200">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">Senior Equity Trader</h3>
                    <span className="text-sm text-gray-600">2019-Present</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Citadel Securities</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Generated $5M+ in annual P&L</li>
                    <li>• Managed portfolio of 50+ positions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    auditor: (
      <div className="bg-white p-8" style={{ fontFamily: 'Lora, serif' }}>
        <div className="border-b-2 border-gray-900 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Patricia Brown, CPA CIA</h1>
              <p className="text-xl text-gray-700 mt-2">Senior Internal Auditor</p>
              <p className="text-sm text-gray-600 mt-1">CPA • Certified Internal Auditor</p>
            </div>
            <div className="w-24 h-24 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">PB</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mt-4">
            <span>p.brown@audit.com</span>
            <span>•</span>
            <span>(555) 234-5678</span>
            <span>•</span>
            <span>Atlanta, GA</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">AUDIT SPECIALIZATIONS</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>SOX Compliance Auditing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Risk Assessment</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Internal Controls</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Fraud Detection</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">Senior Internal Auditor</h3>
                  <span className="text-sm text-gray-600">2018-Present</span>
                </div>
                <p className="text-sm text-gray-700">PricewaterhouseCoopers LLP</p>
                <p className="text-xs text-gray-600 mt-1">Led 20+ audit engagements for Fortune 500 clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};