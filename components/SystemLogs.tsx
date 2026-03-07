"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_MESSAGES = [
  "INITIALIZING_CORE_SYSTEMS...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "MONITORING_NETWORK_TRAFFIC...",
  "ANALYZING_THREAT_VECTORS...",
  "UPDATING_DETECTION_MODELS...",
  "VALIDATING_SECURITY_PROTOCOLS...",
  "SCANNING_SYSTEM_VULNERABILITIES...",
  "COLLECTING_THREAT_INTELLIGENCE...",
  "SYSTEM_STABILITY_99.2%...",
  "MONITORING_INCOMING_REQUESTS...",
  "EXECUTING_BACKGROUND_TASKS...",
  "OPTIMIZING_RENDER_PIPELINE...",
  "READY_FOR_USER_INPUT...",
];

export const SystemLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${randomMsg}`]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden lg:dark:block pointer-events-none">
      <div className="mono text-[8px] text-[var(--accent-blue)]/40 space-y-1">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5 }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
