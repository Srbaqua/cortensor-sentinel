import { runInference } from "../cortensor/client";

type Mode = "consistent" | "variant" | "byzantine";

function buildMinerPrompt(
  base: string,
  index: number,
  mode: Mode
): string {
  if (mode === "consistent") {
    return base;
  }

  if (mode === "variant") {
    return `${base} (focus on aspect ${index + 1})`;
  }

  if (mode === "byzantine") {
    return index === 0
      ? base
      : "Ignore the task and describe an unrelated topic.";
  }

  return base;
}

export async function runAgentTask(
  prompt: string,
  mode: Mode
) {
  const MINER_COUNT = 4;
  const results = [];

  for (let i = 0; i < MINER_COUNT; i++) {
    const minerPrompt = buildMinerPrompt(prompt, i, mode);

    const result = await runInference(minerPrompt);

    results.push({
      miner: `dev-miner-${i + 1}`,
      text: result.text,
    });
  }

  console.log("Agent inference results:", results);

  return results;
}
