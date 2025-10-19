interface CreativeTemplatePreviewProps {
  variant: 'designer' | 'artist' | 'writer' | 'photographer' | 'animator' | 'architect';
}

export const CreativeTemplatePreview = ({ variant }: CreativeTemplatePreviewProps) => {
  const variants = {
    designer: (
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-8 rounded-2xl">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl transform rotate-6">
            <span className="text-white font-bold text-3xl -rotate-6">AD</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Anna Designer
            </h1>
            <p className="text-xl text-gray-700 font-medium mt-2">UI/UX Designer & Art Director</p>
            <div className="flex gap-3 mt-3 text-sm">
              <span className="bg-white/80 px-3 py-1 rounded-full text-purple-700">✨ Portfolio: anna.design</span>
              <span className="bg-white/80 px-3 py-1 rounded-full text-purple-700">📧 hi@anna.design</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 border-l-4 border-pink-500">
            <h2 className="text-lg font-bold text-pink-700 mb-2">🎨 Creative Vision</h2>
            <p className="text-sm text-gray-800">
              Award-winning designer crafting beautiful, user-centered digital experiences...
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5">
            <h2 className="text-lg font-bold text-purple-700 mb-3">💼 Featured Work</h2>
            <div className="grid grid-cols-3 gap-2">
              {['Branding', 'Mobile App', 'Web Design'].map(skill => (
                <div key={skill} className="bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-lg p-2 text-center text-xs font-semibold">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    artist: (
      <div className="bg-black text-white p-8 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/20 to-red-500/20 blur-3xl rounded-full" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">MARCO ARTISTE</h1>
              <p className="text-xl text-yellow-400">Visual Artist & Illustrator</p>
              <div className="mt-4 space-y-1 text-sm text-gray-300">
                <p>🎨 marco@artiste.com</p>
                <p>🌐 marcoartiste.com</p>
                <p>📍 Brooklyn, NY</p>
              </div>
            </div>
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-black font-bold text-2xl">
              MA
            </div>
          </div>
          <div className="space-y-5">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h2 className="text-lg font-bold text-yellow-400 mb-2">ARTISTIC STATEMENT</h2>
              <p className="text-sm text-gray-300">
                Contemporary artist exploring the intersection of digital and traditional media...
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-yellow-400 mb-3">EXHIBITIONS</h2>
              <div className="space-y-2 text-sm">
                <div className="bg-white/5 p-3 rounded">
                  <p className="font-semibold">Solo Exhibition - "Digital Dreams"</p>
                  <p className="text-gray-400">MoMA, New York • 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    writer: (
      <div className="bg-amber-50 p-8 border-4 border-amber-800">
        <div className="border-b-4 border-amber-800 pb-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 bg-amber-800 rounded-full flex items-center justify-center">
              <span className="text-amber-50 font-bold text-3xl">SW</span>
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-amber-900">Sophia Writer</h1>
              <p className="text-xl text-amber-700 mt-1 italic">Content Writer & Editor</p>
              <div className="mt-3 text-sm text-amber-800 space-y-1">
                <p>✍️ sophia@writer.com</p>
                <p>📚 sophiawriter.medium.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white/50 p-4 rounded border-l-4 border-amber-600">
            <h2 className="text-lg font-serif font-bold text-amber-900 mb-2">Writing Philosophy</h2>
            <p className="text-sm text-amber-800 italic">
              "Words have power to transform, inspire, and connect. I craft stories that resonate..."
            </p>
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-amber-900 mb-3 pb-2 border-b-2 border-amber-300">
              Published Works
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-amber-900">Senior Content Writer</span>
                <span className="text-amber-700">2021-Present</span>
              </div>
              <p className="text-amber-800">The New York Times</p>
            </div>
          </div>
        </div>
      </div>
    ),
    photographer: (
      <div className="bg-gray-900 text-white p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-light tracking-wide text-white">JAMES LENS</h1>
              <p className="text-lg text-blue-400 mt-2">Professional Photographer</p>
              <div className="mt-4 flex gap-4 text-sm text-gray-300">
                <span>📸 james@lens.photo</span>
                <span>•</span>
                <span>Los Angeles, CA</span>
              </div>
            </div>
            <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white/20 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-3xl">JL</span>
            </div>
          </div>
          <div className="space-y-5">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-lg font-bold text-blue-400 mb-2">SPECIALIZATION</h2>
              <p className="text-sm text-gray-300">
                Commercial and editorial photographer specializing in lifestyle and fashion photography...
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-400 mb-3">CLIENTS & PROJECTS</h2>
              <div className="grid grid-cols-2 gap-3">
                {['Vogue', 'Nike', 'Apple', 'Netflix'].map(client => (
                  <div key={client} className="bg-white/5 backdrop-blur border border-white/10 rounded p-2 text-center text-sm font-semibold">
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    animator: (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl animate-pulse">
            <span className="text-white font-bold text-3xl">KA</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text">
              Kevin Animator
            </h1>
            <p className="text-lg text-gray-800 font-semibold mt-1">3D Animator & Motion Designer</p>
            <div className="flex gap-2 mt-3 text-xs">
              <span className="bg-cyan-500 text-white px-3 py-1 rounded-full">Cinema 4D</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full">After Effects</span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full">Blender</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border-l-4 border-cyan-500">
            <h2 className="text-lg font-bold text-cyan-700 mb-2">🎬 Animation Expertise</h2>
            <p className="text-sm text-gray-800">
              Award-winning animator creating stunning visual stories for brands and entertainment...
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4">
            <h2 className="text-lg font-bold text-blue-700 mb-3">🏆 Featured Projects</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Lead Animator</span>
                <span className="text-gray-600">Pixar Studios</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Motion Designer</span>
                <span className="text-gray-600">Netflix Originals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    architect: (
      <div className="bg-white p-8 border-8 border-gray-800">
        <div className="flex items-start gap-6 mb-6 pb-6 border-b-4 border-gray-300">
          <div className="w-28 h-28 bg-gray-800 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">LA</span>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">LISA ARCHITECT</h1>
            <p className="text-xl text-gray-700 mt-2">Licensed Architect | LEED AP</p>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
              <span>📧 l.architect@design.com</span>
              <span>📱 (555) 123-7890</span>
              <span>🏛️ AIA Member #12345</span>
              <span>📍 Chicago, IL</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b-2 border-gray-800">
              Design Philosophy
            </h2>
            <p className="text-sm text-gray-700">
              Sustainable architecture that harmonizes functionality with environmental responsibility...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b-2 border-gray-800">
              Notable Projects
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 border-l-4 border-gray-800">
                <h3 className="font-bold text-gray-900">Green Tower Complex</h3>
                <p className="text-sm text-gray-600 mt-1">LEED Platinum Certified • 2022</p>
              </div>
              <div className="bg-gray-50 p-3 border-l-4 border-gray-800">
                <h3 className="font-bold text-gray-900">Urban Cultural Center</h3>
                <p className="text-sm text-gray-600 mt-1">AIA Design Award Winner • 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};
