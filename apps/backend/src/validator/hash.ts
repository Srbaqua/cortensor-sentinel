import crypto from "crypto";

export function hashEvidence(evidence: any): string {
  const normalized = JSON.stringify(evidence, Object.keys(evidence).sort());
  return crypto.createHash("sha256").update(normalized).digest("hex");
}
