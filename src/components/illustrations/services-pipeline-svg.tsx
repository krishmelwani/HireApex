export function ServicesPipelineSVG({ className = "" }: { className?: string }) {
  const services = [
    { label: "Permanent\nPlacement", color: "#1B3A6B" },
    { label: "Contract\nStaffing", color: "#243F72" },
    { label: "Executive\nSearch", color: "#2D4F8A" },
    { label: "Bulk\nHiring", color: "#C5A028" },
    { label: "HR\nConsulting", color: "#9B7A1C" },
  ];

  return (
    <svg
      viewBox="0 0 560 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HireApex services pipeline diagram"
    >
      {/* Top label */}
      <text x="280" y="28" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="2">
        SERVICES OFFERED
      </text>

      {/* Funnel shape */}
      <polygon points="60,55 500,55 420,180 140,180" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="280" y="128" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Inter, sans-serif">All Industries · All Seniority Levels</text>

      {/* Vertical service bars entering funnel */}
      {services.map((s, i) => {
        const xBase = 80 + i * 86;
        return (
          <g key={s.label}>
            <rect x={xBase} y="55" width="68" height="120" rx="0" fill={s.color} opacity="0.9" />
            <text
              x={xBase + 34}
              y={s.label.includes("\n") ? 105 : 118}
              textAnchor="middle"
              fill="white"
              fontSize="8.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {s.label.split("\n")[0]}
            </text>
            {s.label.includes("\n") && (
              <text
                x={xBase + 34}
                y={120}
                textAnchor="middle"
                fill="white"
                fontSize="8.5"
                fontFamily="Inter, sans-serif"
                opacity="0.85"
              >
                {s.label.split("\n")[1]}
              </text>
            )}
          </g>
        );
      })}

      {/* Funnel neck */}
      <rect x="220" y="180" width="120" height="30" fill="#1B3A6B" />
      <text x="280" y="201" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
        SCREENED · MATCHED
      </text>

      {/* Output box */}
      <rect x="180" y="225" width="200" height="70" rx="8" fill="#1B3A6B" />
      <text x="280" y="254" textAnchor="middle" fill="#C5A028" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">
        RIGHT HIRE
      </text>
      <text x="280" y="272" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter, sans-serif">
        Delivered on time, every time
      </text>

      {/* Arrow down from neck to output */}
      <polygon points="272,220 280,228 288,220" fill="white" />
    </svg>
  );
}
