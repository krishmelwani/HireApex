import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

const DISMISSED_KEY = "hireapex_fraud_alert_dismissed";

export function FraudAlert() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-3xl px-4 pb-4">
            <div className="flex items-start gap-3 bg-[#1B0000] text-white px-5 py-4 rounded-2xl shadow-2xl border border-red-900/40">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed flex-1">
                <span className="font-bold text-red-300">Job Fraud Alert:</span> HireApex never charges candidates any fees. Verify emails are from{" "}
                <span className="font-semibold text-white">@hireapex.in</span>. Report fraud to{" "}
                <a href="mailto:compliance@hireapex.in" className="underline text-red-300 hover:text-red-200 transition-colors">
                  compliance@hireapex.in
                </a>
              </p>
              <button
                onClick={dismiss}
                aria-label="Dismiss fraud alert"
                data-testid="button-dismiss-fraud-alert"
                className="shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
