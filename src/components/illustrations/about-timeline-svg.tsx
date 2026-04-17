export function AboutTimelineSVG({ className = "" }: { className?: string }) {
  const events = [
    { year: "2024\nQ1", title: "Founded", desc: "HireApex established\nin Jaipur, Rajasthan" },
    { year: "2024\nQ2", title: "First 50\nPlacements", desc: "Crossed 50 successful\nplacements in 90 days" },
    { year: "2024\nQ3", title: "10+ Clients", desc: "Signed 10+ corporate\nclient partnerships" },
    { year: "2024\nQ4", title: "8 Industries", desc: "Expanded across\n8 industry verticals" },
    { year: "2025", title: "500+\nPlacements", desc: "Milestone: 500+\nroles successfully filled" },
  ];

  return (
    <svg
      viewBox="0 0 620 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HireApex company growth timeline"
    >
      {/* Baseline */}
      <line x1="40" y1="110" x2="580" y2="110" stroke="#E2E8F0" strokeWidth="2" />

      {events.map((e, i) => {
        const x = 60 + i * 130;
        const isAbove = i % 2 === 0;

        return (
          <g key={i}>
            {/* Vertical stem */}
            <line
              x1={x}
              y1={isAbove ? 80 : 110}
              x2={x}
              y2={isAbove ? 110 : 140}
              stroke="#C5A028"
              strokeWidth="1.5"
            />
            {/* Dot on timeline */}
            <rect x={x - 6} y={104} width="12" height="12" rx="3" fill="#1B3A6B" />

            {/* Year chip */}
            <rect
              x={x - 28}
              y={isAbove ? 55 : 145}
              width="56"
              height="26"
              rx="5"
              fill={i === 4 ? "#C5A028" : "#1B3A6B"}
            />
            <text
              x={x}
              y={isAbove ? 65 : 155}
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {e.year.split("\n")[0]}
            </text>
            {e.year.includes("\n") && (
              <text
                x={x}
                y={isAbove ? 77 : 167}
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontFamily="Inter, sans-serif"
                opacity="0.85"
              >
                {e.year.split("\n")[1]}
              </text>
            )}

            {/* Event label — opposite side from year chip */}
            <text
              x={x}
              y={isAbove ? 155 : 20}
              textAnchor="middle"
              fill="#1B3A6B"
              fontSize="8.5"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {e.title.split("\n")[0]}
            </text>
            {e.title.includes("\n") && (
              <text
                x={x}
                y={isAbove ? 167 : 32}
                textAnchor="middle"
                fill="#1B3A6B"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                {e.title.split("\n")[1]}
              </text>
            )}
            <text
              x={x}
              y={isAbove ? 181 : 46}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7.5"
              fontFamily="Inter, sans-serif"
            >
              {e.desc.split("\n")[0]}
            </text>
            {e.desc.includes("\n") && (
              <text
                x={x}
                y={isAbove ? 193 : 58}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="7.5"
                fontFamily="Inter, sans-serif"
              >
                {e.desc.split("\n")[1]}
              </text>
            )}
          </g>
        );
      })}

      {/* End arrow */}
      <polygon points="576,106 584,110 576,114" fill="#C5A028" />
    </svg>
  );
}
