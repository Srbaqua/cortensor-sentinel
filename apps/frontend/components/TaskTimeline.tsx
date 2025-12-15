"use client";

import { motion } from "framer-motion";

export default function TaskTimeline({ tasks }: { tasks: any[] }) {
  return (
    <div className="space-y-4">
      {tasks.map((t, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="border-l-2 border-slate-700 pl-4"
        >
          <p className="text-sm text-muted-foreground">
            Task #{t.task_id} — {t.miner}
          </p>
          <p className="text-sm">{t.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
