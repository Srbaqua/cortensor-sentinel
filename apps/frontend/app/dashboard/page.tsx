"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AgreementGauge from "@/components/AgreementGauge";
import TaskTimeline from "@/components/TaskTimeline";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface ValidationData {
    sessionId: number;
    taskCount: number;
    
    pouw: {
        pouwScore: number;
        consensusRatio: number;
        outliers: number;
        method: string;
    };
    
    attestation: {
        evidenceHash: string;
        hashAlg: string;
        attestedBy: string;
        attestedAt: string;
        anchor: string;
    };
    
    evidence: {
        outputs: {
            task_id: number;
            miner: string;
            text: string;
        }[];
        validatedBy: string;
        validatedAt: string;
    };
}


export default function DashboardPage() {
    
    const [prompt, setPrompt] = useState("");
    const [mode, setMode] = useState("consistent");
    const [data, setData] = useState<ValidationData | null>(null);
    const [loading, setLoading] = useState(false);
    
    async function fetchValidation() {
        const res = await fetch("http://localhost:3001/validate/0");
        const json = await res.json();
        setData(json);
    }

    async function runAgent() {
        setLoading(true);
        await fetch("http://localhost:3001/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, mode }),
});

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
            <div className="flex flex-col md:flex-col md:items-center md:justify-between gap-10 text-center">
                <div>
                    <h1 className="text-3xl font-bold">Decentralized Agentic Monitoring & Validation</h1>
                    <p className="text-muted-foreground mt-2 text-center">
                        Live observability for agent execution with PoI / PoUW signals
                    </p>
                </div>
                <div className="space-y-3">
                        <Input
                            placeholder="Enter task prompt..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <Select value={mode} onValueChange={setMode}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select input mode" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="consistent">Consistent Input</SelectItem>
                            <SelectItem value="variant">Slightly Varied Input</SelectItem>
                            <SelectItem value="byzantine">Byzantine / Faulty Input</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={runAgent}>
                            ▶ Run Agent
                        </Button>
                </div>

                {/* <Button onClick={runAgent} disabled={loading}>
                    {loading ? "Running…" : "▶ Run Agent"}
                </Button> */}
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
                        <AgreementGauge value={data.pouw.pouwScore} />
                        <Badge className="mt-2">PoI Validated</Badge>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Consensus Ratio</p>
                    <h2 className="text-2xl font-bold">
                        {(data.pouw.pouwScore * 100).toFixed(0)}%
                    </h2>

                    <p className="text-xs text-muted-foreground">
                        Consensus: {(data.pouw.consensusRatio * 100).toFixed(0)}% •
                        Outliers: {data.pouw.outliers}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Validated By</p>
                    <h2 className="text-lg font-semibold">
                        {data.evidence.validatedBy}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Independent validator service
                    </p>
                    <Badge className="mt-2">
                        Validator Verified
                    </Badge>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Evidence Hash</p>
                    <p className="text-xs font-mono break-all">
                        {data.attestation.evidenceHash}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        SHA-256 • {data.attestation.anchor}
                    </p>
                    <Badge className="mt-2">
                        Attested
                    </Badge>
                </CardContent>
            </Card>




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
