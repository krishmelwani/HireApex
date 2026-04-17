import { motion } from "framer-motion";

export function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large blurred organic blobs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute bg-primary rounded-[40%_60%_70%_30%] blur-[60px]"
          style={{
            width: Math.random() * 200 + 200,
            height: Math.random() * 200 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.04 + 0.02,
          }}
          animate={{
            y: [0, Math.random() * -30 - 15, 0],
            x: [0, Math.random() * 20 + 10, 0],
            scale: [1, Math.random() * 0.1 + 1.05, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
      
      {/* Small precise geometric shapes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-primary/20 rounded-full"
          style={{
            width: Math.random() * 30 + 15,
            height: Math.random() * 30 + 15,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, Math.random() * -40 - 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            ease: "linear" as const,
          }}
        />
      ))}
    </div>
  );
}
