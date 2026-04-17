import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SkeletonLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[70vh]">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 bg-background flex flex-col pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto w-full space-y-8 text-center pt-10">
              {/* Header Bar simulation */}
              <div className="h-16 md:h-24 w-3/4 mx-auto bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-xl" />
              
              {/* Text lines */}
              <div className="h-6 md:h-8 w-full bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-lg" />
              <div className="h-6 md:h-8 w-5/6 mx-auto bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-lg" />
              
              {/* Buttons/Cards layout rough */}
              <div className="flex justify-center gap-4 pt-8">
                <div className="h-14 w-40 bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-full" />
                <div className="h-14 w-40 bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-full" />
              </div>

              {/* 3 Card Shapes below */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
                 <div className="h-32 bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-xl" />
                 <div className="h-32 bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-xl" />
                 <div className="h-32 bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] bg-[length:200%_100%] animate-[pulse_1.5s_ease-in-out_infinite] rounded-xl" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && children}
    </div>
  );
}
