import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseParallax({ 
  children, 
  factor = 0.03, 
  className = "" 
}: { 
  children: React.ReactNode; 
  factor?: number; 
  className?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;
      
      x.set(offsetX * factor);
      y.set(offsetY * factor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [factor, x, y]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ x, y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
