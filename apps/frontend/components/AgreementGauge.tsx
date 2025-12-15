"use client";

import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

export default function AgreementGauge({ value }: { value: number }) {
  const data = [
    { name: "Agreed", value },
    { name: "Disagreed", value: 1 - value },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          <Cell fill="#22c55e" />
          <Cell fill="#334155" />
        </Pie>
      </PieChart>

      <p className="mt-2 text-xl font-bold">
        {(value * 100).toFixed(0)}%
      </p>
      <p className="text-sm text-muted-foreground">Agreement</p>
    </motion.div>
  );
}
