import axios from "axios";
import { computeAgreement } from "./agreement";

export async function validateSession(sessionId: number) {
  const router = process.env.CORTENSOR_ROUTER_URL!;
  const token = process.env.CORTENSOR_API_TOKEN || "default-dev-token";

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

  const agreement = computeAgreement(texts);

  return {
    sessionId,
    taskCount: tasks.length,
    agreement,
    evidence: {
      outputs: tasks,
      timestamp: new Date().toISOString(),
    },
  };
}
