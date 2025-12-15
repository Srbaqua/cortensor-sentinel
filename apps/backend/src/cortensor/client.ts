import axios from "axios";

const SESSION_ID = 0;

export async function runInference(prompt: string) {
  const router = process.env.CORTENSOR_ROUTER_URL!;
  const token = process.env.CORTENSOR_API_TOKEN || "default-dev-token";

  const res = await axios.post(
    `${router}/api/v1/completions/${SESSION_ID}`,
    {
      prompt,
      stream: false,
      timeout: 60,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
