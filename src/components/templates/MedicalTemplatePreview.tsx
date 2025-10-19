interface MedicalTemplatePreviewProps {
  variant: 'clinical' | 'surgeon' | 'nurse' | 'specialist' | 'resident' | 'researcher';
}

export const MedicalTemplatePreview = ({ variant }: MedicalTemplatePreviewProps) => {
  const variants = {
    clinical: (
      <div className="bg-white p-8" style={{ fontFamily: 'Merriweather, serif' }}>
        <div className="border-l-8 border-teal-600 pl-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-teal-100 border-4 border-teal-600 flex items-center justify-center">
              <span className="text-teal-700 font-bold text-2xl">DM</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dr. Maria Rodriguez</h1>
              <p className="text-lg text-teal-700 font-semibold mt-1">Internal Medicine Physician</p>
              <p className="text-sm text-gray-600 mt-2">MD, Board Certified</p>
            </div>
          </div>
          <div className="flex gap-3 text-sm text-gray-600 mt-4">
            <span>dr.rodriguez@hospital.com</span>
            <span>•</span>
            <span>(555) 123-4567</span>
            <span>•</span>
            <span>Boston, MA</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-3">CLINICAL EXPERTISE</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                <span>Primary Care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                <span>Chronic Disease Management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                <span>Preventive Medicine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full" />
                <span>Geriatric Care</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-3">EXPERIENCE</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Attending Physician</h3>
                <p className="text-sm text-gray-600">Massachusetts General Hospital • 2018-Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    surgeon: (
      <div className="bg-white p-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="bg-blue-900 text-white p-6 -m-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-lg bg-white flex items-center justify-center">
              <span className="text-blue-900 font-bold text-3xl">JC</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dr. James Chen, MD FACS</h1>
              <p className="text-blue-100 text-lg mt-1">Cardiothoracic Surgeon</p>
              <div className="flex gap-3 text-sm mt-3 text-blue-100">
                <span>j.chen@surgery.com</span>
                <span>•</span>
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-4 border-blue-900">SURGICAL SPECIALTIES</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-900">Cardiac Surgery</p>
                <p className="text-gray-600 text-xs mt-1">500+ procedures</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold text-blue-900">Minimally Invasive</p>
                <p className="text-gray-600 text-xs mt-1">200+ procedures</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 pb-2 border-b-4 border-blue-900">APPOINTMENTS</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Chief of Cardiothoracic Surgery</h3>
                  <p className="text-sm text-gray-600">Cedars-Sinai Medical Center</p>
                </div>
                <span className="text-sm text-gray-600">2020-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    nurse: (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">SJ</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson, RN BSN</h1>
              <p className="text-lg font-semibold text-purple-700 mt-1">Registered Nurse</p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">ICU Certified</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">ACLS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">❤️</span> CLINICAL SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-pink-500">✓</span>
                <span>Critical Care</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">✓</span>
                <span>Patient Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">✓</span>
                <span>Emergency Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500">✓</span>
                <span>Medication Admin</span>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-5">
            <h2 className="text-lg font-bold text-purple-700 mb-3">EXPERIENCE</h2>
            <div className="border-l-4 border-pink-300 pl-4">
              <h3 className="font-semibold text-gray-900">ICU Staff Nurse</h3>
              <p className="text-sm text-gray-600">Johns Hopkins Hospital • 2019-Present</p>
            </div>
          </div>
        </div>
      </div>
    ),
    specialist: (
      <div className="bg-white p-8" style={{ fontFamily: 'Lora, serif' }}>
        <div className="text-center mb-6 pb-6 border-b-4 border-emerald-600">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">AP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dr. ANITA PATEL</h1>
          <p className="text-xl text-emerald-700 mt-2">Pediatric Cardiologist</p>
          <p className="text-sm text-gray-600 mt-1">MD, MPH, Board Certified</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>a.patel@cardiology.com</span>
            <span>•</span>
            <span>(555) 987-6543</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-emerald-700 uppercase tracking-wide mb-3 text-center">Specialization</h2>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Fellowship-trained pediatric cardiologist specializing in congenital heart disease and interventional procedures...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-700 uppercase tracking-wide mb-3 text-center">Professional Experience</h2>
            <div className="space-y-3">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">Director, Pediatric Cardiology</h3>
                    <p className="text-sm text-gray-600">Children's Hospital of Philadelphia</p>
                  </div>
                  <span className="text-sm text-gray-600">2017-Present</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    resident: (
      <div className="bg-white p-8 border-t-8 border-indigo-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-28 h-28 rounded-xl border-4 border-indigo-600 bg-indigo-50 flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-2xl">ML</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Michael Lee, MD</h1>
            <p className="text-xl text-indigo-600 font-semibold mt-1">Psychiatry Resident (PGY-3)</p>
            <div className="flex gap-2 text-sm text-gray-600 mt-2">
              <span>m.lee@residency.edu</span>
              <span>•</span>
              <span>New York, NY</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-indigo-600 mb-3 pb-2 border-b-2 border-indigo-200">EDUCATION & TRAINING</h2>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-1 bg-indigo-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Psychiatry Residency</h3>
                  <p className="text-sm text-gray-600">Columbia University Medical Center • 2022-Present</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-indigo-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Doctor of Medicine</h3>
                  <p className="text-sm text-gray-600">Harvard Medical School • 2022</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-600 mb-3 pb-2 border-b-2 border-indigo-200">CLINICAL INTERESTS</h2>
            <div className="flex flex-wrap gap-2">
              {['Mood Disorders', 'Psychotherapy', 'Addiction Medicine', 'Research'].map(interest => (
                <span key={interest} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    researcher: (
      <div className="bg-white p-8" style={{ fontFamily: 'Crimson Text, serif' }}>
        <div className="border-b-2 border-gray-900 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dr. Rachel Kim, PhD</h1>
              <p className="text-xl text-gray-700 mt-2">Medical Research Scientist</p>
              <p className="text-sm text-gray-600 mt-1">PhD in Molecular Biology • Post-doctoral Fellow</p>
            </div>
            <div className="w-24 h-24 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">RK</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mt-4">
            <span>r.kim@research.edu</span>
            <span>•</span>
            <span>(555) 234-5678</span>
            <span>•</span>
            <span>San Francisco, CA</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">RESEARCH FOCUS</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Cancer immunotherapy and tumor microenvironment. Published 15+ peer-reviewed articles in Nature, Cell, and Science...
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">RESEARCH POSITIONS</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">Post-doctoral Research Fellow</h3>
                  <span className="text-sm text-gray-600">2021-Present</span>
                </div>
                <p className="text-sm text-gray-700">Stanford University School of Medicine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};