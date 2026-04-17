export function TalentNetworkSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Talent acquisition network diagram"
    >
      {/* Connection lines — drawn first so nodes sit on top */}
      {/* Center to top nodes */}
      <line x1="280" y1="210" x2="140" y2="100" stroke="#C5A028" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      <line x1="280" y1="210" x2="280" y2="90" stroke="#C5A028" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      <line x1="280" y1="210" x2="420" y2="100" stroke="#C5A028" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      {/* Center to bottom nodes */}
      <line x1="280" y1="210" x2="100" y2="300" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      <line x1="280" y1="210" x2="210" y2="330" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      <line x1="280" y1="210" x2="350" y2="330" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      <line x1="280" y1="210" x2="460" y2="300" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      {/* Side nodes */}
      <line x1="280" y1="210" x2="60" y2="200" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
      <line x1="280" y1="210" x2="500" y2="200" stroke="#1B3A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />

      {/* Central hub — HireApex */}
      <rect x="220" y="175" width="120" height="70" rx="8" fill="#1B3A6B" />
      <text x="280" y="204" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">HIREAPEX</text>
      <text x="280" y="222" textAnchor="middle" fill="#C5A028" fontSize="9" fontFamily="Inter, sans-serif">NETWORK HUB</text>

      {/* Top candidate nodes */}
      <rect x="90" y="68" width="100" height="52" rx="6" fill="white" stroke="#1B3A6B" strokeWidth="1.5" />
      <text x="140" y="90" textAnchor="middle" fill="#1B3A6B" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">TECHNOLOGY</text>
      <text x="140" y="107" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Candidates</text>

      <rect x="230" y="55" width="100" height="52" rx="6" fill="white" stroke="#1B3A6B" strokeWidth="1.5" />
      <text x="280" y="77" textAnchor="middle" fill="#1B3A6B" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">FINANCE</text>
      <text x="280" y="94" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Candidates</text>

      <rect x="370" y="68" width="100" height="52" rx="6" fill="white" stroke="#1B3A6B" strokeWidth="1.5" />
      <text x="420" y="90" textAnchor="middle" fill="#1B3A6B" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">HEALTHCARE</text>
      <text x="420" y="107" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Candidates</text>

      {/* Left / right nodes */}
      <rect x="10" y="174" width="90" height="52" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <text x="55" y="196" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">LOGISTICS</text>
      <text x="55" y="212" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Talent Pool</text>

      <rect x="460" y="174" width="90" height="52" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <text x="505" y="196" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">RETAIL</text>
      <text x="505" y="212" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Talent Pool</text>

      {/* Bottom — client companies */}
      <rect x="40" y="275" width="110" height="52" rx="6" fill="#C5A028" fillOpacity="0.1" stroke="#C5A028" strokeWidth="1.5" />
      <text x="95" y="297" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">CLIENT CO.</text>
      <text x="95" y="313" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Placed</text>

      <rect x="160" y="308" width="100" height="52" rx="6" fill="#C5A028" fillOpacity="0.1" stroke="#C5A028" strokeWidth="1.5" />
      <text x="210" y="330" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">CLIENT CO.</text>
      <text x="210" y="346" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Placed</text>

      <rect x="300" y="308" width="100" height="52" rx="6" fill="#C5A028" fillOpacity="0.1" stroke="#C5A028" strokeWidth="1.5" />
      <text x="350" y="330" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">CLIENT CO.</text>
      <text x="350" y="346" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Placed</text>

      <rect x="410" y="275" width="110" height="52" rx="6" fill="#C5A028" fillOpacity="0.1" stroke="#C5A028" strokeWidth="1.5" />
      <text x="465" y="297" textAnchor="middle" fill="#1B3A6B" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">CLIENT CO.</text>
      <text x="465" y="313" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Inter, sans-serif">Placed</text>

      {/* Flow indicator arrows on a few key lines */}
      <polygon points="274,176 278,168 282,176" fill="#C5A028" />
      <polygon points="136,122 140,114 144,122" fill="#C5A028" />
      <polygon points="416,122 420,114 424,122" fill="#C5A028" />
    </svg>
  );
}
