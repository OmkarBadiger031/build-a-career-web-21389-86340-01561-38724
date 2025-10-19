interface SummarySectionProps {
  summary: string;
  format: 'paragraph' | 'bullet-points' | 'highlight-box' | 'bordered' | 'sidebar' | 'compact' | 'key-strengths';
  colorClass: string;
}

export const SummarySection = ({ summary, format, colorClass }: SummarySectionProps) => {
  if (!summary) return null;

  if (format === 'paragraph') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    );
  }

  if (format === 'bullet-points') {
    const points = summary.split('.').filter(s => s.trim());
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Professional Summary
        </h2>
        <ul className="list-disc list-inside space-y-1">
          {points.map((point, idx) => (
            <li key={idx} className="text-gray-700">{point.trim()}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (format === 'highlight-box') {
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
          Professional Summary
        </h2>
        <div className={`bg-gray-50 p-3 rounded-lg border-l-4 ${colorClass} border-current`}>
          <p className="text-gray-700 leading-relaxed italic">{summary}</p>
        </div>
      </div>
    );
  }

  if (format === 'sidebar') {
    return (
      <div className={`${colorClass} bg-current/5 p-4 rounded-lg border-l-4 border-current`}>
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
      </div>
    );
  }

  if (format === 'compact') {
    return (
      <div>
        <h2 className={`text-base font-semibold mb-1 ${colorClass}`}>Summary</h2>
        <p className="text-xs text-gray-700 leading-snug">{summary}</p>
      </div>
    );
  }

  if (format === 'key-strengths') {
    const points = summary.split('.').filter(s => s.trim()).slice(0, 4);
    return (
      <div>
        <h2 className={`text-lg font-semibold mb-3 ${colorClass} border-b pb-1`}>Key Strengths</h2>
        <div className="grid grid-cols-2 gap-2">
          {points.map((point, idx) => (
            <div key={idx} className={`flex items-start gap-2 ${colorClass}`}>
              <div className="w-2 h-2 rounded-full bg-current mt-1.5" />
              <span className="text-sm text-gray-700">{point.trim()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // bordered format
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-2 ${colorClass} border-b pb-1`}>
        Professional Summary
      </h2>
      <div className="border-2 border-gray-300 p-3 rounded">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
};