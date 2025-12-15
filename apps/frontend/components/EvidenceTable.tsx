"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function EvidenceTable({ tasks }: { tasks: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task ID</TableHead>
          <TableHead>Miner</TableHead>
          <TableHead>Output</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((t, i) => (
          <TableRow key={i}>
            <TableCell>{t.task_id}</TableCell>
            <TableCell>{t.miner}</TableCell>
            <TableCell className="max-w-xl truncate">
              {t.text}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
