interface MarketingTemplatePreviewProps {
  variant: 'digital' | 'content' | 'brand' | 'social' | 'growth' | 'manager';
}

export const MarketingTemplatePreview = ({ variant }: MarketingTemplatePreviewProps) => {
  const variants = {
    digital: (
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8 rounded-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">LT</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lisa Thompson
              </h1>
              <p className="text-lg font-semibold text-gray-800 mt-1">Digital Marketing Specialist</p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Google Ads Certified</span>
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">Meta Blueprint</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🚀</span> EXPERTISE
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['PPC Campaigns', 'SEO/SEM', 'Analytics', 'Conversion Optimization'].map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold text-purple-700 mb-3">EXPERIENCE</h2>
            <div className="border-l-4 border-purple-300 pl-4">
              <h3 className="font-semibold text-gray-900">Digital Marketing Manager</h3>
              <p className="text-sm text-gray-600">TechCorp Inc. • 2020-Present</p>
              <p className="text-xs text-gray-500 mt-1">Increased ROI by 150%</p>
            </div>
          </div>
        </div>
      </div>
    ),
    content: (
      <div className="bg-white p-8 border-l-8 border-teal-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emma Wilson</h1>
            <p className="text-lg text-teal-600 font-semibold mt-1">Content Marketing Strategist</p>
            <div className="text-sm text-gray-600 mt-3 space-y-1">
              <p>📧 e.wilson@content.com</p>
              <p>📱 (555) 123-4567</p>
              <p>📍 Austin, TX</p>
              <p>🌐 emmawilson.com</p>
            </div>
          </div>
          <div className="w-24 h-24 rounded-lg border-4 border-teal-500 bg-teal-50 flex items-center justify-center">
            <span className="text-teal-600 font-bold text-2xl">EW</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-teal-600 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-teal-500" />
              CONTENT EXPERTISE
            </h2>
            <div className="pl-3 grid grid-cols-2 gap-2 text-sm">
              {['Content Strategy', 'SEO Writing', 'Blog Management', 'Editorial Calendar', 'Copywriting', 'Brand Storytelling'].map(skill => (
                <div key={skill} className="bg-teal-50 p-2 rounded">
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-teal-600 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-teal-500" />
              ACHIEVEMENTS
            </h2>
            <div className="pl-3 border-l-2 border-teal-200 space-y-2 text-sm">
              <p className="text-gray-700">• Grew organic traffic by 300% in 12 months</p>
              <p className="text-gray-700">• Published 200+ articles across multiple platforms</p>
              <p className="text-gray-700">• Led content team of 5 writers</p>
            </div>
          </div>
        </div>
      </div>
    ),
    brand: (
      <div className="bg-white p-8" style={{ fontFamily: 'Playfair Display, serif' }}>
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 -m-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center">
              <span className="text-indigo-900 font-bold text-3xl">MJ</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Marcus Johnson</h1>
              <p className="text-purple-100 text-lg mt-1">Brand Strategy Director</p>
              <div className="flex gap-3 text-sm mt-3 text-purple-100">
                <span>m.johnson@brand.agency</span>
                <span>•</span>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-indigo-900 mb-3 pb-2 border-b-4 border-indigo-900">BRAND LEADERSHIP</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Award-winning brand strategist with 10+ years creating compelling brand narratives for Fortune 500 companies...
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {['Brand Identity', 'Positioning', 'Voice & Tone', 'Market Research', 'Rebranding', 'Guidelines'].map(skill => (
                <div key={skill} className="bg-indigo-50 p-3 rounded text-center">
                  <p className="font-semibold text-indigo-900">{skill}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-900 mb-3 pb-2 border-b-4 border-indigo-900">EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Brand Strategy Director</h3>
                  <p className="text-sm text-gray-600">Ogilvy & Mather</p>
                </div>
                <span className="text-sm text-gray-600">2018-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    social: (
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-xl" style={{ fontFamily: 'Raleway, sans-serif' }}>
        <div className="flex items-center gap-6 mb-6 bg-white/80 backdrop-blur p-6 rounded-2xl">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">SK</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Sophia Kim</h1>
            <p className="text-lg font-semibold text-purple-700 mt-1">Social Media Manager</p>
            <div className="flex gap-2 mt-3 text-sm">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">📱 100K+ Followers</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">✨ Creator</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-purple-700 mb-3">🎯 PLATFORMS</h2>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook', 'YouTube'].map(platform => (
                <div key={platform} className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded-lg text-center font-medium">
                  {platform}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-purple-700 mb-3">💼 EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-purple-300 pl-4">
                <h3 className="font-semibold text-gray-900">Social Media Manager</h3>
                <p className="text-sm text-gray-600">Influencer Marketing Agency • 2021-Present</p>
                <p className="text-xs text-gray-500 mt-1">Managed campaigns reaching 50M+ impressions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    growth: (
      <div className="bg-white p-8 border-t-8 border-green-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-28 h-28 rounded-xl border-4 border-green-600 bg-green-50 flex items-center justify-center">
            <span className="text-green-600 font-bold text-2xl">DM</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">David Martinez</h1>
            <p className="text-xl text-green-600 font-semibold mt-1">Growth Marketing Lead</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
              <span>✉️ d.martinez@growth.io</span>
              <span>📱 (555) 987-6543</span>
              <span>💼 LinkedIn/davidmartinez</span>
              <span>📍 Seattle, WA</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-green-600 mb-3 pb-2 border-b-2 border-green-200">GROWTH METRICS</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <p className="font-semibold text-gray-900">User Acquisition</p>
                <p className="text-2xl font-bold text-green-600 mt-1">2M+</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <p className="font-semibold text-gray-900">Revenue Growth</p>
                <p className="text-2xl font-bold text-green-600 mt-1">300%</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-600 mb-3 pb-2 border-b-2 border-green-200">GROWTH EXPERIENCE</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">Head of Growth</h3>
                    <span className="text-sm text-gray-600">2020-Present</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">SaaS Startup (Series B)</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Scaled from 10K to 2M users in 3 years</li>
                    <li>• Built growth team from 0 to 15</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    manager: (
      <div className="bg-white p-8" style={{ fontFamily: 'Lora, serif' }}>
        <div className="text-center mb-6 pb-6 border-b-4 border-orange-600">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">AB</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AMANDA BROWN</h1>
          <p className="text-xl text-orange-700 mt-2">Marketing Director</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>a.brown@marketing.com</span>
            <span>•</span>
            <span>(555) 345-6789</span>
            <span>•</span>
            <span>Boston, MA</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-orange-700 uppercase tracking-wide mb-3 text-center">Leadership Profile</h2>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Strategic marketing leader with 12+ years driving brand growth and leading high-performing teams. Expert in integrated marketing campaigns...
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-700 uppercase tracking-wide mb-3 text-center">Core Competencies</h2>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {['Team Leadership', 'Budget Management', 'Campaign Strategy', 'Brand Development', 'Analytics', 'Stakeholder Relations'].map(skill => (
                <div key={skill} className="bg-orange-50 p-3 rounded text-center">
                  <p className="font-semibold text-orange-900">{skill}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-700 uppercase tracking-wide mb-3 text-center">Experience</h2>
            <div className="space-y-3">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">Director of Marketing</h3>
                    <p className="text-sm text-gray-600">Tech Enterprise Inc.</p>
                  </div>
                  <span className="text-sm text-gray-600">2018-Present</span>
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