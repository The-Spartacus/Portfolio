"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_MESSAGES = [
  "INITIALIZING_CORE_SYSTEMS...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "BYPASSING_FIREWALL_LAYER_7...",
  "DECRYPTING_DATABASE_INDEX...",
  "ACCESS_GRANTED_LEVEL_ALPHA...",
  "SCANNING_NETWORK_NODES...",
  "UPLOADING_ENCRYPTED_PACKETS...",
  "SYSTEM_STABILITY_98.4%...",
  "MONITORING_INCOMING_REQUESTS...",
  "EXECUTING_BACKGROUND_TASKS...",
  "CLEANING_TEMPORARY_CACHE...",
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
    <div className="fixed bottom-4 left-4 z-10 hidden lg:dark:block pointer-events-none">
      <div className="mono text-[8px] text-[var(--accent-blue)]/30 space-y-1">
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
