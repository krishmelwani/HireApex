import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

function ParticleCanvas({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = 55;
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const pts = particles.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27,58,107,${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(197,160,40,${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.current.x;
        const mdy = p.y - mouse.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 90) {
          const pullAlpha = (1 - mdist / 90) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(27,58,107,${pullAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}

import type { Variants } from "framer-motion";
const floatVariants: Variants = {
  animate: (delay: number) => ({
    y: [0, -12, 0],
    transition: {
      duration: 4 + delay * 0.7,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  }),
};

function CandidateCard() {
  return (
    <motion.div
      custom={0}
      variants={floatVariants}
      animate="animate"
      initial={{ opacity: 0, x: 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[8%] right-[4%] w-[220px]"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 8px 32px rgba(27,58,107,0.12), 0 2px 8px rgba(27,58,107,0.06)",
        padding: "16px 18px",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: "linear-gradient(135deg,#1B3A6B,#2D4F8A)" }}
        >
          A
        </div>
        <div>
          <div className="text-[12px] font-bold text-primary leading-tight">Arjun Mehta</div>
          <div className="text-[10px] text-muted-foreground leading-tight">Sr. Product Manager</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {["B2B SaaS", "Agile", "8 yrs"].map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(27,58,107,0.08)", color: "#1B3A6B" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#1B3A6B] to-[#C5A028]" style={{ width: "92%" }} />
        </div>
        <span className="text-[10px] font-bold text-primary">92%</span>
      </div>
      <div className="text-[9px] text-muted-foreground mt-1">Role match score</div>
    </motion.div>
  );
}

function JobRoleCard() {
  return (
    <motion.div
      custom={1.2}
      variants={floatVariants}
      animate="animate"
      initial={{ opacity: 0, x: -30, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-[22%] left-[2%] w-[200px]"
      style={{
        background: "rgba(27,58,107,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(27,58,107,0.25)",
        padding: "16px 18px",
      }}
    >
      <div
        className="text-[9px] font-bold uppercase tracking-widest mb-2"
        style={{ color: "#C5A028" }}
      >
        Open Role
      </div>
      <div className="text-white text-[13px] font-bold leading-tight mb-1">
        Head of Finance
      </div>
      <div className="text-[10px] mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
        Fintech · Jaipur · Senior
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(197,160,40,0.18)", color: "#C5A028" }}>
          Shortlisting
        </span>
        <span className="text-white text-[9px] opacity-50">3 profiles ready</span>
      </div>
    </motion.div>
  );
}

function MatchBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 95;
    const timer = setInterval(() => {
      start += 2;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      custom={0.6}
      variants={floatVariants}
      animate="animate"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-[10%] right-[8%] w-[150px]"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 6px 24px rgba(197,160,40,0.15)",
        padding: "14px 16px",
        textAlign: "center",
      }}
    >
      <div
        className="text-[28px] font-extrabold leading-none"
        style={{ color: "#1B3A6B", fontVariantNumeric: "tabular-nums" }}
      >
        {count}%
      </div>
      <div className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: "#C5A028" }}>
        Success Rate
      </div>
      <div className="text-[8px] text-muted-foreground mt-0.5">
        Across all placements
      </div>
    </motion.div>
  );
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 560, h: 540 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      setSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / (rect.width / 2));
    mouseY.set((e.clientY - cy) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.94, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full rounded-3xl overflow-visible"
    >
      {/* Canvas area with soft gradient bg */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #EEF2FA 0%, #F7F8FA 60%, #EEF4FF 100%)",
          border: "1px solid rgba(27,58,107,0.08)",
          boxShadow: "0 20px 60px rgba(27,58,107,0.08)",
        }}
      >
        <ParticleCanvas width={size.w} height={size.h} />
      </div>

      {/* Floating glassmorphic cards — z-index above canvas */}
      <div className="absolute inset-0">
        <CandidateCard />
        <JobRoleCard />
        <MatchBadge />
      </div>

      {/* Subtle vignette at edges */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(247,248,250,0.7) 100%)",
        }}
      />
    </motion.div>
  );
}
