export function ContactFlowSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Recruitment communication flow between client and HireApex"
    >
      {/* Client box — left */}
      <rect x="20" y="100" width="140" height="100" rx="10" fill="white" stroke="#1B3A6B" strokeWidth="2" />
      <rect x="20" y="100" width="140" height="32" rx="10" fill="#1B3A6B" />
      <rect x="20" y="120" width="140" height="12" rx="0" fill="#1B3A6B" />
      <text x="90" y="122" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">CLIENT</text>
      <text x="90" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Hiring Manager</text>
      <text x="90" y="170" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Describes the role</text>
      <text x="90" y="185" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Provides team context</text>

      {/* HireApex box — center */}
      <rect x="170" y="70" width="140" height="160" rx="10" fill="#1B3A6B" />
      <text x="240" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">HIREAPEX</text>
      <rect x="195" y="120" width="90" height="1" fill="#C5A028" opacity="0.5" />
      <text x="240" y="140" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Sourcing</text>
      <text x="240" y="155" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Screening</text>
      <text x="240" y="170" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Assessment</text>
      <text x="240" y="185" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Inter, sans-serif">Shortlisting</text>
      <text x="240" y="200" textAnchor="middle" fill="#C5A028" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">Placement</text>

      {/* Candidate box — right */}
      <rect x="320" y="100" width="140" height="100" rx="10" fill="white" stroke="#C5A028" strokeWidth="2" />
      <rect x="320" y="100" width="140" height="32" rx="10" fill="#C5A028" />
      <rect x="320" y="120" width="140" height="12" rx="0" fill="#C5A028" />
      <text x="390" y="122" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">CANDIDATE</text>
      <text x="390" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Qualified Applicant</text>
      <text x="390" y="170" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Profile matched</text>
      <text x="390" y="185" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter, sans-serif">Role aligned</text>

      {/* Arrows: Client → HireApex */}
      <line x1="160" y1="140" x2="170" y2="140" stroke="#1B3A6B" strokeWidth="2" />
      <polygon points="166,136 174,140 166,144" fill="#1B3A6B" />
      {/* Arrow: HireApex → Candidate */}
      <line x1="310" y1="150" x2="320" y2="150" stroke="#C5A028" strokeWidth="2" />
      <polygon points="316,146 324,150 316,154" fill="#C5A028" />

      {/* Label arrows */}
      <text x="163" y="133" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="Inter, sans-serif">brief</text>
      <text x="317" y="143" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="Inter, sans-serif">profile</text>

      {/* Bottom note */}
      <text x="240" y="265" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Inter, sans-serif">
        Every engagement is handled with discretion and speed.
      </text>
    </svg>
  );
}
