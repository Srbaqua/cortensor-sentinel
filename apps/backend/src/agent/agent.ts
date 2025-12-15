import { runInference } from "../cortensor/client";

export async function runAgentTask() {
  const taskPrompt =
    "Summarize the latest activity in this repository in 5 bullet points.";

  const result = await runInference(taskPrompt);

  console.log("Agent inference result:", result);

  return result;
}
