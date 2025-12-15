"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AgreementGauge from "@/components/AgreementGauge";
import TaskTimeline from "@/components/TaskTimeline";

interface ValidationData {
  sessionId: number;
  taskCount: number;
  agreement: {
    agreementScore: number;
    method: string;
  };
  evidence: {
    outputs: any[];
    timestamp: string;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<ValidationData | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchValidation() {
    const res = await fetch("http://localhost:3001/validate/0");
    const json = await res.json();
    setData(json);
  }

  async function runAgent() {
    setLoading(true);
    await fetch("http://localhost:3001/run", { method: "POST" });
    await fetchValidation();
    setLoading(false);
  }

  useEffect(() => {
    fetchValidation();
  }, []);

  if (!data) {
    return <div className="p-8">Loading dashboard…</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Decentralized Agentic Monitoring & Validation</h1>
          <p className="text-muted-foreground mt-1">
            Live observability for agent execution with PoI / PoUW signals
          </p>
        </div>

        <Button onClick={runAgent} disabled={loading}>
          {loading ? "Running…" : "▶ Run Agent"}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Session</p>
            <h2 className="text-2xl font-bold">#{data.sessionId}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Tasks Executed</p>
            <h2 className="text-2xl font-bold">{data.taskCount}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <AgreementGauge value={data.agreement.agreementScore} />
            <Badge className="mt-2">PoI Validated</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Agent Execution Timeline</h3>
          <TaskTimeline tasks={data.evidence.outputs} />
        </CardContent>
      </Card>
    </div>
  );
}
