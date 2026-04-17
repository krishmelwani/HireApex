export function HiringProcessSVG({ className = "" }: { className?: string }) {
  const steps = [
    { label: "Brief", sub: "Role & requirements", icon: "📋", x: 40 },
    { label: "Screen", sub: "CV & skill filters", icon: "🔍", x: 160 },
    { label: "Assess", sub: "Interviews & tests", icon: "✅", x: 280 },
    { label: "Present", sub: "Shortlisted profiles", icon: "📊", x: 400 },
    { label: "Place", sub: "Offer & onboarding", icon: "🤝", x: 520 },
  ];

  return (
    <svg
      viewBox="0 0 620 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Five-step hiring process pipeline"
    >
      {/* Connector lines between boxes */}
      {[120, 240, 360, 480].map((x) => (
        <g key={x}>
          <line x1={x} y1="55" x2={x + 40} y2="55" stroke="#CBD5E1" strokeWidth="2" />
          <polygon points={`${x + 36},50 ${x + 44},55 ${x + 36},60`} fill="#CBD5E1" />
        </g>
      ))}

      {/* Step boxes */}
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y="20"
            width="80"
            height="70"
            rx="6"
            fill={i === 4 ? "#1B3A6B" : "white"}
            stroke={i === 4 ? "#1B3A6B" : "#E2E8F0"}
            strokeWidth="1.5"
          />
          <text x={s.x + 40} y="50" textAnchor="middle" fontSize="18" fontFamily="sans-serif">{s.icon}</text>
          <text
            x={s.x + 40}
            y="67"
            textAnchor="middle"
            fill={i === 4 ? "white" : "#1B3A6B"}
            fontSize="9"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {s.label}
          </text>
          <text
            x={s.x + 40}
            y="80"
            textAnchor="middle"
            fill={i === 4 ? "#CBD5E1" : "#94A3B8"}
            fontSize="7.5"
            fontFamily="Inter, sans-serif"
          >
            {s.sub}
          </text>
        </g>
      ))}

      {/* Step numbers below */}
      {steps.map((s, i) => (
        <text
          key={`n-${i}`}
          x={s.x + 40}
          y="120"
          textAnchor="middle"
          fill="#C5A028"
          fontSize="10"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          {`0${i + 1}`}
        </text>
      ))}

      {/* Timeline baseline */}
      <line x1="40" y1="108" x2="600" y2="108" stroke="#F1F5F9" strokeWidth="2" />
      <text x="310" y="155" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Inter, sans-serif">
        Average placement cycle: 12–18 business days
      </text>
    </svg>
  );
}
