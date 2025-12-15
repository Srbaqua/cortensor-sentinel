import axios from "axios";
import { hashEvidence } from "./hash";
import { computePoUW } from "./pouw";


export interface ValidationResult {
  sessionId: number;
  taskCount: number;
  agreement?: {
    agreementScore: number;
    method: string;
  };
  pouw: any;
  evidence: {
    outputs: any[];
    validatedBy: string;
    validatedAt: string;
  };
  attestation: {
    evidenceHash: string;
    hashAlg: string;
    attestedBy: string;
    attestedAt: string;
    anchor: string;
  };
}

export async function validateSessionAsValidator(
  sessionId: number
): Promise<ValidationResult> {
  const router = process.env.CORTENSOR_ROUTER_URL!;
  const token = process.env.CORTENSOR_API_TOKEN || "default-dev-token";

  // Validator fetches raw tasks independently
  const res = await axios.get(
    `${router}/api/v1/tasks/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const tasks = res.data;
  const texts = tasks.map((t: any) => t.text);

const pouw = computePoUW(texts);


  const evidence = {
  outputs: tasks,
  validatedBy: "validator-service-1",
  validatedAt: new Date().toISOString(),
};

const evidenceHash = hashEvidence(evidence);

return {
  sessionId,
  taskCount: tasks.length,
  pouw,
  attestation: {
    evidenceHash,
    hashAlg: "sha256",
    attestedBy: "validator-service-1",
    attestedAt: new Date().toISOString(),
    anchor: "off-chain (on-chain ready)",
  },
  evidence,
};

}
