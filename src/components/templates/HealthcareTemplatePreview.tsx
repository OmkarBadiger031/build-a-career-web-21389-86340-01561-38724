interface HealthcareTemplatePreviewProps {
  variant: 'doctor' | 'nurse' | 'pharmacist' | 'dentist' | 'therapist' | 'medical-admin';
}

export const HealthcareTemplatePreview = ({ variant }: HealthcareTemplatePreviewProps) => {
  const variants = {
    doctor: (
      <div className="bg-white p-8 border-l-8 border-blue-600">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dr. Rachel Stevens, MD</h1>
            <p className="text-lg text-blue-600 font-semibold mt-1">Board Certified Internal Medicine</p>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📧 dr.stevens@healthcenter.com</p>
              <p>📱 (555) 234-5678</p>
              <p>📍 Seattle Medical Center</p>
              <p>🏥 License: MD-12345-WA</p>
            </div>
          </div>
          <div className="w-28 h-28 rounded-lg border-4 border-blue-600 bg-blue-50 flex items-center justify-center">
            <span className="text-blue-700 font-bold text-2xl">RS</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-200">
              MEDICAL PROFILE
            </h2>
            <p className="text-sm text-gray-700">
              Board-certified physician with 15+ years of experience in internal medicine and patient care...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-200">
              SPECIALIZATIONS
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Cardiology', 'Diabetes Management', 'Preventive Care', 'Geriatrics'].map(spec => (
                <div key={spec} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-3 pb-2 border-b-2 border-blue-200">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">Attending Physician</h3>
                  <span className="text-sm text-gray-600">2015-Present</span>
                </div>
                <p className="text-sm text-gray-600">Seattle Medical Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    nurse: (
      <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-lg">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">MJ</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Maria Johnson, RN, BSN</h1>
            <p className="text-xl text-teal-700 font-semibold mt-1">Registered Nurse</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">ICU Certified</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">BLS/ACLS</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">CCRN</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur rounded-lg p-4 border-l-4 border-teal-500">
            <h2 className="text-lg font-bold text-teal-700 mb-2">NURSING PHILOSOPHY</h2>
            <p className="text-sm text-gray-800">
              Compassionate patient-centered care with focus on critical care excellence...
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-teal-700 mb-3">CLINICAL EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">ICU Nurse</h3>
                  <p className="text-gray-600">Memorial Hospital</p>
                </div>
                <span className="text-gray-600">2018-Present</span>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-lg p-4">
            <h2 className="text-lg font-bold text-teal-700 mb-2">CORE COMPETENCIES</h2>
            <div className="flex flex-wrap gap-2">
              {['Critical Care', 'Patient Assessment', 'Emergency Response', 'IV Therapy'].map(skill => (
                <span key={skill} className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    pharmacist: (
      <div className="bg-white p-8 border-t-6 border-green-600">
        <div className="text-center mb-6 pb-6 border-b-2 border-gray-300">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">DP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">DAVID PATEL, PharmD</h1>
          <p className="text-lg text-green-700 font-semibold mt-2">Clinical Pharmacist</p>
          <div className="flex justify-center gap-3 text-sm text-gray-600 mt-3">
            <span>d.patel@pharmacy.com</span>
            <span>•</span>
            <span>License: RPh-67890</span>
            <span>•</span>
            <span>Boston, MA</span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-green-700 uppercase tracking-wide mb-3 text-center">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 text-center">
              Licensed pharmacist with expertise in clinical pharmacy and medication therapy management...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-700 uppercase tracking-wide mb-3 pb-2 border-b-2 border-green-200">
              Clinical Experience
            </h2>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">Clinical Pharmacist</h3>
                    <p className="text-sm text-gray-600">Boston General Hospital</p>
                  </div>
                  <span className="text-sm text-gray-600">2019-Present</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-green-700 uppercase tracking-wide mb-3 pb-2 border-b-2 border-green-200">
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-green-100 p-2 rounded text-center">
                <p className="font-semibold text-green-800">Board Certified</p>
              </div>
              <div className="bg-green-100 p-2 rounded text-center">
                <p className="font-semibold text-green-800">MTM Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    dentist: (
      <div className="bg-cyan-50 p-8 border-4 border-cyan-600 rounded-lg">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-32 h-32 rounded-xl border-4 border-cyan-600 bg-white flex items-center justify-center">
            <span className="text-cyan-700 font-bold text-3xl">SC</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-cyan-900">Dr. Susan Chen, DDS</h1>
            <p className="text-xl text-cyan-700 font-semibold mt-1">General & Cosmetic Dentistry</p>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>🦷 dr.chen@smiledental.com</p>
              <p>📱 (555) 987-6543</p>
              <p>🏥 Smile Dental Practice</p>
              <p>📜 License: DDS-54321-CA</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-lg border-l-4 border-cyan-600">
            <h2 className="text-lg font-bold text-cyan-800 mb-2">PRACTICE FOCUS</h2>
            <p className="text-sm text-gray-700">
              Patient-focused dentist specializing in cosmetic dentistry and restorative procedures...
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold text-cyan-800 mb-3">SERVICES</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Cosmetic Dentistry', 'Implants', 'Root Canal', 'Orthodontics'].map(service => (
                <div key={service} className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-600 rounded-sm" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold text-cyan-800 mb-3">EDUCATION & TRAINING</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-gray-900">Doctor of Dental Surgery</p>
                <p className="text-gray-600">UCLA School of Dentistry • 2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    therapist: (
      <div className="bg-purple-50 p-8 rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-purple-900">Emma Wilson, LMFT</h1>
            <p className="text-xl text-purple-700 mt-1">Licensed Marriage & Family Therapist</p>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>💜 emma.wilson@therapy.com</p>
              <p>📱 (555) 456-7890</p>
              <p>📍 Private Practice, Portland, OR</p>
              <p>🎓 License: LMFT-98765</p>
            </div>
          </div>
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">EW</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl border-l-4 border-purple-500">
            <h2 className="text-lg font-bold text-purple-800 mb-2">THERAPEUTIC APPROACH</h2>
            <p className="text-sm text-gray-800 italic">
              "Creating a safe, empathetic space for healing and growth through evidence-based practices..."
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl">
            <h2 className="text-lg font-bold text-purple-800 mb-3">SPECIALIZATIONS</h2>
            <div className="flex flex-wrap gap-2">
              {['Anxiety & Depression', 'Couples Therapy', 'Trauma-Informed', 'CBT/DBT'].map(spec => (
                <span key={spec} className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur p-4 rounded-xl">
            <h2 className="text-lg font-bold text-purple-800 mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Private Practice Therapist</h3>
                  <p className="text-gray-600">Wilson Therapy Center</p>
                </div>
                <span className="text-gray-600">2017-Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    'medical-admin': (
      <div className="bg-white p-8 border-8 border-l-0 border-r-0 border-t-0 border-b-indigo-600">
        <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-gray-200">
          <div className="w-28 h-28 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">TB</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thomas Brown</h1>
            <p className="text-xl text-indigo-700 font-semibold mt-1">Healthcare Administrator</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
              <span>📧 t.brown@healthadmin.com</span>
              <span>📱 (555) 321-0987</span>
              <span>💼 FACHE Certified</span>
              <span>📍 Denver, CO</span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
              EXECUTIVE SUMMARY
            </h2>
            <p className="text-sm text-gray-700">
              Healthcare executive with 12+ years of experience in hospital administration and operations management...
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
              CORE COMPETENCIES
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Healthcare Operations', 'Budget Management', 'Quality Improvement', 'Compliance'].map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
              LEADERSHIP EXPERIENCE
            </h2>
            <div className="space-y-3">
              <div className="bg-indigo-50 p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Director of Operations</h3>
                    <p className="text-sm text-gray-600">Denver Medical Center</p>
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
